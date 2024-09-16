import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import errorRes from "./errorRes";

/**
 * SIGN IN WITH FACEBOOK  ---------------------------------------------------------
 */

export const signInWithFacebook = async (
  email: any,
  fullname: any,
  facebookId: any,
  push_token: any,
) => {
  const data = {
    email: email,
    fullname: fullname,
    facebookId: facebookId,
    push_token: push_token,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/facebook/callback`,
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
 * SIGN IN WITH GOOGLE  ---------------------------------------------------------
 */

export const signInWithGoogle = async (
  email: any,
  fullname: any,
  googleId: any,
  push_token: any,
) => {
  const data = {
    email: email,
    fullname: fullname,
    googleId: googleId,
    push_token: push_token,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/google/callback`,
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
 * SIGN IN WITH APPLE  ---------------------------------------------------------
 */

export const signInWithApple = async (
  email: any,
  fullname: string,
  identityToken: string,
  push_token: any,
) => {
  const data = {
    email: email,
    fullname: fullname,
    identityToken: identityToken,
    push_token: push_token,
  };
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/apple/callback`,
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
