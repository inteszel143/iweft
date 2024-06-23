import axios from "axios";
import errorRes from "./errorRes";
import * as SecureStore from "expo-secure-store";

/**
 * CREATE PAYMENT INTENT  ---------------------------------------------------------
 */
export const postPaymentIntent = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/stripe/payment-sheet`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const { paymentIntent, ephemeralKey, customer } = await response.json();
  return {
    paymentIntent,
    ephemeralKey,
    customer,
  };
};
/**
 * CREATE COLLECT PAYMEND DETAILS  ---------------------------------------------------------
 */


export const postCollectPayment = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/stripe/create-setup-intent`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const { setupIntent, ephemeralKey, customer } = await response.json();

  return {
    setupIntent,
    ephemeralKey,
    customer,
  };
};



/**
 * GET ALL PAYMENT METHODS  ---------------------------------------------------------
 */
export const getAllPaymentMethods = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/stripe/list-payment-methods`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.paymentMethods || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * GET DEFAULT PAYMENT METHODS  ---------------------------------------------------------
 */
export const getDefaultPaymentMethod = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/stripe/default-payment-methods`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.default_payment_method || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * GET PRODUCTS CATEGORY  ---------------------------------------------------------
 */
export const getProductCategroy = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/stripe/products`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.products || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * AVAI SUBSCRIPTION  ---------------------------------------------------------
 */

export const postAvailSubscription = async (priceId: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const data = {
    priceId: priceId,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/stripe/create-subscription`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Get All User Subscription   ---------------------------------------------------------
 */

export const getListPaymentMethod = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/stripe/list-payment-methods`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.paymentMethods?.data || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Get All User Subscription   ---------------------------------------------------------
 */
export const getAllSubscription = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/stripe/view-subscriptions`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.subscriptions?.data || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Get All User Subscription BY ID   ---------------------------------------------------------
 */
export const getUserSubscriptionById = async (subId: any) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/stripe/view-subscription/${subId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.subscription || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Cancel User Subscription   ---------------------------------------------------------
 */
export const cancelSubscription = async (subscriptionId: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const data = {
    subscriptionId: subscriptionId,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/stripe/cancel-subscription`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Change to Default Payment Method   ---------------------------------------------------------
 */
export const changeToDefaultMethod = async (default_payment_method: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const data = {
    default_payment_method: default_payment_method,
  };

  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/stripe/update-default-payment-method`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Delete Payment Method   ---------------------------------------------------------
 */
export const deletePaymentMethod = async (payment_method_id: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const data = {
    payment_method_id: payment_method_id,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/stripe/delete-payment-method`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Add Payment Method   ---------------------------------------------------------
 */
export const addPaymentMethod = async (payment_method_id: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const data = {
    payment_method_id: payment_method_id,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/stripe/add-card-payment-method`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data || [];
  } catch (error) {
    return Promise.reject(error);
  }
};
