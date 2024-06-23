import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { Link, router } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { paymentMethods } from '@/constants/booking/data';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import { useDefaultMethod, useGetListPaymentMethod } from '@/query/stripeQuery';
import { useIsFocused } from '@react-navigation/native';
import PaymentSkeleton from '@/components/skeleton/PaymentSkeleton';
import NoPaymentMethod from '@/components/empty/NoPaymentMethod';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import PaymentAction from '@/components/bottomsheet/PaymentAction';
import SuccessDefaultMethod from '@/components/modal/SuccessDefaultMethod';

export default function ManagePayment() {

    const isFocused = useIsFocused();
    const { data, isPending } = useGetListPaymentMethod(isFocused);
    const { data: defaultMethod } = useDefaultMethod(isFocused);
    const [pmid, setPmid] = useState("");
    const [defaultSuccess, setDefaultSuccess] = useState(false);
    const modalARef = useRef<BottomSheetModal>(null);
    const openModalA = (payment_method_id: string) => {
        setPmid(payment_method_id);
        modalARef.current?.present();
    };

    return (
        <View style={styles.container}>
            {defaultSuccess && <SuccessDefaultMethod modalVisible={defaultSuccess} setModalVisible={setDefaultSuccess} />}
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Manage Card</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {
                isPending ? <PaymentSkeleton />
                    :
                    <>
                        {
                            !data || data == 0 ? <NoPaymentMethod />
                                :
                                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(15) }}>
                                    {/* <Text style={styles.titleStyle}>PAYMENT METHOD</Text> */}
                                    {
                                        data?.map((item: any, index: any) => (
                                            <TouchableOpacity key={index}
                                                style={styles.cardStyle}
                                                onPress={() => openModalA(item?.id)}
                                            >
                                                <View style={styles.topBtn}
                                                >
                                                    <Ionicons name='ellipsis-horizontal' size={hp(2.5)} color={'gray'} />
                                                </View>

                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                                                    <View style={{ width: wp(15), }}>
                                                        {
                                                            item?.card?.brand === "mastercard" ?
                                                                <Image source={require("@/assets/temp/bookingIcon/mastercard.jpg")} resizeMode='contain' style={styles.imageStyle} />
                                                                :
                                                                <Image source={require('@/assets/icons/visa.png')} resizeMode='contain' style={styles.imageStyle} />
                                                        }
                                                    </View>
                                                    <View>
                                                        <Text style={styles.selectedText}>**** **** **** **** {item?.card?.last4}</Text>
                                                        <Text style={styles.subtext}>Expire: {item?.card?.exp_month}/{item?.card?.exp_year}</Text>
                                                        {
                                                            item?.id === defaultMethod?.id && <View style={styles.defaultStyle}>
                                                                <Text style={styles.defaultText}>Default</Text>
                                                            </View>
                                                        }
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    }

                                </ScrollView>
                        }

                    </>
            }


            <View style={styles.footer} >
                <Link href={'/profilePage/AddNewCard'} asChild>
                    <TouchableOpacity style={defaultStyles.footerBtn}>
                        <Text style={defaultStyles.footerText}>Add New Card</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <PaymentAction modalRef={modalARef} payment_method_id={pmid} setDefaultSuccess={setDefaultSuccess} />


        </View>
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

    footer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        width: wp(100),
        height: Platform.OS === 'ios' ? hp(12) : hp(10),
        alignItems: 'center'
    },
    defaultText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.5),
        color: "#0A5CA8"
    },
    imageStyle: {
        width: wp(12), height: hp(14)
    },
    topBtn: {
        position: 'absolute',
        top: hp(3),
        right: wp(6),
    },
    selectedText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.1),
    },
    subtext: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: "#616161",
        marginTop: hp(1)
    },
    cardStyle: {
        alignSelf: 'center',
        width: wp(90),
        borderRadius: wp(2),
        backgroundColor: 'white',
        marginTop: hp(2.5),
        paddingHorizontal: wp(6),
        paddingVertical: hp(1.5),
        shadowColor: "#DADADA",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,

    },
    defaultStyle: {
        width: wp(20),
        height: hp(3),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CFF4FF',
        borderRadius: wp(1),
        borderWidth: 0.5,
        borderColor: "#0A5CA8",
        marginTop: hp(2)
    },
})