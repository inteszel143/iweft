import {
    ImageURISource,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import React, { useCallback } from 'react';
import Animated, {
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { t } from 'i18next';
import useValidateRefresh from '@/store/useValidateRefresh';
type Props = {
    currentIndex: Animated.SharedValue<number>;
    length: number;
    flatListRef: any;
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({ currentIndex, length, flatListRef }: Props) => {

    const { setRefreshToken } = useValidateRefresh();

    const rnBtnStyle = useAnimatedStyle(() => {
        return {
            width:
                currentIndex.value === length - 1 ? withSpring(140) : withSpring(60),
        };
    }, [currentIndex, length]);

    const rnTextStyle = useAnimatedStyle(() => {
        return {
            opacity:
                currentIndex.value === length - 1 ? withTiming(1) : withTiming(0),
            transform: [
                {
                    translateX:
                        currentIndex.value === length - 1 ? withTiming(0) : withTiming(100),
                },
            ],
        };
    }, [currentIndex, length]);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity:
                currentIndex.value !== length - 1 ? withTiming(1) : withTiming(0),
            transform: [
                {
                    translateX:
                        currentIndex.value !== length - 1 ? withTiming(0) : withTiming(100),
                },
            ],
        };
    }, [currentIndex, length]);

    const onPress = useCallback(async () => {
        if (currentIndex.value === length - 1) {
            router.push('/authPage/SelectLoginPage');
            setRefreshToken(null);
            // router.push('/(tabs)/');
            await SecureStore.setItemAsync("onboarded", "1");
            return;
        } else {
            flatListRef?.current?.scrollToIndex({
                index: currentIndex.value + 1,
            });
        }
    }, []);
    return (
        <AnimatedPressable style={[styles.btnStyle]} onPress={onPress}>
            <Animated.Text style={[styles.textStyle, rnTextStyle]}>
                {t('Get Started')}</Animated.Text>
            <Animated.Text style={[styles.textStyle, imageAnimatedStyle]}>
                {t('Next')}</Animated.Text>
        </AnimatedPressable>
    );
};

export default Button;

const styles = StyleSheet.create({

    btnStyle: {
        height: hp(7),
        width: wp(89),
        backgroundColor: '#0A5CA8',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: wp(10),
        marginTop: hp(8),
        marginBottom: hp(2),
        shadowColor: "#0A5CA8",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    textStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
        color: '#FFFFFF',
        position: 'absolute'
    },
});