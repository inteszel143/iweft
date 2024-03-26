import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import Animated, { BounceIn, FadeOut } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { eReciept } from '@/constants/booking/data';
import { menuChat } from '@/constants/chat/data';
export default function HeaderCustomerSupport() {


    const [cardShow, setCardShow] = useState(false);

    const toggleShowCard = () => {
        setCardShow(!cardShow);
    };



    return (
        <View style={styles.container}>


            <View style={styles.innerContainer}>

                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                    </TouchableOpacity>
                    <Text style={styles.bookingText} >Customer Support</Text>
                </View>

                <View style={styles.headerRight}>
                    <Link href={'/chatPage/CallCustomer'} asChild>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/call.jpg')} resizeMode='contain' style={{ width: wp(7) }} />
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity onPress={toggleShowCard}>
                        <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                    </TouchableOpacity>

                </View>
            </View>



            {
                cardShow &&
                <Animated.View style={styles.headerCard}
                    entering={BounceIn}
                    exiting={FadeOut}
                >
                    {
                        menuChat.map((item, index) => (
                            <View key={index}>
                                <TouchableOpacity style={styles.cardRow}>
                                    <Image source={item.icon} resizeMode='contain' style={{ width: wp(5) }} />
                                    <Text style={styles.cardText} >{item.label}</Text>
                                </TouchableOpacity>
                                {item.separator && <View style={styles.separator} />}
                            </View>
                        ))
                    }
                </Animated.View>
            }





        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp(5),
        paddingTop: hp(6),
        backgroundColor: "#ffffff",
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



    headerCard: {
        width: wp(56),
        height: hp(20),
        position: 'absolute',
        top: hp(11.5),
        right: wp(5),
        borderRadius: wp(6),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        paddingHorizontal: wp(4),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        height: hp(5.5),
    },
    cardText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.9)
    },
    separator: {
        height: 0.9,
        backgroundColor: "#EEEEEE",
        marginHorizontal: wp(2),
        marginTop: 4,
    },
})