import useInboxBadge from "@/store/useInboxBadge";
import useProfileBadge from "@/store/useProfileBadge";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { useBookBundleStore } from "@/store/useBookmarkBundleStore";
import useBookingBadge from "@/store/useBookingBadge";

export const inboxBadge = (data: any) => {
  const { setInboxValue } = useInboxBadge.getState();
  const validate = data?.filter(
    (item: any) => item?.sender_model === "Admin" && !item?.is_read
  ).length;
  if (validate) {
    setInboxValue(validate);
  } else {
    setInboxValue(null);
  }
};

export const bookingBadge = (data: any) => {
  const { setValue } = useBookingBadge.getState();
  const validate = data?.filter((item: any) => item?.review === null).length;
  if (validate) {
    setValue(validate);
  } else {
    setValue(null);
  }
};

export const profileBadge = (data: any) => {
  const { setValue } = useProfileBadge.getState();
  const validate = data?.address == null || data?.nickname == null;
  if (validate) {
    setValue("1");
  } else {
    setValue(null);
  }
};

export const checkBookmark = (data: any, serviceId: string): boolean => {
  const { setBookmarked } = useBookmarkStore.getState();

  const isBookmarked = data?.some(
    (bookmark: any) => bookmark?.service?._id === serviceId
  );
  // Update the bookmark state
  setBookmarked(isBookmarked);
  return isBookmarked;
};

export const checkBookmarkBundle = (data: any, serviceId: string): boolean => {
  const { setBookmarked } = useBookBundleStore.getState();

  const isBookmarked = data?.some(
    (bookmark: any) => bookmark?.service?._id === serviceId
  );
  // Update the bookmark state
  setBookmarked(isBookmarked);
  return isBookmarked;
};

export const haveBookmark = (data: any): boolean => {
  const isBookmarked = !!data && Array.isArray(data) && data?.length > 0;
  return isBookmarked;
};

export const validateServiceInTheBookmark = (
  data: any,
  serviceId: string
): boolean => {
  const isBookmarked = data?.some(
    (bookmark: any) => bookmark?.service?._id === serviceId
  );
  return isBookmarked;
};

export const checkUserLike = (data: string[], userId: string): boolean => {
  const isLike = data?.includes(userId);
  return isLike;
};

export const hasNonNullCancelAt = (data: any[]): boolean => {
  return data?.some((subscription) => subscription?.cancel_at !== null);
};

export const oppositeCancelAt = (data: any[]): boolean => {
  return data?.some((subscription) => subscription.cancel_at === null);
};
