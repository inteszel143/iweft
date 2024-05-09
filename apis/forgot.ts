import axios from "axios";
import errorRes from "./errorRes";

/**
 * FORGOT USING EMAIL  ---------------------------------------------------------
 */
export const forgotPasswordEmail = async (email: string) => {
  const data = {
    email: email,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/forgot-password`,
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
 * VERIFY EMAIL CODE  ---------------------------------------------------------
 */
export const verifyEmailCode = async (email: string, code: number) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/reset-password/verify-code`,
      {
        params: {
          email: email,
          code: code,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * RESET PASSWORD VIA EMAIL  ---------------------------------------------------------
 */

export const resetPasswordEmail = async (
  new_password: string,
  email: string,
  code: number
) => {
  const data = {
    new_password: new_password,
    email: email,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/client/reset-password`,
      data,
      {
        params: {
          code: code,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(errorRes(error));
    return Promise.reject(error);
  }
};
