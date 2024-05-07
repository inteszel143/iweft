import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { AccessToken, LoginManager, Settings, Profile } from 'react-native-fbsdk-next'
export default function FacebookIcon() {

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
            console.log(result);
            if (Platform.OS === "ios") {
                // This token **cannot** be used to access the Graph API.
                // https://developers.facebook.com/docs/facebook-login/limited-login/
                // const result = await AuthenticationToken.getAuthenticationTokenIOS();
                // console.log(result);
                Profile.getCurrentProfile().then(
                    function (currentProfile) {
                        if (currentProfile) {
                            console.log(currentProfile);
                        }
                    }
                );
            } else {
                // This token can be used to access the Graph API.
                const result = await AccessToken.getCurrentAccessToken();
                console.log(result);
                Profile.getCurrentProfile().then(
                    function (currentProfile) {
                        if (currentProfile) {
                            console.log(currentProfile);
                        }
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
    };




    return (
        <View>
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