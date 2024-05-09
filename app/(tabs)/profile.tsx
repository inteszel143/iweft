import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import ProfileTop from '@/components/profile/ProfileTop';
import ProfileMiddle from '@/components/profile/ProfileMiddle';
import Logout from '@/components/profile/Logout';
import ProfileHeader from "@/components/profile/ProfileHeader";
export default function Page() {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10, }}>
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