import { BackHandler, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import CreatePinSocial from '@/components/auth/CreatePinSocial'
import { useLocalSearchParams } from 'expo-router';
import PinChecker from '@/components/auth/PinChecker';
import PinCheckerSocial from '@/components/auth/PinCheckerSocial';

export default function AfterSocialLogin() {
    const { exist } = useLocalSearchParams();
    useEffect(() => {
        const backAction = () => {
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);


    if (exist === 'true') {
        return <PinCheckerSocial />
    } else {
        return <CreatePinSocial />
    }

};
