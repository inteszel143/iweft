import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const defaultStyles = StyleSheet.create({
  footerBtn: {
    height: hp(7),
    width: wp(88),
    backgroundColor: '#0A5CA8',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: wp(10),
    shadowColor: "#0A5CA8",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  textField: {
    width: wp(90),
    height: hp(7.5),
    borderRadius: wp(4),
    justifyContent: "center",
    paddingHorizontal: wp(5),
    marginTop: hp(2.5),
    borderWidth: 1.5,
  },
  innerField: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(4),
  },
  textInputStyle: {
    flex: 1,
    fontFamily: "UrbanistMedium",
    paddingVertical: hp(1),
    fontSize: hp(1.8),
  },
  footerText: {
    fontFamily: "UrbanistBold",
    fontSize: hp(1.9),
    color: "#FFFFFF",
  },










});
