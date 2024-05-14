import { useQuery } from "@tanstack/react-query";
import { getHomeServices } from "@/apis/homeApi";
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
