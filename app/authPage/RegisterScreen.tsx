import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';

export default function RegisterScreen() {
    const [emailF, setEmailF] = useState(false);
    const [passwordF, setPasswordF] = useState(false);
    const [check, setCheck] = useState(false);
    const toggleCheck = () => {
        setCheck(!check);
    }
    return (
        <View style={styles.container}>

            <View style={styles.headerBack}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name='arrowleft' size={hp(3)} />
                </TouchableOpacity>
            </View>

            <View style={styles.containerStyle}>
                <Text style={styles.textStyle}>Create your Account</Text>

                <View style={[styles.textField, { backgroundColor: emailF ? '#0A5CA826' : '#FAFAFA', borderColor: emailF ? '#0A5CA8' : '#FAFAFA' }]} >
                    <View style={styles.innerField}>
                        <Ionicons name='mail' size={hp(2.5)} color={emailF ? '#0A5CA8' : '#9E9E9E'} />
                        <TextInput placeholder='Email' placeholderTextColor={'#d3d3d3'} style={styles.textInputStyle} onFocus={() => setEmailF(true)} onBlur={() => setEmailF(false)} />
                    </View>
                </View>


                <View style={[styles.textField, { backgroundColor: passwordF ? '#0A5CA826' : '#FAFAFA', borderColor: passwordF ? '#0A5CA8' : '#FAFAFA' }]}  >
                    <View style={styles.innerField}>
                        <Ionicons name='mail' size={hp(2.5)} color={passwordF ? '#0A5CA8' : '#9E9E9E'} />
                        <TextInput placeholder='Password' placeholderTextColor={'#d3d3d3'} style={styles.textInputStyle} onFocus={() => setPasswordF(true)} onBlur={() => setPasswordF(false)} />
                        <TouchableOpacity>
                            <Ionicons name='eye-off' size={hp(2.5)} color={passwordF ? '#0A5CA8' : '#9E9E9E'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <TouchableOpacity style={styles.rememberStyle} onPress={toggleCheck}>
                {check ? <MaterialCommunityIcons name='checkbox-marked-outline' size={hp(2.5)} color={'#0A5CA8'} /> : <MaterialCommunityIcons name='checkbox-blank-outline' size={hp(2.5)} color={'#0A5CA8'} />}
                <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>



            <View style={{ alignItems: 'center', marginTop: hp(4) }}>
                <Link href={'/authPage/create/ProfileData'} asChild>
                    <TouchableOpacity style={defaultStyles.footerBtn}>
                        <Text style={styles.footerText}>Sign up</Text>
                    </TouchableOpacity>
                </Link>

                <Link href={'/authPage/forgot/ForgotPassScreen'} asChild>
                    <TouchableOpacity>
                        <Text style={styles.forgot}>Forgot the password?</Text>
                    </TouchableOpacity>
                </Link>
            </View>


            <View style={styles.orStyle}>
                <View style={styles.separator} />
                <Text style={styles.orText}>or continue with</Text>
                <View style={styles.separator} />
            </View>


            <View style={styles.socialStyle}>
                <TouchableOpacity style={styles.box}>
                    <Image source={require('@/assets/temp/authIcons/fb.png')} resizeMode='contain' style={styles.btnImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.box}>
                    <Image source={require('@/assets/temp/authIcons/google.png')} resizeMode='contain' style={styles.btnImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.box}>
                    <Image source={require('@/assets/temp/authIcons/apple.png')} resizeMode='contain' style={styles.btnImage} />
                </TouchableOpacity>
            </View>




            <View style={styles.footer}>
                <View style={styles.footerInner}>
                    <Text style={styles.innerText}>Don’t have an account?</Text>
                    <Link href={'/authPage/LoginScreen'} asChild>
                        <TouchableOpacity>
                            <Text style={styles.signUpText}>Sign in</Text>
                        </TouchableOpacity>
                    </Link>

                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    containerStyle: {
        paddingHorizontal: wp(5),
        marginTop: hp(4),
    },
    textStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: Platform.OS === 'ios' ? hp(4.5) : hp(5),
    },
    headerBack: {
        width: wp(100),
        height: hp(12),
        justifyContent: 'flex-end',
        paddingHorizontal: wp(5)
    },
    textField: {
        width: wp(90),
        height: hp(7.5),
        borderRadius: wp(4),
        justifyContent: 'center',
        paddingHorizontal: wp(5),
        marginTop: hp(2.5),
        borderWidth: 1.5,
    },
    textInputStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2),
        flex: 1,
    },
    innerField: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    rememberStyle: {
        paddingHorizontal: wp(6),
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: wp(3),
        marginTop: hp(3),
    },
    rememberText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8),
    },
    forgot: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
        color: '#0A5CA8',
        marginTop: hp(3)
    },
    socialStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(6),
        alignSelf: 'center',
        marginTop: hp(5),
    },
    btnImage: {
        width: wp(5),
        height: hp(5),
    },
    box: {
        width: wp(22),
        height: hp(7),
        borderWidth: 1,
        borderColor: "#EEEEEE",
        borderRadius: wp(4),
        alignItems: 'center',
        justifyContent: 'center'
    },






















    orStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        alignSelf: 'center',
        marginTop: hp(5)
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
        height: Platform.OS === 'ios' ? hp(10) : hp(8),
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    footerBtn: {
        width: wp(90),
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