import { useQuery } from "@tanstack/react-query";
import { getHomeServices, getSpecialOffers } from "@/apis/homeApi";
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
