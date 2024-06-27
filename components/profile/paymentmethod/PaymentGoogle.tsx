import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Link, router } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PlatformPayButton, usePlatformPay } from '@stripe/stripe-react-native';
import { addPaymentMethod } from '@/apis/stripe';
export default function PaymentGoogle() {

    const {
        isPlatformPaySupported,
        createPlatformPayPaymentMethod,
    } = usePlatformPay();


    useEffect(() => {
        (async function () {
            if (!(await isPlatformPaySupported({ googlePay: { testEnv: true } }))) {
                Alert.alert('Google Pay is not supported.');
                return;
            }
        })();
    }, []);



    const createPaymentMethod = async () => {
        const { error, paymentMethod } = await createPlatformPayPaymentMethod({
            googlePay: {
                amount: 0,
                currencyCode: 'AED',
                testEnv: true,
                merchantName: 'Iweft',
                merchantCountryCode: 'AE',
            },
        });

        if (error) {
            Alert.alert(error.code, error.message);
            return;
        } else if (paymentMethod) {
            const response = await addPaymentMethod(paymentMethod.id as string);
            console.log(response?.message);
            // Alert.alert(
            //     'Success',
            //     `The payment method was created successfully. paymentMethodId: ${paymentMethod.id}`
            // );
        }
    };


    return (
        <View style={styles.btnStyle}>
            <View style={styles.innerStyle}>
                <Image source={require("@/assets/temp/bookingIcon/google.jpg")}
                    resizeMode='contain'
                    style={{ width: wp(8) }}
                />
                <Text style={styles.textStyle}>Google Pay</Text>
                <TouchableOpacity
                    onPress={createPaymentMethod}
                >
                    <Text style={styles.connectStyle} >Connect</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    btnStyle: {
        marginTop: hp(2.5),
        backgroundColor: 'white',
        width: wp(90),
        height: hp(12),
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