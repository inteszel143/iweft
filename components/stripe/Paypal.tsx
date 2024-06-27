import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { useStripe } from '@stripe/stripe-react-native';

export default function Paypal() {

    const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState<string | null>(null);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    useEffect(() => {
        startCheckout();
    }, []);

    const setupIntentClientSecret = 'pi_3PWDgmHEVoHd2ycx1q1MJzdy_secret_1O02JWki0cuh0A7AWvHSQeBJI';
    const startCheckout = async () => {
        try {
            const { error } = await initPaymentSheet({
                setupIntentClientSecret,
            });

            if (error) {
                Alert.alert('Error', error.message);
            }
        } catch (error) {
            console.error('Error fetching payment intent:', error);
        }
    };


    const handlePayment = async () => {
        if (!paymentIntentClientSecret) {
            Alert.alert('Error', 'PaymentIntentClientSecret is not set');
            return;
        }

        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            Alert.alert('Success', 'Your payment was successful!');
        }
    };




    return (
        <TouchableOpacity
            style={defaultStyles.footerBtn}
            onPress={handlePayment}
        >
            <Text style={defaultStyles.footerText}>Pay Paypal</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})