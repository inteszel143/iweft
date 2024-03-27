import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { SubscriptionData } from '@/constants/profile/data';

export default function Subscription() {
    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Subscriptions</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={styles.containerStyle}>
                <Text style={styles.titleText}>Active</Text>
            </View>

            {
                SubscriptionData.map((item, index) => {
                    if (item.active) {
                        return (
                            <Link href={'/profilePage/SubscriptionSummary'} asChild key={index}>
                                <TouchableOpacity style={styles.cardRow}>
                                    <View style={styles.cardRowStyle}>
                                        <View style={styles.leftInner}>
                                            <Image
                                                source={item.img}
                                                resizeMode='contain'
                                                style={styles.imageStyle}
                                            />
                                            <View style={{ width: wp(50) }}>
                                                <Text style={styles.titleStyle} >{item.title}</Text>
                                                <Text style={styles.subStyle}>{item.subtitle}</Text>
                                                <Text style={styles.subStyle}>{item.renew}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Feather name='chevron-right' size={hp(2.5)} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Link>
                        )
                    }
                })
            }



            <View style={styles.containerStyle}>
                <Text style={styles.titleText}>Inactive</Text>
            </View>



            {
                SubscriptionData.map((item, index) => {
                    if (!item.active) {
                        return (
                            <Link href={'/profilePage/SubscriptionSummary'} asChild key={index}>
                                <TouchableOpacity style={styles.cardRow}>
                                    <View style={styles.cardRowStyle}>
                                        <View style={styles.leftInner}>
                                            <Image
                                                source={item.img}
                                                resizeMode='contain'
                                                style={styles.imageStyle}
                                            />
                                            <View style={{ width: wp(50) }}>
                                                <Text style={styles.titleStyle} >{item.title}</Text>
                                                <Text style={styles.subStyle}>{item.subtitle}</Text>
                                                <Text style={styles.subStyle}>{item.renew}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Feather name='chevron-right' size={hp(2.5)} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Link>
                        )
                    }
                })
            }




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
        marginTop: hp(3),
        paddingHorizontal: wp(5),
    },
    titleText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2.2)
    },
    cardStyle: {
        width: wp(100),
        backgroundColor: "#F9F9F9",
        paddingVertical: hp(2),
    },
    cardRow: {
        alignSelf: 'center',
        width: wp(92),
        paddingVertical: hp(2),
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: wp(4),
        marginTop: hp(3),
        paddingHorizontal: wp(5),
    },
    cardRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    imageStyle: {
        width: wp(20),
        height: hp(10)
    },
    leftInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
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