import { getRatingsByServiceId, getReviews } from "@/apis/review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Get Reviews User ---------------------------------------------------------
 */
export const useGetReview = (serviceId: string, isFocused: boolean) => {
  return useQuery({
    queryKey: ["reviews", serviceId],
    queryFn: () => getReviews(serviceId),
    enabled: isFocused,
  });
};
/**
 * Get Reviews User By Id---------------------------------------------------------
 */
export const useGetRatingByService = (
  serviceId: string,
  isFocused: boolean
) => {
  return useQuery({
    queryKey: ["review", serviceId],
    enabled: isFocused,
    queryFn: () => getRatingsByServiceId(serviceId),
  });
};
