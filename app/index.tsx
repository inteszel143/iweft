import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BallIndicator } from 'react-native-indicators'
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import Animated, { BounceIn, FadeIn } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { appOpenRefresh } from '@/apis/auth';
import { useQueryClient } from '@tanstack/react-query';
import errorRes from '@/apis/errorRes';
export default function index() {
    const queryClient = useQueryClient();
    useEffect(() => {
        setTimeout(() => {
            validate();
        }, 1000);
    }, []);

    const validate = async () => {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        const onboarded = await SecureStore.getItemAsync('onboarded');
        queryClient.invalidateQueries({ queryKey: ['user-data'] });
        if (refreshToken !== null) {
            try {
                const response = await appOpenRefresh(refreshToken);
                await SecureStore.setItemAsync('accessToken', response?.access?.token);
                await SecureStore.setItemAsync('refreshToken', response?.refresh?.token);
                router.push('/(tabs)/');
            } catch (error) {
                console.log(errorRes(error));
                router.push('/authPage/LoginScreen');
            }
        } else {
            if (onboarded === null) {
                router.push('/authPage/SelectLoginPage');
            } else {
                router.push('/authPage/OnboardingScreen');
            }
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <Animated.View style={styles.top} entering={BounceIn.delay(100).duration(800).springify()}>
                <Image source={require('@/assets/icons/iweft.png')} resizeMode='contain' style={{ width: wp(60) }} />
            </Animated.View>
            <Animated.View style={styles.footer} entering={FadeIn.delay(300)}>
                <BallIndicator color="#93C120" size={hp(4)} />
            </Animated.View>
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    top: {
        marginTop: hp(20)
    },
    footer: {
        position: 'absolute',
        bottom: hp(15),
        alignItems: 'center'
    }
})