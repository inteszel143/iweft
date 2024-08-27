import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useHomeNotificationByID } from '@/query/notifQuery';
import { useIsFocused } from '@react-navigation/native';
import { getUserNotificationById } from '@/apis/notification';

export default function NotificationReview() {
    const { notifId } = useLocalSearchParams();
    const isFocused = useIsFocused();
    const { data, isPending } = useHomeNotificationByID(isFocused, notifId as string);
    console.log(data);



    return (
        <View>
            <Text>NotificationReview</Text>
        </View>
    )
}

const styles = StyleSheet.create({})