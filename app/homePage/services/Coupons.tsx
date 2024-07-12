import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useActivationPromo } from '@/query/homeQuery';
export default function Coupons() {

    const isFocused = useIsFocused();
    const { data, isPending } = useActivationPromo(isFocused);


    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Coupons</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {
                data?.map((item: any, index: any) => (
                    <View style={styles.cardStyle} key={index}>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.off}>{item?.special_offer?.discount_value}% Off</Text>
                                <Text style={styles.title}>Discount coupon</Text>
                                <Text style={styles.subtitle}>{item?.special_offer?.title}</Text>
                                <Text style={styles.expire}>No expiry</Text>
                            </View>
                            <TouchableOpacity style={[styles.btnStyle, { backgroundColor: "#0A5CA8" }]}>
                                <Text style={[styles.btnText, { color: "white" }]}>Use</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            }


        </View>
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


    cardStyle: {
        width: wp(90),
        height: hp(20),
        borderWidth: 0.5,
        borderColor: "#CACACA",
        alignSelf: 'center',
        borderRadius: wp(4),
        marginTop: hp(2),
        justifyContent: 'center',
        paddingHorizontal: wp(10)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    off: {
        fontFamily: "UrbanistBold",
        fontSize: hp(3)
    },
    title: {
        fontFamily: "UrbanistSemiBold",
        fontSize: hp(2.2),
        marginTop: hp(1)
    },
    subtitle: {
        fontFamily: "UrbanistMedium",
        fontSize: hp(2),
        color: "gray",
        marginTop: hp(1)
    },
    expire: {
        fontFamily: "UrbanistRegular",
        fontSize: hp(1.9),
        color: "red",
        marginTop: hp(1)
    },
    btnStyle: {
        width: wp(20),
        height: hp(4),
        borderRadius: wp(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontFamily: "UrbanistSemiBold",
        fontSize: hp(1.8)
    }

})