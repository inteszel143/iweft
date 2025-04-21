import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { allbundle } from '@/constants/home/data';
import { useIsFocused } from '@react-navigation/native';
import { useLaundryBundles } from '@/query/homeQuery';
const colors = [
    { code: "#486FFB" },
    { code: "#FF6A80" },
    { code: "#FEA223" },
    { code: "#2DD0AF" }
];
export default function AllLaundryBundles() {

    const isFocused = useIsFocused();
    const { data: laundryData, isPending } = useLaundryBundles(isFocused);
    const bundle1 = require('@/assets/temp/laundryBundle/bundle_1.png');
    const bundle2 = require('@/assets/temp/laundryBundle/bundle_2.png');
    const bundle3 = require('@/assets/temp/laundryBundle/bundle_3.png');
    const sortedData = laundryData?.slice().sort((a: any, b: any) => a.title.localeCompare(b.title));
    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Laundry Bundles</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={styles.containerStyle}>
                <FlatList
                    data={sortedData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View key={index}>
                            <Pressable
                                onPress={() => router.push({
                                    pathname: '/homePage/budles/BuddleScreen',
                                    params: { bundleId: item?._id },
                                })}
                            >
                                <Image
                                    source={item?.title === "Bedding Set Bundle" ? bundle1 : item?.title === "Suit Care Bundle" ? bundle2 : bundle3}
                                    resizeMode='cover'
                                    style={{
                                        width: wp(100),
                                        height: hp(22),
                                    }}
                                />
                            </Pressable>
                        </View>
                        // <TouchableOpacity
                        //     style={[styles.cardStyle, { backgroundColor: item?.title === "Bedding Set Bundle" ? "#486FFB" : "#FF6A80" }]}
                        //     onPress={() => router.push({
                        //         pathname: '/homePage/budles/BuddleScreen',
                        //         params: { bundleId: item?._id },
                        //     })}
                        //     key={index}
                        // >
                        //     <View style={styles.cardInner}>
                        //         <View style={{ width: wp(50) }}>
                        //             <Text style={styles.cardLabel}>{item?.title}</Text>
                        //         </View>
                        //         <Image source={{ uri: item?.image }} resizeMode='contain' style={{ width: wp(30), height: hp(12), tintColor: 'white' }} />
                        //     </View>
                        // </TouchableOpacity>
                    )}
                />
            </View>




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



    containerStyle: {
        flex: 1,
        alignItems: 'center',
        marginTop: hp(3)
    },
    cardStyle: {
        marginTop: hp(2.5),
        width: wp(90),
        height: hp(20),
        justifyContent: 'center',
        borderRadius: wp(6),
        paddingHorizontal: wp(5)
    },
    cardInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardLabel: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(4),
        color: '#FFFFFF'
    }
})