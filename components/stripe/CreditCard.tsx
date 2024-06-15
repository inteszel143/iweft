import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { postPaymentIntent } from '@/apis/stripe';
import { useStripe } from '@stripe/stripe-react-native';
import { router } from 'expo-router';
export default function CreditCard() {

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
        } = await postPaymentIntent();
        const { error } = await initPaymentSheet({
            returnURL: 'https://com.paras23.iweft/exp+iweft://expo-development-client/?url=http%3A%2F%2F192.168.100.20%3A8081',
            merchantDisplayName: "iMotor Portal",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
        if (!error) {
            setLoading(true);
        }
    };
    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            // Alert.alert('Success', 'Your order is confirmed!');
            router.push('/homePage/HomeConfirmPin');
        }
    };
    useEffect(() => {
        initializePaymentSheet();
    }, []);



    return (
        <TouchableOpacity
            disabled={!loading}
            style={defaultStyles.footerBtn}
            onPress={openPaymentSheet}
        >
            <Text style={defaultStyles.footerText}>Pay Credit Card</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
})