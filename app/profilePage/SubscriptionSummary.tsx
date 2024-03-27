import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function SubscriptionSummary() {
    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Subscription Summary</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>



            <View style={[styles.summarCard, { marginTop: hp(3) }]}>
                <View style={styles.summarRow}>
                    <Text style={styles.summaryLabel}>Services</Text>
                    <Text style={styles.summaryValue}>Clean/Press</Text>
                </View>
                <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                    <Text style={styles.summaryLabel}>Subscription Plan </Text>
                    <Text style={styles.summaryValue}>Premium</Text>
                </View>
                <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                    <Text style={styles.summaryLabel}>Renewal Date</Text>
                    <Text style={styles.summaryValue}>Dec 23, 2024 | 10: 00 AM</Text>
                </View>
                <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                    <Text style={styles.summaryLabel}>Number of Services</Text>
                    <Text style={styles.summaryValue}>5 per Month</Text>
                </View>
            </View>

            <View style={[styles.summarCard, { marginTop: hp(3) }]}>
                <View style={styles.summarRow}>
                    <Text style={styles.summaryLabel}>Monthly Subscription Fee</Text>
                    <Text style={styles.summaryValue}>AED 1,499.00</Text>
                </View>
                <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                    <Text style={[styles.summaryLabel, { color: '#2F75B5' }]}>Promo </Text>
                    <Text style={[styles.summaryValue, { color: '#0A5CA8' }]}>- AED 199.00</Text>
                </View>
                <View style={styles.separator} />
                <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                    <Text style={styles.summaryLabel}>Total</Text>
                    <Text style={styles.summaryValue}>AED 1,300.00</Text>
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




        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
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
        backgroundColor: '#EEEEEE',
        marginTop: hp(3),
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


    cardTextStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
        color: "#0A5CA8"
    },
})