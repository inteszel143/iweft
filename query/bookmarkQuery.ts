import { getBookmarks, postBookmarks } from "@/apis/bookmark";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * GET ALL BOOKMARKS  ---------------------------------------------------------
 */
export const usetGetBookmarks = (isFocused: boolean) => {
  return useQuery({
    queryKey: ["bookmarks"],
    enabled: isFocused,
    queryFn: getBookmarks,
  });
};

/**
 * GET ALL BOOKMARKS  ---------------------------------------------------------
 */
