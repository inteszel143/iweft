import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { AccessToken, AuthenticationToken, GraphRequest, GraphRequestManager, LoginButton, LoginManager, Settings, Profile } from 'react-native-fbsdk-next'
import { signInWithFacebook } from '@/apis/socalAuth';

export default function FacebookSigninSelect() {

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
                    async function (currentProfile) {
                        if (currentProfile) {
                            const data = await signInWithFacebook(currentProfile?.email, currentProfile?.name, currentProfile?.userID);
                            // console.log(currentProfile?.email, currentProfile?.name, currentProfile?.userID);
                            console.log(data);
                        }
                    }
                );
            } else {
                // This token can be used to access the Graph API.
                const result = await AccessToken.getCurrentAccessToken();
                console.log(result);
                Profile.getCurrentProfile().then(
                    async function (currentProfile) {
                        if (currentProfile) {
                            const data = await signInWithFacebook(currentProfile?.email, currentProfile?.name, currentProfile?.userID);
                            // console.log(currentProfile?.email, currentProfile?.name, currentProfile?.userID);
                            console.log(data);
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
            <TouchableOpacity style={styles.btnStyle} onPress={login}>
                <View style={styles.btnInner}>
                    <Image source={require('@/assets/temp/authIcons/fb.png')} resizeMode='contain' style={styles.btnImage} />
                    <Text style={styles.btnText}>Continue with Facebook</Text>
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