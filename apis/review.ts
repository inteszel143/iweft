import axios from "axios";
import * as SecureStore from "expo-secure-store";

/**
 * POST REVIEW USER ---------------------------------------------------------
 */
export const postReview = async (data: any) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/reviews`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response?.data || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Retrieve Review ---------------------------------------------------------
 */
export const getReviews = async (serviceId: string) => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/reviews/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response?.data?.reviews || [];
    } catch (error) {
      return Promise.reject(error);
    }
  };
