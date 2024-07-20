import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { PlatformPay, PlatformPayButton, createPlatformPayPaymentMethod } from '@stripe/stripe-react-native';
import useStoreSub from '@/store/useStoreSub';
import { useIsFocused } from '@react-navigation/native';
import { useGetListPaymentMethod } from '@/query/stripeQuery';
import { addPaymentMethod, changeToDefaultMethod } from '@/apis/stripe';
import { router } from 'expo-router';
import errorRes from '@/apis/errorRes';
export default function SubApplePay() {
    const { total } = useStoreSub();
    const isFocused = useIsFocused();
    const { data, isPending } = useGetListPaymentMethod(isFocused);
    const [loading, setLoading] = useState(false);

    const toggleApplePay = async () => {
        if (Platform.OS === 'android') {
            Alert.alert('Apple Pay is not supported.');
            return;
        }
        setLoading(true);
        const walletMethods = data.filter((method: any) => method.card.wallet !== null);
        const applePayMethod = walletMethods.find((method: any) => method?.card?.wallet?.type === "apple_pay");

        if (applePayMethod) {
            try {
                await changeToDefaultMethod(applePayMethod.id as string);
                setLoading(false);
                router.push('homePage/services/PlanType');
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
                                label: 'Subscription Plan',
                                amount: `${total}`,
                                paymentType: PlatformPay.PaymentType.Immediate,
                            },
                            {
                                label: 'Total',
                                amount: `${total}`,
                                paymentType: PlatformPay.PaymentType.Immediate,
                            },
                        ],
                        merchantCountryCode: 'AE',
                        currencyCode: 'AED',
                    },
                });
                if (error) {
                    setLoading(false);
                    if (error.message === "The payment has been canceled") {
                        return;
                    } else {
                        Alert.alert(error.code, error.message);
                    }
                    return;
                } else if (paymentMethod) {
                    try {
                        await addPaymentMethod(paymentMethod.id as string);
                        await changeToDefaultMethod(paymentMethod.id as string);
                        setLoading(false);
                        router.push('homePage/services/PlanType');
                    } catch (error) {
                        setLoading(false);
                        Alert.alert(errorRes(error));
                    }
                }
            };
            await createPaymentMethod();
        }

    }
    if (isPending) {
        return (
            <TouchableOpacity style={defaultStyles.footerBtn}
                disabled={true}
            >
                {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Continue</Text>}
            </TouchableOpacity>
        )
    };
    return (
        <TouchableOpacity style={defaultStyles.footerBtn}
            onPress={toggleApplePay}
        >
            {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Continue</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})