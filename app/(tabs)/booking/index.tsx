import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeOut, FadeOutUp, FadingTransition, JumpingTransition, Layout, withSpring } from 'react-native-reanimated';
import { upcoming } from '@/constants/booking/data';
import { Link } from 'expo-router';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

export default function Page() {

    const [isHiding, setIsHiding] = useState(0);

    const toggleHide = (index: any) => {
        setIsHiding(index);
    };
    const toggleClose = () => {
        setIsHiding(0);
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


    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>

                <FlatList
                    data={upcoming}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Animated.View style={styles.card}
                            entering={FadeInUp.duration(300).springify()}
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
                                    <View>
                                        <TouchableOpacity style={styles.btnStyle}>
                                            <Ionicons name='chatbubble-ellipses' size={hp(2.5)} color={'#0a5ca8'} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </Link>


                            <View style={styles.separator} />


                            {
                                isHiding === item.id && <Animated.View
                                    entering={FadeInUp.duration(300).springify()}
                                    style={{ marginTop: hp(2) }}>
                                    <View style={styles.mapRow}>
                                        <Text style={styles.mapLabel} >Date & Time</Text>
                                        <Text style={styles.mapLabelValue}>Dec 23. 2024 | 10:00 - 12:00 AM</Text>
                                    </View>
                                    <View style={[styles.mapRow, { marginTop: hp(2) }]}>
                                        <Text style={styles.mapLabel} >Location</Text>
                                        <Text style={styles.mapLabelValue}>267 New Avenue Park, New York</Text>
                                    </View>

                                    <View>
                                        <Image
                                            source={require('@/assets/temp/maps.png')}
                                            resizeMode='contain'
                                            style={styles.map}
                                        />
                                    </View>

                                    <View style={styles.mapRows}>

                                        <TouchableOpacity style={[styles.mapBtn, { borderWidth: 1, borderColor: "#0a5ca8" }]}
                                            onPress={handlePresentModalPress}
                                        >
                                            <Text style={[styles.mapText, { color: '#0a5ca8' }]}>Cancel Booking</Text>
                                        </TouchableOpacity>


                                        <Link href={'/bookingPage/Ereceipt'} style={[styles.mapBtn, { backgroundColor: "#0a5ca8" }]} asChild>
                                            <TouchableOpacity >
                                                <Text style={[styles.mapText, { color: 'white' }]}>View E-Receipt</Text>
                                            </TouchableOpacity>
                                        </Link>

                                    </View>

                                    <TouchableOpacity style={styles.footerBtn} onPress={() => toggleClose()}>
                                        <Ionicons name='chevron-up-outline' size={hp(2.5)} />
                                    </TouchableOpacity>

                                </Animated.View>
                            }


                            {
                                isHiding != item.id ? <TouchableOpacity style={styles.footerBtn} onPress={() => toggleHide(item.id)}>
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
                        <Text style={styles.bottomSheetIndi}>Cancel Booking</Text>
                        <View style={styles.BottomSheetSeparator} />

                        <View style={{ marginTop: hp(2), paddingHorizontal: wp(10) }}>
                            <Text style={styles.bottomSheetTitle}>Are you sure want to cancel your service booking?</Text>
                            <Text style={styles.bottomSubTitle}>Only 80% of the money you can refund from your payment according to our policy</Text>
                        </View>
                        <View style={styles.BottomSheetSeparator} />

                        <View style={styles.bottomBtnRow}>
                            <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: "#DAE7F2" }]}
                                onPress={() => bottomSheetModalRef.current?.close()}
                            >
                                <Text style={[styles.bottomText, { color: "#0A5CA8" }]}>Cancel</Text>
                            </TouchableOpacity>
                            <Link href={'/bookingPage/BookingPaymentMethod'} style={[styles.bottomBtn, { backgroundColor: "#0A5CA8" }]} asChild>
                                <TouchableOpacity>
                                    <Text style={[styles.bottomText, { color: "white" }]}>Yes, Cancel Booking</Text>
                                </TouchableOpacity>
                            </Link>
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
        flexDirection: 'row',
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
        height: hp(30)
    },
    mapRows: {
        flexDirection: 'row',
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
        width: wp(90),
        marginTop: hp(2.2)
    },
    bottomSheetTitle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
        textAlign: 'center'
    },
    bottomSubTitle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: "#424242",
        textAlign: 'center',
        marginTop: hp(2)
    },
    bottomBtnRow: {
        flexDirection: 'row',
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
    }

})