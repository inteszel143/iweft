import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { AccessToken, LoginManager, Settings, Profile } from 'react-native-fbsdk-next'
import { signInWithFacebook } from '@/apis/socalAuth';
import ErrorFacebookAuthModal from '../ErrorFacebookAuthModal';
import * as SecureStore from 'expo-secure-store';
import { getEmailChecker } from '@/apis/fetchAuth';
import useStoreRefresh from '@/store/useStoreRefresh';
import SuccessLogin from '../SuccessLogin';
import { useTranslation } from 'react-i18next';
import { usePushNotifications } from '@/usePushNotification';
export default function FacebookIcon() {
    const { t } = useTranslation();
    const [errorLoginModal, setErrorLoginModal] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);
    const [exists, setExists] = useState(false);
    const { expoPushToken } = usePushNotifications();
    const setRefreshToken = useStoreRefresh(state => state.setRefreshToken);
    useEffect(() => {
        const requestTracking = async () => {
            const { status } = await requestTrackingPermissionsAsync();
            Settings.initializeSDK();

            if (status === "granted") {
                await Settings.setAdvertiserTrackingEnabled(true);
            }
        };
        requestTracking();
    }, []);


    const login = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(
                [
                    "public_profile",
                    "email",
                ],
                "limited",
                "my_nonce", // Optional
            );
            if (result?.isCancelled) {
                return;
            } else {
                if (Platform.OS === "ios") {
                    // This token **cannot** be used to access the Graph API.
                    // https://developers.facebook.com/docs/facebook-login/limited-login/
                    // const result = await AuthenticationToken.getAuthenticationTokenIOS();
                    Profile.getCurrentProfile().then(
                        async function (currentProfile) {
                            if (currentProfile) {
                                try {

                                    const check = await getEmailChecker(currentProfile?.email as string);
                                    setExists(check?.exists);


                                    const response = await signInWithFacebook(currentProfile?.email, currentProfile?.name, currentProfile?.userID, expoPushToken?.data);
                                    await SecureStore.setItemAsync('accessToken', response?.access?.token);
                                    // await SecureStore.setItemAsync('refreshToken', response?.refresh?.token);
                                    setRefreshToken(response?.refresh?.token);
                                    setSuccessLogin(true);
                                } catch (error) {
                                    setErrorLoginModal(true);
                                }
                            }
                        }
                    );
                } else {
                    const result = await AccessToken.getCurrentAccessToken();
                    console.log(result);
                    Profile.getCurrentProfile().then(
                        async function (currentProfile) {
                            if (currentProfile) {
                                try {
                                    const response = await signInWithFacebook(currentProfile?.email, currentProfile?.name, currentProfile?.userID, expoPushToken?.data);
                                    await SecureStore.setItemAsync('accessToken', response?.access?.token);
                                    await SecureStore.setItemAsync('refreshToken', response?.refresh?.token);
                                    setSuccessLogin(true);
                                    // setTimeout(() => {
                                    //     router.push('/(tabs)/');
                                    // }, 2000)
                                } catch (error) {
                                    setErrorLoginModal(true);
                                }
                            }
                        }
                    );
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View>
            {errorLoginModal && <ErrorFacebookAuthModal modalVisible={errorLoginModal} setModalVisible={setErrorLoginModal} />}
            {successLogin && <SuccessLogin modalVisible={successLogin} setModalVisible={setSuccessLogin} exist={exists} />}
            <TouchableOpacity style={styles.box} onPress={login}>
                <View style={styles.logoContinue}>
                    <Image source={require('@/assets/temp/authIcons/fb.png')} resizeMode='contain' style={styles.btnImage} />
                </View>
                <Text style={styles.btnText}>{t('Continue with Facebook')}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: wp(88),
        height: hp(7),
        borderWidth: 0.5,
        borderColor: "#EEEEEE",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(3),
        backgroundColor: "white",
        marginTop: hp(1),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    btnImage: {
        width: wp(5),
        height: hp(5),
    },
    logoContinue: {
        position: 'absolute',
        left: wp(12),
    },
    btnText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8),
        // color: 'white'
    },
})