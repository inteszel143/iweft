import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Fontisto } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import numeral from 'numeral';
import { useIsFocused } from '@react-navigation/native';
import { useDefaultMethod } from '@/query/stripeQuery';
import PaymentSkeleton from '@/components/skeleton/PaymentSkeleton';
import MethodSkeleton from '@/components/skeleton/MethodSkeleton';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
export default function BookingPaymentMethod() {
    const { t } = useTranslation();
    const current = getCurrentLanguage();
    const isFocused = useIsFocused();
    const { bookingId, total } = useLocalSearchParams();
    const [isSelected, setIsSelected] = useState(0);
    const { data, isPending } = useDefaultMethod(isFocused);

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
            label: !data || data == 0 ? "Credit Card" : `**** **** **** **** ${data?.card?.last4}`,
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.Headercontainer}>
                <View style={[styles.innerContainer, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                    <View style={[styles.headerLeft, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                        <TouchableOpacity onPress={() => router.back()}>
                            {
                                current === 'ar' ? <Image source={require('@/assets/icons/arrowright.png')}
                                    resizeMode='contain' style={{ width: wp(6), height: hp(6.2), marginRight: wp(2) }} />
                                    :
                                    <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                            }
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >{t('Payment Methods')}</Text>
                    </View>
                </View>
            </View>


            <View style={styles.infoStyle}>
                <Text style={styles.infoText}>{t('Please select a payment refund method (only 80% will be refunded).')}</Text>
            </View>
            {
                isPending ? <MethodSkeleton /> : <View style={styles.selectedStyle}>
                    {
                        method.map((item, index) => {
                            return (
                                <TouchableOpacity style={styles.selectedRow} key={index}
                                    onPress={() => setIsSelected(item.id)}
                                >
                                    <View style={{ flexDirection: current === 'ar' ? 'row-reverse' : 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: current === 'ar' ? 'row-reverse' : 'row', alignItems: 'center', gap: wp(4) }}>
                                            <Image source={item.icon} resizeMode='contain' style={{ width: wp(8) }} />
                                            <Text style={styles.selectedText}>{t(`${item.label}`)}</Text>
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
                <View style={styles.footerTop}>
                    <Text style={[styles.footerTopText, { fontFamily: 'UrbanistMedium', textDecorationLine: "line-through", color: "#424242" }]}>{t('Paid')} {t('AED')} {numeral(total).format('0,0')}.00</Text>
                    <Text style={[styles.footerTopText, { fontFamily: 'UrbanistBold' }]}>{t('Refund')}: {t('AED')} {numeral(total as any * .80).format('0,0')}.00</Text>
                </View>

                <TouchableOpacity
                    style={[defaultStyles.footerBtn, { backgroundColor: isSelected == 0 ? "#DADADA" : "#0A5CA8", marginTop: hp(2) }]}
                    disabled={isSelected == 0 ? true : false}
                    onPress={() => router.push({
                        pathname: '/bookingPage/BookingPin',
                        params: { bookingId }
                    })}
                >
                    <Text style={defaultStyles.footerText}>{t('Continue')}</Text>
                </TouchableOpacity>
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
        height: hp(12),
        justifyContent: 'center',
        borderRadius: wp(6),
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
    footer: {
        height: hp(18),
        backgroundColor: "white",
        alignItems: 'center',
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
        fontSize: hp(2)
    }




})