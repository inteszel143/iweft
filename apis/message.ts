import axios from "axios";
import * as SecureStore from "expo-secure-store";

/**
 * POST MESSAGE INBOX ---------------------------------------------------------
 */

export const postMessage = async (data: any) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  // chat/send/6641d701ee11fd57020ebb48
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/chat/send/6641d701ee11fd57020ebb48`,
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
 * GET MESSAGE ---------------------------------------------------------
 */

export const getMessages = async (convoId: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/chat/messages/${convoId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.messages || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * GET ALL MESSAGE IN INBOX ---------------------------------------------------------
 */

export const getMessageInbox = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/chat/conversation`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.conversations || [];
  } catch (error) {
    return Promise.reject(error);
  }
};
