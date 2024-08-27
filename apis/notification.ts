import axios from "axios";
import * as SecureStore from "expo-secure-store";
/**
 * GET USER NOTIFICATION  ---------------------------------------------------------
 */
export const getUserNotification = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/user/notifications`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.notifications || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * GET USER NOTIFICATION BY ID  ---------------------------------------------------------
 */
export const getUserNotificationById = async (notifId: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/user/notifications/${notifId}`,
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
