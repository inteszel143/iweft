import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useIsFocused } from '@react-navigation/native';
import { useGetAllSubscription } from '@/query/stripeQuery';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import SubSkeleton from '../skeleton/SubSkeleton';
import NoSubscription from '../empty/NoSubscription';
import {
    convertDay, covertMonth, formatDate, formatTime
} from '@/utils/subs'
import { defaultStyles } from '@/constants/Styles';
import useStoreSub from '@/store/useStoreSub';
export default function YourSubscription() {

    const isFocused = useIsFocused();
    const { data, isPending } = useGetAllSubscription(isFocused);
    const { setPlanName, setTotal } = useStoreSub();
    return (
        <View style={styles.container}>
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Your Subscriptions</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>



            {
                isPending ? <SubSkeleton />
                    :
                    <>
                        {
                            !data || data == 0 ? <NoSubscription />
                                :
                                <ScrollView>
                                    <View style={styles.containerStyle}>
                                        <Text style={styles.titleText}>Active</Text>
                                    </View>

                                    {
                                        data?.map((item: any, index: any) => {
                                            if (!item?.cancel_at_period_end) {
                                                return (
                                                    <TouchableOpacity style={styles.cardRow}
                                                        key={index}
                                                        onPress={() => {
                                                            router.push('/homePage/BookingDetails');
                                                            setPlanName(item?.plan?.product?.name);
                                                            setTotal(item?.plan?.amount_decimal / 100);
                                                        }}
                                                    >
                                                        <View style={styles.cardRowStyle}>
                                                            <View style={styles.leftInner}>
                                                                <Image
                                                                    source={{ uri: item?.plan?.product?.images[0] }}
                                                                    resizeMode='contain'
                                                                    style={styles.imageStyle}
                                                                />
                                                                <View style={{ width: wp(50) }}>
                                                                    <Text style={styles.titleStyle} >{item?.plan?.product?.name}</Text>
                                                                    <Text style={styles.subStyle}>{item?.plan?.product?.description}</Text>
                                                                    <Text style={styles.subStyle}>Renews {convertDay(item?.current_period_end)} {covertMonth(item?.current_period_end)}</Text>
                                                                </View>
                                                            </View>
                                                            <View>
                                                                <Feather name='chevron-right' size={hp(2.5)} />
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        })
                                    }

                                </ScrollView>
                        }
                    </>
            }


            {/* <View style={styles.footer}>
                <TouchableOpacity style={defaultStyles.footerBtn}>
                    <Text style={defaultStyles.footerText} >Continue</Text>
                </TouchableOpacity>
            </View> */}



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
        marginTop: hp(3),
        paddingHorizontal: wp(5),
    },
    titleText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2.2)
    },
    cardStyle: {
        width: wp(100),
        backgroundColor: "#F9F9F9",
        paddingVertical: hp(2),
    },
    cardRow: {
        alignSelf: 'center',
        width: wp(92),
        paddingVertical: hp(2),
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: wp(4),
        marginTop: hp(2.5),
        paddingHorizontal: wp(5),
    },
    cardRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    imageStyle: {
        width: wp(22),
        height: hp(12)
    },
    leftInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
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
    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(12),
        alignItems: 'center'
    }

})