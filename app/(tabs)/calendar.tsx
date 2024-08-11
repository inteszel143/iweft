import { SafeAreaView, ScrollView, StyleSheet, RefreshControl, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import CalendarLayout from '@/components/calendar/CalendarLayout';
import useValidateRefresh from '@/store/useValidateRefresh';
import NoTokenCalendar from '@/components/notoken/NoTokenCalendar';
export default function Page() {
    const [refreshing, setRefreshing] = useState(false);
    const { refreshToken } = useValidateRefresh();
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    if (refreshToken === null) {
        return <NoTokenCalendar />
    } else {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#DADADA" />
                    }
                >
                    <CalendarLayout />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
});