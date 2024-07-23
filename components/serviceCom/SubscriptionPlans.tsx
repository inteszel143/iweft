import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useSubscriptionPlan } from '@/query/homeQuery';
import SubscriptionSkeleton from '@/components/skeleton/SubscriptionSkeleton';
import { useGetAllSubscription } from '@/query/stripeQuery';

export default function SubscriptionPlans() {

    const isFocused = useIsFocused();
    const { data, isPending } = useSubscriptionPlan(isFocused);


    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Subscription  Plans</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {
                isPending ? <SubscriptionSkeleton />
                    :
                    <FlatList
                        data={data}
                        keyExtractor={item => item.product_id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.CardStyle}
                                onPress={() => router.push({
                                    pathname: 'homePage/services/PlansScreen',
                                    params: { item: JSON.stringify(item) },
                                })}
                            >
                                <View style={styles.cardRow}>
                                    <View style={styles.cardLeft}>
                                        <Image source={{ uri: item?.image }} resizeMode='contain' style={{ width: wp(32), height: hp(15), }} />
                                        <View style={{ width: wp(45) }}>
                                            < Text style={styles.topText} >{item?.description}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2), marginTop: hp(1.5) }}>
                                                {/* <Image source={item?.icon} resizeMode='contain' style={{ width: wp(6), height: hp(4) }} /> */}
                                                <Text style={styles.middleText}>{item.name}</Text>
                                            </View>
                                            <Text style={styles.priceText}>AED {item.unit_amount / 100}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        {/* <FontAwesome name='bookmark' size={hp(2.9)} color={'#0A5CA8'} /> */}
                                    </View>
                                </View>
                            </TouchableOpacity >
                        )}
                    />

            }



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    Headercontainer: {
        paddingHorizontal: wp(5),
        paddingTop: hp(6),
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(6),
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(5),
    },
    bookingText: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.5)
    },



    CardStyle: {
        alignSelf: 'center',
        width: wp(92),
        paddingVertical: hp(2),
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: wp(4),
        marginTop: hp(2),
        paddingHorizontal: wp(5),
        shadowColor: "#DDDDDD",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardLeft: {
        flexDirection: 'row',
        gap: wp(4)
    },
    topText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: '#616161',
        marginTop: hp(1)
    },
    middleText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.5),
    },
    priceText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.4),
        marginTop: hp(1.5),
        color: '#0A5CA8'
    },


})