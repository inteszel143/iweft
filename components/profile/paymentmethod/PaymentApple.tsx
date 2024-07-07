import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useGetListPaymentMethod } from '@/query/stripeQuery';
import { useIsFocused } from '@react-navigation/native';
import { createPlatformPayPaymentMethod, PlatformPay } from '@stripe/stripe-react-native';
import { addPaymentMethod, changeToDefaultMethod } from '@/apis/stripe';
import { router } from 'expo-router';
import errorRes from '@/apis/errorRes';

export default function PaymentApple() {

    const isFocused = useIsFocused();
    const { data, isPending } = useGetListPaymentMethod(isFocused);
    const [loading, setLoading] = useState(false);



    const toggleApplePay = async () => {
        if (Platform.OS === 'android') {
            Alert.alert('Apple Pay is not supported.');
            return;
        };
        const walletMethods = data.filter((method: any) => method.card.wallet !== null);
        const applePayMethod = walletMethods.find((method: any) => method?.card?.wallet?.type === "apple_pay");


        if (applePayMethod) {
            return;
        } else {
            const createPaymentMethod = async () => {
                const { error, paymentMethod } = await createPlatformPayPaymentMethod({
                    applePay: {
                        cartItems: [
                            {
                                label: 'Subscription Plan',
                                amount: `0.00`,
                                paymentType: PlatformPay.PaymentType.Immediate,
                            },
                            {
                                label: 'Total',
                                amount: `0.00`,
                                paymentType: PlatformPay.PaymentType.Immediate,
                            },
                        ],
                        merchantCountryCode: 'AE',
                        currencyCode: 'AED',
                    },
                });
                if (error) {
                    setLoading(false);
                    Alert.alert(error.code, error.message);
                    return;
                } else if (paymentMethod) {
                    try {
                        await addPaymentMethod(paymentMethod.id as string);
                        await changeToDefaultMethod(paymentMethod.id as string);
                        setLoading(false);
                        // router.push('homePage/services/PlanType');
                    } catch (error) {
                        setLoading(false);
                        Alert.alert(errorRes(error));
                    }
                }
            }
            await createPaymentMethod();
        }


    }


    return (
        <View style={styles.btnStyle}>
            <View style={styles.innerStyle}>
                <Image source={require("@/assets/temp/bookingIcon/apple.jpg")}
                    resizeMode='contain'
                    style={{ width: wp(8) }}
                />
                <Text style={styles.textStyle}>Apple Pay</Text>
                <TouchableOpacity
                    onPress={toggleApplePay}
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