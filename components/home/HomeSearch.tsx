import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "@/services/i18n";
import { router } from "expo-router";
export default function HomeSearch() {
  const { t } = useTranslation();
  const current = getCurrentLanguage();
  return (
    <TouchableOpacity
      style={[
        styles.searchContainer,
        { flexDirection: current === "ar" ? "row-reverse" : "row" },
      ]}
      onPress={() => router.push('/search/SearchScreen')}
    >
      <View
        style={[
          styles.searchLeft,
          { flexDirection: current === "ar" ? "row-reverse" : "row" },
        ]}
      >
        <Image
          source={require("@/assets/icons/search.png")}
          resizeMode="contain"
          style={{ width: wp(6.5) }}
        />
        {/* <TextInput
          placeholder={t("Seach what you need...")}
          placeholderTextColor={"#d5d5d5"}
          style={{ fontFamily: "UrbanistSemiBold", fontSize: hp(1.9) }}
        /> */}
        <Text style={{ fontFamily: "UrbanistSemiBold", fontSize: hp(1.9), color: "#9E9E9E" }}>{t("Search what you need...")}</Text>
      </View>
      <Image
        source={require("@/assets/icons/filter.png")}
        resizeMode="contain"
        style={{ width: wp(6.5) }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    height: hp(7),
    width: wp(91),
    backgroundColor: "#F5F5F5",
    marginTop: hp(1.5),
    borderRadius: 12,
    alignSelf: "center",
  },
  searchLeft: {
    alignItems: "center",
    gap: wp(4),
    backgroundColor: "transparent",
  },
});
