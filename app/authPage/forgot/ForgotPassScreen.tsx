import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator, Platform, TextInput } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { forgotPasswordEmail } from '@/apis/forgot';
import { defaultStyles } from '@/constants/Styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import ForgotCodeModal from '@/components/ForgotCodeModal';

export default function ForgotPassScreen() {

    const [loadingBtn, setLoadingBtn] = useState(false);
    const [codeSuccessModal, setCodeSuccesModal] = useState(false);

    const schema = yup.object().shape({
        input: yup.string().required('Email or phone number is required').test('emailOrPhoneNumber', 'Enter a valid email or phone number', function (value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^(09|\+639)\d{9}$/;
            const uaePhoneRegex = /^(?:\+971|00971)5[0-9]{8}$/;
            if (emailRegex.test(value) || phoneRegex.test(value) || uaePhoneRegex.test(value)) {
                return true; // Input is either an email or a phone number
            }
            return false; // Input is neither an email nor a phone number
        })
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        setLoadingBtn(true);
        try {
            await forgotPasswordEmail(data?.input);
            setCodeSuccesModal(true);
            setTimeout(() => {
                setLoadingBtn(false);
                setCodeSuccesModal(false);
                router.push({
                    pathname: '/authPage/forgot/ForgotCode',
                    params: { item: data?.input }
                });
            }, 2000);
        } catch (error) {
            setLoadingBtn(false);
            console.log("Error ka");
        }
    };


    return (
        <View style={styles.container}>
            {codeSuccessModal && <ForgotCodeModal modalVisible={codeSuccessModal} setModalVisible={setCodeSuccesModal} />}
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Forgot Password</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>



            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? hp(3) : hp(6) }}
                bounces={false}
                extraScrollHeight={Platform.OS === 'ios' ? hp(6) : 0}
            >
                <View>
                    <Image source={require('@/assets/temp/forgot.jpg')} resizeMode='contain' style={{ width: wp(100), height: hp(36) }} />
                </View>

                <View style={styles.dataStyle}>
                    <Text style={styles.dataTextStyle} >Please enter your email address or phone number to request a password reset.</Text>
                </View>
                <View style={styles.titleStyle}>
                    <Text style={styles.textTitleStyle} >Email or Phone number</Text>
                </View>
                {/* TextInput */}
                <View style={{ alignItems: 'center', marginTop: hp(1) }}>
                    <View style={[styles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                        <View style={[defaultStyles.innerField, { paddingHorizontal: wp(1) }]}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder='Email or Phone number '
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoComplete='email'
                                        autoCorrect={false}
                                        placeholderTextColor={'#9E9E9E'}
                                        style={defaultStyles.textInputStyle}
                                    />
                                )}
                                name="input"
                            />
                            {
                                errors.input?.message && <Ionicons name='close-sharp' size={hp(2.4)} color={'red'} />
                            }
                            {/* <Ionicons name={errors.input?.message ? 'close-sharp' : 'checkmark-sharp'} size={hp(2.4)} color={errors.input?.message ? 'red' : '#93c120'} /> */}
                        </View>
                    </View>
                </View>

                {/* Error */}
                {errors.input?.message && <View style={styles.errorViewStyle}>
                    <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                    <Text style={styles.errorStyle} >{errors.input?.message}</Text>
                </View>
                }

            </KeyboardAwareScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={defaultStyles.footerBtn} onPress={handleSubmit(onSubmit)}>
                    {loadingBtn ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={styles.footerText}>Continue</Text>}
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
    textField: {
        width: wp(88),
        height: hp(7.5),
        borderRadius: wp(4),
        justifyContent: "center",
        paddingHorizontal: wp(5),
        marginTop: hp(2.5),
        borderWidth: 1.5,
    },
    titleStyle: {
        marginTop: hp(4),
        paddingHorizontal: wp(6)
    },
    textTitleStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.1),
    },

    dataStyle: {
        paddingHorizontal: wp(6),
        marginTop: hp(1),
    },
    dataTextStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2),
        marginTop: hp(1),

    },
    boxStyle: {
        width: wp(90),
        height: hp(14),
        borderRadius: wp(4),
        borderWidth: 2,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: hp(3),
        paddingHorizontal: wp(5),
    },
    innerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(5)
    },
    btnStyle: {
        width: wp(18),
        height: wp(18),
        borderRadius: wp(9),
        backgroundColor: "#DAE7F2",
        alignItems: 'center',
        justifyContent: 'center'
    },
    viaText: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.6),
        color: '#757575'
    },
    numberStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        marginTop: hp(1)
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(13),
        alignItems: 'center'
    },
    footerBtn: {
        width: wp(90),
        height: hp(7),
        backgroundColor: '#0A5CA8',
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: "#FFFFFF"
    },
    errorStyle: {
        flex: 1,
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.8),
        color: "#ED4337"
    },
    errorViewStyle: {
        marginTop: 10,
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: wp(6),
    },
    successStyle: {
        flex: 1,
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: "#93c120"
    }

})