import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { useStripe } from '@stripe/stripe-react-native';
import { router } from 'expo-router';
import { postPaymentIntent } from '@/apis/stripe';

export default function Setup() {

    const openPaymentSheet = async () => {
        router.push('homePage/services/PlanType');
    }

    return (
        <TouchableOpacity style={defaultStyles.footerBtn}
            onPress={openPaymentSheet}
        >
            <Text style={defaultStyles.footerText}>Continue</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})