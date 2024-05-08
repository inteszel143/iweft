import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/apis/fetchAuth";

/**
 * Get User Data Query ---------------------------------------------------------
 */
export const useUserQuery = () => {
  return useQuery({
    queryKey: ["user-data"],
    queryFn: getUserData,
  });
};
