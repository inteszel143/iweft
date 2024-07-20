import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { defaultStyles } from '@/constants/Styles';
import { updateUserPassword } from '@/apis/fetchAuth';
import ErrorPasswordChange from '@/components/modal/ErrorPasswordChange';
import SuccessPasswordChange from '@/components/modal/SuccessPasswordChange';
export default function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);

    // security
    const [oldSecurity, setOldSecurity] = useState(true);
    const [newSecurity, setNewSecurity] = useState(true);
    const [confirmSecurity, setConfirmSecurity] = useState(true);


    const schema = yup.object().shape({
        old_password: yup.string().required('Old password is required'),
        new_password: yup.string().required('New password is required').min(8, 'New password must be at least 8 characters'),
        confirm_password: yup.string()
            .oneOf([yup.ref('new_password')], 'Passwords must match')
            .required('Confirm password is required')
    });


    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            await updateUserPassword(data?.old_password, data?.new_password);
            setSuccessModal(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrorModal(true);
        }
    };

    return (
        <View style={styles.container}>
            {successModal && <SuccessPasswordChange modalVisible={successModal} setModalVisible={setSuccessModal} />}
            {errorModal && <ErrorPasswordChange modalVisible={errorModal} setModalVisible={setErrorModal} />}
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Change Password</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.containerStyle}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ alignItems: 'center' }}
                    >
                        <View style={{ marginTop: hp(4) }}>
                            <Text style={styles.containerText} >Enter Your Old Password</Text>
                            <View style={styles.textFieldStyle}>
                                <View style={styles.innerTextField}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                                        <Fontisto name='locked' size={hp(2)} />

                                        <Controller
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { onChange, onBlur, value } }) => (

                                                <TextInput
                                                    placeholder='Enter here..'
                                                    placeholderTextColor={'#9E9E9E'}
                                                    // value={value}
                                                    secureTextEntry={oldSecurity}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    style={{
                                                        width: wp(60),
                                                        fontFamily: 'UrbanistMedium',
                                                        fontSize: hp(2),
                                                    }}
                                                />
                                            )}
                                            name="old_password"
                                        />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => setOldSecurity(!oldSecurity)}
                                    >
                                        <Ionicons name={oldSecurity ? 'eye-off' : 'eye'} size={hp(2.4)} />
                                    </TouchableOpacity>
                                </View>
                            </View>


                            {/* Error */}
                            {errors.old_password?.message && <View style={styles.errorViewStyle}>
                                <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                                <Text style={styles.errorStyle} >{errors.old_password?.message}</Text>
                            </View>}



                        </View>
                        <View style={{ marginTop: hp(4) }}>
                            <Text style={styles.containerText} >Enter Your New Password</Text>
                            <View style={styles.textFieldStyle}>
                                <View style={styles.innerTextField}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                                        <Fontisto name='locked' size={hp(2)} />

                                        <Controller
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { onChange, onBlur, value } }) => (

                                                <TextInput
                                                    placeholder='Enter here..'
                                                    placeholderTextColor={'#9E9E9E'}
                                                    // value={value}
                                                    secureTextEntry={newSecurity}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    style={{
                                                        width: wp(60),
                                                        fontFamily: 'UrbanistMedium',
                                                        fontSize: hp(2)
                                                    }}
                                                />
                                            )}
                                            name="new_password"
                                        />


                                    </View>
                                    <TouchableOpacity
                                        onPress={() => setNewSecurity(!newSecurity)}
                                    >
                                        <Ionicons name={newSecurity ? 'eye-off' : 'eye'} size={hp(2.4)} />
                                    </TouchableOpacity>
                                </View>
                            </View>


                            {/* Error */}
                            {errors.new_password?.message && <View style={styles.errorViewStyle}>
                                <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                                <Text style={styles.errorStyle} >{errors.new_password?.message}</Text>
                            </View>}


                        </View>
                        <View style={{ marginTop: hp(4) }}>
                            <Text style={styles.containerText} >Confirm Your Password</Text>
                            <View style={styles.textFieldStyle}>
                                <View style={styles.innerTextField}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                                        <Fontisto name='locked' size={hp(2)} />

                                        <Controller
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { onChange, onBlur, value } }) => (

                                                <TextInput
                                                    placeholder='Enter here..'
                                                    placeholderTextColor={'#9E9E9E'}
                                                    // value={value}
                                                    secureTextEntry={confirmSecurity}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    style={{
                                                        width: wp(60),
                                                        fontFamily: 'UrbanistMedium',
                                                        fontSize: hp(2)
                                                    }}
                                                />
                                            )}
                                            name="confirm_password"
                                        />

                                    </View>
                                    <TouchableOpacity
                                        onPress={() => setConfirmSecurity(!confirmSecurity)}
                                    >
                                        <Ionicons name={confirmSecurity ? 'eye-off' : 'eye'} size={hp(2.4)} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Error */}
                            {errors.confirm_password?.message && <View style={styles.errorViewStyle}>
                                <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                                <Text style={styles.errorStyle} >{errors.confirm_password?.message}</Text>
                            </View>}



                        </View>
                    </KeyboardAvoidingView>

                </View>
            </ScrollView>



            <View style={styles.footer}>
                <TouchableOpacity style={defaultStyles.footerBtn}
                    onPress={handleSubmit(onSubmit)}
                >
                    {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Confirm</Text>}
                </TouchableOpacity>
            </View>



        </View >
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
        height: hp(14),
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
        color: 'white',
    },
    errorStyle: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.8),
        color: "#ED4337"
    },
    errorViewStyle: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
})