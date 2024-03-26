import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { eReciept } from '@/constants/booking/data';
import Animated, { BounceIn, FadeOut } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
export default function Ereceipt() {

    const [cardShow, setCardShow] = useState(false);

    const toggleShowCard = () => {
        setCardShow(!cardShow);
    }

    return (
        <View style={styles.container}>



            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >E-receipt</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={toggleShowCard}>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(4) }}>



                {/* barcode */}
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('@/assets/icons/barcode.png')} resizeMode='contain' style={{ width: wp(100), height: hp(22) }} />
                </View>




                <View style={styles.summarCard}>
                    <View style={styles.summarRow}>
                        <Text style={styles.summaryLabel}>Services</Text>
                        <Text style={styles.summaryValue}>Clean/Press</Text>
                    </View>
                    <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                        <Text style={styles.summaryLabel}>Category</Text>
                        <Text style={styles.summaryValue}>Premium Bundle</Text>
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



                <View style={[styles.summarCard, { marginTop: hp(3) }]}>
                    <TouchableOpacity style={styles.summarRow}>
                        <Text style={styles.summaryLabel}>Subscription Details</Text>
                        <Entypo name='chevron-thin-down' size={hp(2)} />
                    </TouchableOpacity>
                </View>



                <View style={[styles.summarCard, { marginTop: hp(3) }]}>
                    <View style={styles.summarRow}>
                        <Text style={styles.summaryLabel}>Amount</Text>
                        <Text style={styles.summaryValue}>AED 125.00</Text>
                    </View>
                    <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                        <Text style={styles.summaryLabel}>Promo</Text>
                        <Text style={[styles.summaryValue, { color: '#0a5ca8' }]}>- AED 37.50</Text>
                    </View>

                    <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                        <Text style={styles.summaryLabel}>Payment Methods</Text>
                        <Text style={[styles.summaryValue]}>Credit Card</Text>
                    </View>

                    <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                        <Text style={styles.summaryLabel}>Date</Text>
                        <Text style={[styles.summaryValue]}>Dec 14, 2024 | 10:01:16 AM</Text>
                    </View>

                    <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                        <Text style={styles.summaryLabel}>Transaction ID</Text>
                        <Text style={[styles.summaryValue]}>SK7263727399</Text>
                    </View>

                    <View style={[styles.summarRow, { marginTop: hp(3) }]}>
                        <Text style={styles.summaryLabel}>Status</Text>
                        <View style={styles.status}>
                            <Text style={styles.statusText}>Paid</Text>
                        </View>
                    </View>
                </View>









            </ScrollView>








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
    }
})