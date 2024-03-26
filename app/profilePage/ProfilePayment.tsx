import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { paymentMethods } from '@/constants/booking/data';
import { Fontisto } from '@expo/vector-icons';
export default function ProfilePayment() {


    return (
        <View style={styles.container}>



            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Payment</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>





            <View style={styles.selectedStyle}>
                {
                    paymentMethods.map((item, index) => {
                        return (
                            <TouchableOpacity style={styles.selectedRow} key={index}
                            // onPress={() => setIsSelected(item.id)}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                                        <Image source={item.icon} resizeMode='contain' style={{ width: wp(8) }} />
                                        <Text style={styles.selectedText}>{item.label}</Text>
                                    </View>

                                    <TouchableOpacity>
                                        <Text style={styles.connectedStyle}>Connected</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>




            <View style={styles.footer} >
                <Link href={'/profilePage/AddNewCard'} asChild>
                    <TouchableOpacity style={styles.footerBtn}>
                        <Text style={styles.footerText}>Add New Card</Text>
                    </TouchableOpacity>
                </Link>
            </View>






        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
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

    headerCard: {
        width: wp(56),
        height: hp(20),
        position: 'absolute',
        top: hp(11.5),
        right: wp(5),
        borderRadius: wp(6),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        paddingHorizontal: wp(4),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        height: hp(5),
    },
    cardText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.9)
    },
    separator: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginHorizontal: wp(2),
        marginTop: 4,
    },


    selectedStyle: {
        paddingHorizontal: wp(6),
        marginTop: hp(2),
    },
    selectedRow: {
        marginTop: hp(2.5),
        backgroundColor: 'white',
        height: hp(12),
        justifyContent: 'center',
        borderRadius: wp(6),
        paddingHorizontal: wp(6)
    },
    selectedText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.1),
    },
    connectedStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
        color: '#0A5CA8'
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: Platform.OS === 'ios' ? hp(14) : hp(12),
        alignItems: 'center'
    },
    footerBtn: {
        width: wp(90),
        height: hp(7),
        backgroundColor: "#0A5CA8",
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