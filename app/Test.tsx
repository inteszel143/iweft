import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Linking } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { postPaymentIntent } from '@/apis/stripe';
export default function Test() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    // const { handleURLCallback } = useStripe();


    // const handleDeepLink = useCallback(
    //     async (url: string | null) => {
    //         if (url) {
    //             const stripeHandled = await handleURLCallback(url);
    //             if (stripeHandled) {
    //                 // This was a Stripe URL - log success or handle accordingly
    //                 console.log('Stripe handled the URL successfully:', url);
    //                 Alert.alert('Stripe URL Handled', 'Stripe has handled the URL successfully.');
    //             } else {
    //                 // This was NOT a Stripe URL - handle as you normally would
    //                 console.log('Non-Stripe URL detected:', url);
    //                 Alert.alert('Non-Stripe URL', 'This URL is not handled by Stripe.');
    //                 // Additional handling for non-Stripe URLs
    //                 // For example, you might want to navigate to a specific screen
    //                 if (url.startsWith('https://yourapp.com/some-path')) {
    //                     // navigate to a specific screen or perform a custom action
    //                 }
    //             }
    //         }
    //     },
    //     [handleURLCallback]
    // );
    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            // publishableKey,
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
            Alert.alert('Success', 'Your order is confirmed!');
        }
    };
    useEffect(() => {
        initializePaymentSheet();
    }, []);

    // useEffect(() => {
    //     const getUrlAsync = async () => {
    //         const initialUrl = await Linking.getInitialURL();
    //         handleDeepLink(initialUrl);
    //     };

    //     getUrlAsync();

    //     const deepLinkListener = Linking.addEventListener(
    //         'url',
    //         (event: { url: string }) => {
    //             handleDeepLink(event.url);
    //         }
    //     );

    //     return () => deepLinkListener.remove();
    // }, [handleDeepLink]);


    return (
        <View style={styles.container}>
            <Button
                disabled={!loading}
                title="Checkout"
                onPress={openPaymentSheet}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    counter: {
        fontSize: 48,
        marginBottom: 20,
    },
    label: {
        marginTop: 20,
        fontSize: 18,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: 200,
        marginVertical: 10,
    },
    userInfo: {
        marginTop: 20,
        fontSize: 20,
    },
});