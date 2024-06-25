import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import { useDefaultMethod } from '@/query/stripeQuery';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
export default function PaymentCreditCard() {
    const isFocused = useIsFocused();
    const { data, isPending } = useDefaultMethod(isFocused);

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    if (!data || data == 0) {
        return (
            <View style={styles.btnStyle}>
                <View style={styles.innerStyle}>
                    <Image source={require("@/assets/temp/bookingIcon/mastercard.jpg")}
                        resizeMode='contain'
                        style={{ width: wp(8) }}
                    />
                    {
                        isPending ? <ShimmerPlaceholder style={styles.title} /> :

                            <Text style={styles.textStyle}>Credit Card</Text>
                    }
                    {
                        isPending ? <ShimmerPlaceholder style={styles.circle} /> :
                            <TouchableOpacity
                                onPress={() => router.push('/profilePage/AddNewCard')}
                            >
                                <Text style={styles.connectStyle} >Connect</Text>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        )
    };

    return (
        <View style={styles.btnStyle}>
            <View style={styles.innerStyle}>
                <Image source={require("@/assets/temp/bookingIcon/mastercard.jpg")}
                    resizeMode='contain'
                    style={{ width: wp(8), }}
                />
                {
                    isPending ? <ShimmerPlaceholder style={styles.title} /> :
                        <Text style={styles.textStyle}>**** **** **** {data?.card?.last4}</Text>
                }
                {
                    isPending ? <ShimmerPlaceholder style={styles.circle} /> :
                        <TouchableOpacity
                            onPress={() => router.push('/profilePage/payment/ManagePayment')}
                        >
                            <Text style={styles.connectStyle} >Manage</Text>
                        </TouchableOpacity>
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    btnStyle: {
        marginTop: hp(2.5),
        backgroundColor: 'white',
        width: wp(90),
        height: hp(12),
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: wp(5),
        paddingHorizontal: wp(7),
        shadowColor: "#DADADA",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    innerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    textStyle: {
        flex: 1,
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.1),
    },
    connectStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
        color: '#0A5CA8'
    },
    title: {
        flex: 1,
        width: wp(45),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
    },
    circle: {
        width: wp(8),
        height: wp(8),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
    }
})