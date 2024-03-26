import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ServiceBooking from '@/components/calendar/ServiceBooking';
import CalendarLayout from '@/components/calendar/CalendarLayout';
export default function Page() {
    return (
        <View style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false}>
                <CalendarLayout />
                <ServiceBooking />
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
    },
});