import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { useDefaultMethod } from '@/query/stripeQuery';
import { useStripe } from '@stripe/stripe-react-native';
import { defaultStyles } from '@/constants/Styles';
import { postCollectPayment } from '@/apis/stripe';
import { router } from 'expo-router';

export default function SubCreditCardPrior() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();
    const { data } = useDefaultMethod(isFocused);


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
            // Alert.alert(`Error code: ${error.code}`, error.message);
            return;
        } else {
            // Alert.alert('Success', 'Your payment method is successfully set up for future payments!');
            router.push('homePage/item/PriorPlanType');
        }
    };
    useEffect(() => {
        initializePaymentSheet();
    }, []);


    const alreadySetupPaymentSheet = async () => {
        router.push('homePage/item/PriorPlanType');
    }


    if (!data || data == 0) {
        return (
            <TouchableOpacity style={defaultStyles.footerBtn}
                onPress={openPaymentSheet}
            >
                <Text style={defaultStyles.footerText}>Continue</Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={defaultStyles.footerBtn}
                onPress={alreadySetupPaymentSheet}
            >
                <Text style={defaultStyles.footerText}>Continue</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({})