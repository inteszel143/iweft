import { ScrollView, StyleSheet, View, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import ProfileTop from '@/components/profile/ProfileTop';
import ProfileMiddle from '@/components/profile/ProfileMiddle';
import Logout from '@/components/profile/Logout';
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useQueryClient } from '@tanstack/react-query';
export default function Page() {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['user-data'] });
            setRefreshing(false);
        }, 2000)
    };
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10, }}
                refreshControl={
                    <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="gray"
                    />
                }
            >
                <ProfileHeader />
                <ProfileTop />
                <View style={styles.separator} />
                <ProfileMiddle />
                <Logout />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    separator: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginTop: 24,
        marginHorizontal: 22,
    }
});