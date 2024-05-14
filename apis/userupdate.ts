import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

/**
 * USER UPDATE PROFILE IMAGE  ---------------------------------------------------------
 */

export const userUpdateProfileImage = async (data: FormData) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.patch(
      `${process.env.EXPO_PUBLIC_API_URL}/user/update/profile-picture`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 * USER DELETE PROFILE IMAGE  ---------------------------------------------------------
 */
export const userDeleteProfileImage = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.delete(
      `${process.env.EXPO_PUBLIC_API_URL}/user/delete/profile-picture`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
