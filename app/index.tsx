import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BallIndicator } from 'react-native-indicators'
import { router } from 'expo-router';
import Animated, { BounceIn, FadeIn } from 'react-native-reanimated';
export default function index() {

    useEffect(() => {
        setTimeout(() => {
            router.push('/authPage/OnboardingScreen');
        }, 2000)
    }, []);


    return (
        <View style={styles.container}>
            <Animated.View style={styles.top} entering={BounceIn.delay(100).duration(800).springify()}>
                <Image source={require('@/assets/icons/iweft.png')} resizeMode='contain' style={{ width: wp(60) }} />
            </Animated.View>
            <Animated.View style={styles.footer} entering={FadeIn.delay(300)}>
                <BallIndicator color="#93C120" size={hp(4)} />
            </Animated.View>
        </View >
    )
}

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