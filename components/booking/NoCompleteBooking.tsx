import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
export default function NoCompleteBooking() {
    return (
        <View style={styles.container}>

            <View>
                <Image source={require('@/assets/temp/under.jpg')} resizeMode='contain' style={{ width: wp(100), height: hp(22) }} />
            </View>

            <View>
                <Text style={styles.textStyle}>You have no completed booking</Text>
                <Text style={styles.textSubStyle}>You do not have a upcoming booking. Make a new booking by clicking the button below</Text>
            </View>

            <TouchableOpacity style={styles.btnStyle} onPress={() => router.back()}>
                <Text style={styles.btnText}>Make New Booking</Text>
            </TouchableOpacity>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(10)
    },
    textStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.5),
        textAlign: 'center',
        marginTop: hp(6)
    },
    btnStyle: {
        width: wp(88),
        height: hp(7),
        backgroundColor: '#DAE7F2',
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(8)
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: '#0A5CA8'
    },
    textSubStyle: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(2.2),
        textAlign: 'center',
        marginTop: hp(2.2),
    }
})