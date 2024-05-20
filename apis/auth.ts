import axios from "axios";
import errorRes from "./errorRes";
import * as SecureStore from "expo-secure-store";
/**
 * MANUAL REGISTER  ---------------------------------------------------------
 */
export const manualSignup = async (data: FormData) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/signup`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * MANUAL LOGINNNN ---------------------------------------------------------
 */
export const manualLogin = async (email: string, password: string) => {
  const data = {
    email: email,
    password: password,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/signin`,
      data,
      {
        headers: {},
      }
    );
    return response.data.tokens;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * LOGOUT ---------------------------------------------------------
 */

export const logoutUser = async (refreshToken: string) => {
  const data = {
    refreshToken: refreshToken,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/logout`,
      data,
      {
        headers: {},
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * REFRESH TOKEN WHEN OPEN APP ---------------------------------------------------------
 */
export const appOpenRefresh = async (refreshToken: string) => {
  const data = {
    refreshToken: refreshToken,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/refresh-token`,
      data,
      {
        headers: {},
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * VERIFY EMAIL CODE ---------------------------------------------------------
 *
 */
export const postVerifyEmailCode = async (
  email: string,
  verification_code: number
) => {
  const data = {
    email: email,
    verification_code: verification_code,
  };
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/verify-code`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data", // If you need to set content type, uncomment this line
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * VERIFY USER VIA PHONE NUMBER ---------------------------------------------------------
 *
 */

export const postPhoneVerificationCode = async (contact_number: string) => {
  const data = {
    contact_number: contact_number,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/send-verification`,
      data,
      {
        headers: {},
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * PHONE CHECK VERIFICATION ---------------------------------------------------------
 *
 */
export const postVerifyCheck = async (contact_number: string, code: string) => {
  const data = {
    contact_number: contact_number,
    code: code,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/verifychecks`,
      data,
      {
        headers: {},
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * DELETE ACCOUNT ---------------------------------------------------------
 *
 */

export const deleteAccount = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  try {
    const response = await axios.delete(
      `${process.env.EXPO_PUBLIC_API_URL}/user/profile/delete-account`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(errorRes(error));
    return Promise.reject(error);
  }
};
