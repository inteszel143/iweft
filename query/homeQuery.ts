import { useQuery } from "@tanstack/react-query";
import {
  getAllBundles,
  getHomeServices,
  getItemCategory,
  getItems,
  getSpecialOffers,
  getSupscriptionPlan,
} from "@/apis/homeApi";
/**
 * Get Home Services ---------------------------------------------------------
 */
export const useHomeServices = (isFocused: any) => {
  return useQuery({
    queryKey: ["home-services"],
    enabled: isFocused,
    queryFn: getHomeServices,
  });
};
/**
 * Get Home Special Offers ---------------------------------------------------------
 */
export const useSpecialOffers = (isFocused: boolean) => {
  return useQuery({
    queryKey: ["special-offrs"],
    enabled: isFocused,
    queryFn: getSpecialOffers,
  });
};
/**
 * Get Home Subscription Plan ---------------------------------------------------------
 */
export const useSubscriptionPlan = (isFocused: boolean) => {
  return useQuery({
    queryKey: ["sub-plans"],
    enabled: isFocused,
    queryFn: getSupscriptionPlan,
  });
};

/**
 * Get Home Item Category ---------------------------------------------------------
 */
export const useItemCategory = (isFocused: boolean) => {
  return useQuery({
    queryKey: ["item-category"],
    enabled: isFocused,
    queryFn: getItemCategory,
  });
};
/**
 * Get Home Items ---------------------------------------------------------
 */
export const useItems = (isFocused: boolean) => {
  return useQuery({
    queryKey: ["items"],
    enabled: isFocused,
    queryFn: getItems,
  });
};

/**
 * Get Home Laundry Bundles ---------------------------------------------------------
 */

export const useLaundryBundles = (isFocused: boolean) => {
  return useQuery({
    queryKey: ["bundles"],
    enabled: isFocused,
    queryFn: getAllBundles,
  });
};

// /**
//  * Get Home Laundry Bundles By ID ---------------------------------------------------------
//  */

// export const useLaundryBundlesById = (
//   isFocused: boolean,
//   laundryId: string
// ) => {
//   return useQuery({
//     queryKey: ["bundle-id"],
//     enabled: isFocused,
//     queryFn: () => getBundleById(laundryId),
//   });
// };
