import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
export default function CreditCard() {
    const [loading, setLoading] = useState(false);
    // const { initPaymentSheet, presentPaymentSheet } = useStripe();
    // const [loading, setLoading] = useState(false);

    // const initializePaymentSheet = async () => {
    //     const {
    //         paymentIntent,
    //         ephemeralKey,
    //         customer,
    //     } = await postPaymentIntent();
    //     const { error } = await initPaymentSheet({
    //         returnURL: 'https://com.paras23.iweft/exp+iweft://expo-development-client/?url=http%3A%2F%2F192.168.100.20%3A8081',
    //         merchantDisplayName: "iMotor Portal",
    //         customerId: customer,
    //         customerEphemeralKeySecret: ephemeralKey,
    //         paymentIntentClientSecret: paymentIntent,
    //         // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
    //         //methods that complete payment after a delay, like SEPA Debit and Sofort.
    //         allowsDelayedPaymentMethods: true,
    //         defaultBillingDetails: {
    //             name: 'Jane Doe',
    //         }
    //     });
    //     if (!error) {
    //         setLoading(true);
    //     }
    // };
    // const openPaymentSheet = async () => {
    //     const { error } = await presentPaymentSheet();

    //     if (error) {
    //         Alert.alert(`Error code: ${error.code}`, error.message);
    //     } else {
    //         // Alert.alert('Success', 'Your order is confirmed!');
    //         router.push('/homePage/HomeConfirmPin');
    //     }
    // };
    // useEffect(() => {
    //     initializePaymentSheet();
    // }, []);
    const openPaymentSheet = async () => {
        setLoading(true);
        try {
            setTimeout(() => {
                router.push('/homePage/HomeConfirmPin');
                setLoading(false);
            }, 1000)
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <TouchableOpacity
            disabled={loading ? true : false}
            style={defaultStyles.footerBtn}
            onPress={openPaymentSheet}
        >
            {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Confirm Payment</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
})