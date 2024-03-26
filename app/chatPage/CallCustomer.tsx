import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';

export default function CallCustomer() {

    const animation = useRef(null);
    const [onCloseCall, setOnCloseCall] = useState(true);

    const toggleCloseCall = () => {
        setOnCloseCall(false);
        setTimeout(() => {
            setOnCloseCall(true);
            router.back();
        }, 2000)
    }

    return (
        <View style={styles.container}>

            <View style={styles.topStyle} >
                <LottieView
                    ref={animation}
                    autoPlay
                    style={styles.lottieStyle}
                    source={require('@/assets/animate/callanimate.json')}
                />

                <View style={styles.topImage}>
                    <Image source={require('@/assets/temp/chaticons/profilecall.jpg')} resizeMode='contain' style={{ width: wp(45), height: hp(30) }} />
                </View>
            </View>



            <View style={styles.middleStyle}>
                <Text style={styles.middleText}>Adam Wilson</Text>
                {
                    onCloseCall ? <Text style={[styles.middleTextTime, { color: "#424242" }]}>Calling...</Text> : <Text style={[styles.middleTextTime, { color: "red" }]}>Call ended</Text>
                }

            </View>



            <View style={styles.footer}>
                <View style={styles.footerInner}>
                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: '#EA1E61' }]}
                        onPress={toggleCloseCall}
                    >
                        <MaterialCommunityIcons name='close-box' size={hp(3.5)} color={'#FFFFFF'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: '#93C120' }]}>
                        <FontAwesome5 name='video-slash' size={hp(2.6)} color={'#FFFFFF'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: '#0A5CA8' }]}>
                        <MaterialCommunityIcons name='volume-high' size={hp(3.5)} color={'#FFFFFF'} />
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    topImage: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? hp(20) : hp(19),
        left: wp(28),
        width: wp(44),
        height: wp(44),
        overflow: 'hidden',
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(25),
    },
    lottieStyle: {
        width: wp(100),
        height: hp(50),
    },
    topStyle: {
        width: wp(100),
        height: hp(60),
        justifyContent: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(20),
        alignItems: 'center'
    },
    footerInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(6),
    },
    btnStyle: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },

    middleStyle: {
        alignItems: 'center',
    },
    middleText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(3)
    },
    middleTextTime: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2),
        marginTop: hp(2),
    }
})