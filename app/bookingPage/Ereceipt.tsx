import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, useLocalSearchParams } from 'expo-router';
import { eReciept } from '@/constants/booking/data';
import Animated, { BounceIn, FadeOut } from 'react-native-reanimated';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useGetEReceipt } from '@/query/stripeQuery';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import { formatDate, formatNumber, formatTime } from '@/utils/format';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
export default function Ereceipt() {
    const { t } = useTranslation();
    const current = getCurrentLanguage();
    const { orderId } = useLocalSearchParams();
    const isFocused = useIsFocused();
    const { data, isFetching } = useGetEReceipt(isFocused, orderId as string);
    const [cardShow, setCardShow] = useState(false);
    const toggleShowCard = () => {
        setCardShow(!cardShow);
    };
    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={[styles.innerContainer, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                    <View style={[styles.headerLeft, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/booking/')}>
                            {
                                current === 'ar' ? <Image source={require('@/assets/icons/arrowright.png')}
                                    resizeMode='contain' style={{ width: wp(6), height: hp(6.2), marginRight: wp(2) }} />
                                    :
                                    <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                            }
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >{t('E-receipt')}</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={toggleShowCard}>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {
                isFetching ? <View style={styles.fetchStyle}>
                    <ActivityIndicator size={'small'} color={'gray'} />
                    <Text style={styles.fetchText}>{t('Generating E-receipt')}</Text>
                </View>
                    :
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(4) }}>

                        {/* barcode */}
                        {/* <View style={{ alignItems: 'center' }}>
                <Image source={require('@/assets/icons/barcode.png')} resizeMode='contain' style={{ width: wp(100), height: hp(22) }} />
            </View> */}

                        <Barcode
                            format="CODE128"
                            value={`${data?.trm_charge?.transaction_id}`}
                            text={`${data?.trm_charge?.transaction_id}`}
                            width={3}
                            maxWidth={Platform.OS === 'android' ? 310 : 340}
                            height={109}
                            textStyle={{ fontFamily: 'UrbanistMedium', fontSize: hp(1.9), marginTop: hp(1), letterSpacing: wp(1) }}
                            lineColor="#000000"
                            background="transparent"
                            style={{ marginTop: hp(2.5), alignSelf: 'center' }}
                        />


                        <View style={[styles.summarCard, { marginTop: hp(2) }]}>
                            <View style={[styles.summarRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                                <Text style={styles.summaryLabel}>{t('Services')}</Text>
                                <Text style={styles.summaryValue}>{data?.trm_order?.service?.service?.title}</Text>
                            </View>
                            <View style={[styles.summarRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', marginTop: hp(3) }]}>
                                <Text style={styles.summaryLabel}>{t('Category')}</Text>
                                <Text style={styles.summaryValue}>{data?.trm_order?.service?.service?.sub_title}</Text>
                            </View>
                            {
                                data?.trm_customer_subscriptions?.subscription && <View style={[styles.summarRow, { marginTop: hp(3), flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                                    <Text style={styles.summaryLabel}>{t('Subscription Plan')} </Text>
                                    <Text style={styles.summaryValue}>{data?.trm_customer_subscriptions?.subscription}</Text>
                                </View>
                            }

                            <View style={[styles.summarRow, { marginTop: hp(3), flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                                <Text style={styles.summaryLabel}>{t('Date & Time')}</Text>
                                <Text style={styles.summaryValue}>{formatDate(data?.trm_charge?.date)} | {formatTime(data?.trm_charge?.date)}</Text>
                            </View>
                            <View style={[styles.summarRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', marginTop: hp(3) }]}>
                                <Text style={styles.summaryLabel}>{t('Working Hours')}</Text>
                                <Text style={styles.summaryValue}>{t('2 hours')}</Text>
                            </View>
                        </View>

                        <View style={[styles.summarCard, { marginTop: hp(3) }]}>
                            <TouchableOpacity style={[styles.summarRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}
                            >
                                <Text style={styles.summaryLabel}>{t('Subscription Details')}</Text>
                                <Entypo name='chevron-thin-down' size={hp(2)} />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.summarCard, { marginTop: hp(2) }]}>
                            <View style={[styles.summarRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                                <Text style={styles.summaryLabel}>{t('Amount')}</Text>
                                <Text style={styles.summaryValue}>{t('AED')} {formatNumber(data?.trm_charge?.amount / 100)}.00</Text>
                            </View>
                            {
                                data?.trm_order?.discounted_amount && <View style={[styles.summarRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', marginTop: hp(3) }]}>
                                    <Text style={styles.summaryLabel}>{t('Promo Discount')}</Text>
                                    <Text style={[styles.summaryValue, { color: '#0a5ca8' }]}>- {t('AED')} {formatNumber(data?.trm_order?.discounted_amount)}.00</Text>
                                </View>
                            }


                            <View style={[styles.summarRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', marginTop: hp(3) }]}>
                                <Text style={styles.summaryLabel}>{t('Payment Methods')}</Text>
                                <Text style={[styles.summaryValue]}>{data?.trm_charge?.payment_method}</Text>
                            </View>

                            <View style={[styles.summarRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', marginTop: hp(3) }]}>
                                <Text style={styles.summaryLabel}>{t('Date')}</Text>
                                <Text style={[styles.summaryValue]}>{formatDate(data?.trm_charge?.date)} | {formatTime(data?.trm_charge?.date)}</Text>
                            </View>

                            <View style={[styles.summarRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', marginTop: hp(3) }]}>
                                <Text style={styles.summaryLabel}>{t('Transaction ID')}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2) }}>
                                    <Text style={[styles.summaryValue]}>{data?.trm_charge?.transaction_id}</Text>
                                    <TouchableOpacity>
                                        <Ionicons name='copy-outline' size={hp(2.5)} color={'#0A5CA8'} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[styles.summarRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', marginTop: hp(3) }]}>
                                <Text style={styles.summaryLabel}>{t('Status')}</Text>
                                <View style={styles.status}>
                                    <Text style={styles.statusText}>{t('Paid')}</Text>
                                </View>
                            </View>
                        </View>

                    </ScrollView>
            }

            {
                cardShow &&
                <Animated.View style={styles.headerCard}
                    entering={BounceIn}
                    exiting={FadeOut}
                >
                    {
                        eReciept.map((item, index) => (
                            <View key={index}>
                                <TouchableOpacity style={styles.cardRow}>
                                    <Image source={item.icon} resizeMode='contain' style={{ width: wp(5) }} />
                                    <Text style={styles.cardText} >{item.label}</Text>
                                </TouchableOpacity>
                                {item.separator && <View style={styles.separator} />}
                            </View>
                        ))
                    }
                </Animated.View>
            }






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

    headerCard: {
        width: wp(56),
        height: hp(20),
        position: 'absolute',
        top: hp(11.5),
        right: wp(5),
        borderRadius: wp(6),
        backgroundColor: '#FFFFFF',
        // borderWidth: 0.5,
        // borderColor: '#EEEEEE',
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
        fontSize: hp(2),
        textAlign: 'right'
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
        fontSize: hp(1.8),
        marginTop: hp(1.5),
        // color: "#616161"
    }
})