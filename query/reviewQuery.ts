import { getReviews, postReview } from "@/apis/review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Post Review ---------------------------------------------------------
 */
export const postSendReview = (options?: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postReview,
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    ...options,
  });
};

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
