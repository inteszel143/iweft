import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Pressable, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel from 'react-native-reanimated-carousel';
import CarouselIndicator from './CarouselIndicator';
import { Link, router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
import { useSpecialOffers } from '@/query/homeQuery';
import SpecialOfferSkeleton from '../skeleton/SpecialOfferSkeleton';
const width = Dimensions.get('window').width;
export default function HomeSpecialOffers() {
    const { t } = useTranslation();
    const current = getCurrentLanguage();
    const isFocused = useIsFocused();
    const { data, isPending } = useSpecialOffers(isFocused);
    const [activeIndex, setActiveIndex] = useState(0);

    const special1 = require('@/assets/temp/special/specialoffers1.png');
    const special2 = require('@/assets/temp/special/specialoffers2.png');
    const special3 = require('@/assets/temp/special/specialoffers.png');
    const special4 = require('@/assets/temp/special/special4.png');
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (
                _: GestureResponderEvent,
                gestureState: PanResponderGestureState
            ) => {
                const { dx, dy } = gestureState;
                return Math.abs(dx) > Math.abs(dy);
            },
            onPanResponderGrant: (
                _: GestureResponderEvent,
                gestureState: PanResponderGestureState
            ) => {
                // Handle immediate response to tap
            },
            onPanResponderRelease: (
                _: GestureResponderEvent,
                gestureState: PanResponderGestureState
            ) => {
                const { dx } = gestureState;
                if (Math.abs(dx) < 1) {
                    router.push('/homePage/SpecialOffers');
                }
            },
        })
    ).current;

    if (isPending) {
        return (
            <SpecialOfferSkeleton />
        )
    }

    return (
        <View style={styles.container}>
            <View style={[styles.header, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                <Text style={styles.specialText}>{t('Special Offers')}</Text>
                <Link href={'/homePage/SepecialOffers'} asChild>
                    <TouchableOpacity>
                        <Text style={styles.seeallText}>{t('See all')}</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <View>
                <Carousel
                    loop
                    width={width}
                    height={width / 1.8}
                    autoPlay={true}
                    pagingEnabled
                    data={data}
                    autoPlayInterval={4000}
                    scrollAnimationDuration={500}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                paddingTop: hp(6),
                                backgroundColor: 'white'
                            }}
                            {...panResponder.panHandlers}
                        >
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
                            <Text style={{ textAlign: 'center', fontSize: 30 }}>{index}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.indicatorStyle}>
                <CarouselIndicator totalItem={data.length} currentIndex={activeIndex} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: hp(3),
    },
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
    },
    specialText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.4),
    },
    seeallText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
        color: '#0a5ca8'
    },

    indicatorStyle: {
        alignItems: 'center'
    },
    cardStyle: {
        alignSelf: 'center',
        width: wp(90),
        height: hp(21),
        marginTop: hp(2),
        borderRadius: wp(10),
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: hp(3)
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    discount: {
        fontFamily: 'UrbanistSemiBold',
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
        fontSize: hp(1.8),
        color: "white",
        marginTop: hp(1)
    }
})