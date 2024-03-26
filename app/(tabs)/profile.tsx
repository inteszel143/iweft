import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileTop from '@/components/profile/ProfileTop';
import ProfileMiddle from '@/components/profile/ProfileMiddle';
export default function Page() {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ProfileTop />
                <ProfileMiddle />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});