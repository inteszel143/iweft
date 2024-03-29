import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { SlideInDown, SlideInUp } from 'react-native-reanimated';
export default function OfferOtherPage() {

    const item = useLocalSearchParams();

    return (
        <View style={styles.container}>

            <StatusBar style='light' />



            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View style={[styles.topStyle, { backgroundColor: item.img === "49" ? '#387AB8' : item.img === "50" ? '#FF93A3' : '#FDA120' }]}>
                    {
                        item.img === "49" ? <Image
                            source={require('@/assets/temp/special/specialoffers1.png')}
                            resizeMode='contain'
                            style={{ width: wp(100), height: hp(45), marginLeft: wp(2) }} />
                            :
                            item.img === "50" ?
                                <Image
                                    source={require('@/assets/temp/special/specialoffers.png')}
                                    resizeMode='contain'
                                    style={{ width: wp(100), height: hp(46), marginLeft: wp(2) }} />
                                :
                                <Image
                                    source={require('@/assets/temp/special/specialoffers2.png')}
                                    resizeMode='contain'
                                    style={{ width: wp(100), height: hp(47), marginLeft: wp(2) }} />
                    }
                </View>


                <View style={[styles.bottomStyle, { backgroundColor: item.img === "49" ? '#83C0DF' : item.img === "50" ? '#FFB5BF' : '#F4CB93' }]}>


                    <View style={styles.bottomtopStyle}>
                        {
                            item.img === "49" ? <Text style={styles.topText}>Today’s Special!</Text> : item.img === "50" ? <Text style={styles.topText}>Referral Discount</Text> : <Text style={styles.topText}>Summer Sale!</Text>
                        }
                        <FontAwesome name='bookmark' size={hp(2.9)} color={'#0A5CA8'} />
                    </View>
                    {
                        item.img === "49" ? <Text style={styles.discountText}>30% OFF</Text> : item.img === "50" ? <Text style={styles.discountText}>25% OFF</Text> : <Text style={styles.discountText}>40% OFF</Text>
                    }
                    <View style={styles.separator} />

                    <View style={styles.listStyle}>
                        <Text style={styles.listText}>Details</Text>
                        <Text style={styles.listSubText} >With our iWeft basic plan, you will be set up for 3 collections every month, allowing you to stay on top of your laundry and get on with the better things in life. Read more...</Text>
                    </View>
                    <View style={styles.separator} />


                    <View style={styles.listStyle}>
                        <Text style={styles.listText}>Terms & Conditions</Text>
                        <Text style={styles.listSubText} >With our iWeft basic plan, you will be set up for 3 collections every month, allowing you to stay on top of your laundry and get on with the better things in life. Read more...</Text>
                    </View>


                </View>
            </ScrollView>



            <View style={styles.topBtnStyle}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name='arrowleft' size={hp(3)} color={'white'} />
                </TouchableOpacity>
            </View>




            <Animated.View style={styles.footer}
                entering={SlideInDown.duration(400)}
            >
                <TouchableOpacity style={styles.footerBtn}>
                    <Text style={styles.footerText}>Activate Discount</Text>
                </TouchableOpacity>
            </Animated.View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    topStyle: {
        width: wp(100),
        height: hp(42),
    },

    topBtnStyle: {
        position: 'absolute',
        top: hp(8),
        left: wp(6),
    },

    bottomStyle: {
        paddingBottom: hp(15),
        paddingHorizontal: wp(6),
    },
    bottomtopStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(2)
    },
    topText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(3.5),
        color: 'white',
    },
    discountText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(3),
        color: '#0A5CA8',
        marginTop: hp(2)
    },

    separator: {
        height: 0.5,
        backgroundColor: '#FFFFFF',
        marginTop: hp(3)
    },

    listStyle: {
        marginTop: hp(3)
    },
    listText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.5),
        color: 'white',
    },
    listSubText: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.8),
        color: '#FFFFFF',
        marginTop: hp(2)
    },




    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(14),
        backgroundColor: 'white',
        borderTopRightRadius: wp(4),
        borderTopLeftRadius: wp(4),
        alignItems: 'center'
    },

    footerBtn: {
        width: wp(90),
        height: hp(6.5),
        backgroundColor: "#0A5CA8",
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(2.5)
    },
    footerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: 'white'
    }

})