import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { signInWithGoogle } from '@/apis/socalAuth';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import errorRes from '@/apis/errorRes';
import ErrorFacebookAuthModal from '../ErrorFacebookAuthModal';
import SuccessLogin from '../SuccessLogin';
import { getEmailChecker } from '@/apis/fetchAuth';
import useStoreRefresh from '@/store/useStoreRefresh';
import { useTranslation } from 'react-i18next';
import { usePushNotifications } from '@/usePushNotification';
export default function GooleIcon() {
    const { t } = useTranslation();
    const [exists, setExists] = useState(false);
    const [errorLoginModal, setErrorLoginModal] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);
    const setRefreshToken = useStoreRefresh(state => state.setRefreshToken);
    const { expoPushToken } = usePushNotifications();
    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            webClientId:
                "237084984780-3ea73mo0lin71riud43opsddgstkgckc.apps.googleusercontent.com",
            androidClientId:
                "237084984780-01ij1gfg9p4teptjt91fr46di35q3da3.apps.googleusercontent.com",
            iosClientId:
                "237084984780-oj2g0uh2v47fsh0a20fp01le3c8kslek.apps.googleusercontent.com",
        });
    };
    useEffect(() => {
        configureGoogleSignIn();
    });


    const signIn = async () => {
        GoogleSignin.signOut();
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            const check = await getEmailChecker(userInfo?.user?.email as string);
            setExists(check?.exists);

            const response = await signInWithGoogle(userInfo?.user?.email, userInfo?.user?.name, userInfo?.user?.id, expoPushToken?.data);
            await SecureStore.setItemAsync('accessToken', response?.access?.token);

            setRefreshToken(response?.refresh?.token);
            setSuccessLogin(true);
        } catch (e) {
            if (errorRes(e) === "The email you provided is already taken.") {
                setErrorLoginModal(true);
            } else {
                return;
            }
        }
    };

    return (
        <View>
            {errorLoginModal && <ErrorFacebookAuthModal modalVisible={errorLoginModal} setModalVisible={setErrorLoginModal} />}
            {successLogin && <SuccessLogin modalVisible={successLogin} setModalVisible={setSuccessLogin} exist={exists} />}
            <TouchableOpacity style={styles.box} onPress={signIn}>
                <View style={styles.logoContinue}>
                    <Image source={require('@/assets/temp/authIcons/google.png')} resizeMode='contain' style={styles.btnImage} />
                </View>
                <Text style={styles.btnText}>{t('Continue with Google')}</Text>
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
        marginTop: hp(2),
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