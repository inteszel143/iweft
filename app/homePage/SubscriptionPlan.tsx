import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SubscriptionPlansPrior from '@/components/priority/SubscriptionPlansPrior';
export default function SubscriptionPlan() {
    return <SubscriptionPlansPrior />
};

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