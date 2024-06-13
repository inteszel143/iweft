import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as AppleAuthentication from 'expo-apple-authentication';
import { signInWithApple } from '@/apis/socalAuth';
import * as SecureStore from 'expo-secure-store';
import SuccessLogin from '../SuccessLogin';
import ErrorPage from '../ErrorPage';
import useStoreRefresh from '@/store/useStoreRefresh';
import { getEmailChecker } from '@/apis/fetchAuth';
import errorRes from '@/apis/errorRes';
export default function AppleSigninSelect() {

    const [errorLoginModal, setErrorLoginModal] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);
    const [appleAuthAvailable, setAppleAvailable] = useState(false);

    const [exists, setExists] = useState(false);
    const setRefreshToken = useStoreRefresh(state => state.setRefreshToken);

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

            const appleEmail = await SecureStore.getItemAsync('appleEmail');

            if (appleEmail === null) {
                try {
                    const check = await getEmailChecker(credential?.email as string);
                    setExists(check?.exists);

                    const response = await signInWithApple(credential?.email, credential?.fullName?.givenName + ' ' + credential?.fullName?.familyName, credential?.identityToken);
                    await SecureStore.setItemAsync('accessToken', response?.access?.token);
                    await SecureStore.setItemAsync('appleEmail', credential?.email as string);
                    // await SecureStore.setItemAsync('refreshToken', response?.refresh?.token);

                    setRefreshToken(response?.refresh?.token);
                    setSuccessLogin(true);
                } catch (error) {
                    setErrorLoginModal(true);
                }
            } else {
                try {

                    const check = await getEmailChecker(appleEmail as string);
                    setExists(check?.exists);

                    const response = await signInWithApple(credential?.email, credential?.fullName?.givenName + ' ' + credential?.fullName?.familyName, credential?.identityToken);
                    await SecureStore.setItemAsync('accessToken', response?.access?.token);

                    // await SecureStore.setItemAsync('refreshToken', response?.refresh?.token);

                    setRefreshToken(response?.refresh?.token);
                    setSuccessLogin(true);
                } catch (error) {
                    setErrorLoginModal(true);

                }
            }
        } catch (e) {
            if (errorRes(e) === "The user canceled the authorization attempt") {
                return
            } else {
                setErrorLoginModal(true);
            }
        }
    };

    return (
        <View>
            {errorLoginModal && <ErrorPage modalVisible={errorLoginModal} setModalVisible={setErrorLoginModal} />}
            {successLogin && <SuccessLogin modalVisible={successLogin} setModalVisible={setSuccessLogin} exist={exists} />}
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