import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { paymentMethods } from '@/constants/booking/data';
import { Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useGetEReceipt } from '@/query/stripeQuery';
import { formatDate, formatNumber, formatTime } from '@/utils/format';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function BookingSummary() {
    const { t } = useTranslation();
    const current = getCurrentLanguage();
    const { orderId } = useLocalSearchParams();
    const isFocused = useIsFocused();
    const { data, isFetching } = useGetEReceipt(isFocused, orderId as string);
    const [hidden, setHidden] = useState<boolean>(false);
    const toggleHidden = () => {
        setHidden(!hidden);
    }

    return (
        <View style={styles.container}>


            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Booking Summary</Text>
                    </View>
                </View>
            </View>


            {
                isFetching ? <View style={styles.fetchStyle}>
                    <ActivityIndicator size={'large'} color={'gray'} />
                    <Text style={styles.fetchText}>{t('Generating Booking Summary')}</Text>
                </View>
                    :
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(1) }}>
                        <View style={[styles.summarCard, { marginTop: hp(3) }]}>
                            <View style={styles.summarRow}>
                                <Text style={styles.summaryLabel}>Services</Text>
                                <Text style={styles.summaryValue}>{data?.trm_order?.service?.service?.title}</Text>
                            </View>
                            <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                                <Text style={styles.summaryLabel}>Category</Text>
                                <Text style={styles.summaryValue}>{data?.trm_order?.service?.service?.sub_title}</Text>
                            </View>

                            <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                                <Text style={styles.summaryLabel}>Date & Time</Text>
                                <Text style={styles.summaryValue}>{formatDate(data?.trm_charge?.date)} | {formatTime(data?.trm_charge?.date)}</Text>
                            </View>
                            <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                                <Text style={styles.summaryLabel}>Working Hours</Text>
                                <Text style={styles.summaryValue}>2 hours</Text>
                            </View>
                        </View>


                        {
                            data?.trm_customer_subscriptions?.subscription && <View style={[styles.summarCard, { marginTop: hp(2) }]}>
                                <TouchableOpacity style={styles.summarRow}
                                    onPress={toggleHidden}
                                >
                                    <Text style={styles.summaryLabel}>Subscription Details</Text>
                                    <Entypo name='chevron-thin-down' size={hp(2)} />
                                </TouchableOpacity>
                                {
                                    hidden && <Animated.View
                                        entering={FadeInUp.duration(200).damping(2)}
                                        style={styles.hiddenBox}>
                                        <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                                            <Text style={styles.summaryLabel}>{t('Subscription Plan')} </Text>
                                            <Text style={styles.summaryValue}>{data?.trm_customer_subscriptions?.subscription}</Text>
                                        </View>
                                    </Animated.View>
                                }

                            </View>
                        }




                        <View style={[styles.summarCard, { marginTop: hp(2) }]}>
                            <View style={[styles.summarRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                                <Text style={styles.summaryLabel}>{t('Amount')}</Text>
                                <Text style={styles.summaryValue}>{t('AED')} {formatNumber(data?.trm_charge?.amount / 100)}.00</Text>
                            </View>
                            <View style={[styles.summarRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', marginTop: hp(3) }]}>
                                <Text style={[styles.summaryLabel, { color: '#0a5ca8' }]}>{t('Promo')}</Text>
                                <Text style={[styles.summaryValue, { color: '#0a5ca8' }]}>- {t('AED')} {formatNumber(0)}.00</Text>
                            </View>

                            <View style={styles.separator} />

                            <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                                <Text style={styles.summaryLabel}>Total</Text>
                                <Text style={styles.summaryValue}>{t('AED')} {formatNumber(data?.trm_charge?.amount / 100)}.00</Text>
                            </View>
                        </View>


                        <View style={[styles.summarCard, { marginTop: hp(2) }]}>
                            <TouchableOpacity style={styles.summarRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                                    <Image source={require('@/assets/temp/bookingIcon/mastercard.jpg')} resizeMode='contain' style={{ width: wp(8) }} />
                                    <Text style={styles.cardTextStyle}> {data?.trm_charge?.payment_method}</Text>
                                </View>
                                {/* <TouchableOpacity>
                                    <Text style={styles.btnText}>Change</Text>
                                </TouchableOpacity> */}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
            }





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
    fetchStyle: {
        flex: 1,
        alignItems: 'center',
        marginTop: hp(35),
    },
    fetchText: {
        fontFamily: "UrbanistSemiBold",
        fontSize: hp(2),
        marginTop: hp(1.5),
        // color: "#616161"
    },
    hiddenBox: {
        backgroundColor: 'white',
        marginTop: hp(1)
    }


})