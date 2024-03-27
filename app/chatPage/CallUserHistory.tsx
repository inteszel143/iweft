import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
export default function CallUserHistory() {
    return (
        <View style={styles.container}>


            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(12) }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.imageContainer}>
                        <View style={styles.imageInner}>
                            <Image source={require('@/assets/temp/chaticons/profilecall.jpg')} resizeMode='contain' style={{ width: wp(45), height: hp(23) }} />
                        </View>
                    </View>
                </View>


                <View style={{ alignItems: 'center', marginTop: hp(2), paddingVertical: hp(1) }}>
                    <Text style={styles.textTitle}>Adam Wilson</Text>
                    <Text style={styles.subTitle}>User Profile</Text>
                </View>

                <View>
                    <LinearGradient
                        colors={["#FFFFFF", "#F9F9F9"]}
                        style={{
                            justifyContent: 'center',
                            paddingHorizontal: wp(5),
                            height: hp(8),
                        }}
                    >
                        <Text style={styles.textStyle}>Call History</Text>
                    </LinearGradient>
                </View>


                <View style={{ flex: 1, backgroundColor: '#F9F9F9', alignItems: 'center' }}>
                    <View style={styles.cardStyle}>
                        <View style={styles.cardRow}>
                            <Text style={styles.cardLabel}>Communication</Text>
                            <Text style={styles.cardValue}>Incoming Voice Call</Text>
                        </View>
                        <View style={[styles.cardRow, { marginTop: hp(4) }]}>
                            <Text style={styles.cardLabel}>Length</Text>
                            <Text style={styles.cardValue}>37 Seconds</Text>
                        </View>
                        <View style={[styles.cardRow, { marginTop: hp(4) }]}>
                            <Text style={styles.cardLabel}>Date & Time</Text>
                            <Text style={styles.cardValue}>Dec 23, 2024 | 10:00 AM</Text>
                        </View>
                    </View>
                    <View style={[styles.cardStyle, { marginTop: hp(2), marginBottom: hp(2) }]}>
                        <View style={styles.cardRow}>
                            <Text style={styles.cardLabel}>Communication</Text>
                            <Text style={styles.cardValue}>Incoming Voice Call</Text>
                        </View>
                        <View style={[styles.cardRow, { marginTop: hp(4) }]}>
                            <Text style={styles.cardLabel}>Length</Text>
                            <Text style={styles.cardValue}>37 Seconds</Text>
                        </View>
                        <View style={[styles.cardRow, { marginTop: hp(4) }]}>
                            <Text style={styles.cardLabel}>Date & Time</Text>
                            <Text style={styles.cardValue}>Dec 23, 2024 | 10:00 AM</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>


            <View style={styles.footer}>
                <View style={styles.footerRow}>
                    <Link href={'/BookingChat'} asChild>
                        <TouchableOpacity style={styles.footerBtn}>
                            <Ionicons name='chatbubble-ellipses' size={hp(3.5)} color={'#FFFFFF'} />
                        </TouchableOpacity>
                    </Link>
                    <Link href={'/chatPage/CallCustomer'} asChild>
                        <TouchableOpacity style={styles.footerBtn}>
                            <Ionicons name='call' size={hp(3.5)} color={'#FFFFFF'} />
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity style={styles.footerBtn}>
                        <Ionicons name='videocam' size={hp(3.5)} color={'#FFFFFF'} />
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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


    imageContainer: {
        width: wp(52),
        height: wp(52),
        borderRadius: wp(26),
        backgroundColor: "#93C120",
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageInner: {
        width: wp(45),
        height: wp(45),
        borderRadius: wp(24),
        backgroundColor: "#93C120",
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },


    textTitle: {
        fontFamily: "UrbanistBold",
        fontSize: hp(3)
    },
    subTitle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2.1),
        color: "#424242",
        marginTop: 4,
    },

    textStyle: {
        fontFamily: "UrbanistMedium",
        fontSize: hp(2.2),
        color: '#212121'
    },
    cardStyle: {
        width: wp(90),
        paddingVertical: hp(3.5),
        justifyContent: 'center',
        borderRadius: wp(4),
        backgroundColor: 'white',
        paddingHorizontal: wp(5)
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardLabel: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.9),
        color: '#616161',
    },
    cardValue: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.9)
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(12),
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderWidth: 1,
        borderTopColor: "#F5F5F5",
        borderRightColor: '#FFFFFF',
        borderLeftColor: "#FFFFFF",
        borderBottomColor: "#FFFFFF",
        paddingTop: hp(1),
        borderTopRightRadius: wp(4),
        borderTopLeftRadius: wp(4),
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3)
    },
    footerBtn: {
        width: wp(26),
        height: hp(7.5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A5CA8',
        borderRadius: wp(8)
    }

})