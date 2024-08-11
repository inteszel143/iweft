import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
export default function NoTokenCalendar() {
    return (
        <View style={styles.container}>
            <View style={styles.topStyle}>
                <Text style={styles.title}>No Calendar Yet</Text>
                <Text style={styles.subTitle}>Sign in to access your calendar and keep track of your laundry bookings. </Text>
            </View>
            <View style={[styles.topStyle]}>
                <TouchableOpacity style={styles.btnStyle}
                    onPress={() => router.push('(modal)/login')}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    topStyle: {
        paddingHorizontal: wp(6),
        marginTop: hp(8)
    },
    title: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2.4)
    },
    subTitle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: "#616161",
        marginTop: hp(2)
    },
    btnStyle: {
        width: wp(40),
        height: hp(7),
        backgroundColor: "#0A5CA8",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(2)
    },
    btnText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
        color: 'white'
    }
})