import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'

export default function SubApplePay() {
    return (
        <TouchableOpacity style={defaultStyles.footerBtn}>
            <Text style={defaultStyles.footerText}>SubApplePay</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})