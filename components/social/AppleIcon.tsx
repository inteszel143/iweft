import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as AppleAuthentication from 'expo-apple-authentication';
import { signInWithApple } from '@/apis/socalAuth';
import * as SecureStore from 'expo-secure-store';
import ErrorPage from '../ErrorPage';
import SuccessLogin from '../SuccessLogin';
export default function AppleIcon() {

    const [errorLoginModal, setErrorLoginModal] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);

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
            const response = await signInWithApple(credential?.email, credential?.fullName?.givenName + ' ' + credential?.fullName?.familyName, credential?.identityToken);
            await SecureStore.setItemAsync('accessToken', response?.access?.token);
            await SecureStore.setItemAsync('refreshToken', response?.refresh?.token);
            setSuccessLogin(true);
        } catch (e) {
            setErrorLoginModal(true);
        }
    };

    return (
        <View>
            {errorLoginModal && <ErrorPage modalVisible={errorLoginModal} setModalVisible={setErrorLoginModal} />}
            {successLogin && <SuccessLogin modalVisible={successLogin} setModalVisible={setSuccessLogin} />}
            <TouchableOpacity style={styles.box} onPress={() => login()}>
                <Image source={require('@/assets/temp/authIcons/apple.png')} resizeMode='contain' style={styles.btnImage} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: wp(22),
        height: hp(7),
        borderWidth: 1,
        borderColor: "#EEEEEE",
        borderRadius: wp(4),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnImage: {
        width: wp(5),
        height: hp(5),
    },
})