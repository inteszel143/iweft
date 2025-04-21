import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform, Alert } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { timeCollect } from '@/constants/home/data';
import moment from 'moment';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Animated, { BounceIn, FadeIn, FadeOut } from 'react-native-reanimated';
import { defaultStyles } from '@/constants/Styles';
import ModalAlert from '@/components/home/items/ModalAlert';
import useStoreBooking from '@/store/useStoreBooking';
import BookingDetailsModal from '@/components/modal/BookingDetailsModal';
import { eReciept } from '@/constants/booking/data';

export default function BookingDetails() {
    const { setPickUpDateTime, setDeliveryDateTime } = useStoreBooking();
    const [selected, setSelected] = useState<any[]>([]);
    const modalARef = useRef<BottomSheetModal>(null);
    const { total } = useStoreBooking();
    //date
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    // modal
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [cardShow, setCardShow] = useState<boolean>(false);
    const toggleShowCard = () => {
        setCardShow(!cardShow);
    }
    const formattedYesterday = currentDate.toISOString().split('T')[0];

    const [topSelect, setTopSelect] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');


    const handleDayPress = (date: any) => {
        if (selected.length < 2) {
            setSelected([...selected, date]);
        } else {
            setSelected([date]);
        }
    };
    //formatedate
    const formatDate = (dateString: string): string => {
        if (!dateString) {
            return "";
        }
        const [year, month, day] = dateString.split('-');
        const formattedMonth = parseInt(month, 10);
        const formattedDay = parseInt(day, 10);
        return `${formattedMonth}/${formattedDay}/${year}`;
    };
    const collectDate = formatDate(selected[0]);
    const deliveryDate = formatDate(selected[1]);

    const toggleReset = () => {
        setSelected([]);
        setTopSelect('');
        setDeliveryTime('');
        toggleShowCard();
    }

    const onSubmit = () => {
        const pick_up_date_time = collectDate + ' ' + topSelect;
        const delivery_date_time = deliveryDate + ' ' + deliveryTime;
        setPickUpDateTime(pick_up_date_time as string);
        setDeliveryDateTime(delivery_date_time as string);
        router.push('/homePage/BookingAddress');
    };

    useEffect(() => {
        modalARef.current?.present();
    }, []);

    return (
        <BottomSheetModalProvider>
            {/* {deliveryTime && <BookingDetailsModal modalVisible={modalShow} setModalVisible={setModalShow} />} */}
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
                            <TouchableOpacity onPress={toggleShowCard}>
                                <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                            </TouchableOpacity>
                            {deliveryDate && <View style={styles.notifRed} />}
                        </View>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(15) }}>

                    <View style={styles.calendarStyle}>
                        <Text style={styles.select}>Select Date:</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(5), position: 'absolute', right: wp(8), top: hp(4) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <View style={[styles.circle, { backgroundColor: "#0A5CA8" }]} />
                                <Text style={styles.textStyle}>Collect Date</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <View style={[styles.circle, { backgroundColor: "#93C120" }]} />
                                <Text style={styles.textStyle}>Delivery Date</Text>
                            </View>
                        </View>


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
                                textMonthFontSize: hp(1.9),
                                textDayHeaderFontSize: 15,
                            }}
                            current={formattedCurrentDate}
                            minDate={selected[0] ? selected[0] : formattedYesterday}
                            pagingEnabled={true}
                            onDayPress={(day: any) => {
                                handleDayPress(day.dateString);
                            }}
                            markedDates={{
                                [formattedCurrentDate]: {
                                    marked: true,
                                    dotColor: '#0A5CA8',
                                },
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
                                    selectedColor: '#93C120',
                                    customTextStyle: {
                                        fontFamily: 'UrbanistBold',
                                        fontSize: hp(2),
                                    },
                                },
                            }}
                        />
                    </View>
                    {/* Note */}
                    <View style={styles.noteStyle}>
                        <Text style={styles.noteText}>Note: You cannot select a past date. <Text style={{ color: "#212121" }}>Please choose a date from today onward.</Text></Text>
                    </View>

                    <View style={styles.choose}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: wp(5) }}>
                            <View>
                                <Text style={styles.chooseTime}>Choose Collection Time:</Text>
                            </View>
                            {/* <View>
                                {topSelect && <Text style={styles.chooseTimeStyle}>{topSelect}</Text>}
                            </View> */}
                        </View>
                        <View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: hp(2) }}>
                                {
                                    timeCollect.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                style={topSelect == item.label ? [styles.scrollStyle, { backgroundColor: '#0A5CA8' }] : [styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}
                                                // onPress={() => setTopSelect(item.label)}
                                                onPress={() => {
                                                    selected[0] ? setTopSelect(item.label)
                                                        :
                                                        Alert.alert(' Collection Date', 'Please select a collection date first in the calendar', [
                                                            { text: 'OK' },
                                                        ])
                                                }}
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
                        topSelect && <Animated.View style={[styles.choose, { marginTop: hp(4) }]}
                            entering={FadeIn}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: wp(5) }}>
                                <View>
                                    <Text style={styles.chooseTime}>Choose Delivery Time:</Text>
                                </View>
                                <View>
                                    {/* {selected[1] && <Text style={styles.chooseTimeStyle}>{moment(selected[1]).format('LL')}</Text>} */}
                                    {/* {topSelect && <Text style={styles.chooseTimeStyle}>{deliveryTime}</Text>} */}
                                </View>
                            </View>
                            <View>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: hp(2) }}>
                                    {
                                        timeCollect.map((item, index) => {
                                            return (
                                                <TouchableOpacity key={index} style={deliveryTime == item.label ? [styles.scrollStyle, { backgroundColor: '#0A5CA8' }] : [styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}
                                                    // onPress={() => setDeliveryTime(item.label)}
                                                    onPress={() => {
                                                        selected[1] ? setDeliveryTime(item.label)
                                                            :
                                                            Alert.alert(' Delivery Date', 'Please select a delivery date first in the calendar', [
                                                                { text: 'OK' },
                                                            ])
                                                    }}
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


                {
                    cardShow &&
                    <Animated.View style={styles.headerCard}
                        entering={BounceIn}
                        exiting={FadeOut}
                    >
                        <View >
                            <TouchableOpacity style={styles.cardRow}
                                onPress={() => Alert.alert('Iweft support', 'Our support is available to assist you everyday.', [
                                    { text: 'OK' },
                                ])}
                            >
                                <Image source={require("@/assets/icons/chatinfo.jpg")} resizeMode='contain' style={{ width: wp(5) }} />
                                <Text style={styles.cardText} >Info & Support</Text>
                            </TouchableOpacity>
                            <View style={styles.separator} />
                            <TouchableOpacity style={styles.cardRow}
                                onPress={toggleReset}
                            >
                                <Image source={require("@/assets/icons/chatwarning.jpg")} resizeMode='contain' style={{ width: wp(5) }} />
                                <Text style={[styles.cardText, { color: '#F75555' }]} >Reset Schedule</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                }



                <View style={styles.footer}>
                    <TouchableOpacity style={[defaultStyles.footerBtn, {
                        backgroundColor: !collectDate || !topSelect || !deliveryDate || !deliveryTime ? "#85aed4" : "#0A5CA8"
                    }]}
                        disabled={!collectDate || !topSelect || !deliveryDate || !deliveryTime ? true : false}
                        onPress={onSubmit}
                    >
                        <Text style={defaultStyles.footerText}>Continue AED {total}</Text>
                    </TouchableOpacity>
                </View>


                <ModalAlert modalRef={modalARef} />
            </View >
        </BottomSheetModalProvider >
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
        marginTop: hp(1.5),
    },
    select: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.2),
        paddingLeft: wp(5),
        paddingBottom: hp(5)
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
        height: hp(10.5),
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
        height: Platform.OS === 'ios' ? hp(11) : hp(9),
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
    },
    circle: {
        width: wp(4),
        height: wp(4),
        borderRadius: wp(50),
    },
    textStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8)
    },
    noteStyle: {
        paddingHorizontal: wp(5),
        paddingBottom: hp(1)
    },
    noteText: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.5),
        // color: "#212121"
        color: "gray"
    },
    headerCard: {
        width: wp(54),
        height: hp(14),
        position: 'absolute',
        top: Platform.OS === 'android' ? hp(12.5) : hp(11.6),
        right: wp(5),
        borderRadius: wp(6),
        backgroundColor: '#FFFFFF',
        // borderWidth: 0.5,
        // borderColor: '#EEEEEE',
        justifyContent: 'center',
        paddingHorizontal: wp(4),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        height: hp(5),
    },
    cardText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.9)
    },
    separator: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginHorizontal: wp(2),
        marginTop: 4,
    },
    notifRed: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? hp(1.5) : hp(2),
        right: 0,
        width: wp(3.2),
        height: wp(3.2),
        backgroundColor: '#F61705',
        borderRadius: wp(2),
    },
})