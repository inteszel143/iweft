import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, Modal, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { defaultStyles } from '@/constants/Styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-date-picker';
import { useTranslation } from 'react-i18next';
const ProfileOverview = () => {
    const { image,
        fullName,
        nickName,
        dob,
        email,
        password,
        phone,
        nameAddress,
        street,
        city,
        latitude,
        longitude,
        valNumber
    } =
        useLocalSearchParams();
    const { t } = useTranslation();

    const phoneInput = useRef<PhoneInput>(null);
    const [valueNumber, setValueNumber] = useState(valNumber);
    const [formattedValue, setFormattedValue] = useState("");

    // Error
    const [phoneError, setPhoneError] = useState(false);
    const [date, setDate] = useState(new Date());
    const dateVal = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`; // DOB value

    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const finalAddress = nameAddress + ' ' + street + ' ' + city;
    const schema = yup.object().shape({
        full_name: yup.string().required(t('Full Name is requred')),
        n_name: yup.string().required('Nickname is requred'),
        address: yup.string().required('Address is requred'),
        bdate: yup.date().required('Birthday is requred'),
        image: yup?.string().required('Image is requred'),

        email: yup.string().email('Invalid email').required('Email is required').default(email as string),
        showPicker: yup.boolean().default(false),

        loading: yup.boolean(),
    });
    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            image: image as string,
            full_name: fullName as string,
            n_name: nickName as string,
            address: finalAddress,
            bdate: dob ? new Date(dob as string) : "",

            loading: false
        }
    });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            selectionLimit: 1,
            allowsEditing: true,
            quality: 1,
        });
        if (result.canceled === true) {
            return;
        }
        if (!result.canceled) {
            toggleModal();
            setValue('image', result.assets[0].uri);
        }
    };

    const openCamera = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera is required!');
            return;
        }
        let pickerResult = await ImagePicker.launchCameraAsync({
            aspect: [4, 3],
            quality: 1,
        });
        if (pickerResult.canceled === true) {
            return;
        }
        if (!pickerResult.canceled) {
            toggleModal();
            setValue('image', pickerResult?.assets[0].uri);
        }
    }

    const onSubmit = async (data: any) => {
        setValue('loading', true);
        try {
            // await postPhoneVerificationCode(phone as string);
            setTimeout(() => {
                router.push({
                    pathname: '/authPage/create/CreateNewPIN',
                    params: {
                        image: watch('image'),
                        fullName: data?.full_name,
                        nickName: data?.n_name,
                        dob: data?.bdate?.toISOString().split('T')[0],
                        email: email,
                        password: password,
                        phone: formattedValue,
                        nameAddress: nameAddress,
                        street: street,
                        city: city,
                        latitude: latitude,
                        longitude: longitude,
                    }
                });
                setValue('loading', false);
            }, 2000);
        } catch (error) {
            console.log(error);
            setValue('loading', false);
        }
    };

    function ModalProfile() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                presentationStyle='overFullScreen'
                statusBarTranslucent={true}
            >
                <View style={styles.modalStyle}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>{t('Add Profile Picture')}</Text>

                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#0A5CA8' }]} onPress={openCamera}>
                            <Text style={[styles.modalText, { color: '#FFFFFF' }]}>{t('Take Photo')}</Text>
                        </TouchableOpacity >
                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#0A5CA8' }]} onPress={pickImage} >
                            <Text style={[styles.modalText, { color: '#FFFFFF' }]}>{t('Choose Photo')}</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#F75555' }]}>
                              <Text style={[styles.modalText, { color: '#FFFFFF' }]}>Delete Photo</Text>
                          </TouchableOpacity> */}

                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#DAE7F2' }]}
                            onPress={toggleModal}
                        >
                            <Text style={[styles.modalText, { color: '#0A5CA8' }]}>{t('Cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    };

    return (
        <View style={styles.container}>
            {ModalProfile()}
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >{t('Fill Your Profile')}</Text>
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
                extraScrollHeight={Platform.OS === 'ios' ? hp(5) : 0}
            >


                <View style={styles.headerStyle}>
                    {watch('image') === "" ? <Image source={require('@/assets/temp/default.jpg')} resizeMode='contain' style={{ width: wp(36), height: wp(36) }} />
                        :
                        <View style={{ borderRadius: wp(20), width: wp(40), height: wp(40), overflow: 'hidden', backgroundColor: 'white' }}>
                            <Image
                                source={{ uri: watch('image') }}
                                resizeMode='cover'
                                style={{ width: wp(36), height: wp(36), borderRadius: wp(18) }} />
                        </View>
                    }
                    <TouchableOpacity style={styles.editBtn}
                        onPress={toggleModal}
                    >
                        <Image
                            source={require('@/assets/icons/editbtn.png')}
                            resizeMode='contain'
                            style={{
                                width: wp(8),
                                height: wp(8),
                            }}
                        />
                    </TouchableOpacity>
                </View>
                {/* Error */}
                {errors.image?.message && <View style={styles.errorViewStyle}>
                    <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                    <Text style={styles.errorStyle} >{errors.image?.message}</Text>
                </View>}


                <View style={{ alignItems: 'center' }}>
                    {/* Fullname */}
                    <View style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                        <View style={defaultStyles.innerField}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        // onFocus={handleFocus}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={t('Full Name')}
                                        autoCapitalize='words'
                                        placeholderTextColor={'#9E9E9E'}
                                        style={defaultStyles.textInputStyle}
                                    />
                                )}
                                name="full_name"
                            />
                        </View>
                    </View>

                    {/* Error */}
                    {errors.full_name?.message && <View style={styles.errorViewStyle}>
                        <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                        <Text style={styles.errorStyle} >{errors.full_name?.message}</Text>
                    </View>}



                    {/* Nickname */}
                    <View style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                        <View style={defaultStyles.innerField}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        // onFocus={handleFocus}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={t('Nickname')}
                                        placeholderTextColor={'#9E9E9E'}
                                        style={defaultStyles.textInputStyle}
                                    />
                                )}
                                name="n_name"
                            />
                        </View>
                    </View>


                    {/* Error */}
                    {errors.n_name?.message && <View style={styles.errorViewStyle}>
                        <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                        <Text style={styles.errorStyle} >{errors.n_name?.message}</Text>
                    </View>}


                    {/* DateofBirth */}
                    <View>
                        <Pressable style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}
                            onPress={() => setValue('showPicker', true)}>
                            <View style={defaultStyles.innerField}>
                                {watch('bdate') ?
                                    <Text style={[defaultStyles.textInputStyle]}>{watch('bdate')?.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</Text>
                                    :
                                    <Text style={[defaultStyles.textInputStyle, { color: "#9E9E9E" }]}>
                                        {t("Date of Birth")}
                                    </Text>
                                }
                                <TouchableOpacity>
                                    <Image
                                        source={require('@/assets/temp/profileicons/calendar.jpg')}
                                        resizeMode='contain'
                                        style={{ width: wp(5) }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </Pressable>
                        <Controller
                            name="bdate"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    modal
                                    open={watch('showPicker')}
                                    mode="date"
                                    // locale={current === "dk" ? 'da' : 'en'}
                                    confirmText={t("Confirm")}
                                    cancelText={t('Cancel')}
                                    title={t("Select date")}
                                    date={value || new Date()}
                                    onConfirm={(date) => {
                                        setValue('showPicker', false);
                                        onChange(date);
                                    }}
                                    onCancel={() => {
                                        setValue('showPicker', false);
                                    }}
                                />
                            )}
                        />
                    </View>

                    {/* Email */}
                    <View style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                        <View style={defaultStyles.innerField}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        editable={false}
                                        defaultValue={email as string}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={t('Email')}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoComplete='email'
                                        autoCorrect={false}
                                        placeholderTextColor={'#9E9E9E'}
                                        style={[defaultStyles.textInputStyle, { color: "gray" }]}
                                    />
                                )}
                                name="email"
                            />
                            <TouchableOpacity>
                                <Image source={require('@/assets/temp/profileicons/profileEmail.jpg')} resizeMode='contain' style={{ width: wp(5) }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Error */}
                    {errors.email?.message && <View style={styles.errorViewStyle}>
                        <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                        <Text style={styles.errorStyle} >{errors.email?.message}</Text>
                    </View>}


                    {/* Phone */}
                    <View>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={valueNumber}
                            placeholder='000 000 000'
                            defaultCode="AE"
                            layout="first"
                            onChangeText={(text) => {
                                setValueNumber(text);
                            }}
                            onChangeFormattedText={(text) => {
                                setFormattedValue(text);
                            }}
                            textInputStyle={{ fontFamily: 'UrbanistMedium', fontSize: hp(1.8) }}
                            codeTextStyle={{ fontFamily: 'UrbanistMedium', fontSize: hp(1.8) }}
                            flagButtonStyle={{ backgroundColor: '#FAFAFA', paddingLeft: wp(4) }}
                            containerStyle={{ borderRadius: wp(4), width: wp(90), marginTop: hp(3), minHeight: hp(7.5), maxHeight: hp(8), }}
                        />
                    </View>

                    {/* Error */}
                    {phoneError && <View style={styles.errorViewStyle}>
                        <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                        <Text style={styles.errorStyle} >{t('Phone number is required')}</Text>
                    </View>}


                    {/* Location */}
                    {/* <View style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                          <TouchableOpacity style={[defaultStyles.innerField]}
                              // disabled={!value || image === null ? true : false}
                              onPress={handleSubmit(onSubmit)}>
                              <Text style={[defaultStyles.textInputStyle, { color: "#9E9E9E" }]}>{t('Address')}</Text>
                              <Ionicons name='location-outline' size={hp(2.4)} />
                          </TouchableOpacity>
                      </View> */}
                    <View style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                        <View style={defaultStyles.innerField}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        // onFocus={handleFocus}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={t('Address')}
                                        autoCapitalize='words'
                                        placeholderTextColor={'#9E9E9E'}
                                        style={defaultStyles.textInputStyle}
                                    />
                                )}
                                name="address"
                            />
                        </View>
                    </View>

                    {/* Error */}
                    {errors.address?.message && <View style={styles.errorViewStyle}>
                        <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                        <Text style={styles.errorStyle} >{errors.address?.message}</Text>
                    </View>}


                </View>

                <View style={{ alignItems: 'center', marginTop: hp(4) }}>
                    <TouchableOpacity style={[defaultStyles.footerBtn]}
                        onPress={handleSubmit(onSubmit)}

                    >
                        {watch('loading') ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={styles.footerText}>{t('Continue')}</Text>}
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView >


        </View >
    )
}

export default ProfileOverview

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




    headerStyle: {
        width: wp(35),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(2),
        alignSelf: 'center',
    },
    editBtn: {
        position: 'absolute',
        bottom: 0,
        right: wp(3),
        width: wp(8),
        height: wp(8),
        borderRadius: wp(2),
        alignItems: 'center',
        justifyContent: 'center'
    },
    // modal
    modalStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBox: {
        width: wp(86),
        height: Platform.OS === 'ios' ? hp(42) : hp(44),
        backgroundColor: "white",
        borderRadius: wp(6),
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBoxDatePicker: {
        width: wp(90),
        height: Platform.OS === 'ios' ? hp(60) : hp(62),
        backgroundColor: "white",
        borderRadius: wp(6),
        paddingHorizontal: wp(8),
        paddingVertical: hp(5),
    },
    modalTitle: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.8),
        color: '#0A5CA8',
        marginBottom: hp(1)
    },
    modalTitleDate: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.5),
        marginBottom: hp(1)
    },
    modalBtn: {
        width: wp(70),
        height: hp(7),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(2)
    },
    modalText: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2)
    },




    textFieldStyle: {
        width: wp(90),
        minHeight: hp(7.5),
        maxHeight: hp(8),
        backgroundColor: "#FAFAFA",
        borderRadius: wp(4),
        justifyContent: 'center',
        marginTop: hp(3),
        paddingHorizontal: wp(6)
    },
    textStyle: {
        flex: 1,
        fontFamily: "UrbanistSemiBold",
        fontSize: hp(2)
    },
    innerTextField: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },


    footer: {
        marginBottom: hp(4),
        alignItems: 'center'
    },
    footerText: {
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
        gap: 10,
        paddingHorizontal: wp(6),
    },
    footerBtn: {
        width: wp(88),
        height: hp(7),
        borderRadius: wp(10),
        alignItems: "center",
        justifyContent: "center",
    },
})