import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'

export default function SubPaypalPrior() {
    return (
        <TouchableOpacity style={defaultStyles.footerBtn}
            onPress={() => Alert.alert('Paypal is not available', 'Please select other payment method', [
                { text: 'OK' },
            ])}
        >
            <Text style={defaultStyles.footerText}>Continue</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})