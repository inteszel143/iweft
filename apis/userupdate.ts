import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
/**
 * USER UPDATE PROFILE IMAGE  ---------------------------------------------------------
 */

export const userUpdateProfileImage = async (profile_picture: any) => {
  const data = {
    profile_picture: profile_picture,
  };
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.patch(
      `${process.env.EXPO_PUBLIC_API_URL}/user/update/profile-picture`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data", // If you need to set content type, uncomment this line
        },
      }
    );
    return response.data.tokens;
  } catch (error) {
    return Promise.reject(error);
  }
};
