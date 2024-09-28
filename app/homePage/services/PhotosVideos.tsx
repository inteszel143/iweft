import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { photos } from '@/constants/home/data';
const { width } = Dimensions.get('window');
export default function PhotosVideos() {
    const { other_image } = useLocalSearchParams();
    const photosString = other_image as string
    const photosArray = photosString.split(',');
    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Photos & Videos</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={styles.paddable}>
                <FlatList
                    data={photosArray}
                    numColumns={2}
                    keyExtractor={(index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                margin: wp(1.5), // Adding margin for both columns and rows
                                alignItems: 'center',
                            }}>
                            <Image
                                source={{ uri: item }}
                                resizeMode="cover"
                                style={{
                                    width: width / 2 - wp(3), // Adjust the width to account for margins
                                    height: hp(30),
                                    borderRadius: wp(2)
                                }}
                            />
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
        // backgroundColor: '#FFFFFF',
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
    paddable: {
        paddingBottom: hp(15),
        alignItems: 'center',
        flex: 1,
    }


})