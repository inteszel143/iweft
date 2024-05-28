import { getOrderByStatus } from "@/apis/order";
import { useQuery } from "@tanstack/react-query";

/**
 * Get Home Services ---------------------------------------------------------
 */

export const useBooking = (isFocused: boolean, status: string) => {
  return useQuery({
    queryKey: ["booking-status", status],
    enabled: isFocused,
    queryFn: () => getOrderByStatus(status),
  });
};
