import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { useGetPaymentHistory } from '@/query/stripeQuery';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HistoryPaymentSkeleton from '@/components/skeleton/HistoryPaymentSkeleton';
import NoHistoryPayment from '@/components/empty/NoHistoryPayment';

export default function ProfilePaymentHistory() {
    const isFocused = useIsFocused();
    const { data, isPending } = useGetPaymentHistory(isFocused);
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
                        <Text style={styles.bookingText} >Payment History</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {
                isPending ? <HistoryPaymentSkeleton />
                    :
                    <>
                        {
                            !data || data == 0 ? <NoHistoryPayment />
                                :
                                <FlatList
                                    data={data}
                                    keyExtractor={item => item?.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.cardRow}>
                                            <View style={styles.cardInner}>
                                                <Image
                                                    source={require("@/assets/temp/notif/notif1.png")}
                                                    resizeMode='contain'
                                                    style={styles.imageStyle}
                                                />
                                                <View style={{ flex: 1 }}>
                                                    <Text style={styles.titleStyle}>Payment Successful!</Text>
                                                    <Text style={styles.subStyle}>You have made a services payment</Text>
                                                    <Text style={styles.priceStyle}>AED {item?.amount / 100}.00</Text>
                                                    <Text style={styles.dateStyle} >{formatDate(item?.created)} | {formatTime(item?.created)}</Text>
                                                </View>
                                                <Ionicons name="ellipsis-horizontal" size={hp(2)} />
                                            </View>
                                        </TouchableOpacity>
                                    )}

                                />
                        }
                    </>
            }



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
        backgroundColor: '#FFFFFF',
        borderRadius: wp(4),
        marginTop: hp(2),
        paddingHorizontal: wp(5),
    },
    cardInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(6)
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
    },
    priceStyle: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2),
        marginTop: hp(1),
        color: "#0A5CA8",
    },
    dateStyle: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.8),
        color: "#616161",
        marginTop: hp(1.5),
    }


})