import { useQuery } from "@tanstack/react-query";
import { getHomeServices } from "@/apis/homeApi";
/**
 * Get Home Services ---------------------------------------------------------
 */
export const useHomeServices = () => {
  return useQuery({
    queryKey: ["home-services"],
    queryFn: getHomeServices,
  });
};
