import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function ContinueEmail() {
    return (
        <TouchableOpacity style={styles.btnContinue}>
            <View style={styles.logoContinue}>

            </View>
            <Text>ContinueEmail</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnContinue: {
        width: wp(88),
        height: hp(6),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(2)
    },
    logoContinue: {
        position: 'absolute',
        left: 0,

    }
})
