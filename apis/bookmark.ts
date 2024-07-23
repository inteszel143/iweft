import axios from "axios";
import errorRes from "./errorRes";
import * as SecureStore from "expo-secure-store";

/**
 * POST BOOKMARKS  ---------------------------------------------------------
 */

export const postBookmarks = async (
  serviceId: string,
  service_model: string
) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const data = {
    serviceId: serviceId,
    service_model: service_model,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/bookmark/add`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.bookmark || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * GET ALL BOOKMARKS  ---------------------------------------------------------
 */

export const getBookmarks = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/bookmark`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.bookmarks[0]?.bookmarks || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * REMOVE BOOKMARKS  ---------------------------------------------------------
 */

export const removeBookmarks = async (serviceId: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.patch(
      `${process.env.EXPO_PUBLIC_API_URL}/bookmark/remove/${serviceId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.message || [];
  } catch (error) {
    return Promise.reject(error);
  }
};
