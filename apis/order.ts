import axios from "axios";
import errorRes from "./errorRes";
import * as SecureStore from "expo-secure-store";

/**
 * CREATE ORDER / BOOKING  ---------------------------------------------------------
 */
export const manualSignup = async (data: FormData) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/signup`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createBooking = async (data: any) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/order/create`,
      data,
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
