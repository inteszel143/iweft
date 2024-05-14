import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
import { AntDesign } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

export default function EditProflieData() {
    const isFocused = useIsFocused();
    const { data, isFetching } = useUserQuery(isFocused);
    const phoneInput = useRef<PhoneInput>(null);
    const [value, setValue] = useState('');
    const [formattedValue, setFormattedValue] = useState(""); // Phone value
    const [gender, setGender] = useState(""); // Gender Value
    const [contry, setCountry] = useState(""); // Country Value
    const [date, setDate] = useState(new Date(data?.dob));
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const [open, setOpen] = useState(false);
    const dateVal = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`; // DOB value

    const schema = yup.object().shape({
        full_name: yup.string().required('Full Name is requred').default(data?.fullname as string),
        n_name: yup.string().required('Nickname is requred').default(data?.nickname as string),
        email: yup.string().email('Invalid email').required('Email is required').default(data?.email as string),
    });
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const toggleAddress = async () => {
        router.push({
            pathname: '/profilePage/CurrentAddress',
            params: { latitude: data?.latitude, longitude: data?.longitude }
        })
    };

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? hp(14) : hp(17) }}
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

                {/* <View style={styles.textFieldStyle}>
                    <View style={styles.innerTextField}>
                        <Text style={styles.textStyle}>United Arab Emirates</Text>
                        <Ionicons name='caret-down' size={hp(2)} />
                    </View>
                </View> */}

                {/* Country */}
                <View style={{ marginTop: hp(3) }}>
                    <SelectList
                        setSelected={(val: React.SetStateAction<null>) => setCountry(val)}
                        data={country}
                        save="value"
                        placeholder='Country'
                        search={false}
                        boxStyles={styles.boxStyles}
                        inputStyles={{ fontFamily: "UrbanistSemiBold", fontSize: hp(2), }}
                        dropdownStyles={styles.dropdownStyles}
                        dropdownTextStyles={styles.dropdownTextStyles}
                        maxHeight={300}
                        defaultOption={{ key: 'Philippines', value: 'Philippines' }}
                    />
                </View>



                <View>
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
                </View>



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


                <TouchableOpacity style={styles.textFieldStyle} onPress={toggleAddress}>
                    <View style={styles.innerTextField}>
                        <Text style={styles.textStyle}>{data?.address ? data?.address : "Your Address"}</Text>
                        {data?.address === null && <AntDesign name='exclamationcircle' size={hp(2)} color={'red'} />}
                    </View>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <TouchableOpacity style={defaultStyles.footerBtn}>
                        <Text style={defaultStyles.footerText}>Update</Text>
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
})