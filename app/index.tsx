import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BallIndicator } from 'react-native-indicators'
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import Animated, { BounceIn, FadeIn } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
export default function index() {

    useEffect(() => {
        setTimeout(() => {
            validate();
        }, 2500);
    }, []);

    const validate = async () => {
        const onboarded = await SecureStore.getItemAsync('onboarded');
        if (onboarded === "1") {
            router.push('/authPage/SelectLoginPage');
        } else {
            router.push('/authPage/OnboardingScreen');
        }
    };


    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <Animated.View style={styles.top} entering={BounceIn.delay(100).duration(800).springify()}>
                <Image source={require('@/assets/icons/iweft.png')} resizeMode='contain' style={{ width: wp(65) }} />
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