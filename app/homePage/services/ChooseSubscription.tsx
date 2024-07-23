import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useSubscriptionPlan } from '@/query/homeQuery';
import SubscriptionSkeleton from '@/components/skeleton/SubscriptionSkeleton';
import { useGetAllSubscription } from '@/query/stripeQuery';
import YourSubscription from '@/components/serviceCom/YourSubscription';
import SubscriptionPlans from '@/components/serviceCom/SubscriptionPlans';

export default function ChooseSubscription() {

    const isFocused = useIsFocused();
    const { data: subscription, isPending } = useGetAllSubscription(isFocused);

    if (isPending) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={'small'} color={'gray'} />
                <Text style={styles.textStyle}>Please wait</Text>
            </View>
        )
    }

    if (subscription) {
        return <YourSubscription />
    } else {
        <SubscriptionPlans />
    };

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textStyle: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
        color: '#616161',
        marginTop: hp(1)
    }

})