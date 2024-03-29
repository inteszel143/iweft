import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { SpecialOffers } from '@/constants/home/data';
const width = Dimensions.get('window').width;
export default function SepecialOffers() {
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
                    data={SpecialOffers}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.img}
                    renderItem={({ item }) => (
                        <Link href={{ pathname: '/homePage/OfferOtherPage', params: item }} asChild>
                            <TouchableOpacity>
                                <Image source={item.img} resizeMode='cover' style={{ width: wp(100), height: hp(22) }} />
                            </TouchableOpacity>
                        </Link>
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
        marginTop: hp(2)
    }

})