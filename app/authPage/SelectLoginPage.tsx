import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import AppleSigninSelect from '@/components/social/AppleSigninSelect';
import GoogleSigninSelect from '@/components/social/GoogleSigninSelect';
import FacebookSigninSelect from '@/components/social/FacebookSigninSelect';
export default function SelectLoginPage() {
    return (
        <View style={styles.container}>
            <View style={styles.topImage}>
                <Image source={require('@/assets/temp/authIcons/topLogin.jpg')} resizeMode='contain' style={{ width: wp(80), height: hp(36) }} />
            </View>

            <View style={styles.midStyle}>
                <FacebookSigninSelect />
                <GoogleSigninSelect />
                <AppleSigninSelect />
            </View>

            <View style={styles.orStyle}>
                <View style={styles.separator} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.separator} />
            </View>



            <View style={styles.footer}>
                <Link href={'/authPage/LoginScreen'} asChild>
                    <TouchableOpacity style={defaultStyles.footerBtn}>
                        <Text style={styles.footerText}>Sign in with password</Text>
                    </TouchableOpacity>
                </Link>
                <View style={styles.footerInner}>
                    <Text style={styles.innerText}>Don’t have an account?</Text>
                    <Link href={'/authPage/RegisterScreen'} asChild>
                        <TouchableOpacity>
                            <Text style={styles.signUpText}>Sign up</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    topImage: {
        paddingTop: hp(8),
        alignItems: 'center'
    },
    midStyle: {
        alignItems: 'center',
    },
    textTitle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(3),
    },
    btnInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
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
    btnImage: {
        width: wp(5),
        height: hp(5),
    },
    orStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        alignSelf: 'center',
        marginTop: Platform.OS === 'ios' ? hp(4) : hp(6)
    },
    orText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
        color: '#616161'
    },
    separator: {
        width: wp(36),
        height: 1,
        backgroundColor: '#EEEEEE'
    },



    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(17),
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    footerBtn: {
        width: wp(88),
        height: hp(7),
        borderRadius: wp(10),
        backgroundColor: '#0A5CA8',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: "#FFFFFF"
    },
    footerInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2),
        marginTop: hp(2)
    },
    innerText: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.8),
        color: '#9E9E9E',
    },
    signUpText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
        color: '#0A5CA8'
    }
})