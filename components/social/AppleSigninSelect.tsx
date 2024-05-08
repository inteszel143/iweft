import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication';
import { signInWithApple } from '@/apis/socalAuth';
export default function AppleSigninSelect() {


    const [appleAuthAvailable, setAppleAvailable] = useState(false);
    useEffect(() => {
        const checkAvailable = async () => {
            const isAvailable = await AppleAuthentication.isAvailableAsync();
            setAppleAvailable(isAvailable);
        }
        checkAvailable();
    }, []);


    const login = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });
            const response = await signInWithApple(credential?.email, credential?.fullName?.givenName + ' ' + credential?.fullName?.familyName);
            console.log(response);
        } catch (e) {
            if (e) {
                return;
            }
        }
    };


    return (
        <View>
            <TouchableOpacity style={styles.btnStyle} onPress={() => login()}>
                <View style={styles.btnInner}>
                    <Image source={require('@/assets/temp/authIcons/apple.png')} resizeMode='contain' style={styles.btnImage} />
                    <Text style={styles.btnText}>Continue with Apple</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        width: wp(90),
        height: hp(7.5),
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: wp(4),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(5),
        marginTop: hp(2)
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: '#212121'
    },
    btnInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    btnImage: {
        width: wp(5),
        height: hp(5),
    },
})