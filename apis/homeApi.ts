import axios from "axios";
import errorRes from "./errorRes";
import * as SecureStore from "expo-secure-store";
/**
 * Get Home Service ---------------------------------------------------------
 */
export const getHomeServices = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/service`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.services || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Get Home Special Offers ---------------------------------------------------------
 */
export const getSpecialOffers = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/special-offers`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.special_offers || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Get Home Subscription Plans ---------------------------------------------------------
 */
export const getSupscriptionPlan = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/subscription-plans`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data || [];
  } catch (error) {
    return Promise.reject(error);
  }
};
