import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform, Linking } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { notification } from '@/constants/home/data';
import { useIsFocused } from '@react-navigation/native';
import { useHomeNotification } from '@/query/notifQuery';
import { formatDate } from '@/utils/format';

export default function Notification() {
    const isFocused = useIsFocused();
    const { data, isPending } = useHomeNotification(isFocused);


    const payment = require("@/assets/temp/notif/notif1.png");
    const newBundle = require("@/assets/temp/notif/notif2.png");
    const specialOffers = require("@/assets/temp/notif/notif3.png");
    const newAccount = require("@/assets/temp/notif/notif4.png")



    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Notification</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    data.map((item: any, index: any) => {
                        const today = new Date()
                        const dateOnly = today.toISOString().split("T")[0];
                        if (dateOnly === item?.created_at.split("T")[0]) {
                            return (
                                <View style={styles.containerStyle} key={index}>
                                    <Text style={styles.titleText}>Today</Text>
                                    <TouchableOpacity style={[styles.cardRow, { backgroundColor: item?.is_read ? '#FFFFFF' : '#DAE7F2' }]}
                                        onPress={() => router.push({
                                            pathname: '/homePage/NotificationReview',
                                            params: { notifId: item?._id }
                                        })}
                                    >
                                        <View style={styles.cardInner}>
                                            <Image
                                                source={item?.title === "Payment Successful!" ? payment : newBundle}
                                                resizeMode='contain'
                                                style={styles.imageStyle}
                                            />
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.titleStyle}>{item.title}</Text>
                                                <Text style={styles.subStyle}>{item.message}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            );
                        } else {
                            return (
                                <View style={styles.containerStyle} key={index}>
                                    <Text style={[styles.titleText, { marginTop: hp(3) }]}>Yesterday</Text>
                                    <TouchableOpacity style={[styles.cardRow, { backgroundColor: item?.is_read ? '#FFFFFF' : '#DAE7F2' }]}>
                                        <View style={styles.cardInner}>
                                            <Image
                                                source={item?.title === "Payment Successful!" ? payment : newBundle}
                                                resizeMode='contain'
                                                style={styles.imageStyle}
                                            />
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.titleStyle}>{item.title}</Text>
                                                <Text style={styles.subStyle}>{item.message}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        }
                    })
                }

            </ScrollView >


        </View >
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





    containerStyle: {
        paddingHorizontal: wp(6),
        marginTop: hp(3),
    },
    titleText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2)
    },
    cardRow: {
        alignSelf: 'center',
        width: wp(92),
        paddingVertical: hp(2),
        justifyContent: 'center',
        borderRadius: wp(4),
        marginTop: hp(2),
        paddingHorizontal: wp(5),
    },
    cardInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(5)
    },
    imageStyle: {
        width: wp(20),
        height: hp(10)
    },
    titleStyle: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.1)
    },
    subStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: "#616161",
        marginTop: hp(1),
    }

})