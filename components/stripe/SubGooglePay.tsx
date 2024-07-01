import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { useIsFocused } from '@react-navigation/native';
import { useGetListPaymentMethod } from '@/query/stripeQuery';
import { addPaymentMethod, changeToDefaultMethod } from '@/apis/stripe';
import { router } from 'expo-router';
import errorRes from '@/apis/errorRes';
import { createPlatformPayPaymentMethod } from '@stripe/stripe-react-native';
export default function SubGooglePay() {
    const isFocused = useIsFocused();
    const { data, isPending } = useGetListPaymentMethod(isFocused);
    const [loading, setLoading] = useState(false);
    // const walletMethods = data?.filter((method: any) => method.card.wallet !== null) || [];


    const toggleGooglePay = async () => {
        if (Platform.OS === 'ios') {
            Alert.alert('Google Pay is not supported.');
            return;
        }
        setLoading(true);
        const walletMethods = data.filter((method: any) => method.card.wallet !== null);
        const googlePayMethod = walletMethods.find((method: any) => method?.card?.wallet?.type === "google_pay");

        if (googlePayMethod) {
            try {
                await changeToDefaultMethod(googlePayMethod.id as string);
                setLoading(false);
                router.push('homePage/services/PlanType');
            } catch (error) {
                setLoading(false);
                Alert.alert(errorRes(error));
            };
        } else {
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
                    setLoading(false);
                    Alert.alert(error.code, error.message);
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
    };

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
            onPress={toggleGooglePay}
        >
            {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Continue</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})