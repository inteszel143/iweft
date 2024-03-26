import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { Fontisto, Ionicons } from '@expo/vector-icons';

export default function ChangePassword() {
    return (
        <View style={styles.container}>

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
                        <View style={{ marginTop: hp(3) }}>
                            <Text style={styles.containerText} >Enter Your Old Password</Text>
                            <View style={styles.textFieldStyle}>
                                <View style={styles.innerTextField}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                                        <Fontisto name='locked' size={hp(2)} />
                                        <TextInput placeholder='Enter here..' secureTextEntry={true} style={{ width: wp(60), fontFamily: 'UrbanistMedium', fontSize: hp(2) }} />
                                    </View>
                                    <TouchableOpacity>
                                        <Ionicons name='eye-off' size={hp(2.4)} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: hp(3) }}>
                            <Text style={styles.containerText} >Enter Your New Password</Text>
                            <View style={styles.textFieldStyle}>
                                <View style={styles.innerTextField}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                                        <Fontisto name='locked' size={hp(2)} />
                                        <TextInput placeholder='Enter here..' secureTextEntry={true} style={{ width: wp(60), fontFamily: 'UrbanistMedium', fontSize: hp(2) }} />
                                    </View>
                                    <TouchableOpacity>
                                        <Ionicons name='eye-off' size={hp(2.4)} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: hp(3) }}>
                            <Text style={styles.containerText} >Confirm Your Password</Text>
                            <View style={styles.textFieldStyle}>
                                <View style={styles.innerTextField}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                                        <Fontisto name='locked' size={hp(2)} />
                                        <TextInput placeholder='Enter here..' secureTextEntry={true} style={{ width: wp(60), fontFamily: 'UrbanistMedium', fontSize: hp(2) }} />
                                    </View>
                                    <TouchableOpacity>
                                        <Ionicons name='eye-off' size={hp(2.4)} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                </View>
            </ScrollView>



            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerBtn}>
                    <Text style={styles.footerText}>Confirm</Text>
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
        height: hp(12),
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
    }
})