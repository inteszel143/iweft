import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { addPayUsingCard } from '@/apis/stripe';
import useStoreSub from '@/store/useStoreSub';
import useStoreBooking from '@/store/useStoreBooking';
import { createBooking } from '@/apis/order';
import { PlatformPay, PlatformPayButton, confirmPlatformPayPayment, isPlatformPaySupported } from '@stripe/stripe-react-native';
import errorRes from '@/apis/errorRes';
export default function GooglePay() {
    const [btnLoading, setBtnLoading] = useState(false);

    React.useEffect(() => {
        (async function () {
            if (!(await isPlatformPaySupported({ googlePay: { testEnv: true } }))) {
                Alert.alert('Google Pay is not supported.');
                return;
            }
        })();
    }, []);


    const pay = async () => {
        setBtnLoading(true);
        const clientSecret = "pi_3PWDgmHEVoHd2ycx1q1MJzdy_secret_1O02JWki0cuh0A7AWvHSQeBJI";
        const { error } = await confirmPlatformPayPayment(
            clientSecret,
            {
                googlePay: {
                    testEnv: true,
                    merchantName: 'My merchant name',
                    merchantCountryCode: 'US',
                    currencyCode: 'USD',
                    // billingAddressConfig: {
                    //     format: PlatformPay.BillingAddressFormat.Full,
                    //     isPhoneNumberRequired: true,
                    //     isRequired: true,
                    // },
                },
            }
        );

        if (error) {
            setBtnLoading(false);
            Alert.alert(error.code, error.message);
            // Update UI to prompt user to retry payment (and possibly another payment method)
            return;
        }
        setBtnLoading(false);
        Alert.alert('Success', 'The payment was confirmed successfully.');
    };

    return (
        <TouchableOpacity
            style={defaultStyles.footerBtn}
            onPress={pay}
        >
            {btnLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Pay GooglePay</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})