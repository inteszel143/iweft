import {
  getUserNotification,
  getUserNotificationById,
} from "@/apis/notification";
import { useQuery } from "@tanstack/react-query";

/**
 * Get Home Notification ---------------------------------------------------------
 */

export const useHomeNotification = (isFocused: any) => {
  return useQuery({
    queryKey: ["home-notif"],
    enabled: isFocused,
    queryFn: getUserNotification,
  });
};

/**
 * Get Home Notification By ID---------------------------------------------------------
 */

export const useHomeNotificationByID = (isFocused: any, notifId: string) => {
  return useQuery({
    queryKey: ["notif-id"],
    enabled: isFocused,
    queryFn: () => getUserNotificationById(notifId),
  });
};
