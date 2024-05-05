import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFFFF",
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  footerBtn: {
    width: wp(88),
    height: hp(7),
    borderRadius: wp(10),
    backgroundColor: "#0A5CA8",
    alignItems: "center",
    justifyContent: "center",
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
});
