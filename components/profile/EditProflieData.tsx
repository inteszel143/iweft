import { ActivityIndicator, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PhoneInput from "react-native-phone-number-input";
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { defaultStyles } from '@/constants/Styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUserQuery } from '@/query/fetchAuthQuery';
import DatePicker from 'react-native-date-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { country, genderData } from '@/constants/profile/data';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import UpdateProfileData from '../UpdateProfileData';
import { useQueryClient } from '@tanstack/react-query';
import { userUpdateProfileData } from '@/apis/userupdate';
import useStoreAddress from '@/store/useStoreAddress';

export default function EditProflieData() {
    const isFocused = useIsFocused();
    const queryClient = useQueryClient();
    const { data, isFetching } = useUserQuery(isFocused);
    const { address, street, citys, latitude, longitude } = useStoreAddress();
    const phoneInput = useRef<PhoneInput>(null);
    const [gender, setGender] = useState(""); // Gender Value
    const [contry, setCountry] = useState(""); // Country Value

    const [addressError, setAddressError] = useState(false);
    const [date, setDate] = useState(new Date(data?.dob));
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const [open, setOpen] = useState(false);
    const dateVal = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`; // DOB value
    const [successModal, setSuccessModal] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const schema = yup.object().shape({
        full_name: yup.string().required('Full Name is required').default(data?.fullname as string),
        n_name: yup.string().required('Nickname is required').default(data?.nickname as string),
        email: yup.string().email('Invalid email').required('Email is required').default(data?.email as string),
    });
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (insidedata: any) => {
        setBtnLoading(true);
        const formdata = {
            fullname: insidedata?.full_name,
            nickname: insidedata?.n_name,
            address: data?.address,
            apartment_number: data?.apartment_number,
            city: data?.city,
            dob: dateVal,
            latitude: data?.latitude,
            longitude: data?.longitude,
        }
        const formdataglobal = {
            fullname: insidedata?.full_name,
            nickname: insidedata?.n_name,
            address: address,
            apartment_number: street,
            city: citys,
            dob: dateVal,
            latitude: latitude,
            longitude: longitude,
        }
        if (address === "") {
            try {
                await userUpdateProfileData(formdata);
                queryClient.invalidateQueries({ queryKey: ['user-data'] });
                setSuccessModal(true);
                setBtnLoading(false);
                setTimeout(() => {
                    setSuccessModal(false);
                    router.back();
                }, 2000)
            } catch (error) {
                setAddressError(true);
                setBtnLoading(false);
            }
        } else {
            try {
                await userUpdateProfileData(formdataglobal);
                queryClient.invalidateQueries({ queryKey: ['user-data'] });
                setSuccessModal(true);
                setBtnLoading(false);
                setTimeout(() => {
                    setSuccessModal(false);
                    router.back();
                }, 2000)
            } catch (error) {
                setBtnLoading(false);
                console.log(error);
            }
        }
    };

    return (
        <View style={styles.container}>
            {successModal && <UpdateProfileData modalVisible={successModal} setModalVisible={setSuccessModal} />}

            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp(17) }}
                extraScrollHeight={Platform.OS === 'ios' ? hp(4) : 0}
            >
                {/* Fullname */}
                <View style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                    <View style={styles.innerTextField}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onBlur={onBlur}
                                    defaultValue={data?.fullname as string}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder='Full Name'
                                    autoCapitalize='words'
                                    placeholderTextColor={'#9E9E9E'}
                                    style={styles.textStyle}
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

                {/* NickName */}
                <View style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                    <View style={styles.innerTextField}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onBlur={onBlur}
                                    defaultValue={data?.nickname as string}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder='Nickname'
                                    placeholderTextColor={'#9E9E9E'}
                                    style={styles.textStyle}
                                />
                            )}
                            name="n_name"
                        />
                        {data?.nickname === null && <AntDesign name='exclamationcircle' size={hp(2)} color={'red'} />}
                    </View>
                </View>
                {/* Error */}
                {errors.n_name?.message && <View style={styles.errorViewStyle}>
                    <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                    <Text style={styles.errorStyle} >{errors.n_name?.message}</Text>
                </View>}


                {/* DateofBirth */}
                <TouchableOpacity onPress={() => setOpen(true)}>
                    <View style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                        <View style={styles.innerTextField}>
                            <Text style={[styles.textStyle]} >{formattedDate}</Text>
                            <DatePicker
                                modal
                                open={open}
                                mode='date'
                                date={date}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                            <TouchableOpacity>
                                <Image source={require('@/assets/temp/profileicons/calendar.jpg')} resizeMode='contain' style={{ width: wp(5) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>


                {/* EMAIL */}

                <View style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                    <View style={styles.innerTextField}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onBlur={onBlur}
                                    defaultValue={data?.email as string}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder='Email'
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoComplete='email'
                                    autoCorrect={false}
                                    placeholderTextColor={'#9E9E9E'}
                                    style={styles.textStyle}
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

                {/* Country */}
                <View style={{ marginTop: hp(3) }}>
                    <SelectList
                        setSelected={(val: React.SetStateAction<null>) => setCountry(val)}
                        data={country}
                        save="value"
                        placeholder='Country'
                        search={false}
                        boxStyles={styles.boxStyles}
                        arrowicon={<FontAwesome name='caret-right' size={hp(2.5)} />}
                        inputStyles={{ fontFamily: "UrbanistSemiBold", fontSize: hp(2), }}
                        dropdownStyles={styles.dropdownStyles}
                        dropdownTextStyles={styles.dropdownTextStyles}
                        maxHeight={300}
                        defaultOption={{ key: 'Philippines', value: 'Philippines' }}
                    />
                </View>



                {/* <View>
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={data?.contact_number ? data.contact_number.slice(3, 14) : value}
                        defaultCode={(data?.contact_number?.slice(0, 3) === "+63" ? "PH" : "AE") || 'AE'}
                        layout="first"
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

                </View> */}



                <View style={{ marginTop: hp(3) }}>
                    <SelectList
                        setSelected={(val: React.SetStateAction<null>) => setGender(val)}
                        data={genderData}
                        save="value"
                        placeholder='Gender'
                        search={false}
                        boxStyles={styles.boxStyles}
                        inputStyles={{ fontFamily: "UrbanistSemiBold", fontSize: hp(2), }}
                        dropdownStyles={styles.dropdownStyles}
                        dropdownTextStyles={styles.dropdownTextStyles}
                        maxHeight={300}
                        defaultOption={{ key: 'Male', value: 'Male' }}
                    />
                </View>


                <TouchableOpacity style={styles.textFieldStyle}
                    // onPress={handleSubmit(toggleAddress)}
                    onPress={() => router.push('/profilePage/CurrentAddress')}
                >
                    {
                        !address ?
                            <View style={styles.innerTextField}>
                                <Text style={styles.textStyle}>{data?.address ? data?.address : "Your Address"}</Text>
                                {data?.address === null && <AntDesign name='exclamationcircle' size={hp(2)} color={'red'} />}
                            </View>
                            :
                            <View style={styles.innerTextField}>
                                <Text style={styles.textStyle}>{address}</Text>
                            </View>

                    }

                </TouchableOpacity>
                {
                    addressError && <View style={styles.errorViewStyle}>
                        <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                        <Text style={styles.errorStyle} >Address is required.</Text>
                    </View>
                }
                {/* Full Name is requred */}
                <View style={styles.footer}>
                    <TouchableOpacity style={defaultStyles.footerBtn}
                        onPress={handleSubmit(onSubmit)}
                    >
                        {btnLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Update</Text>}
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
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
        fontSize: hp(2),
        paddingVertical: hp(1),
    },
    innerTextField: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    footer: {
        alignItems: 'center',
        marginTop: hp(4)
    },
    footerbtn: {
        width: wp(90),
        height: hp(6.5),
        backgroundColor: "#0A5CA8",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(10)
    },
    footerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: '#FFFFFF'
    },
    boxStyles: {
        borderColor: '#FFFFFF',
        backgroundColor: "#FAFAFA",
        minHeight: hp(7.5),
        maxHeight: hp(8),
        borderWidth: 0.5,
        borderRadius: 6,
        alignItems: 'center'
    },
    dropdownStyles: {
        borderColor: '#DADADA',
        borderRadius: 6,
        borderWidth: 0.5,
    },
    dropdownTextStyles: {
        fontFamily: "UrbanistSemiBold",
        fontSize: hp(2),
        marginTop: hp(2),
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
        paddingHorizontal: wp(1),
    },
})