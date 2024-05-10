import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { AccessToken, LoginManager, Settings, Profile } from 'react-native-fbsdk-next'
import { signInWithFacebook } from '@/apis/socalAuth';
import ErrorFacebookAuthModal from '../ErrorFacebookAuthModal';
import * as SecureStore from 'expo-secure-store';
export default function FacebookIcon() {
    const [errorLoginModal, setErrorLoginModal] = useState(false);
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
            if (Platform.OS === "ios") {
                // This token **cannot** be used to access the Graph API.
                // https://developers.facebook.com/docs/facebook-login/limited-login/
                // const result = await AuthenticationToken.getAuthenticationTokenIOS();
                Profile.getCurrentProfile().then(
                    async function (currentProfile) {
                        if (currentProfile) {
                            try {
                                const response = await signInWithFacebook(currentProfile?.email, currentProfile?.name, currentProfile?.userID);
                                await SecureStore.setItemAsync('accessToken', response?.access?.token);
                                await SecureStore.setItemAsync('refreshToken', response?.refresh?.token);
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
                                const data = await signInWithFacebook(currentProfile?.email, currentProfile?.name, currentProfile?.userID);
                                console.log(data);
                            } catch (error) {
                                setErrorLoginModal(true);
                            }
                        }
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            {errorLoginModal && <ErrorFacebookAuthModal modalVisible={errorLoginModal} setModalVisible={setErrorLoginModal} />}
            <TouchableOpacity style={styles.box} onPress={login}>
                <Image source={require('@/assets/temp/authIcons/fb.png')} resizeMode='contain' style={styles.btnImage} />
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