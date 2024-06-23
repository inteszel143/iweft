import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BallIndicator } from 'react-native-indicators'
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import Animated, { BounceIn, FadeIn } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { appOpenRefresh } from '@/apis/auth';
import { useQueryClient } from '@tanstack/react-query';
import errorRes from '@/apis/errorRes';
import ModalUpdate from '@/components/ModalUpdate';
import BookingSuccessModal from '@/components/booking/BookingSuccessModal';
export default function index() {
    const queryClient = useQueryClient();
    const [updateApp, setUpdateApp] = useState(false);

    useEffect(() => {
        // setTimeout(() => {
        //     validate();
        // }, 1000);
        validate();
    }, []);

    const validate = async () => {
        try {
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            const onboarded = await SecureStore.getItemAsync('onboarded');
            queryClient.invalidateQueries({ queryKey: ['user-data'] });
            // queryClient.invalidateQueries({ queryKey: ['default-method'] });
            if (refreshToken !== null) {
                try {
                    const response = await appOpenRefresh(refreshToken);
                    await SecureStore.setItemAsync('accessToken', response?.access?.token);
                    await SecureStore.setItemAsync('refreshToken', response?.refresh?.token);
                    router.push('/(tabs)/');

                } catch (error) {
                    console.log('Error during token refresh:', errorRes(error));
                    router.push('/authPage/LoginScreen');

                }
            } else {
                if (onboarded === null) {
                    router.push('/authPage/OnboardingScreen');
                } else {
                    router.push('/authPage/SelectLoginPage');
                }
            }
        } catch (error) {
            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('refreshToken');
            await SecureStore.deleteItemAsync('onboarded');
            router.push('/authPage/LoginScreen');

        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            {updateApp && <ModalUpdate modalVisible={updateApp} setModalVisible={setUpdateApp} />}
            <Animated.View style={styles.top} entering={BounceIn.delay(100).duration(800).springify()}>
                <Image source={require('@/assets/icons/iweft.png')} resizeMode='contain' style={{ width: wp(60) }} />
            </Animated.View>
            <Animated.View style={styles.footer} entering={FadeIn.delay(300)}>
                <BallIndicator color="#93C120" size={Platform.OS === 'ios' ? hp(4) : hp(4.5)} />
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
    },
})