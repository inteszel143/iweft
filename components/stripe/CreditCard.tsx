import { ActivityIndicator, Alert, Button, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { router } from 'expo-router';
import { useStripe } from '@stripe/stripe-react-native';
import { postCollectPayment } from '@/apis/stripe';
interface State {
    method: string;
}

export default function CreditCard({ method }: State) {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [setupLoading, setSetupLoading] = useState(false);

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


    const openSetupPaymentSheet = async () => {
        setSetupLoading(true);
        const { error } = await presentPaymentSheet();

        if (error) {
            // Alert.alert(`Error code: ${error.code}`, error.message);
            setSetupLoading(false);
            return;
        } else {
            // Alert.alert('Success', 'Your payment method is successfully set up for future payments!');
            setTimeout(() => {
                router.push('/homePage/HomeConfirmPin');
                setSetupLoading(false);
            }, 1000)
        }
    };


    useEffect(() => {
        initializePaymentSheet();
    }, []);

    const openPaymentSheet = async () => {
        setSetupLoading(true);
        try {
            setTimeout(() => {
                router.push('/homePage/HomeConfirmPin');
                setSetupLoading(false);
            }, 1000)
        } catch (error) {
            setSetupLoading(false);
        }
    };

    if (method === "Credit Card") {
        return (
            <TouchableOpacity
                disabled={!loading}
                style={defaultStyles.footerBtn}
                onPress={openSetupPaymentSheet}
            >
                {setupLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Confirm Payment</Text>}
            </TouchableOpacity>
        )

    }

    return (
        <TouchableOpacity
            disabled={setupLoading ? true : false}
            style={defaultStyles.footerBtn}
            onPress={openPaymentSheet}
        >
            {setupLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Confirm Payment</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
})