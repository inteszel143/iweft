import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { SpecialOffers } from '@/constants/home/data';
import { useIsFocused } from '@react-navigation/native';
import { useSpecialOffers } from '@/query/homeQuery';
const width = Dimensions.get('window').width;
export default function SepecialOffers() {
    const special1 = require('@/assets/temp/special/specialoffers1.png');
    const special2 = require('@/assets/temp/special/specialoffers2.png');
    const special3 = require('@/assets/temp/special/specialoffers.png');
    const special4 = require('@/assets/temp/special/special4.png');
    const isFocused = useIsFocused();
    const { data, isPending } = useSpecialOffers(isFocused);

    return (
        <View style={styles.container}>



            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Special Offers</Text>
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
                    data={data}
                    contentContainerStyle={{ paddingBottom: hp(14) }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.cardStyle, { backgroundColor: item?.title === "Weekend Special!" ? "#35DEBC" : item?.title === "Summer Sale!" ? "#FFAB38" : item?.title === "Today's Special!" ? "#548DC2" : "#FF8A9B", }]}
                            onPress={() => router.push({
                                pathname: '/homePage/OfferOtherPage',
                                params: { item: JSON.stringify(item) },
                            })}
                        >
                            <View style={styles.cardRow}>
                                <View style={{ width: wp(45), marginLeft: wp(8) }}>
                                    <Text style={styles.discount}>{item?.discount_value}%</Text>
                                    <Text style={styles.title}>{item?.title}</Text>
                                    <Text style={styles.subTitle}>{item?.sub_title}</Text>
                                </View>
                                <View style={{ position: 'absolute', right: -wp(2) }}>
                                    <Image
                                        source={item?.title === "Today's Special!" ? special1 : item?.title === "Summer Sale!" ? special2 : item?.title === "Weekend Special!" ? special4 : special3}
                                        resizeMode='contain'
                                        style={{ width: wp(50), height: hp(30), marginTop: hp(2.5) }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}

                />

            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
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
        alignItems: 'center',
        marginTop: hp(1),
    },
    cardStyle: {
        alignSelf: 'center',
        width: wp(90),
        height: hp(21),
        backgroundColor: "#0A5CA8",
        marginTop: hp(2),
        borderRadius: wp(10),
        justifyContent: 'center',
        overflow: 'hidden'
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    discount: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(5),
        color: "white"
    },
    title: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2.4),
        color: "white",
        marginTop: hp(1)
    },
    subTitle: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.9),
        color: "white",
        marginTop: hp(1)
    }

})