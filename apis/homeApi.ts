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
      `${process.env.EXPO_PUBLIC_API_URL}/subscriptions`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.subscriptions || [];
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 * Get Home Item Category ---------------------------------------------------------
 */
export const getItemCategory = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/item-category`,
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
 * Get Home Items ---------------------------------------------------------
 */
export const getItems = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/items`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.items || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Get All Bundles ---------------------------------------------------------
 */

export const getAllBundles = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/laundry-bundles`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.laundryBundles || [];
  } catch (error) {
    return Promise.reject(error);
  }
};
