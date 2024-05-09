import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router, useLocalSearchParams } from 'expo-router';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { postVerifyEmailCode } from '@/apis/auth';
const CELL_COUNT = 6;


export default function EmailVerification() {
    const { email } = useLocalSearchParams();
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        ref?.current.focus();
    }, []);

    const onSubmit = async () => {
        const verification_code = parseInt(value);
        try {
            const response = await postVerifyEmailCode(email as string, verification_code as number);
            console.log(response);
            router.push({
                pathname: '/authPage/AfterEmailVerification',
                params: { email: email }
            });
        } catch (error) {
            console.log('Invalid Code');
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Email Verification</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>



            <View style={styles.containerStyle}>

                <Text style={styles.titleStyle}>Code has been send to <Text style={{ color: "#0A5CA8" }} >{email.slice(0, 4)}******{email.slice(-9)}</Text> </Text>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <View
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>

                        </View>
                    )}
                />


                {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: hp(8) }}>
                    <Text style={[styles.titleStyle]}>Didn't receive?</Text>
                    <TouchableOpacity><Text style={[styles.titleStyle, { color: '#0A5CA8' }]}>Resend code</Text></TouchableOpacity>
                </View> */}
            </View>

            <View style={styles.BtnStyle}>
                <TouchableOpacity style={styles.btnBoxStyle}
                    onPress={onSubmit}
                >
                    <Text style={styles.btnText}>Verify</Text>
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
        alignItems: 'center',
        marginTop: hp(8)
    },
    titleStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2),
        color: '#212121'
    },

    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: {
        marginTop: hp(5),
        gap: wp(3),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cell: {
        width: wp(12),
        height: wp(16),
        borderRadius: wp(4),
        borderWidth: 1,
        borderColor: "#F1F1F1",
        backgroundColor: "#EEEEEE",
        textAlign: 'center',
        justifyContent: 'center',
    },
    focusCell: {
        width: wp(12),
        height: wp(16),
        textAlign: 'center',
        justifyContent: 'center',
        borderColor: '#0A5CA8',
        backgroundColor: "#0A5CA826",
        borderRadius: wp(4),
    },
    cellText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(3),
        alignSelf: 'center',
    },
    BtnStyle: {
        marginTop: hp(10),
        alignItems: 'center'
    },
    btnBoxStyle: {
        width: wp(90),
        height: hp(7),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A5CA8'
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: '#FFFFFF'
    }


})