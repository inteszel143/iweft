import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
export default function GooglePay() {
    return (
        <TouchableOpacity
            style={defaultStyles.footerBtn}
        // onPress={openPaymentSheet}
        >
            <Text style={defaultStyles.footerText}>Pay GooglePay</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})