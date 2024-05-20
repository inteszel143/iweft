import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import PhoneInput from "react-native-phone-number-input";
import { postPhoneVerificationCode } from '@/apis/auth';
export default function ChangePhoneNumber() {

    const phoneInput = useRef<PhoneInput>(null);
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState(""); // Phone data
    const [btnLoading, setBtnLoading] = useState(false);

    const onSubmit = async () => {
        setBtnLoading(true);
        try {
            await postPhoneVerificationCode(formattedValue as string);
            setTimeout(() => {
                router.push({
                    pathname: '/profilePage/PhoneNumberCode',
                    params: { phone: formattedValue }
                })
                setBtnLoading(false);
            }, 2000);
        } catch (error) {
            console.log(error);
            setBtnLoading(false);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Change Phone Number</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={styles.middleStyle}>
                <Text style={styles.titleStyle}>Your Phone Number</Text>
                <Text style={styles.subTitleStyle} >Please confirm your country code and enter your phone number.</Text>



                {/* Phone */}
                <View style={{ marginTop: hp(2) }}>
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={value}
                        defaultCode="AE"
                        layout="first"
                        autoFocus
                        onChangeText={(text) => {
                            setValue(text);
                        }}
                        onChangeFormattedText={(text) => {
                            setFormattedValue(text);
                        }}
                        textInputStyle={{ fontFamily: 'UrbanistSemiBold', fontSize: hp(2) }}
                        codeTextStyle={{ fontFamily: 'UrbanistSemiBold', fontSize: hp(2) }}
                        flagButtonStyle={{ backgroundColor: '#FAFAFA', paddingLeft: wp(4) }}
                        containerStyle={{ borderRadius: wp(4), width: wp(90), marginTop: hp(3), minHeight: hp(7.5), maxHeight: hp(8), }}
                    />
                </View>
            </View>

            {/* terms */}
            <View style={{ alignItems: 'center', marginTop: hp(5) }}>
                <Text style={styles.terms} >By entering your number, you're agreeing to our <Text
                    style={{
                        fontFamily: 'UrbanistSemiBold',
                        color: "#0a5ca8"
                    }}
                >Terms of Service and Privacy Policy.</Text> Thanks!</Text>
            </View>

            <View style={{ alignItems: 'center', marginTop: hp(4) }}>
                <TouchableOpacity style={[styles.footerBtn, { backgroundColor: value.length <= 9 ? "#DADADA" : "#0A5CA8" }]}
                    disabled={value.length <= 9 ? true : false}
                    onPress={onSubmit}
                >
                    {btnLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={[styles.footerText, { color: "#FFFFFF", }]}>Continue</Text>}
                </TouchableOpacity>
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    Headercontainer: {
        paddingHorizontal: wp(5),
        paddingTop: hp(6),
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(6),
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(5),
    },
    bookingText: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.5)
    },
    containerStyle: {
        paddingHorizontal: wp(5)
    },
    containerText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2.2),
        color: '#212121'
    },
    textFieldStyle: {
        width: wp(90),
        minHeight: hp(7.5),
        maxHeight: hp(8),
        backgroundColor: "#FAFAFA",
        borderRadius: wp(4),
        justifyContent: 'center',
        marginTop: hp(2),
        paddingHorizontal: wp(6)
    },
    textStyle: {
        fontFamily: "UrbanistSemiBold",
        fontSize: hp(2)
    },
    innerTextField: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(12),
        alignItems: 'center'
    },
    footerBtn: {
        width: wp(88),
        height: hp(7),
        borderRadius: wp(10),
        alignItems: "center",
        justifyContent: "center",
    },
    footerText: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2),
    },
    middleStyle: {
        alignItems: 'center',
        marginTop: hp(5)
    },
    titleStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.5)
    },
    subTitleStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2),
        textAlign: 'center',
        paddingHorizontal: wp(6),
        marginTop: hp(4),
        color: "#212121",
    },
    terms: {
        textAlign: 'center',
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.6),
        paddingHorizontal: wp(6),
        color: "gray"
    }
})