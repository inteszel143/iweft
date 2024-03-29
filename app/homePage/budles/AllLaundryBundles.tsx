import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { allbundle } from '@/constants/home/data';

export default function AllLaundryBundles() {
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
                    data={allbundle}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.img}
                    renderItem={({ item }) => (
                        <View style={[styles.cardStyle, { backgroundColor: `${item.color}` }]}>
                            <View style={styles.cardInner}>
                                <View style={{ width: wp(50) }}>
                                    <Text style={styles.cardLabel}>{item.label}</Text>
                                </View>
                                <Image source={item.img} resizeMode='contain' style={{ width: wp(30), tintColor: 'white' }} />
                            </View>
                        </View>
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
        alignItems: 'center',
        paddingBottom: hp(15)
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