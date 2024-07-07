import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { upcoming } from '@/constants/booking/data';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import { useGetBookingByDate } from '@/query/orderQuery';
import EmptyServiceBooking from './EmptyServiceBooking';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
export default function CalendarLayout() {
    const { t } = useTranslation();
    const current = getCurrentLanguage();
    const isFocused = useIsFocused();
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    const [selected, setSelected] = useState(formattedCurrentDate);
    const { data, isFetching } = useGetBookingByDate(isFocused, selected);
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    const formattedYesterday = currentDate.toISOString().split('T')[0];
    return (
        <View style={styles.container}>
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
                // current={'2024-03-26'}
                // minDate={formattedCurrentDate}
                pagingEnabled={true}
                onDayPress={(day: any) => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: {
                        selected: true,
                        // marked: true,
                        disableTouchEvent: true,
                        selectedColor: '#0A5CA8',
                        customTextStyle: {
                            fontFamily: 'UrbanistBold',
                            fontSize: hp(2),
                        },
                    },
                }}
            />

            {
                !data || data.length === 0 ? <EmptyServiceBooking />
                    :
                    <View style={{ backgroundColor: "#F9F9F9", }}>
                        <LinearGradient
                            colors={["#FFFFFF", "#F9F9F9"]}
                            style={{
                                justifyContent: 'center',
                                paddingHorizontal: wp(5),
                                height: hp(6),
                            }}
                        >
                            <View style={styles.topRow}>
                                <Text style={styles.textTop}>{t('Service Booking')} ({data?.length})</Text>
                                <Link href={'/(tabs)/booking/'} asChild>
                                    <TouchableOpacity>
                                        <Text style={styles.textSeeAll}>{t('See all')}</Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </LinearGradient>
                        {
                            data?.map((item: any, index: any) => (
                                <Animated.View style={styles.card}
                                    entering={FadeInUp.duration(300).springify()}
                                    key={index}
                                >
                                    <Link href={'/bookingPage/BookingSummary'} style={[styles.row, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]} asChild>
                                        <TouchableOpacity>
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

                                        </TouchableOpacity>
                                    </Link>
                                </Animated.View>
                            ))
                        }


                    </View>
            }






        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(2),
        backgroundColor: "white",
    },
    textTop: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
    },
    textSeeAll: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
        color: "#0A5CA8"
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },


    card: {
        width: wp(90),
        backgroundColor: 'white',
        paddingBottom: hp(2),
        alignSelf: 'center',
        marginBottom: hp(1),
        marginTop: hp(1),
        borderRadius: wp(6),
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
        fontFamily: 'UrbanistBold',
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
        backgroundColor: '#0A5CA826',
        borderRadius: wp(2)
    },
    upcoming: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.5),
        color: '#0A5CA8'
    },
    separator: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginHorizontal: wp(2),
        marginTop: hp(3)
    },



})