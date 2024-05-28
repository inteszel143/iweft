import axios from "axios";
import errorRes from "./errorRes";
import * as SecureStore from "expo-secure-store";

/**
 * CREATE ORDER / BOOKING  ---------------------------------------------------------
 */
export const createBooking = async (data: any) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/order/create`,
      data,
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
 * GET ORDER BY STATUS  ---------------------------------------------------------
 */

export const getOrderByStatus = async (status: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/order/bookings`,
      {
        params: {
          status: status,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.orders;
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 * CANCEL BOOKING  ---------------------------------------------------------
 */
export const cancelBooking = async (bookingId: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.patch(
      `${process.env.EXPO_PUBLIC_API_URL}/order/${bookingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * GET ORDER BY DATE  ---------------------------------------------------------
 */

export const getOrderByDate = async (date: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/order/bookings/date`,
      {
        params: {
          date: date,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.orders;
  } catch (error) {
    return Promise.reject(error);
  }
};
