import axios from "axios";
import * as SecureStore from "expo-secure-store";

/**
 * POST REVIEW USER ---------------------------------------------------------
 */
export const postReview = async (
  service: string,
  rating: number,
  comment: string,
  orderId: string
) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const data = {
    service: service,
    rating: rating,
    comment: comment,
    orderId: orderId,
  };
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

/**
 * Rating and Reviews By Service ID ---------------------------------------------------------
 */

export const getRatingsByServiceId = async (serviceId: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/reviews/rating-stats/${serviceId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.review || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Like or Unlike in Review ---------------------------------------------------------
 */
export const patchReactComment = async (reviewId: string, action: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const data = {
    reviewId: reviewId,
    action: action,
  };
  try {
    const response = await axios.patch(
      `${process.env.EXPO_PUBLIC_API_URL}/reviews/react`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.review || [];
  } catch (error) {}
};
