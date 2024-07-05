import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { AccessToken, AuthenticationToken, GraphRequest, GraphRequestManager, LoginButton, LoginManager, Settings, Profile } from 'react-native-fbsdk-next'
import { signInWithFacebook } from '@/apis/socalAuth';
import ErrorFacebookAuthModal from '../ErrorFacebookAuthModal';
import * as SecureStore from 'expo-secure-store';
import SuccessLogin from '../SuccessLogin';
import { getEmailChecker } from '@/apis/fetchAuth';
import useStoreRefresh from '@/store/useStoreRefresh';
import { useTranslation } from 'react-i18next';
export default function FacebookSigninSelect() {
    const [exists, setExists] = useState(false);
    const [errorLoginModal, setErrorLoginModal] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);
    const setRefreshToken = useStoreRefresh(state => state.setRefreshToken);
    const { t } = useTranslation();

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


                                    const response = await signInWithFacebook(currentProfile?.email, currentProfile?.name, currentProfile?.userID);
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
                                    const response = await signInWithFacebook(currentProfile?.email, currentProfile?.name, currentProfile?.userID);
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
            <TouchableOpacity style={styles.btnStyle} onPress={login}>
                <View style={styles.btnInner}>
                    <Image source={require('@/assets/temp/authIcons/fb.png')} resizeMode='contain' style={styles.btnImage} />
                    <Text style={styles.btnText}>{t('Continue with Facebook')}</Text>
                </View>
            </TouchableOpacity>
            {/* <LoginButton onLogoutFinished={() => console.log("Loggout")} onLoginFinished={(error, data) => {
                console.log(error || data);
                AccessToken.getCurrentAccessToken().then((data) => console.log(data));
                const infoReuest = new GraphRequest("/me", null, (error, result) => {
                    console.log(error || result)
                });
                new GraphRequestManager().addRequest(infoReuest).start();
            }}
            /> */}
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