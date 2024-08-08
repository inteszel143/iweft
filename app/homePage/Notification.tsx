import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform, Linking } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { notification } from '@/constants/home/data';

export default function Notification() {

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
                <View style={styles.containerStyle} >
                    <Text style={styles.titleText}>Today</Text>
                    {
                        notification.map((item, index) => {
                            return (
                                <TouchableOpacity style={styles.cardRow} key={index}>
                                    <View style={styles.cardInner}>
                                        <Image
                                            source={item.img}
                                            resizeMode='contain'
                                            style={styles.imageStyle}
                                        />
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.titleStyle}>{item.title}</Text>
                                            <Text style={styles.subStyle}>{item.sub}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }


                    <Text style={[styles.titleText, { marginTop: hp(3) }]}>Yesterday</Text>
                    {
                        notification.map((item, index) => {
                            return (
                                <Link href={'/bookingPage/Ereceipt'} asChild key={index}>
                                    <TouchableOpacity style={styles.cardRow}>
                                        <View style={styles.cardInner}>
                                            <Image
                                                source={item.img}
                                                resizeMode='contain'
                                                style={styles.imageStyle}
                                            />
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.titleStyle}>{item.title}</Text>
                                                <Text style={styles.subStyle}>{item.sub}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Link>
                            )
                        })
                    }
                </View>
            </ScrollView>


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
        backgroundColor: '#FFFFFF',
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