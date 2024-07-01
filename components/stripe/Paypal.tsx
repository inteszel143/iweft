import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { useStripe } from '@stripe/stripe-react-native';

export default function Paypal() {
    return (
        <TouchableOpacity
            style={defaultStyles.footerBtn}
            // onPress={() => Alert.alert("Paypal is not available for now. Please select other payment method ! ")}
            onPress={() => Alert.alert('Paypal is not available', 'Please select other payment method', [
                { text: 'OK' },
            ])}
        >
            <Text style={defaultStyles.footerText}>Pay Paypal</Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({})