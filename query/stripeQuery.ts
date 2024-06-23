import {
  getAllSubscription,
  getDefaultPaymentMethod,
  getListPaymentMethod,
  getUserSubscriptionById,
} from "@/apis/stripe";
import { useQuery } from "@tanstack/react-query";

/**
 * Get Default Payment Methods ---------------------------------------------------------
 */
export const useDefaultMethod = (isFocused: any) => {
  return useQuery({
    queryKey: ["default-method"],
    enabled: isFocused,
    queryFn: getDefaultPaymentMethod,
  });
};

/**
 * Get All User Subscription ---------------------------------------------------------
 */
export const useGetAllSubscription = (isFocused: any) => {
  return useQuery({
    queryKey: ["all-subscription"],
    enabled: isFocused,
    queryFn: getAllSubscription,
  });
};

/**
 *  Get All User Subscription by Id ---------------------------------------------------------
 */
export const useGetUserSubById = (subId: any, isFocused: any) => {
  return useQuery({
    queryKey: ["subscription-id"],
    enabled: isFocused,
    queryFn: () => getUserSubscriptionById(subId),
  });
};

/**
 *  Get LIST PAYMENT METHOD ---------------------------------------------------------
 */
export const useGetListPaymentMethod = (isFocused: any) => {
  return useQuery({
    queryKey: ["list-methods"],
    enabled: isFocused,
    queryFn: getListPaymentMethod,
  });
};
