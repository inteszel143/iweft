import { getMessageInbox, getMessages, postMessage } from "@/apis/message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
/**
 *  Inbox ---------------------------------------------------------
 */
export const useGetMessageInbox = (isFocused: boolean) => {
  return useQuery({
    queryKey: ["inbox"],
    enabled: isFocused,
    queryFn: getMessageInbox,
  });
};

/**
 *  Message ---------------------------------------------------------
 */
export const useGetMessage = async (convoId: string, isFocused: boolean) => {
  return useQuery({
    queryKey: ["message", convoId],
    enabled: isFocused,
    queryFn: () => getMessages(convoId),
  });
};

/**
 * Post Message ---------------------------------------------------------
 */
export const postSendMessage = (options?: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postMessage,
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ["message"] });
      queryClient.invalidateQueries({ queryKey: ["inbox"] });
    },
    ...options,
  });
};
