import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { useIsFocused } from '@react-navigation/native';
import { useGetListPaymentMethod } from '@/query/stripeQuery';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { addPaymentMethod, changeToDefaultMethod } from '@/apis/stripe';
import { router } from 'expo-router';
import errorRes from '@/apis/errorRes';
import { PlatformPay, PlatformPayButton, createPlatformPayPaymentMethod } from '@stripe/stripe-react-native';
import useStoreBooking from '@/store/useStoreBooking';
import { getDiscountedTotal } from '@/utils/format';
import useStoreSub from '@/store/useStoreSub';
export default function ApplePay() {
    const { base_price, total, discount } = useStoreBooking();
    const isFocused = useIsFocused();
    const { plan_name, } = useStoreSub();
    const { data, isPending } = useGetListPaymentMethod(isFocused);
    const [loading, setLoading] = useState(false);

    const toggleApplePay = async () => {
        if (Platform.OS === 'android') {
            Alert.alert('Apple Pay is not supported.');
            return;
        };
        setLoading(true);
        const total = 0;
        const totalPayment = parseFloat(base_price as any) + parseFloat(total as any);
        const discountPayment = getDiscountedTotal(base_price, total, discount);
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
                                label: 'Iweft',
                                amount: discount ? `${discountPayment}` : `${totalPayment}`,
                                paymentType: PlatformPay.PaymentType.Immediate,
                            },
                        ],
                        merchantCountryCode: 'AE',
                        currencyCode: 'AED',
                        // requiredShippingAddressFields: [
                        //     PlatformPay.ContactField.PostalAddress,
                        // ],
                        // requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
                    }
                });
                if (error) {
                    setLoading(false);
                    // Alert.alert(error.code, error.message);
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