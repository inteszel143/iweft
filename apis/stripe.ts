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
