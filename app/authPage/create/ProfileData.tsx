import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, Modal, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { defaultStyles } from '@/constants/Styles';
import DateTimePicker from '@react-native-community/datetimepicker';
export default function ProfileData() {
    const phoneInput = useRef<PhoneInput>(null);
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const onChange = (event: any, selectedDate: any) => {
        setShowPicker(false);
        setDate(selectedDate);
    };


    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
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
                        <Text style={styles.modalTitle}>Add Profile Picture</Text>

                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#0A5CA8' }]}>
                            <Text style={[styles.modalText, { color: '#FFFFFF' }]}>Take Photo</Text>
                        </TouchableOpacity >


                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#0A5CA8' }]}>
                            <Text style={[styles.modalText, { color: '#FFFFFF' }]}>Choose Photo</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#F75555' }]}>
                            <Text style={[styles.modalText, { color: '#FFFFFF' }]}>Delete Photo</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#DAE7F2' }]}
                            onPress={toggleModal}
                        >
                            <Text style={[styles.modalText, { color: '#0A5CA8' }]}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    };


    return (
        <View style={styles.container}>
            {ModalProfile()}
            {/* {ModalDatePicker()} */}
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Fill Your Profile</Text>
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


                <View style={styles.headerStyle}>
                    <Image source={require('@/assets/temp/default.jpg')} resizeMode='contain' style={{ width: wp(40), height: hp(16) }} />
                    <TouchableOpacity style={styles.editBtn}
                        onPress={toggleModal}
                    >
                        <FontAwesome5 name='pen' color={'white'} />
                    </TouchableOpacity>
                </View>


                <View style={{ alignItems: 'center' }}>
                    {/* Fullname */}
                    <View style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                        <View style={defaultStyles.innerField}>
                            <TextInput
                                placeholder='Full Name'
                                placeholderTextColor={'#9E9E9E'}
                                style={defaultStyles.textInputStyle}
                            />
                        </View>
                    </View>

                    {/* Nickname */}
                    <View style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                        <View style={defaultStyles.innerField}>
                            <TextInput
                                placeholder='Nickname'
                                placeholderTextColor={'#9E9E9E'}
                                style={defaultStyles.textInputStyle}
                            />
                        </View>
                    </View>
                    {/* DateofBirth */}
                    <TouchableOpacity onPress={() => setShowPicker(true)} >
                        <View style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                            <View style={defaultStyles.innerField}>
                                <Text style={[defaultStyles.textInputStyle]} >{formattedDate}</Text>
                                {showPicker && (
                                    <DateTimePicker
                                        value={date}
                                        mode="date"
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}

                                <TouchableOpacity>
                                    <Image source={require('@/assets/temp/profileicons/calendar.jpg')} resizeMode='contain' style={{ width: wp(5) }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Email */}
                    <View style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                        <View style={defaultStyles.innerField}>
                            <TextInput
                                placeholder='Email'
                                placeholderTextColor={'#9E9E9E'}
                                style={defaultStyles.textInputStyle}
                            />
                            <Ionicons name='mail-outline' size={hp(2.4)} />
                        </View>
                    </View>


                    {/* Phone */}
                    <View>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={value}
                            defaultCode="AE"
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


                    {/* Location */}
                    <TouchableOpacity onPress={() => router.push('/authPage/create/YourAddress')}>
                        <View style={[defaultStyles.textField, { backgroundColor: "#FAFAFA", borderColor: "#FAFAFA" }]}>
                            <View style={defaultStyles.innerField}>
                                <TextInput
                                    placeholder='Address'
                                    placeholderTextColor={'#9E9E9E'}
                                    editable={false}
                                    style={defaultStyles.textInputStyle} />
                                <Ionicons name='location-outline' size={hp(2.4)} />
                            </View>
                        </View>
                    </TouchableOpacity>


                </View>






                <View style={styles.footer} >
                    <Link href={'/authPage/create/CreateNewPIN'} asChild>
                        <TouchableOpacity style={styles.footerBtn}>
                            <Text style={styles.footerText}>Continue</Text>
                        </TouchableOpacity>
                    </Link>
                </View>


            </KeyboardAwareScrollView >



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
        backgroundColor: "#0A5CA8",
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
        height: Platform.OS === 'ios' ? hp(48) : hp(50),
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
        marginTop: hp(4),
        alignItems: 'center'
    },
    footerBtn: {
        width: wp(90),
        height: hp(7),
        borderRadius: wp(10),
        backgroundColor: '#0A5CA8',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: '#FFFFFF'
    }
});


