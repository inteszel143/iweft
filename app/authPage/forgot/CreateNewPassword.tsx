import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ChangePasswordSuccessModal from '@/components/ChangePasswordSuccessModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { defaultStyles } from '@/constants/Styles';
import { resetPasswordEmail } from '@/apis/forgot';

export default function CreateNewPassword() {
    const { email, code } = useLocalSearchParams();
    const [passwordF, setPasswordF] = useState(false);
    const [passwordFC, setPasswordFC] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    const [showP, setShowP] = useState(true);
    const [showPC, setShowPC] = useState(true);

    const handleFocusP = () => {
        setPasswordF(true);
    };
    const handleBlurP = () => {
        setPasswordF(false);
    };

    const handleFocusC = () => {
        setPasswordFC(true);
    };
    const handleBlurC = () => {
        setPasswordFC(false);
    };

    const toggleCheckPasswordPC = () => {
        setShowPC(!showPC);
    }
    const toggleCheckPassword = () => {
        setShowP(!showP);
    };

    const schema = yup.object().shape({
        new_password: yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirm_password: yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .test('passwords-match', 'Passwords must match', function (value) {
                return value === this.parent.new_password;
            })
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        setBtnLoading(true);
        const pin = parseInt(code as string);
        try {
            await resetPasswordEmail(data?.new_password as string, email as string, pin);
            setTimeout(() => {
                setBtnLoading(false);
                setModalVisible(true);
            }, 2000);
        } catch (error) {
            setBtnLoading(false);
            console.log("Error ka");
        }
    };



    return (
        <View style={styles.container}>
            {modalVisible && <ChangePasswordSuccessModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Create New Password</Text>
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
                extraScrollHeight={Platform.OS === 'ios' ? hp(4) : 0}
            >

                <View>
                    <Image source={require('@/assets/temp/forgot.jpg')} resizeMode='contain' style={{ width: wp(100), height: hp(38) }} />
                </View>

                <View style={styles.containerStyle}>
                    <Text style={[styles.titleStyle, { marginTop: hp(2.5) }]}>Create Your New Password</Text>



                    <View style={[styles.textField, { backgroundColor: passwordF ? '#0A5CA826' : '#FAFAFA', borderColor: passwordF ? '#0A5CA8' : '#FAFAFA' }]}  >
                        <View style={styles.innerField}>
                            <Ionicons name='lock-closed' size={hp(2.5)} color={passwordF ? '#0A5CA8' : '#9E9E9E'} />

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (

                                    <TextInput
                                        placeholder='New Password'
                                        onBlur={handleBlurP}
                                        onFocus={handleFocusP}
                                        onChangeText={onChange}
                                        // value={value}
                                        secureTextEntry={showP}
                                        placeholderTextColor={'#9E9E9E'}
                                        style={defaultStyles.textInputStyle}
                                    />
                                )}
                                name="new_password"
                            />
                            <TouchableOpacity onPress={toggleCheckPassword}>
                                <Ionicons name={showP ? 'eye-off' : 'eye'} size={hp(2.5)} color={passwordF ? '#0A5CA8' : '#9E9E9E'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Error */}
                    {errors.new_password?.message && <View style={styles.errorViewStyle}>
                        <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                        <Text style={styles.errorStyle} >{errors.new_password?.message}</Text>
                    </View>}


                    <View style={[styles.textField, { backgroundColor: passwordFC ? '#0A5CA826' : '#FAFAFA', borderColor: passwordFC ? '#0A5CA8' : '#FAFAFA' }]}  >
                        <View style={styles.innerField}>
                            <Ionicons name='lock-closed' size={hp(2.5)} color={passwordFC ? '#0A5CA8' : '#9E9E9E'} />

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (

                                    <TextInput
                                        placeholder='Confirm Password'
                                        onBlur={handleBlurC}
                                        onFocus={handleFocusC}
                                        onChangeText={onChange}
                                        // value={value}
                                        secureTextEntry={showPC}
                                        placeholderTextColor={'#9E9E9E'}
                                        style={defaultStyles.textInputStyle}
                                    />
                                )}
                                name="confirm_password"
                            />
                            <TouchableOpacity onPress={toggleCheckPasswordPC}>
                                <Ionicons name={showPC ? 'eye-off' : 'eye'} size={hp(2.5)} color={passwordFC ? '#0A5CA8' : '#9E9E9E'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Error */}
                    {errors.confirm_password?.message && <View style={styles.errorViewStyle}>
                        <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                        <Text style={styles.errorStyle} >{errors.confirm_password?.message}</Text>
                    </View>}



                </View>

                <View style={{ alignItems: 'center', marginTop: hp(6) }}>
                    <TouchableOpacity style={defaultStyles.footerBtn} onPress={handleSubmit(onSubmit)}>
                        {btnLoading ? <ActivityIndicator size={'small'} color={'#FFFFFF'} /> : <Text style={styles.btnText}>Continue</Text>}
                    </TouchableOpacity>
                </View>


            </KeyboardAwareScrollView>


            {/* <View style={styles.footer}>
                <TouchableOpacity style={defaultStyles.footerBtn} onPress={handleSubmit(onSubmit)}>
                    {btnLoading ? <ActivityIndicator size={'small'} color={'#FFFFFF'} /> : <Text style={styles.btnText}>Continue</Text>}
                </TouchableOpacity>
            </View> */}
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
    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(11),
        alignItems: 'center',
    },

    containerStyle: {
        paddingHorizontal: wp(5)
    },

    titleStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2.2),
        color: '#212121'
    },
    textField: {
        width: wp(90),
        height: hp(7.5),
        borderRadius: wp(4),
        justifyContent: 'center',
        paddingHorizontal: wp(5),
        marginTop: hp(3),
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
    BtnStyle: {
        marginTop: hp(8),
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
        // alignItems: 'center',
        gap: 10
    }
})