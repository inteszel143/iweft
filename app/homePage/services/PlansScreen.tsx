import { ActivityIndicator, Alert, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset, withSpring } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { SubscriptionItem } from '@/utils/interface';
import { postAvailSubscription, postCollectPayment } from '@/apis/stripe';
import { useStripe } from '@stripe/stripe-react-native';
import useStoreSub from '@/store/useStoreSub';
const IMG_HEIGHT = 350;
const { width } = Dimensions.get('window');


export default function PlansScreen() {
    const { item } = useLocalSearchParams();
    const subItem: SubscriptionItem = JSON.parse(item as string);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const { setCollection, setTotal, setPriceId } = useStoreSub();
    const [addbook, setAddbook] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleAdd = () => {
        setAddbook(!addbook);
    };

    const onSubmit = async () => {
        setLoading(true);
        const total = subItem?.unit_amount / 100;
        setPriceId(subItem?.price_id);
        setCollection(subItem?.collection_count);
        setTotal(total);
        setTimeout(() => {
            setLoading(false);
            router.push('homePage/services/PlantSelectMethod');
        }, 1000);
    }



    // scrollview
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const scrollHandler = useScrollViewOffset(scrollRef);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });
    const headerStyle = useAnimatedStyle(() => {
        return {
            opacity: scrollHandler.value > 300 ? withSpring(1) : withSpring(0),
        };
    });

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                bounces={false}
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
            >
                <Animated.View style={[styles.topStyle, imageAnimatedStyle]}>
                    <Image
                        source={{ uri: subItem?.image }}
                        // source={require('@/assets/temp/services/basicScreen.png')}
                        resizeMode='cover'
                        style={[{ width: wp(100), height: IMG_HEIGHT }]} />
                    <View style={styles.topFooter}>
                        <View style={{ width: wp(8), height: 10, borderRadius: 8, backgroundColor: '#0A5CA8' }} />
                        <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: '#E0E0E0' }} />
                        <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: '#E0E0E0' }} />
                        <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: '#E0E0E0' }} />
                        <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: '#E0E0E0' }} />
                    </View>
                </Animated.View>




                <View style={styles.middleStyle}>
                    <View style={styles.middelTopRow}>
                        <Text style={styles.middleText}>{subItem?.name}</Text>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookmarkInactive.jpg')} resizeMode='contain' style={{ width: wp(5.5) }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rateStyle}>
                        <Text style={styles.core}>{subItem?.description}</Text>
                    </View>
                    <View style={styles.laundryStyle}>
                        <Text style={styles.laundryText}>Cleaning & pressing</Text>
                    </View>

                    <View style={styles.priceStyle}>
                        <Text style={styles.priceText}>AED {subItem?.unit_amount / 100}</Text>
                        <Text style={styles.subText}>(base price)</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.detailsStyle}>
                        <Text style={styles.detailText}>About me</Text>
                        <Text style={styles.subDetailText}>{subItem?.details}<Text style={{ fontFamily: 'UrbanistBold', fontSize: hp(2), color: '#0A5CA8' }}> Read more...</Text></Text>
                    </View>
                    <View style={styles.detailsStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.detailText}>Photos & Videos</Text>
                            <Link href={'/homePage/services/PhotosVideos'} asChild>
                                <TouchableOpacity>
                                    <Text style={styles.seeallText}>See all</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Image source={require('@/assets/temp/services/photo1.jpg')} resizeMode='contain' style={{ width: wp(40), height: hp(30) }} />
                            <Image source={require('@/assets/temp/services/photo2.jpg')} resizeMode='contain' style={{ width: wp(40), height: hp(30) }} />
                        </View>
                    </View>


                </View>


            </Animated.ScrollView>

            {/* footer btn */}
            <View style={styles.footer}>
                <View style={styles.bottomBtnRow}>
                    <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: "#DAE7F2" }]}
                        onPress={() => router.push('/BookingChat')}
                    >
                        <Text style={[styles.bottomText, { color: "#0A5CA8" }]}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: "#0A5CA8" }]}
                        onPress={onSubmit}
                    >
                        {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={[styles.bottomText, { color: "white" }]}>Subscribe Now </Text>}
                    </TouchableOpacity>
                </View>
            </View>



            {/* back */}
            <View style={styles.topBtnStyle}>
                <TouchableOpacity
                    onPress={() => router.back()}>
                    <AntDesign name='arrowleft' size={hp(3)} color={'white'} />
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.header, headerStyle]}>
                <View style={styles.headerHide}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name='chevron-back' size={hp(3)} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Basic Plan</Text>
                    </View>
                    <TouchableOpacity>
                        {addbook ? <Image source={require('@/assets/icons/bookmarkActive.jpg')} resizeMode='contain' style={{ width: wp(5) }} /> : <Image source={require('@/assets/icons/bookmarkInactive.jpg')} resizeMode='contain' style={{ width: wp(5) }} />}
                    </TouchableOpacity>
                </View>
            </Animated.View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    topStyle: {
        height: IMG_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topFooter: {
        position: 'absolute',
        bottom: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2)
    },
    middleStyle: {
        paddingHorizontal: wp(5),
        marginTop: hp(3),
        backgroundColor: 'white',
    },
    middelTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    middleText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(3)
    },
    topBtnStyle: {
        position: 'absolute',
        top: hp(8),
        left: wp(6),
    },
    rateStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        marginTop: hp(2)
    },
    core: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.5),
        color: '#0A5CA8'
    },
    laundryStyle: {
        height: hp(4),
        width: wp(50),
        backgroundColor: "#0A5CA826",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginTop: hp(2)
    },
    laundryText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
        color: "#0A5CA8"
    },
    priceStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3),
        marginTop: hp(3)
    },
    priceText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(3.2),
        color: '#0A5CA8'
    },
    subText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: "#616161"
    },
    separator: {
        height: 1.5,
        backgroundColor: '#EEEEEE',
        marginTop: hp(3)
    },
    detailsStyle: {
        marginTop: hp(3)
    },
    detailText: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.5)
    },
    subDetailText: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(2),
        color: '#424242',
        marginTop: hp(2),
        textAlign: 'justify'
    },
    seeallText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
        color: '#0a5ca8'
    },
    header: {
        position: 'absolute',
        top: 0,
        width: wp(100),
        backgroundColor: "#fff",
        height: 100,
        justifyContent: 'flex-end',
        borderBottomColor: 'gray',
        paddingHorizontal: wp(5)
    },
    headerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
    },
    headerHide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: Platform.OS === 'ios' ? hp(13) : hp(11),
        backgroundColor: 'white',
        alignItems: 'center'
    },

    bottomBtnRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2),
        marginTop: hp(2),
        borderTopRightRadius: wp(4),
        borderTopLeftRadius: wp(4),
    },
    bottomBtn: {
        width: wp(44),
        height: hp(6.5),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(10),
    },
    bottomText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.9),
    }
})