import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { getVerifyCheck } from '@/apis/fetchAuth';
import PinChecker from '@/components/auth/PinChecker';
import EmailVerification from '@/components/auth/EmailVerification';

export default function AfterLogin() {
    const { email } = useLocalSearchParams();
    const [isVerified, setIsVerified] = useState(false);
    useEffect(() => {
        const checkVerify = async () => {
            const response = await getVerifyCheck(email as string);
            if (response?.verified === false) {
                return isVerified;
            } else {
                return setIsVerified(true);
            }
        };
        checkVerify();
    }, [])

    if (isVerified) {
        return (
            <PinChecker />
        );
    } else {
        return (
            <EmailVerification />
        )
    }
};