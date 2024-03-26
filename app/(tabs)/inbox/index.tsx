import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatList from '@/components/inbox/ChatList'

export default function Page() {
    return (
        <View style={styles.container}>
            <ChatList />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    }
})