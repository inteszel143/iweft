import axios from "axios";
import { useQuery } from "@tanstack/react-query";

/**
 * SIGN IN WITH FACEBOOK  ---------------------------------------------------------
 */

export const signInWithFacebook = async (
  email: any,
  fullname: any,
  facebookId: any
) => {
  const data = {
    email: email,
    fullname: fullname,
    facebookId: facebookId,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/facebook/callback`,
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
 * SIGN IN WITH GOOGLE  ---------------------------------------------------------
 */

export const signInWithGoogle = async (
  email: any,
  fullname: any,
  googleId: any
) => {
  const data = {
    email: email,
    fullname: fullname,
    googleId: googleId,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/google/callback`,
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
 * SIGN IN WITH APPLE  ---------------------------------------------------------
 */

export const signInWithApple = async (email: any, fullname: any) => {
  const data = {
    email: email,
    fullname: fullname,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/apple/callback`,
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
