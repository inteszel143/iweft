import { useQuery } from "@tanstack/react-query";
import {
  getActivationOffer,
  getAllBundles,
  getAllBundlesUsingId,
  getHomeServices,
  getHomeServicesById,
  getItemCategory,
  getItems,
  getServiceCategory,
  getSpecialOffers,
  getSupscriptionPlan,
  searchMe,
} from "@/apis/homeApi";
import { getProductCategroy } from "@/apis/stripe";
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
 * Get Home Services Category ---------------------------------------------------------
 */
export const useHomeServiceCategory = (isFocused: boolean) => {
  return useQuery({
    queryKey: ["services-category"],
    enabled: isFocused,
    queryFn: getServiceCategory,
  });
};

/**
 * Get Home Services by Id ---------------------------------------------------------
 */
export const useHomeServicesId = (serviceId: string, isFocused: boolean) => {
  return useQuery({
    queryKey: ["services-id", serviceId],
    enabled: isFocused,
    queryFn: () => getHomeServicesById(serviceId),
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
    queryFn: getProductCategroy,
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

export const useLaundryBundlesUsingId = (
  bundleId: string,
  isFocused: boolean
) => {
  return useQuery({
    queryKey: ["bundles-ids", bundleId],
    enabled: isFocused,
    queryFn: () => getAllBundlesUsingId(bundleId),
  });
};

/**
 * Get Home Laundry User Activations ---------------------------------------------------------
 */
export const useActivationPromo = (isFocused: boolean) => {
  return useQuery({
    queryKey: ["activations"],
    enabled: isFocused,
    queryFn: getActivationOffer,
  });
};

export const useSearchMe = (isFocused: boolean, searchKey: string) => {
  return useQuery({
    queryKey: ["search-me", searchKey],
    enabled: isFocused,
    queryFn: () => searchMe(searchKey)
  })
}

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
