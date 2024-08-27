import { View, Text, Button } from 'react-native'
import React from 'react'
import { useIsFocused } from '@react-navigation/native';
import { useGetMessage } from '@/query/message';
import { usePushNotifications } from '@/usePushNotification';
import * as Notifications from 'expo-notifications';
export default function Test() {

    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Iweft Laundry & Dry Cleaning",
                body: "Your laundry booking has been confirmed. Expect a reminder when it's time for pickup",
                data: { data: 'goes here', test: { test1: 'more data' } },
            },
            // trigger: { seconds: 1 },
            trigger: null,
        });
    };


    return (
        <View>
            <Button
                title="Press to schedule a notification"
                onPress={async () => {
                    await schedulePushNotification();
                }}
            />
        </View>
    )
}