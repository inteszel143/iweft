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
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
