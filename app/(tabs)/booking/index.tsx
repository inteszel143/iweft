import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Link, router } from 'expo-router';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import { useBooking } from '@/query/orderQuery';
import NoBooking from '@/components/booking/NoBooking';
import BookingSkeleton from '@/components/booking/BookingSkeleton';
import moment from 'moment';
import MapView, { Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
export default function Page() {
    const { t } = useTranslation();
    const current = getCurrentLanguage();
    const isFocused = useIsFocused();
    const { data, isPending } = useBooking(isFocused, "Upcoming");
    const [bookingId, setGetBookingId] = useState("");
    const [total, setTotal] = useState(0);
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

    // bottomSheet
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1}{...props} />, []
    )
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);
    // end bottomSheet

    if (isPending) {
        return <BookingSkeleton />
    };
    if (!data || data.length === 0) {
        return <NoBooking />
    };
    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>

                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item?._id.toString()}
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
                                    <View>
                                        <Image
                                            source={{ uri: item?.order_details?.service?.image }}
                                            resizeMode='contain'
                                            style={styles.imageStyle}
                                        />
                                    </View>
                                    <View style={{ marginLeft: current === 'ar' ? 0 : wp(4), marginRight: current === 'ar' ? wp(4) : 0 }}>
                                        <Text style={styles.titleStyle} >{item?.order_details?.service?.title}</Text>
                                        <Text style={styles.subTitle}>
                                            {item?.order_details?.order_items?.length} {item?.order_details?.order_items?.length === 1 ? 'item' : 'items'}
                                        </Text>
                                        <View style={styles.indicator}>
                                            <Text style={styles.upcoming}>{t('Upcoming')}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <Link href={'/BookingChat'} style={styles.btnStyle} asChild>
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
                                        {/* <Text style={styles.mapLabelValue}>Dec 23. 2024 | 10:00 - 12:00 AM</Text> */}
                                        <Text style={styles.mapLabelValue}>{moment(addHours(item?.pick_up_date_time, 4)).format('MMMM D YYYY, h:mm a')}</Text>
                                    </View>
                                    <View style={[styles.mapRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', marginTop: hp(2) }]}>
                                        <Text style={styles.mapLabel} >{t('Location')}</Text>
                                        <Text style={[styles.mapLabelValue, { width: wp(50) }]}>{item?.address}</Text>
                                    </View>

                                    <View style={styles.map}>
                                        {/* <Image
                                            source={require('@/assets/temp/maps.png')}
                                            resizeMode='contain'
                                            style={styles.map}
                                        /> */}
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

                                    <View style={[styles.mapRows, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>

                                        <TouchableOpacity style={[styles.mapBtn, { borderWidth: 1, borderColor: "#0a5ca8" }]}
                                            onPress={() => {

                                                setGetBookingId(item?._id);
                                                setTotal(item?.total_amount);
                                                handlePresentModalPress()
                                            }}
                                        >
                                            <Text style={[styles.mapText, { color: '#0a5ca8' }]}>{t('Cancel Booking')}</Text>
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

                                    <TouchableOpacity style={styles.footerBtn} onPress={() => toggleClose()}>
                                        <Ionicons name='chevron-up-outline' size={hp(2.5)} />
                                    </TouchableOpacity>

                                </Animated.View>
                            }
                            {
                                isHiding != item?._id ? <TouchableOpacity style={styles.footerBtn} onPress={() => toggleHide(item?._id)}>
                                    <Ionicons name='chevron-down-outline' size={hp(2.5)} />
                                </TouchableOpacity>
                                    :
                                    <></>
                            }
                        </Animated.View>
                    )}
                />

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose={true}
                    handleIndicatorStyle={{ backgroundColor: '#DADADA' }}
                    onChange={handleSheetChanges}

                >
                    <BottomSheetView style={styles.contentContainer}>
                        <Text style={styles.bottomSheetIndi}>{t('Cancel Booking')}</Text>
                        <View style={styles.BottomSheetSeparator} />

                        <View style={{ marginTop: hp(2), paddingHorizontal: wp(10) }}>
                            <Text style={styles.bottomSheetTitle}>{t('Are you sure want to cancel your service booking?')}</Text>
                            <Text style={styles.bottomSubTitle}>{t('Only 80% of the money you can refund from your payment according to our policy')}</Text>
                        </View>
                        <View style={styles.BottomSheetSeparator} />

                        <View style={[styles.bottomBtnRow, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                            <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: "#DAE7F2" }]}
                                onPress={() => bottomSheetModalRef.current?.close()}
                            >
                                <Text style={[styles.bottomText, { color: "#0A5CA8" }]}>{t('Cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.bottomBtn, { backgroundColor: "#0A5CA8" }]}
                                onPress={() => router.push({
                                    pathname: '/bookingPage/BookingPaymentMethod',
                                    params: { bookingId, total }
                                })}
                            // onPress={() => router.push({
                            //     pathname: '/bookingPage/BookingPin',
                            //     params: { bookingId }
                            // })}
                            >
                                <Text style={[styles.bottomText, { color: "white" }]}>{t('Yes, Cancel Booking')}</Text>
                            </TouchableOpacity>
                        </View>

                    </BottomSheetView>
                </BottomSheetModal>


            </View >
        </BottomSheetModalProvider >
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
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(2)
    },
    rowLeft: {
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
        backgroundColor: '#0a5ca8',
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
    footerBtn: {
        height: hp(4),
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
    mapRows: {
        alignItems: 'center',
        justifyContent: 'space-between'
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


    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: hp(2),
    },
    bottomSheetIndi: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.4),
        color: "#F75555"
    },
    BottomSheetSeparator: {
        height: 1,
        backgroundColor: "#EEEEEE",
        width: wp(82),
        marginTop: hp(2.2)
    },
    bottomSheetTitle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
        textAlign: 'center'
    },
    bottomSubTitle: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.8),
        color: "#424242",
        textAlign: 'center',
        marginTop: hp(2)
    },
    bottomBtnRow: {
        alignItems: 'center',
        gap: wp(3),
        marginTop: hp(2),
    },
    bottomBtn: {
        paddingHorizontal: wp(9),
        height: hp(6),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(6),
    },
    bottomText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8),
    },
    markerStyle: {
        position: 'absolute',
        alignSelf: 'center'
    }

})