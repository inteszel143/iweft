import { SafeAreaView, ScrollView, StyleSheet, RefreshControl, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import CalendarLayout from '@/components/calendar/CalendarLayout';
export default function Page() {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
});