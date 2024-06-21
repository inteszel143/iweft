import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import { useIsFocused } from '@react-navigation/native';
import { useDefaultMethod } from '@/query/stripeQuery';
import NotSetup from './subscription/NotSetup';
import Setup from './subscription/Setup';

export default function SubCreditCard() {
    const isFocused = useIsFocused();
    const { data } = useDefaultMethod(isFocused);
    if (!data || data == 0) {
        return <NotSetup />
    } else {
        return <Setup />
    }
}

const styles = StyleSheet.create({})