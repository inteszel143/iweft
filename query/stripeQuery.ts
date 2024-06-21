import { getDefaultPaymentMethod } from "@/apis/stripe";
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
