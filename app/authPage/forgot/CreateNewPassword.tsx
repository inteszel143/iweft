import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ChangePasswordSuccessModal from '@/components/ChangePasswordSuccessModal';

export default function CreateNewPassword() {

    const [passwordF, setPasswordF] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const toggleModal = () => {
        setBtnLoading(true);
        setTimeout(() => {
            setBtnLoading(false);
            setModalVisible(true);
        }, 2000);
    }

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




            <View>
                <Image source={require('@/assets/temp/forgot.jpg')} resizeMode='contain' style={{ width: wp(100), height: hp(40) }} />
            </View>


            <View style={styles.containerStyle}>
                <Text style={[styles.titleStyle, { marginTop: hp(2) }]}>Create Your New Password</Text>



                <View style={[styles.textField, { backgroundColor: passwordF ? '#0A5CA826' : '#FAFAFA', borderColor: passwordF ? '#0A5CA8' : '#FAFAFA' }]}  >
                    <View style={styles.innerField}>
                        <Ionicons name='mail' size={hp(2.5)} color={passwordF ? '#0A5CA8' : '#9E9E9E'} />
                        <TextInput placeholder='New Password' style={styles.textInputStyle} onFocus={() => setPasswordF(true)} onBlur={() => setPasswordF(false)} />
                        <TouchableOpacity>
                            <Ionicons name='eye-off' size={hp(2.5)} color={passwordF ? '#0A5CA8' : '#9E9E9E'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.textField, { backgroundColor: passwordF ? '#0A5CA826' : '#FAFAFA', borderColor: passwordF ? '#0A5CA8' : '#FAFAFA' }]}  >
                    <View style={styles.innerField}>
                        <Ionicons name='mail' size={hp(2.5)} color={passwordF ? '#0A5CA8' : '#9E9E9E'} />
                        <TextInput placeholder='Confirm Password' style={styles.textInputStyle} onFocus={() => setPasswordF(true)} onBlur={() => setPasswordF(false)} />
                        <TouchableOpacity>
                            <Ionicons name='eye-off' size={hp(2.5)} color={passwordF ? '#0A5CA8' : '#9E9E9E'} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            <View style={styles.BtnStyle}>
                <TouchableOpacity style={styles.btnBoxStyle} onPress={toggleModal}>
                    {btnLoading ? <ActivityIndicator size={'small'} color={'#FFFFFF'} /> : <Text style={styles.btnText}>Continue</Text>}
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
        paddingHorizontal: wp(5)
    },


    titleStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2),
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
    }
})