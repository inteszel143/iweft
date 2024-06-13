import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, useLocalSearchParams } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';

export default function DriverInstruction() {
    const { service, service_name, itemData, total, pick_up_date_time, delivery_date_time, address, latitude, longitude } = useLocalSearchParams();

    const topData = [
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "No Preferences"
        },
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "Ring the door bell"
        },
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "Ring the door bell"
        },
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "Knock on the door"
        },
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "Do not disturb, bags outside"
        },
    ];

    const botData = [
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "No Preferences"
        },
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "Ring the door bell"
        },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Driver Instructions</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <ScrollView contentContainerStyle={{ paddingBottom: hp(16) }} >
                <View style={styles.containerStyle}>
                    <Text style={[styles.topText,]}>Choose the service you want to subscribe to:</Text>


                    {/* card */}
                    {
                        topData?.map((item, index) => (
                            <TouchableOpacity style={styles.cardStyle} key={index}>
                                <View style={styles.cardRow}>
                                    <Image source={item?.image} resizeMode='contain' style={{ width: wp(10) }} />
                                    <Text style={styles.titleStyle}>{item?.label}</Text>
                                    <FontAwesome name='check-circle' size={hp(3)} color={'#0A5CA8'} />
                                </View>
                            </TouchableOpacity>
                        ))
                    }



                    <Text style={[styles.topText, { marginTop: hp(3) }]}>Do you have any delivery instructions?</Text>
                    {/* card */}
                    {
                        botData?.map((item, index) => (
                            <TouchableOpacity style={styles.cardStyle} key={index}>
                                <View style={styles.cardRow}>
                                    <Image source={item?.image} resizeMode='contain' style={{ width: wp(10) }} />
                                    <Text style={styles.titleStyle}>{item?.label}</Text>
                                    <FontAwesome name='check-circle' size={hp(3)} color={'#0A5CA8'} />
                                </View>
                            </TouchableOpacity>
                        ))
                    }

                </View>
            </ScrollView>



            <View style={styles.footer}>
                <TouchableOpacity style={defaultStyles.footerBtn}
                    onPress={() =>
                        router.push({
                            pathname: 'homePage/HomePaymentMethods',
                            params: { service, service_name, itemData, total, pick_up_date_time, delivery_date_time, address, latitude, longitude }
                        })}>
                    <Text style={defaultStyles.footerText}>Apply</Text>
                </TouchableOpacity>
            </View>


        </View >
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
        marginTop: hp(3),
        paddingHorizontal: wp(5)
    },
    topText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2)
    },
    cardStyle: {
        alignSelf: 'center',
        width: wp(92),
        paddingVertical: hp(2),
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: wp(4),
        marginTop: hp(2.5),
        paddingHorizontal: wp(5.5),
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
        alignItems: 'center'
    },
    titleStyle: {
        flex: 1,
        paddingHorizontal: wp(5),
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2)
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        height: hp(14),
        width: wp(100),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: wp(8),
        borderTopLeftRadius: wp(8),
    }


})