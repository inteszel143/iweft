import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { paymentMethods } from '@/constants/booking/data';
import { Fontisto } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import { useDefaultMethod } from '@/query/stripeQuery';
import { useIsFocused } from '@react-navigation/native';
import MethodSkeleton from '@/components/skeleton/MethodSkeleton';
import SubPaypal from '@/components/stripe/SubPaypal';
import SubCreditCard from '@/components/stripe/SubCreditCard';
import SubGooglePay from '@/components/stripe/SubGooglePay';
import SubApplePay from '@/components/stripe/SubApplePay';
export default function PlantSelectMethod() {
    const isFocused = useIsFocused();
    const { data, isPending } = useDefaultMethod(isFocused);
    const [isSelected, setIsSelected] = useState(1);

    const method = [
        {
            id: 1,
            icon: require("@/assets/temp/bookingIcon/paypal.jpg"),
            label: "PayPal",
        },
        {
            id: 2,
            icon: require("@/assets/temp/bookingIcon/google.jpg"),
            label: "Google Pay",
        },
        {
            id: 3,
            icon: require("@/assets/temp/bookingIcon/apple.jpg"),
            label: "Apple Pay",
        },
        {
            id: 4,
            icon: require("@/assets/temp/bookingIcon/mastercard.jpg"),
            label: !data || data == 0 ? "Credit Card" : `**** **** **** ${data?.card?.last4}`,
        },
    ];


    return (
        <View style={styles.container}>
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Payment Methods</Text>
                    </View>
                </View>
            </View>
            <View style={styles.infoStyle}>
                <Text style={styles.infoText}>Select the payment method you want to use.</Text>
            </View>


            {
                isPending ? <MethodSkeleton /> :

                    <View style={styles.selectedStyle}>
                        {
                            method.map((item, index) => {
                                return (
                                    <TouchableOpacity style={styles.selectedRow} key={index}
                                        onPress={() => {
                                            setIsSelected(item?.id);
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                                                <Image source={item.icon} resizeMode='contain' style={{ width: wp(8) }} />
                                                <Text style={styles.selectedText}>{item.label}</Text>
                                            </View>

                                            <TouchableOpacity>
                                                {isSelected === item.id ? <Fontisto name='radio-btn-active' size={hp(2.5)} color={'#0A5CA8'} /> : <Fontisto name='radio-btn-passive' size={hp(2.5)} color={'#0A5CA8'} />}
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>

            }

            <View style={{ flex: 1, }} />
            <View style={styles.footer}>
                {
                    isSelected == 1 ? <SubPaypal /> : isSelected == 2 ? <SubGooglePay /> : isSelected == 3 ? <SubApplePay /> : <SubCreditCard />
                }
            </View>



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


    infoStyle: {
        marginTop: hp(4),
        paddingHorizontal: wp(6),
    },
    infoText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2),
        color: "#424242"
    },


    selectedStyle: {
        paddingHorizontal: wp(6),
    },
    selectedRow: {
        marginTop: hp(2.5),
        backgroundColor: 'white',
        height: Platform.OS === 'android' ? hp(14) : hp(12),
        justifyContent: 'center',
        borderRadius: wp(4),
        paddingHorizontal: wp(6),
        shadowColor: "#DDDDDD",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,

    },
    selectedText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2)
    },
    // footer: {
    //     height: Platform.OS === 'ios' ? hp(12) : hp(10),
    //     backgroundColor: "white",
    //     alignItems: 'center',
    // },
    footer: {
        position: 'absolute',
        bottom: 0,
        height: hp(15),
        width: wp(100),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: wp(8),
        borderTopLeftRadius: wp(8),
    },
    footerBtn: {
        width: wp(90),
        height: hp(6.4),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(8),
        marginTop: hp(2)
    },
    footerText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
        color: 'white'
    },
    footerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        marginTop: hp(3),
    },
    footerTopText: {
        fontSize: hp(1.8)
    }



})