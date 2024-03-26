import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import PhoneInput from "react-native-phone-number-input";
import { Link } from 'expo-router';
export default function EditProflieData() {
    const phoneInput = useRef<PhoneInput>(null);
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");

    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? hp(3) : hp(6) }}
            bounces={false}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ alignItems: 'center' }}
            >
                <View style={styles.textFieldStyle}>
                    <Text style={styles.textStyle}>Andrew Ainsley</Text>
                </View>

                <View style={styles.textFieldStyle}>
                    <Text style={styles.textStyle}>Andrew</Text>
                </View>


                <View style={styles.textFieldStyle}>
                    <View style={styles.innerTextField}>
                        <Text style={styles.textStyle}>12/27/1995</Text>
                        <TouchableOpacity>
                            <Image source={require('@/assets/temp/profileicons/calendar.jpg')} resizeMode='contain' style={{ width: wp(5) }} />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.textFieldStyle}>
                    <View style={styles.innerTextField}>
                        <Text style={styles.textStyle}>andrew_ainsley@yourdomain.com</Text>
                        <TouchableOpacity>
                            <Image source={require('@/assets/temp/profileicons/profileEmail.jpg')} resizeMode='contain' style={{ width: wp(5) }} />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.textFieldStyle}>
                    <View style={styles.innerTextField}>
                        <Text style={styles.textStyle}>United Arab Emirates</Text>
                        <Ionicons name='caret-down' size={hp(2)} />
                    </View>
                </View>


                <View style={styles.textFieldStyle}>
                    <View style={styles.innerTextField}>
                        <Text style={styles.textStyle}>Male</Text>
                        <Ionicons name='caret-down' size={hp(2)} />
                    </View>
                </View>

                <View>
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={value}
                        defaultCode="KW"
                        layout="first"
                        onChangeText={(text) => {
                            setValue(text);
                        }}
                        onChangeFormattedText={(text) => {
                            setFormattedValue(text);
                        }}
                        textInputStyle={{ fontFamily: 'UrbanistSemiBold', fontSize: hp(2) }}
                        codeTextStyle={{ fontFamily: 'UrbanistSemiBold', fontSize: hp(2) }}
                        flagButtonStyle={{ backgroundColor: '#FAFAFA', paddingLeft: wp(4), }}
                        containerStyle={{ borderRadius: wp(6), width: wp(90), marginTop: hp(3), minHeight: hp(7.5), maxHeight: hp(8), }}
                    />
                </View>



                <Link href={'/profilePage/CurrentAddress'} asChild>
                    <TouchableOpacity style={styles.textFieldStyle}>
                        <Text style={styles.textStyle}>267 New Avenue Park, Downtown, Dubai</Text>
                    </TouchableOpacity>
                </Link>


                <View style={styles.footer}>
                    <TouchableOpacity style={styles.footerbtn}>
                        <Text style={styles.footerText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>

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
        fontFamily: "UrbanistSemiBold",
        fontSize: hp(2)
    },
    innerTextField: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    footer: {
        marginTop: hp(6),
        alignItems: 'center'
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
    }
})