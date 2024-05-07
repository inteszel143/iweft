import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AppleIcon from '@/components/social/AppleIcon';
import GooleIcon from '@/components/social/GooleIcon';
import FacebookIcon from '@/components/social/FacebookIcon';

export default function LoginScreen() {
    const [emailF, setEmailF] = useState(false);
    const [passwordF, setPasswordF] = useState(false);
    const [check, setCheck] = useState(true);
    const [showP, setShowP] = useState(true);

    const [loadingBtn, setLoadingBtn] = useState(false);


    const toggleCheck = () => {
        setCheck(!check);
    };
    const toggleCheckPassword = () => {
        setShowP(!showP);
    };
    const handleFocus = () => {
        setEmailF(true);
    };
    const handleBlur = () => {
        setEmailF(false);
    };
    const handleFocusP = () => {
        setPasswordF(true);
    };
    const handleBlurP = () => {
        setPasswordF(false);
    };


    const schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string()
            .required('Password is required')
        // .min(8, 'Password must be at least 8 characters')
        // .matches(/^(?=.*\d)(?=.*[!@#$%^&*])/, 'Password must contain at least one number and one special character')
        ,
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        setLoadingBtn(true);
        setTimeout(() => {
            setLoadingBtn(false);
            router.push('/(tabs)/');
        }, 2000)
    };

    return (
        <View style={styles.container}>


            <View style={styles.headerBack}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name='arrowleft' size={hp(3)} />
                </TouchableOpacity>
            </View>

            <ScrollView bounces={false} contentContainerStyle={{ paddingBottom: hp(5) }}>
                <View style={styles.containerStyle}>
                    <Text style={styles.textStyle}>Login to your Account</Text>
                    <View style={[styles.textField, { backgroundColor: emailF ? '#0A5CA826' : '#FAFAFA', borderColor: emailF ? '#0A5CA8' : '#FAFAFA' }]} >
                        <View style={styles.innerField}>
                            <Ionicons name='mail' size={hp(2.5)} color={emailF ? '#0A5CA8' : '#9E9E9E'} />
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={handleBlur}
                                        onFocus={handleFocus}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder='Email'
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoComplete='email'
                                        autoCorrect={false}
                                        placeholderTextColor={'#9E9E9E'}
                                        style={defaultStyles.textInputStyle}
                                    />
                                )}
                                name="email"
                            />
                        </View>
                    </View>

                    {/* Error */}
                    {errors.email?.message && <View style={styles.errorViewStyle}>
                        <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                        <Text style={styles.errorStyle} >{errors.email?.message}</Text>
                    </View>}


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
                                        placeholder='Password'
                                        onBlur={handleBlurP}
                                        onFocus={handleFocusP}
                                        onChangeText={onChange}
                                        // value={value}
                                        secureTextEntry={showP}
                                        placeholderTextColor={'#9E9E9E'}
                                        style={defaultStyles.textInputStyle}
                                    />
                                )}
                                name="password"
                            />
                            <TouchableOpacity onPress={toggleCheckPassword}>
                                <Ionicons name={showP ? 'eye-off' : 'eye'} size={hp(2.5)} color={passwordF ? '#0A5CA8' : '#9E9E9E'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Error */}
                    {errors.password?.message && <View style={styles.errorViewStyle}>
                        <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                        <Text style={styles.errorStyle} >{errors.password?.message}</Text>
                    </View>}

                </View>



                {/* Remember */}
                <TouchableOpacity style={styles.rememberStyle} onPress={toggleCheck}>
                    {check ? <Ionicons name='checkbox' size={hp(2.6)} color={'#0A5CA8'} />
                        :
                        <MaterialCommunityIcons name='checkbox-blank-outline' size={hp(2.6)} color={'#0A5CA8'} />}
                    <Text style={styles.rememberText}>Remember me</Text>
                </TouchableOpacity>



                <View style={{ alignItems: 'center', marginTop: hp(3) }}>

                    <TouchableOpacity style={defaultStyles.footerBtn} onPress={handleSubmit(onSubmit)}>
                        {loadingBtn ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={styles.footerText}>Sign in</Text>}
                    </TouchableOpacity>

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
                    <FacebookIcon />
                    <GooleIcon />
                    <AppleIcon />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <View style={styles.footerInner}>
                        <Text style={styles.innerText}>Don’t have an account?</Text>
                        <Link href={'/authPage/RegisterScreen'} asChild>
                            <TouchableOpacity>
                                <Text style={styles.signUpText}>Sign up</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </ScrollView>
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
        flex: 1,
        fontFamily: 'UrbanistMedium',
        paddingVertical: hp(1),
        fontSize: hp(2),
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
        fontSize: hp(1.9),
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
        marginTop: hp(3),
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
        width: wp(25),
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