import axios from "axios";
import errorRes from "./errorRes";
import * as SecureStore from "expo-secure-store";
/**
 * Get User Data ---------------------------------------------------------
 */
export const getUserData = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.user;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Get USER PIN NUMBER ---------------------------------------------------------
 */
export const getPinNumber = async (pin: number) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/pin-checker`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data", // If you need to set content type, uncomment this line
        },
        params: {
          pin: pin,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * VERIFY CHECK ---------------------------------------------------------
 *
 */

export const getVerifyCheck = async (email: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/check_verification`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data", // If you need to set content type, uncomment this line
        },
        params: {
          email: email,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(errorRes(error));
    return Promise.reject(error);
  }
};

/**
 * EMAIL CHECKER IF EXIST ---------------------------------------------------------
 *
 */
export const getEmailChecker = async (email: string) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/check-email`,
      {
        params: {
          email: email,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
