import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { PlatformPay, PlatformPayButton, confirmPlatformPayPayment, createPlatformPayPaymentMethod, isPlatformPaySupported } from '@stripe/stripe-react-native';
export default function ApplePay() {
    const [isApplePaySupported, setIsApplePaySupported] = useState(false);
    useEffect(() => {
        (async function () {
            setIsApplePaySupported(await isPlatformPaySupported());
        })();
    }, [isPlatformPaySupported]);

    const createPaymentMethod = async () => {
        const { error, paymentMethod } = await createPlatformPayPaymentMethod({
            applePay: {
                cartItems: [
                    {
                        label: 'Example item name',
                        amount: '14.00',
                        paymentType: PlatformPay.PaymentType.Immediate,
                    },
                    {
                        label: 'Total',
                        amount: '12.75',
                        paymentType: PlatformPay.PaymentType.Immediate,
                    },
                ],
                merchantCountryCode: 'US',
                currencyCode: 'USD',
            },
        });

        if (error) {
            Alert.alert(error.code, error.message);
            return;
        } else if (paymentMethod) {
            Alert.alert(
                'Success',
                `The payment method was created successfully. paymentMethodId: ${paymentMethod.id}`
            );
        }
    };



    return (
        <TouchableOpacity
            style={defaultStyles.footerBtn}
            onPress={createPaymentMethod}
        >
            <Text style={defaultStyles.footerText}>Pay ApplePay</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({})