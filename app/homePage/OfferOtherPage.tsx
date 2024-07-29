import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { SlideInDown, SlideInUp } from 'react-native-reanimated';
import { SpecialOffer } from '@/utils/interface';
import { defaultStyles } from '@/constants/Styles';
import { activeSpecialOffer } from '@/apis/homeApi';
import SuccessActivePromo from '@/components/modal/SuccessActivePromo';
import ErrorActivePromo from '@/components/modal/ErrorActivePromo';
export default function OfferOtherPage() {

    const { item } = useLocalSearchParams();
    const specialOffers: SpecialOffer = JSON.parse(item as string);
    const [btnLoading, setBtnLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);


    const special1 = require('@/assets/temp/special/specialoffers1.png');
    const special2 = require('@/assets/temp/special/specialoffers2.png');
    const special3 = require('@/assets/temp/special/specialoffers.png');
    const special4 = require('@/assets/temp/special/special4.png');


    const toggleActiveOffer = async () => {
        setBtnLoading(true);
        try {
            await activeSpecialOffer(specialOffers?._id);
            setBtnLoading(false);
            setShowSuccess(true);
        } catch (error) {
            setShowError(true);
            setBtnLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            {showSuccess && <SuccessActivePromo modalVisible={showSuccess} setModalVisible={setShowSuccess} />}
            {showError && <ErrorActivePromo modalVisible={showError} setModalVisible={setShowError} />}
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View style={[styles.topStyle, { backgroundColor: specialOffers?.title === "Weekend Special!" ? "#35DEBC" : specialOffers?.title === "Summer Sale!" ? "#FFAB38" : specialOffers?.title === "Today's Special!" ? "#548DC2" : "#FF8A9B", }]}>
                    <Image
                        source={specialOffers?.title === "Today's Special!" ? special1 : specialOffers?.title === "Summer Sale!" ? special2 : specialOffers?.title === "Weekend Special!" ? special4 : special3}
                        resizeMode='contain'
                        style={{ width: wp(100), height: hp(45), marginLeft: wp(2) }} />
                </View>
                <View style={[styles.bottomStyle, { backgroundColor: specialOffers?.title === "Weekend Special!" ? "#35DEBC" : specialOffers?.title === "Summer Sale!" ? "#F4CB93" : specialOffers?.title === "Today's Special!" ? "#83C0DF" : "#FFB5BF", }]}>
                    <View style={styles.bottomtopStyle}>
                        <Text style={styles.topText}>{specialOffers?.title}</Text>
                        <FontAwesome name='bookmark-o' size={hp(3.5)} color={'#0A5CA8'} />
                    </View>
                    <Text style={styles.discountText}>{specialOffers?.discount_value}% OFF</Text>
                    <View style={styles.separator} />

                    <View style={styles.listStyle}>
                        <Text style={styles.listText}>Details</Text>
                        <Text style={styles.listSubText} >{specialOffers?.description} <Text style={{ fontFamily: 'UrbanistBold', color: "#0A5CA8" }}>Read more...</Text> </Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.listStyle}>
                        <Text style={styles.listText}>Terms & Conditions</Text>
                        <Text style={styles.listSubText} >{specialOffers?.terms_and_conditions}</Text>
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
                <TouchableOpacity style={[defaultStyles.footerBtn, { marginTop: hp(3) }]}
                    disabled={btnLoading}
                    onPress={toggleActiveOffer}
                >
                    {btnLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Activate Discount</Text>}
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
        fontSize: hp(4),
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
        alignItems: 'center',
    },

})