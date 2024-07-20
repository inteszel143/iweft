import useInboxBadge from "@/store/useInboxBadge";
import useProfileBadge from "@/store/useProfileBadge";

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

export const profileBadge = (data: any) => {
  const { setValue } = useProfileBadge.getState();
  const validate = data?.address == null || data?.nickname == null;
  if (validate) {
    setValue("1");
  } else {
    setValue(null);
  }
};
