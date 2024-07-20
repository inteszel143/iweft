import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import Animated, { SlideInRight } from 'react-native-reanimated';
import { router } from 'expo-router';
export default function FloatButton() {
    return (
        <Animated.View style={styles.container}
            entering={SlideInRight.duration(300)}
        >
            <TouchableOpacity style={styles.containerInner}
                onPress={() => router.push('/chatPage/NewMessage')}
            >
                <AntDesign name='plus' size={hp(2.5)} color={'white'} />
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: hp(6),
        right: wp(6),
    },
    containerInner: {
        width: wp(17),
        height: wp(17),
        borderRadius: wp(9),
        backgroundColor: "#0A5CA8",
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    }
})