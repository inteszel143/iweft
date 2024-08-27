import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import { useUserQuery } from "@/query/fetchAuthQuery";
import { useIsFocused } from "@react-navigation/native";
import HomeHeaderSkeleton from "../skeleton/HomeHeaderSkeleton";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "@/services/i18n";
import { bookingBadge, notifBadge, profileBadge } from "@/utils/validate";
import useUserId from "@/store/useUserInfo";
import { useBooking } from "@/query/orderQuery";
import HomeBookmark from "../home/HomeBookmark";
import { useHomeNotification } from "@/query/notifQuery";
import useNotifBadge from "@/store/useNotifBadge";

export default function NoTokenHomeHeader() {
  const { t } = useTranslation();
  const current = getCurrentLanguage();
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const isMorning = currentHour >= 0 && currentHour < 12;
  const isFocused = useIsFocused();
  const { data, isPending } = useUserQuery(isFocused);
  const { data: completeData } = useBooking(isFocused, "Completed");
  const { data: notifData } = useHomeNotification(isFocused);
  const { setUserId } = useUserId();
  const { notifValue } = useNotifBadge();
  useEffect(() => {
    if (data && completeData) {
      notifBadge(notifData);
      profileBadge(data);
      bookingBadge(completeData);
      setUserId(data?._id);
    }
  }, [data, completeData, notifData]);

  if (isPending) {
    return <HomeHeaderSkeleton />;
  }
  return (
    <View
      style={[
        styles.header,
        { flexDirection: current === "ar" ? "row-reverse" : "row" },
      ]}
    >
      <View
        style={[
          styles.headerLeft,
          { flexDirection: current === "ar" ? "row-reverse" : "row" },
        ]}
      >
        <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
          {!data ? (
            <Image
              source={require("@/assets/temp/default.jpg")}
              resizeMode="center"
              style={{ width: wp(14), height: wp(14), borderRadius: wp(7) }}
            />
          ) : (
            <Image
              source={{ uri: data?.profile_picture }}
              resizeMode="center"
              style={{ width: wp(14), height: wp(14), borderRadius: wp(7) }}
            />
          )}
        </TouchableOpacity>

        <View>
          <Text style={styles.headerGood}>
            {currentHour >= 0 && currentHour < 12
              ? `${t("Good Morning!")} 👋`
              : currentHour >= 12 && currentHour < 18
              ? `${t("Good Afternoon!")} ☀️`
              : `${t("Good Evening!")} 🌙`}
          </Text>
          <Text style={styles.headerName}>{data?.fullname}</Text>
        </View>
      </View>

      <View
        style={[
          styles.headerIcon,
          { flexDirection: current === "ar" ? "row-reverse" : "row" },
        ]}
      >
        <View>
          <TouchableOpacity
            onPress={() => router.push("/homePage/Notification")}
          >
            <Image
              source={require("@/assets/icons/bell.png")}
              resizeMode="contain"
              style={{ width: wp(8) }}
            />
          </TouchableOpacity>
          {notifValue && <View style={styles.notifRed} />}
        </View>

        {/* bookmark */}
        <HomeBookmark />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: wp(5),
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? hp(4) : 0,
  },
  headerLeft: {
    flex: 1,
    alignItems: "center",
    gap: wp(4),
    paddingVertical: hp(1),
  },
  headerGood: {
    fontFamily: "UrbanistRegular",
    fontSize: hp(2.1),
    color: "#757575",
  },
  headerName: {
    fontFamily: "UrbanistBold",
    fontSize: hp(2.4),
  },
  headerIcon: {
    alignItems: "center",
    gap: wp(3.5),
  },
  notifRed: {
    position: "absolute",
    top: Platform.OS === "ios" ? hp(1.1) : hp(2),
    right: -1,
    width: wp(3.5),
    height: wp(3.5),
    backgroundColor: "#F61705",
    borderRadius: wp(2),
  },
});
