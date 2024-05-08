import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { signInWithGoogle } from '@/apis/socalAuth';
export default function GooleIcon() {

    const [error, setError] = useState<any>(null);
    const [userInfo, setUserInfo] = useState<any>();


    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            webClientId:
                "1074449350724-4551a18a1fh18ujmm28ru8ahlm7bsau2.apps.googleusercontent.com",
            androidClientId:
                "1074449350724-1uugfemegrn0sgsk9ma0fft5drb13ncf.apps.googleusercontent.com",
            iosClientId:
                "1074449350724-ftu4aip9qs5tj8p3kr3agt0cidekbpak.apps.googleusercontent.com",
        });
    };
    useEffect(() => {
        configureGoogleSignIn();
    });

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUserInfo(userInfo);
            setError(null);
            const data = await signInWithGoogle(userInfo?.user?.email, userInfo?.user?.name, userInfo?.user?.id);
            console.log(data);
        } catch (e) {
            setError(e);
        }
    };

    return (
        <View>
            <TouchableOpacity style={styles.box} onPress={signIn}>
                <Image source={require('@/assets/temp/authIcons/google.png')} resizeMode='contain' style={styles.btnImage} />
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