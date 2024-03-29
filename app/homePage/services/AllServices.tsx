import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { bookmakeTop } from '@/constants/home/data';
import { FontAwesome } from '@expo/vector-icons';

export default function AllServices() {

    // hook
    const [topSelect, setTopSelect] = useState(0);


    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Most Popular Services</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingSearch.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>




            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: hp(2) }}>
                    {
                        bookmakeTop.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={topSelect == index ? [styles.scrollStyle, { backgroundColor: '#0A5CA8' }] : [styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}
                                    onPress={() => setTopSelect(index)}
                                >
                                    <Text style={topSelect == index ? [styles.scrollText, { color: 'white' }] : [styles.scrollText, { color: '#0A5CA8' }]}>{item.label}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>





            <TouchableOpacity style={styles.CardStyle}>
                <View style={styles.cardRow}>
                    <View style={styles.cardLeft}>
                        <Image source={require('@/assets/temp/bookmark.jpg')} resizeMode='contain' style={{ width: wp(28), height: hp(15), }} />
                        <View style={{ width: wp(45) }}>
                            < Text style={styles.topText} > Cleaning / Pressing</Text>
                            <Text style={styles.middleText}>Weekly Work Refresh</Text>
                            <Text style={styles.priceText}>AED 25</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2), marginTop: hp(1.5), }}>
                                <FontAwesome name='star' size={hp(2)} color={'#FB9400'} />
                                <Text style={styles.rateText}>4.8</Text>
                                <View style={styles.cardSeperator} />
                                <Text style={styles.rateText}>8,289 reviews</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <FontAwesome name='bookmark' size={hp(2.9)} color={'#0A5CA8'} />
                    </View>
                </View>
            </TouchableOpacity >


            <TouchableOpacity style={styles.CardStyle}>
                <View style={styles.cardRow}>
                    <View style={styles.cardLeft}>
                        <Image source={require('@/assets/temp/bookmark.jpg')} resizeMode='contain' style={{ width: wp(28), height: hp(15), }} />
                        <View style={{ width: wp(45) }}>
                            < Text style={styles.topText} > Cleaning / Pressing</Text>
                            <Text style={styles.middleText}>Weekly Work Refresh</Text>
                            <Text style={styles.priceText}>AED 25</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2), marginTop: hp(1.5), }}>
                                <FontAwesome name='star' size={hp(2)} color={'#FB9400'} />
                                <Text style={styles.rateText}>4.8</Text>
                                <View style={styles.cardSeperator} />
                                <Text style={styles.rateText}>8,289 reviews</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <FontAwesome name='bookmark' size={hp(2.9)} color={'#0A5CA8'} />
                    </View>
                </View>
            </TouchableOpacity >




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



    scrollStyle: {
        paddingHorizontal: wp(5),
        height: hp(4),
        borderRadius: wp(4),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp(4),
    },
    scrollText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8)
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
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.8),
        color: '#616161'
    },
    middleText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
        marginTop: hp(1.5)
    },
    priceText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
        marginTop: hp(1.5),
        color: '#0A5CA8'
    },
    cardSeperator: {
        height: hp(1.5),
        width: 1.5,
        backgroundColor: "#616161",
    },
    rateText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.7),
        color: "#616161"
    },



})