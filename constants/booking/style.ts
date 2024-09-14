import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export const notifStyle = StyleSheet.create({
    orderProcess: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(50),
        backgroundColor: "#FACC15",
        alignItems: 'center',
        justifyContent: 'center'
    },
    payment: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(50),
        backgroundColor: "#0A5CA8",
        alignItems: 'center',
        justifyContent: 'center'
    },
    complete: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(50),
        backgroundColor: "#93C120",
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancel: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(50),
        backgroundColor: "#FF981F",
        alignItems: 'center',
        justifyContent: 'center'
    },

});