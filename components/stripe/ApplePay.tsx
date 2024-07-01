import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { useIsFocused } from '@react-navigation/native';
import { useGetListPaymentMethod } from '@/query/stripeQuery';
import { addPaymentMethod, changeToDefaultMethod } from '@/apis/stripe';
import { router } from 'expo-router';
import errorRes from '@/apis/errorRes';
import { PlatformPay, createPlatformPayPaymentMethod } from '@stripe/stripe-react-native';
import useStoreBooking from '@/store/useStoreBooking';
export default function ApplePay() {

    const { base_price, total } = useStoreBooking();
    const isFocused = useIsFocused();
    const { data, isPending } = useGetListPaymentMethod(isFocused);
    const [loading, setLoading] = useState(false);


    const toggleApplePay = async () => {
        if (Platform.OS === 'android') {
            Alert.alert('Apple Pay is not supported.');
            return;
        };
        setLoading(true);
        const totalPayment = parseFloat(base_price as any) + parseFloat(total as any);
        const walletMethods = data.filter((method: any) => method.card.wallet !== null);
        const applePayMethod = walletMethods.find((method: any) => method?.card?.wallet?.type === "apple_pay");

        if (applePayMethod) {
            try {
                await changeToDefaultMethod(applePayMethod.id as string);
                setLoading(false);
                router.push('/homePage/HomeConfirmPin');
            } catch (error) {
                setLoading(false);
                Alert.alert(errorRes(error));
            }
        } else {
            const createPaymentMethod = async () => {
                const { error, paymentMethod } = await createPlatformPayPaymentMethod({
                    applePay: {
                        cartItems: [
                            {
                                label: 'Services Fee',
                                amount: `${totalPayment}`,
                                paymentType: PlatformPay.PaymentType.Immediate,
                            },
                            {
                                label: 'Total',
                                amount: `${totalPayment}`,
                                paymentType: PlatformPay.PaymentType.Immediate,
                            },
                        ],
                        merchantCountryCode: 'AE',
                        currencyCode: 'AED',
                    }
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
                        router.push('/homePage/HomeConfirmPin');
                    } catch (error) {
                        setLoading(false);
                        Alert.alert(errorRes(error));
                    }
                }
            };
            await createPaymentMethod();
        }
    };
    if (isPending) {
        <TouchableOpacity
            style={defaultStyles.footerBtn}
            disabled
        >
            {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Pay ApplePay</Text>}
        </TouchableOpacity>
    };
    return (
        <TouchableOpacity
            style={defaultStyles.footerBtn}
            onPress={toggleApplePay}
        >
            {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Pay ApplePay</Text>}
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({})