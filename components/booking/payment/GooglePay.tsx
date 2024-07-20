import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createPlatformPayPaymentMethod } from '@stripe/stripe-react-native';
import { addPaymentMethod, changeToDefaultMethod } from '@/apis/stripe';
import { router } from 'expo-router';
import errorRes from '@/apis/errorRes';
interface state {
    bookingId: any,
    total: any
}

export default function GooglePay({ bookingId, total }: state) {
    const { t } = useTranslation();
    const current = getCurrentLanguage();
    const [loading, setLoading] = useState(false);

    const toogleGooglePay = async () => {
        if (Platform.OS === 'ios') {
            Alert.alert('Google Pay is not supported.');
            return;
        }

        const createPaymentMethod = async () => {
            const { error, paymentMethod } = await createPlatformPayPaymentMethod({
                googlePay: {
                    amount: total * .80,
                    currencyCode: "AED",
                    testEnv: true,
                    merchantName: 'Iweft',
                    merchantCountryCode: 'AE',
                },
            });
            if (error) {
                setLoading(false);
                if (error.message === "The payment has been canceled") {
                    return;
                } else {
                    Alert.alert(error.code, error.message);
                }
            } else if (paymentMethod) {
                try {
                    await addPaymentMethod(paymentMethod.id as string);
                    await changeToDefaultMethod(paymentMethod.id as string);
                    setLoading(false);
                    router.push({
                        pathname: '/bookingPage/BookingPin',
                        params: { bookingId }
                    })
                } catch (error) {
                    setLoading(false);
                    Alert.alert(errorRes(error));
                }
            }
        };
        await createPaymentMethod();
    }


    return (
        <TouchableOpacity
            style={[defaultStyles.footerBtn, { marginTop: hp(2) }]}
            onPress={toogleGooglePay}
        >
            <Text style={defaultStyles.footerText}>{t('Continue')}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})