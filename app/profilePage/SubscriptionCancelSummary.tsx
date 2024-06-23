import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, useLocalSearchParams } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useGetUserSubById } from '@/query/stripeQuery';
import SubSummarySkeleton from '@/components/skeleton/SubSummarySkeleton';
import numeral from 'numeral';
export default function SubscriptionCancelSummary() {
    const { subId } = useLocalSearchParams();
    const isFocused = useIsFocused();
    const { data, isFetching } = useGetUserSubById(subId, isFocused);
    const formatDate = (unixTimestamp: number) => {
        const date = new Date(unixTimestamp * 1000);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options as any);
    };
    const formatTime = (unixTimestamp: number) => {
        const date = new Date(unixTimestamp * 1000);
        const options = { hour: '2-digit', minute: '2-digit', hour12: true }; // Change hour12 to true for 12-hour format
        return date.toLocaleTimeString('en-US', options as any);
    };


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


            {
                isFetching ? <SubSummarySkeleton /> :
                    <View>
                        <View style={[styles.summarCard, { marginTop: hp(3) }]}>
                            <View style={[styles.summarRow]}>
                                <Text style={styles.summaryLabel}>Subscription Plan </Text>
                                <Text style={styles.summaryValue}>{data?.plan?.product?.name}</Text>
                            </View>
                            <View style={[styles.summarRow, { marginTop: hp(4) }]}>
                                <Text style={styles.summaryLabel}>Renewal Date</Text>
                                <Text style={styles.summaryValue}>{formatDate(data?.current_period_end)} | {formatTime(data?.current_period_end)}</Text>
                            </View>
                            <View style={[styles.summarRow, { marginTop: hp(4) }]}>
                                <Text style={styles.summaryLabel}>Number of Services</Text>
                                <Text style={styles.summaryValue}>{data?.plan?.product?.description}</Text>
                            </View>
                        </View>


                        <View style={[styles.summarCard, { marginTop: hp(3) }]}>
                            <View style={styles.summarRow}>
                                <Text style={styles.summaryLabel}>Monthly Subscription Fee</Text>
                                <Text style={styles.summaryValue}>AED {numeral(data?.plan?.amount / 100).format('0,0')}</Text>
                            </View>
                            <View style={styles.separator} />
                            <View style={[styles.summarRow, { marginTop: hp(4) }]}>
                                <Text style={styles.summaryLabel}>Total</Text>
                                <Text style={styles.summaryValue}>AED {numeral(data?.plan?.amount / 100).format('0,0')}</Text>
                            </View>
                        </View>

                        <View style={[styles.summarCard, { marginTop: hp(3) }]}>
                            <View style={styles.summarRow}>
                                <Text style={styles.summaryLabel}>Cancelled Date:</Text>
                                <Text style={[styles.summaryValue]}>{formatDate(data?.canceled_at)} || {formatTime(data?.canceled_at)}</Text>
                            </View>
                            <View style={styles.separator} />
                            <View style={[styles.summarRow, { marginTop: hp(4) }]}>
                                <Text style={styles.summaryLabel}>Cancelled At: </Text>
                                <Text style={[styles.summaryValue, { color: '#F75555' }]}>{formatDate(data?.cancel_at)} || {formatTime(data?.cancel_at)}</Text>
                            </View>
                        </View>


                    </View>
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

    separator: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginTop: hp(3),
    },
    footer: {
        alignItems: 'center',
        marginTop: hp(6),
    },

    summarCard: {
        width: wp(90),
        paddingVertical: hp(4),
        paddingHorizontal: wp(6),
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: wp(4),
        alignSelf: 'center'
    },
    summarRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    summaryLabel: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2),
        color: '#616161'
    },
    summaryValue: {
        flex: 1,
        textAlign: 'right',
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