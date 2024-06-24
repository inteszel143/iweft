import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform } from 'react-native'
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
import Animated, { FadeIn } from 'react-native-reanimated';
import { defaultStyles } from '@/constants/Styles';
import ModalAlert from '@/components/home/items/ModalAlert';

export default function BookingDetails() {
    const { service, service_name, itemData, total, total_data, base_price } = useLocalSearchParams();
    const [selected, setSelected] = useState<any[]>([]);
    const modalARef = useRef<BottomSheetModal>(null);

    //date
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

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


    const onSubmit = () => {
        const pick_up_date_time = collectDate + ' ' + topSelect;
        const delivery_date_time = deliveryDate + ' ' + deliveryTime;
        router.push({
            pathname: '/homePage/BookingAddress',
            params: { service, service_name, itemData, total, pick_up_date_time, delivery_date_time, base_price }
        });
    }

    useEffect(() => {
        modalARef.current?.present();
    }, []);

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
                            current={formattedCurrentDate}
                            minDate={formattedYesterday}
                            pagingEnabled={true}
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
                    <TouchableOpacity style={defaultStyles.footerBtn}
                        onPress={onSubmit}
                    >
                        <Text style={defaultStyles.footerText}>Continue AED {total}</Text>
                    </TouchableOpacity>
                </View>


                <ModalAlert modalRef={modalARef} />
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


})