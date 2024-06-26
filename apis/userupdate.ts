import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import errorRes from "./errorRes";

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

/**
 * USER UPDATE PHONE NUMBER  ---------------------------------------------------------
 */
export const userUpdatePhoneNumber = async (
  contact_number: string,
  code: string
) => {
  const data = {
    contact_number: contact_number,
    code: code,
  };
  try {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const response = await axios.patch(
      `${process.env.EXPO_PUBLIC_API_URL}/user/update/phone-number`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data",
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
 * UPDATE USER INFO  ---------------------------------------------------------
 */

export const userUpdateProfileData = async (data: object) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.patch(
      `${process.env.EXPO_PUBLIC_API_URL}/user/update/profile`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
