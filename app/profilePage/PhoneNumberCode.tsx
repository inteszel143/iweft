import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router, useLocalSearchParams } from 'expo-router';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import ErrorPhoneCode from '@/components/ErrorPhoneCode';
import ApprovedPhone from '@/components/ApprovedPhone';
import { userUpdatePhoneNumber } from '@/apis/userupdate';
const CELL_COUNT = 6;

export default function PhoneNumberCode() {
    const { phone } = useLocalSearchParams();
    const [value, setValue] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [approvedModal, setApprovedModal] = useState(false);
    const [resendCodeDisable, setResendCodeDisable] = useState(false);
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    useEffect(() => {
        if (ref?.current) {
            ref.current.focus();
        }
    }, []);

    const onSubmit = async () => {
        setBtnLoading(true);
        try {
            await userUpdatePhoneNumber(phone as string, value as string);
            setApprovedModal(true);
            router.push('/profilePage/Security');
            setTimeout(() => {
                setBtnLoading(false);
                setApprovedModal(false);
            }, 2500);
        } catch (error) {
            console.log(error);
            setBtnLoading(false);
            setErrorModalVisible(true);
        }
    };


    return (
        <View style={styles.container}>
            {errorModalVisible && <ErrorPhoneCode modalVisible={errorModalVisible} setModalVisible={setErrorModalVisible} />}
            {approvedModal && <ApprovedPhone modalVisible={approvedModal} setModalVisible={setApprovedModal} />}
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Verification Code</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>



            <View style={styles.containerStyle}>

                <Text style={styles.titleStyle}>Code has been send to {phone?.slice(0, 4)}******{phone?.slice(-3)}</Text>
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


                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: hp(6) }}>
                    <Text style={[styles.titleStyle]}>Didn't receive?</Text>
                    <TouchableOpacity
                        disabled={resendCodeDisable ? true : false}
                    ><Text style={[styles.titleStyle, { color: resendCodeDisable ? 'gray' : '#0A5CA8' }]}>Resend code</Text></TouchableOpacity>
                </View>
                {
                    resendCodeDisable && <View style={{ paddingHorizontal: wp(6) }}>
                        <Text style={[styles.alertMessage]}>Please wait 2 minutes before requesting another code.</Text>
                    </View>
                }
            </View>

            <View style={styles.BtnStyle}>
                <TouchableOpacity style={[styles.btnBoxStyle, { backgroundColor: value.length != 6 ? "#DADADA" : "#0A5CA8", }]}
                    disabled={value.length != 6 ? true : false}
                    onPress={onSubmit}
                >
                    {btnLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={styles.btnText}>Verify</Text>}
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

    alertMessage: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.8),
        color: '#212121',
        textAlign: 'center',
        marginTop: hp(1.5)
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
        fontSize: hp(2.6),
        alignSelf: 'center',
    },
    BtnStyle: {
        marginTop: hp(6),
        alignItems: 'center'
    },
    btnBoxStyle: {
        width: wp(90),
        height: hp(7),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: '#FFFFFF'
    }


})