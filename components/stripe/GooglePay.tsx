import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { useIsFocused } from '@react-navigation/native';
import { useGetListPaymentMethod } from '@/query/stripeQuery';
import { addPaymentMethod, changeToDefaultMethod } from '@/apis/stripe';
import { router } from 'expo-router';
import errorRes from '@/apis/errorRes';
import { createPlatformPayPaymentMethod } from '@stripe/stripe-react-native';
import useStoreBooking from '@/store/useStoreBooking';
import { getDiscountedTotal } from '@/utils/format';
export default function GooglePay() {
    const isFocused = useIsFocused();
    const { data, isPending } = useGetListPaymentMethod(isFocused);
    const [btnLoading, setBtnLoading] = useState(false);
    const { base_price, total, discount } = useStoreBooking();

    const toggleGooglePay = async () => {
        if (Platform.OS === 'ios') {
            Alert.alert('Google Pay is not supported.');
            return;
        };
        setBtnLoading(true);
        const totalPayment = parseFloat(base_price as any) + parseFloat(total as any);
        const discountPayment = getDiscountedTotal(base_price, total, discount);
        const walletMethods = data.filter((method: any) => method.card.wallet !== null);
        const googlePayMethod = walletMethods.find((method: any) => method?.card?.wallet?.type === "google_pay");


        if (googlePayMethod) {
            try {
                await changeToDefaultMethod(googlePayMethod.id as string);
                setBtnLoading(false);
                router.push('/homePage/HomeConfirmPin');
            } catch (error) {
                setBtnLoading(false);
                Alert.alert(errorRes(error));
            }
        } else {
            const createPaymentMethod = async () => {
                const { error, paymentMethod } = await createPlatformPayPaymentMethod({
                    googlePay: {
                        amount: discount ? `${discountPayment}` : `${totalPayment}`,
                        currencyCode: 'AED',
                        testEnv: true,
                        merchantName: 'Iweft',
                        merchantCountryCode: 'AE',
                    },
                });

                if (error) {
                    setBtnLoading(false);
                    Alert.alert(error.code, error.message);
                    return;
                } else if (paymentMethod) {
                    try {
                        await addPaymentMethod(paymentMethod.id as string);
                        await changeToDefaultMethod(paymentMethod.id as string);
                        setBtnLoading(false);
                        router.push('/homePage/HomeConfirmPin');
                    } catch (error) {
                        setBtnLoading(false);
                        Alert.alert(errorRes(error));
                    }
                }
            };
            await createPaymentMethod();
        }
    };


    if (isPending) {
        return (
            <TouchableOpacity
                disabled
                style={defaultStyles.footerBtn}
            >
                {btnLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Confirm Payment</Text>}
            </TouchableOpacity>
        )
    };
    return (
        <TouchableOpacity
            style={defaultStyles.footerBtn}
            onPress={toggleGooglePay}
        >
            {btnLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Confirm Payment</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})