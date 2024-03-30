import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { timeCollect } from '@/constants/home/data';
import moment from 'moment';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function BookingDetails() {
    const [selected, setSelected] = useState<any[]>([]);

    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    const formattedYesterday = currentDate.toISOString().split('T')[0];

    const [topSelect, setTopSelect] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');


    const handleDayPress = (date: any) => {
        if (selected.length < 2) {
            // If less than 2 dates are selected, add the pressed date to the selectedDates array
            setSelected([...selected, date]);
        } else {
            // If 2 dates are already selected, reset the selection and select the pressed date
            setSelected([date]);
        }
    };


    // useEffect(() => {
    //     bottomSheetModalRef.current?.present();
    // }, []);

    // bottomsheet
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '54%'], []);
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1}{...props} />, []
    )


    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>



                <View style={styles.Headercontainer}>
                    <View style={styles.innerContainer}>

                        <View style={styles.headerLeft}>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                            </TouchableOpacity>
                            <Text style={styles.bookingText} >Booking Details</Text>
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity>
                                <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>




                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(15) }}>

                    <View style={styles.calendarStyle}>
                        <Text style={styles.select}>Select Date</Text>
                        <Calendar
                            style={{
                                marginHorizontal: wp(4),
                                borderRadius: wp(4),
                                marginBottom: hp(1),
                                overflow: 'hidden',
                                backgroundColor: "#E7EFF6",
                            }}
                            theme={{
                                backgroundColor: "#E7EFF6",
                                calendarBackground: "#E7EFF6",
                                textDisabledColor: 'gray',
                                dotColor: '#93C120',
                                selectedDotColor: '#93C120',
                                textSectionTitleColor: '#000',
                                arrowColor: '#0A5CA8',
                                monthTextColor: '#000',
                                dayTextColor: '#000',
                                textDayFontFamily: 'UrbanistRegular',
                                selectedDayTextColor: '#FFFFFF',
                                todayTextColor: '#0A5CA8',
                                textMonthFontFamily: 'UrbanistBold',
                                textDayHeaderFontFamily: 'UrbanistBold',
                                textDayFontSize: hp(1.9),
                                textMonthFontSize: 20,
                                textDayHeaderFontSize: 15,
                            }}
                            current={'2024-03-26'}
                            minDate={formattedYesterday}
                            pagingEnabled={true}
                            // onDayPress={day => {
                            //     setSelected(day.dateString);
                            // }}
                            onDayPress={day => {
                                handleDayPress(day.dateString);
                            }}

                            markedDates={{
                                [selected[0]]: {
                                    selected: true,
                                    disableTouchEvent: true,
                                    selectedColor: '#0A5CA8',
                                    customTextStyle: {
                                        fontFamily: 'UrbanistBold',
                                        fontSize: hp(2),
                                    },
                                },
                                [selected[1]]: {
                                    selected: true,
                                    disableTouchEvent: true,
                                    selectedColor: '#0A5CA8',
                                    customTextStyle: {
                                        fontFamily: 'UrbanistBold',
                                        fontSize: hp(2),
                                    },
                                },
                            }}
                        />
                    </View>



                    <View style={styles.choose}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: wp(5) }}>
                            <View>
                                {selected[0] && <Text style={styles.chooseTime}>Collection Date:</Text>}
                                <Text style={styles.chooseTime}>Choose Collection Time:</Text>
                            </View>
                            <View>
                                {selected[0] && <Text style={styles.chooseTimeStyle}>{moment(selected[0]).format('LL')}</Text>}
                                {topSelect && <Text style={styles.chooseTimeStyle}>{topSelect}</Text>}
                            </View>
                        </View>
                        <View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: hp(2) }}>
                                {
                                    timeCollect.map((item, index) => {
                                        return (
                                            <TouchableOpacity key={index} style={topSelect == item.label ? [styles.scrollStyle, { backgroundColor: '#0A5CA8' }] : [styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}
                                                onPress={() => setTopSelect(item.label)}
                                            >
                                                <Text style={topSelect == item.label ? [styles.scrollText, { color: 'white' }] : [styles.scrollText, { color: '#0A5CA8' }]}>{item.label}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    </View>



                    {
                        selected[0] && <Animated.View style={[styles.choose, { marginTop: hp(4) }]}
                            entering={FadeIn}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: wp(5) }}>
                                <View>
                                    {selected[1] && <Text style={styles.chooseTime}>Delivery Date:</Text>}
                                    <Text style={styles.chooseTime}>Choose Delivery Time:</Text>
                                </View>
                                <View>
                                    {selected[1] && <Text style={styles.chooseTimeStyle}>{moment(selected[1]).format('LL')}</Text>}
                                    {topSelect && <Text style={styles.chooseTimeStyle}>{deliveryTime}</Text>}
                                </View>
                            </View>
                            <View>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: hp(2) }}>
                                    {
                                        timeCollect.map((item, index) => {
                                            return (
                                                <TouchableOpacity key={index} style={deliveryTime == item.label ? [styles.scrollStyle, { backgroundColor: '#0A5CA8' }] : [styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}
                                                    onPress={() => setDeliveryTime(item.label)}
                                                >
                                                    <Text style={deliveryTime == item.label ? [styles.scrollText, { color: 'white' }] : [styles.scrollText, { color: '#0A5CA8' }]}>{item.label}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>
                        </Animated.View>
                    }
                </ScrollView>





                <View style={styles.footer}>
                    <Link href={'/homePage/BookingAddress'} asChild>
                        <TouchableOpacity style={styles.footerBtn}>
                            <Text style={styles.footerText}>Continue AED 125</Text>
                        </TouchableOpacity>
                    </Link>
                </View>


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
                        <Image source={require('@/assets/temp/bookingdetails.jpg')} resizeMode='contain' style={{ width: wp(90), height: hp(30) }} />
                        <Text style={styles.bottomSheetText}>Before your first order, select a time to meet one of our drivers! They will hand over everything you need to get started. </Text>

                        <View style={styles.bottomBtnRow}>
                            <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: "#0A5CA8" }]}
                                onPress={handlePresentModalPress}
                            >
                                <Text style={[styles.bottomText, { color: "#FFFFFF" }]}>Got it</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>


            </View>
        </BottomSheetModalProvider>
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

    calendarStyle: {
        marginTop: hp(3),
    },
    select: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.2),
        paddingLeft: wp(5),
        paddingBottom: hp(3)
    },
    chooseTime: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2),
        marginTop: hp(1),
    },
    choose: {
        marginTop: hp(1)
    },
    chooseTimeStyle: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2),
        color: '#0A5CA8',
        marginTop: hp(1),
    },


    scrollStyle: {
        paddingHorizontal: wp(5),
        height: hp(4),
        borderRadius: wp(4),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp(4),
    },
    scrollText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8)
    },


    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bottomSheetText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: '#0A5CA8',
        textAlign: 'center',
        paddingHorizontal: wp(5),
        marginTop: Platform.OS === 'ios' ? hp(1) : hp(2)
    },
    bottomBtnRow: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(10),
        alignItems: 'center',
    },
    bottomBtn: {
        paddingHorizontal: wp(9),
        height: hp(6),
        width: wp(90),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(6),
    },
    bottomText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: Platform.OS === 'ios' ? hp(14) : hp(12),
        backgroundColor: 'white',
        borderTopRightRadius: wp(4),
        borderTopLeftRadius: wp(4),
        alignItems: 'center'
    },

    footerBtn: {
        width: wp(90),
        height: hp(6.5),
        backgroundColor: "#0A5CA8",
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(2.5)
    },
    footerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: 'white'
    }

})