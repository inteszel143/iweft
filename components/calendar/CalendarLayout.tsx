import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function CalendarLayout() {

    const [selected, setSelected] = useState('');
    const currentDate = new Date();

    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
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
                minDate={formattedCurrentDate}
                pagingEnabled={true}
                onDayPress={day => {
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
                    [formattedCurrentDate]: {
                        selected: true,
                        marked: true, dotColor: '#93C120', selectedColor: '#0A5CA8',
                    },
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(2),
        backgroundColor: '#FFFFFF',
    },
})