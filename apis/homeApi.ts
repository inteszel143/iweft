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

/**
 * User Activations Offers ---------------------------------------------------------
 */
export const getActivationOffer = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/special-offers/activations`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.user_activations || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Active Special Offers ---------------------------------------------------------
 */

export const activeSpecialOffer = async (specialId: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/special-offers/${specialId}`,
      {},
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
 * Apply Code for Special Offers ---------------------------------------------------------
 */

export const applyCodeSpecialOffer = async (promo_code: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const data = {
    promo_code: promo_code,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/special-offers/apply-code`,
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
