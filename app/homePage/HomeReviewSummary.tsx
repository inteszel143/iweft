import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import CreditCard from '@/components/stripe/CreditCard';
import useStoreBooking from '@/store/useStoreBooking';
import moment from 'moment';
import Paypal from '@/components/stripe/Paypal';
import GooglePay from '@/components/stripe/GooglePay';
import ApplePay from '@/components/stripe/ApplePay';

export default function HomeReviewSummary() {
    const { imageUrl, method } = useLocalSearchParams();
    const { service_name, total } = useStoreBooking();
    const [isHiding, setIsHiding] = useState(false);
    const toggleHide = () => {
        setIsHiding(!isHiding);
    };

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
                        <Text style={styles.summaryValue}>{service_name}</Text>
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
                        <Text style={styles.summaryValue}>{moment().format("MMM D YYYY")} | {moment().format("h:mm A")}</Text>
                    </View>
                    <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                        <Text style={styles.summaryLabel}>Working Hours</Text>
                        <Text style={styles.summaryValue}>2 hours</Text>
                    </View>
                </View>



                <View style={[styles.summarCard, { marginTop: hp(2) }]}>
                    <TouchableOpacity style={styles.summarRow}
                        onPress={toggleHide}
                    >
                        <Text style={styles.summaryLabel}>Subscription Details</Text>
                        <Entypo name='chevron-thin-down' size={hp(2)} />
                    </TouchableOpacity>
                    {
                        isHiding && <Animated.View
                            entering={FadeInUp.duration(200).damping(2)}
                            style={styles.hiddenBox}>
                            <View>
                                <View style={[styles.summarRow, { marginTop: hp(2) }]}>
                                    <Text style={styles.summaryLabel} >Basic Plan</Text>
                                    <Text style={styles.summaryValue}>AED 899</Text>
                                </View>
                                <View style={[styles.separator, { marginTop: hp(2) }]} />
                                <Text style={[styles.summaryLabel, { marginTop: hp(2.5) }]}>Collection Details</Text>
                                <Text style={[styles.summaryValue, { marginTop: hp(1) }]}> • Clean/Press</Text>
                                <Text style={[styles.summaryValue, { marginTop: hp(1) }]}> • Press Only</Text>
                                <Text style={[styles.summaryValue, { marginTop: hp(1) }]}> • Wash/Fold</Text>
                            </View>
                        </Animated.View>
                    }
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
                        <Text style={[styles.summaryValue, { fontFamily: 'UrbanistBold', }]}>AED {total}</Text>
                    </View>
                </View>



                <View style={[styles.summarCard, { marginTop: hp(2) }]}>
                    <View style={styles.summarRow}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                            <Image source={imageUrl} resizeMode='contain' style={{ width: wp(8) }} />
                            <Text style={styles.cardTextStyle}>{method}</Text>
                        </View>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.btnText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>


            <View style={styles.footer}>

                {
                    method === "Credit Card" ?
                        <CreditCard />
                        : method === "PayPal" ?
                            <Paypal /> : method === "Google Pay" ?
                                <GooglePay /> :
                                <ApplePay />
                }
            </View>



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
        justifyContent: 'center',
        borderTopRightRadius: wp(8),
        borderTopLeftRadius: wp(8),
    },
    hiddenBox: {
        backgroundColor: 'white',
        marginTop: hp(1)
    }

})