import axios from "axios";
import errorRes from "./errorRes";

/**
 * MANUAL REGISTER  ---------------------------------------------------------
 */
export const manualSignin = async (data: Object) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/signup`,
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
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/verify-code`,
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
