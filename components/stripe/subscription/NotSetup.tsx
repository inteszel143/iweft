import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { useStripe } from '@stripe/stripe-react-native';
import { postCollectPayment } from '@/apis/stripe';

export default function NotSetup() {


    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const initializePaymentSheet = async () => {
        const {
            setupIntent,
            ephemeralKey,
            customer,
        } = await postCollectPayment();

        const { error } = await initPaymentSheet({
            returnURL: 'https://com.paras23.iweft/exp+iweft://expo-development-client/?url=http%3A%2F%2F192.168.100.20%3A8081',
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            setupIntentClientSecret: setupIntent,
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
            Alert.alert('Success', 'Your payment method is successfully set up for future payments!');
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);


    return (
        <TouchableOpacity style={defaultStyles.footerBtn}
            onPress={openPaymentSheet}
        >
            <Text style={defaultStyles.footerText}>Continue</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})