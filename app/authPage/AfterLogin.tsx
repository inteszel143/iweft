import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import PinChecker from '@/components/auth/PinChecker';
import EmailVerification from '@/components/auth/EmailVerification';

export default function AfterLogin() {
    const { email, verified, accessToken, refreshToken } = useLocalSearchParams();
    if (verified === "false") {
        return (
            <EmailVerification />
        );
    } else {
        return (
            <PinChecker />
        );
    }
};