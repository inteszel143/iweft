import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeOut, FadeOutUp, FadingTransition, JumpingTransition, Layout, withSpring } from 'react-native-reanimated';
import { Link, router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useBooking } from '@/query/orderQuery';
import BookingSkeleton from '@/components/booking/BookingSkeleton';
import moment from 'moment';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import NoCompleteBooking from '@/components/booking/NoCompleteBooking';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
import { useQueryClient } from '@tanstack/react-query';


export default function Page() {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);
    const { t } = useTranslation();
    const current = getCurrentLanguage();
    const isFocused = useIsFocused();
    const { data: completeData, isPending } = useBooking(isFocused, "Completed");
    const [isHiding, setIsHiding] = useState(0);
    const toggleHide = (index: any) => {
        setIsHiding(index);
    };
    const toggleClose = () => {
        setIsHiding(0);
    };


    const addHours = (dateString: string, hours: number): string => {
        const date = new Date(dateString);
        date.setHours(date.getHours() + hours);
        return date.toISOString();
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        queryClient.invalidateQueries({ queryKey: ["booking-status", "Completed"] });
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);


    if (isPending) {
        return <BookingSkeleton />
    };
    if (!completeData || completeData.length === 0) {
        return <NoCompleteBooking />
    };


    return (
        <View style={styles.container}>

            <FlatList
                data={completeData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item?._id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#DADADA"
                    />
                }
                renderItem={({ item }) => (
                    <Animated.View style={styles.card}
                        entering={FadeInUp.duration(300).springify()}
                    >
                        <TouchableOpacity
                            style={[styles.row, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}
                            onPress={() => router.push({
                                pathname: '/bookingPage/BookingSummary',
                                params: { orderId: item?._id }
                            })}
                        >
                            <View style={[styles.rowLeft, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                                <View style={styles.imaging}>
                                    <Image
                                        source={{ uri: item?.order_details?.service?.image }}
                                        resizeMode='cover'
                                        style={styles.imageStyle}
                                    />
                                </View>
                                <View style={{ marginLeft: current === 'ar' ? 0 : wp(4), marginRight: current === 'ar' ? wp(4) : 0 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(1) }}>
                                        <Text style={styles.titleStyle} >{item?.order_details?.service?.title}</Text>
                                        {
                                            item?.review === null && <Ionicons name="alert-circle" size={hp(1.6)} color="red" />
                                        }
                                    </View>
                                    <Text style={styles.subTitle}>{item?.order_details?.service?.sub_title}</Text>
                                    {/* <Text style={styles.subTitle}>
                                        {item?.order_details?.order_items?.length} {item?.order_details?.order_items?.length === 1 ? 'item' : 'items'}
                                    </Text> */}
                                    <View style={styles.indicator}>
                                        <Text style={styles.upcoming}>{t('Completed')}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Link href={'/chatPage/CustomerSupport'} style={styles.btnStyle} asChild>
                                    <TouchableOpacity>
                                        <Ionicons name='chatbubble-ellipses' size={hp(2.5)} color={'#0a5ca8'} />
                                    </TouchableOpacity>
                                </Link>
                            </View>


                        </TouchableOpacity>


                        <View style={styles.separator} />


                        {
                            isHiding === item?._id && <Animated.View
                                entering={FadeInUp.duration(300).springify()}
                                style={{ marginTop: hp(2) }}>
                                <View style={[styles.mapRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                                    <Text style={styles.mapLabel} >{t('Date & Time')}</Text>
                                    <Text style={styles.mapLabelValue}>{moment(addHours(item?.delivery_date_time, 4)).format('MMMM D YYYY, h:mm a')}</Text>
                                </View>
                                <View style={[styles.mapRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', marginTop: hp(2) }]}>
                                    <Text style={styles.mapLabel} >{t('Location')}</Text>
                                    <Text style={[styles.mapLabelValue, { width: wp(50) }]}>{item?.address}</Text>
                                </View>

                                <View style={styles.map}>
                                    <MapView
                                        style={StyleSheet.absoluteFill}
                                        provider={PROVIDER_GOOGLE}
                                        // showsUserLocation={true}
                                        showsMyLocationButton
                                        loadingEnabled={true}
                                        initialRegion={{
                                            latitude: item?.latitude,
                                            longitude: item?.longitude,
                                            latitudeDelta: 0.0034042830388827383,
                                            longitudeDelta: 0.005005337297916412,
                                        }}
                                    >
                                        <Marker
                                            coordinate={{
                                                latitude: item?.latitude,
                                                longitude: item?.longitude,
                                            }}
                                        />

                                    </MapView>
                                </View>

                                {
                                    item?.review === null ? <View style={[styles.mapRows, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>

                                        <TouchableOpacity
                                            style={[styles.mapBtn, { flexDirection: 'row', alignItems: 'center', gap: wp(1), borderWidth: 1, borderColor: "#0a5ca8" }]}
                                            onPress={() => router.push({
                                                pathname: 'bookingPage/WriteReview',
                                                params: { orderId: item?._id, serviceId: item?.order_details?.service?._id, imageUrl: item?.order_details?.service?.image, title: item?.order_details?.service?.title, subTitle: item?.order_details?.service?.sub_title, basePrice: item?.order_details?.service?.base_price }
                                            })}
                                        >
                                            <Text style={[styles.mapText, { color: '#0a5ca8' }]}>{t('Write Review')}</Text>
                                            <Ionicons name="alert-circle" size={hp(1.6)} color="red" />
                                        </TouchableOpacity>


                                        <TouchableOpacity style={[styles.mapBtn, { backgroundColor: "#0a5ca8" }]}
                                            onPress={() => router.push({
                                                pathname: '/bookingPage/Ereceipt',
                                                params: { orderId: item?._id }
                                            })}
                                        >
                                            <Text style={[styles.mapText, { color: 'white' }]}>{t('View E-Receipt')}</Text>
                                        </TouchableOpacity>

                                    </View>

                                        :
                                        <TouchableOpacity
                                            style={[styles.receiptStyle, { backgroundColor: "#0a5ca8" }]}
                                            onPress={() => router.push({
                                                pathname: '/bookingPage/Ereceipt',
                                                params: { orderId: item?._id }
                                            })}
                                        >
                                            <Text style={[styles.mapText, { color: 'white' }]}>{t('View E-Receipt')}</Text>
                                        </TouchableOpacity>
                                }







                                <TouchableOpacity style={styles.footerBtn} onPress={() => toggleClose()}>

                                    <Ionicons name='chevron-up-outline' size={hp(2.5)} />
                                </TouchableOpacity>

                            </Animated.View>
                        }


                        {
                            isHiding != item?._id ? <TouchableOpacity style={[styles.footerBtn]} onPress={() => toggleHide(item?._id)}>
                                <Ionicons name='chevron-down-outline' size={hp(2.5)} />
                            </TouchableOpacity>
                                :
                                <></>
                        }



                    </Animated.View>
                )}
            />



        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
    },
    card: {
        width: wp(90),
        paddingVertical: hp(1),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: hp(2),
        borderRadius: wp(7),
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
        height: wp(20),
        borderRadius: wp(50),
    },
    leftInner: {
        marginLeft: wp(4)
    },
    titleStyle: {
        fontFamily: 'UrbanistSemiBold',
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
        backgroundColor: '#4AAF57',
        borderRadius: wp(2)
    },
    upcoming: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.6),
        color: 'white'
    },
    separator: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginHorizontal: wp(2),
        marginTop: hp(3)
    },
    imaging: {
        width: wp(24),
        height: hp(11),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: wp(2)
    },
    footerBtn: {
        height: hp(5),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(1)
    },
    mapRow: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mapLabel: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: '#616161',
    },
    mapLabelValue: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8)
    },
    map: {
        width: wp(82),
        height: hp(28),
        marginVertical: hp(2),
        borderRadius: wp(6),
        overflow: 'hidden',
    },
    mapBtn: {
        width: wp(40),
        height: hp(4.5),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(4)
    },
    mapText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8)
    },
    mapRows: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    receiptStyle: {
        width: wp(80),
        height: hp(4.5),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(4),
        alignSelf: 'center'
    }
})