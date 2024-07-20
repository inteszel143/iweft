import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, Alert } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function PaymentPaypal() {
    return (
        <TouchableOpacity style={styles.btnStyle}
            onPress={() => Alert.alert('Paypal is not available', 'Please select other payment method', [
                { text: 'OK' },
            ])}
        >
            <View style={styles.innerStyle}>
                <Image source={require("@/assets/temp/bookingIcon/paypal.jpg")}
                    resizeMode='contain'
                    style={{ width: wp(8) }}
                />
                <Text style={styles.textStyle}>PayPal</Text>
                <TouchableOpacity>
                    <Text style={styles.connectStyle} >Connect</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        marginTop: hp(2.5),
        backgroundColor: 'white',
        width: wp(90),
        height: Platform.OS === 'android' ? hp(15) : hp(13),
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: wp(5),
        paddingHorizontal: wp(7),
        shadowColor: "#DADADA",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    innerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    textStyle: {
        flex: 1,
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.1),
    },
    connectStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
        color: '#0A5CA8'
    }
})