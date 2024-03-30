import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { paymentMethods } from '@/constants/booking/data';
import { Entypo } from '@expo/vector-icons';

export default function HomeReviewSummary() {
    return (
        <View style={styles.container}>


            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Review Summary</Text>
                    </View>
                </View>
            </View>



            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(2) }}>

                <View style={[styles.summarCard, { marginTop: hp(3) }]}>
                    <View style={styles.summarRow}>
                        <Text style={styles.summaryLabel}>Services</Text>
                        <Text style={styles.summaryValue}>Clean/Press</Text>
                    </View>
                    <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                        <Text style={styles.summaryLabel}>Category</Text>
                        <Text style={styles.summaryValue}>Premium Bundle</Text>
                    </View>
                    <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                        <Text style={styles.summaryLabel}>Subscription Plan </Text>
                        <Text style={styles.summaryValue}>Basic</Text>
                    </View>
                    <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                        <Text style={styles.summaryLabel}>Date & Time</Text>
                        <Text style={styles.summaryValue}>Dec 23, 2024 | 10: 00 AM</Text>
                    </View>
                    <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                        <Text style={styles.summaryLabel}>Working Hours</Text>
                        <Text style={styles.summaryValue}>2 hours</Text>
                    </View>
                </View>



                <View style={[styles.summarCard, { marginTop: hp(2) }]}>
                    <TouchableOpacity style={styles.summarRow}>
                        <Text style={styles.summaryLabel}>Subscription Details</Text>
                        <Entypo name='chevron-thin-down' size={hp(2)} />
                    </TouchableOpacity>
                </View>



                <View style={[styles.summarCard, { marginTop: hp(2) }]}>
                    <View style={styles.summarRow}>
                        <Text style={styles.summaryLabel}>House Cleaning</Text>
                        <Text style={styles.summaryValue}>AED 277.00</Text>
                    </View>
                    <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                        <Text style={styles.summaryLabel}>Promo</Text>
                        <Text style={[styles.summaryValue, { color: '#0a5ca8' }]}>- AED 37.50</Text>
                    </View>

                    <View style={styles.separator} />

                    <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                        <Text style={styles.summaryLabel}>Total</Text>
                        <Text style={[styles.summaryValue]}>AED 125.00</Text>
                    </View>
                </View>



                <View style={[styles.summarCard, { marginTop: hp(2) }]}>
                    <TouchableOpacity style={styles.summarRow}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                            <Image source={require('@/assets/temp/bookingIcon/mastercard.jpg')} resizeMode='contain' style={{ width: wp(8) }} />
                            <Text style={styles.cardTextStyle}>**** **** **** **** 4679</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.btnText}>Change</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </ScrollView>


            <View style={styles.footer}>
                <Link href={'/homePage/HomeConfirmPin'} style={[styles.footerBtn, { backgroundColor: "#0A5CA8", }]} asChild >
                    <TouchableOpacity>
                        <Text style={styles.footerText}>Continue</Text>
                    </TouchableOpacity>
                </Link>
            </View>



        </View >
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
    separator: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginTop: hp(4)
    },

    btnStyle: {

    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
        color: "#0A5CA8"
    },

    cardTextStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
    },


    summarCard: {
        width: wp(90),
        paddingVertical: hp(3),
        paddingHorizontal: wp(6),
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: wp(4),
        alignSelf: 'center'
    },
    summarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    summaryLabel: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2),
        color: '#616161'
    },
    summaryValue: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2)
    },
    status: {
        width: wp(20), height: hp(4), backgroundColor: "#0A5CA826", borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.6),
        color: "#0a5ca8"
    },

    footer: {
        height: Platform.OS === 'ios' ? hp(14) : hp(12),
        backgroundColor: "white",
        alignItems: 'center',
    },
    footerBtn: {
        width: wp(90),
        height: hp(6.4),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(8),
        marginTop: hp(2)
    },
    footerText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
        color: 'white'
    },

})