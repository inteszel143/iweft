import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PlatformPay, PlatformPayButton, usePlatformPay } from '@stripe/stripe-react-native';
import { addPayUsingCard } from '@/apis/stripe';
export default function Test() {

    const {
        isPlatformPaySupported,
        confirmPlatformPayPayment,
    } = usePlatformPay();



    const pay = async () => {
        const paymentIntent = await addPayUsingCard(50, "66541caadde7267067ccc234", null);
        console.log(paymentIntent);
        const { error } = await confirmPlatformPayPayment(
            paymentIntent,
            {
                googlePay: {
                    testEnv: true,
                    merchantName: 'My merchant name',
                    merchantCountryCode: 'US',
                    currencyCode: 'USD',
                    billingAddressConfig: {
                        format: PlatformPay.BillingAddressFormat.Full,
                        isPhoneNumberRequired: true,
                        isRequired: true,
                    },
                },
            }
        );

        if (error) {
            Alert.alert(error.code, error.message);
            // Update UI to prompt user to retry payment (and possibly another payment method)
            return;
        }
        Alert.alert('Success', 'The payment was confirmed successfully.');
    };


    return (
        <View>
            <Button title='Pay google pay'
                onPress={pay}
            />
        </View>
    )
}

const styles = StyleSheet.create({})