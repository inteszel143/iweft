import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'

export default function Paypal() {
    return (
        <TouchableOpacity
            style={defaultStyles.footerBtn}
        // onPress={openPaymentSheet}
        >
            <Text style={defaultStyles.footerText}>Pay Paypal</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})