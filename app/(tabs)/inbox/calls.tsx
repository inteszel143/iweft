import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CallList from '@/components/inbox/CallList'

export default function Page() {
    return (
        <View style={styles.container}>
            <CallList />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    }
})