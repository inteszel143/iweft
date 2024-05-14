import { useQuery } from "@tanstack/react-query";
import { getUserData, getVerifyCheck } from "@/apis/fetchAuth";

/**
 * Get User Data Query ---------------------------------------------------------
 */
export const useUserQuery = (isFocused: any) => {
  return useQuery({
    queryKey: ["user-data"],
    enabled: isFocused,
    queryFn: getUserData,
  });
};
