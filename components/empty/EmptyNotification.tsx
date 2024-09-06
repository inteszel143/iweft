import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";

export default function EmptyNotification() {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: hp(15) }}>
        <Image
          source={require("@/assets/icons/under.png")}
          resizeMode="contain"
          style={{ width: wp(100), height: hp(23) }}
        />
      </View>

      <View>
        <Text style={styles.textStyle}>No Notifications at the Moment.</Text>
        <Text style={styles.subText}>
          Don't miss important updates—make sure notifications are on.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: wp(10),
  },
  textStyle: {
    fontFamily: "UrbanistBold",
    fontSize: hp(2.4),
    textAlign: "center",
    marginTop: hp(4.5),
  },
  subText: {
    fontFamily: "UrbanistMedium",
    fontSize: hp(2),
    textAlign: "center",
    color: "#616161",
    marginTop: hp(2),
  },
  btnStyle: {
    width: wp(80),
    height: hp(7),
    backgroundColor: "#DAE7F2",
    borderRadius: wp(10),
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(10),
  },
  btnText: {
    fontFamily: "UrbanistBold",
    fontSize: hp(2),
    color: "#0A5CA8",
  },
});
