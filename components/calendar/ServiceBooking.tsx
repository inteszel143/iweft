import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { upcoming } from '@/constants/booking/data';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import EmptyServiceBooking from './EmptyServiceBooking';
export default function ServiceBooking() {
    return (
        <View style={styles.container}>


            <LinearGradient
                colors={["#FFFFFF", "#F9F9F9"]}
                style={{
                    justifyContent: 'center',
                    paddingHorizontal: wp(5),
                    height: hp(6),
                }}
            >
                <View style={styles.topRow}>
                    <Text style={styles.textTop}>Service Booking (2)</Text>
                    <Link href={'/(tabs)/booking/'} asChild>
                        <TouchableOpacity>
                            <Text style={styles.textSeeAll}>See all</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </LinearGradient>

            {
                upcoming.map((item, index) => (
                    <Animated.View style={styles.card}
                        entering={FadeInUp.duration(300).springify()}
                        key={index}
                    >
                        <Link href={'/bookingPage/BookingSummary'} style={styles.row} asChild>
                            <TouchableOpacity>
                                <View style={styles.rowLeft}>
                                    <View>
                                        <Image
                                            source={item.img}
                                            resizeMode='contain'
                                            style={styles.imageStyle}
                                        />
                                    </View>
                                    <View style={styles.leftInner}>
                                        <Text style={styles.titleStyle} >{item.title}</Text>
                                        <Text style={styles.subTitle} >{item.sub}</Text>
                                        <View style={styles.indicator}>
                                            <Text style={styles.upcoming}>Upcoming</Text>
                                        </View>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        </Link>
                    </Animated.View>
                ))
            }



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F9F9F9",
    },
    textTop: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
    },
    textSeeAll: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
        color: "#0A5CA8"
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },



    card: {
        width: wp(90),
        backgroundColor: 'white',
        paddingBottom: hp(2),
        alignSelf: 'center',
        marginBottom: hp(1),
        marginTop: hp(1),
        borderRadius: wp(6),
        paddingHorizontal: wp(4),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(2)
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnStyle: {
        width: wp(14),
        height: wp(14),
        borderRadius: wp(7),
        backgroundColor: "#DAE7F2",
        alignItems: 'center',
        justifyContent: 'center'
    },

    imageStyle: {
        width: wp(20),
        height: hp(10)
    },
    leftInner: {
        marginLeft: wp(4)
    },
    titleStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2)
    },
    subTitle: {
        paddingVertical: hp(2),
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: 'gray',
    },
    indicator: {
        width: wp(26),
        height: hp(4),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A5CA826',
        borderRadius: wp(2)
    },
    upcoming: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.5),
        color: '#0A5CA8'
    },
    separator: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginHorizontal: wp(2),
        marginTop: hp(3)
    },

})