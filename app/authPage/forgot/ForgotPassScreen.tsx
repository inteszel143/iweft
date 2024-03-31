import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { forgot } from '@/constants/home/data';

export default function ForgotPassScreen() {

    const [selected, setSelected] = useState(3);

    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Forgot Password</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>



            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(12) }}>

                <View>
                    <Image source={require('@/assets/temp/forgot.jpg')} resizeMode='contain' style={{ width: wp(100), height: hp(40) }} />
                </View>

                <View style={styles.dataStyle}>
                    <Text style={styles.dataTextStyle} >Select which contact details should we use to reset your password</Text>
                </View>



                {
                    forgot.map((item, index) => (
                        <TouchableOpacity style={[styles.boxStyle, { backgroundColor: selected === index ? '#DAE7F2' : '#FFFFFF' }]} key={index}
                            onPress={() => setSelected(index)}
                        >
                            <View style={styles.innerBox}>
                                <View style={styles.btnStyle}>
                                    <Ionicons name={item.icon} size={hp(3)} color={'#0a5ca8'} />
                                </View>
                                <View>
                                    <Text style={styles.viaText}>via {item.via}:</Text>
                                    <Text style={styles.numberStyle}>{item.value}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }


            </ScrollView>

            <View style={styles.footer}>
                <Link href={'/authPage/forgot/ForgotCode'} asChild>
                    <TouchableOpacity style={styles.footerBtn}>
                        <Text style={styles.footerText}>Continue</Text>
                    </TouchableOpacity>
                </Link>
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


    dataStyle: {
        paddingHorizontal: wp(5)
    },
    dataTextStyle: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(2),
        marginTop: hp(1)
    },
    boxStyle: {
        width: wp(90),
        height: hp(14),
        borderRadius: wp(4),
        borderWidth: 2,
        borderColor: "#0A5CA8",
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: hp(3),
        paddingHorizontal: wp(5),
    },
    innerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(5)
    },
    btnStyle: {
        width: wp(18),
        height: wp(18),
        borderRadius: wp(9),
        backgroundColor: "#DAE7F2",
        alignItems: 'center',
        justifyContent: 'center'
    },
    viaText: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.6),
        color: '#757575'
    },
    numberStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        marginTop: hp(1)
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(10),
        // backgroundColor: '#FFFFFF',
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
        fontFamily: "UrbanistBold",
        fontSize: hp(2),
        color: '#FFFFFF'
    }

})