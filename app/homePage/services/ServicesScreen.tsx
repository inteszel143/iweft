import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset, withSpring } from 'react-native-reanimated';
import { customer, starRating } from '@/constants/home/data';
import { ServiceItem } from '@/utils/interface';
import { useIsFocused } from '@react-navigation/native';
import { useGetReview } from '@/query/reviewQuery';
import { formatNumber, getAverageRating, ratingTime } from '@/utils/format';
import moment from 'moment';
import AddBookmarks from '@/components/modal/AddBookmarks';
import { postBookmarks, removeBookmarks } from '@/apis/bookmark';
import { usetGetBookmarks } from '@/query/bookmarkQuery';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { checkBookmark } from '@/utils/validate';
import errorRes from '@/apis/errorRes';
const IMG_HEIGHT = 300;
const { width } = Dimensions.get('window');


export default function ServicesScreen() {
    const { item } = useLocalSearchParams();
    const serviceItem: ServiceItem = JSON.parse(item as string);
    const isFocused = useIsFocused();
    const [showBookmark, setShowBookmark] = useState(false);
    const [topSelect, setTopSelect] = useState("All");
    const [addbook, setAddbook] = useState(false);
    const { isBookmarked, setBookmarked } = useBookmarkStore();
    const { data: bookdata } = usetGetBookmarks(isFocused);
    useEffect(() => {
        if (bookdata) {
            checkBookmark(bookdata, serviceItem?._id);
        }
    }, [bookdata]);

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
            opacity: scrollHandler.value > 200 ? withSpring(1) : withSpring(0),
        };
    });


    const addingBookmark = async () => {
        try {
            await postBookmarks(serviceItem?._id, "Service");
            setBookmarked(true);
            setShowBookmark(true);
        } catch (error) {
            console.log(error);
        }
    };

    const removeBookmark = async () => {
        try {
            await removeBookmarks(serviceItem?._id);
            setBookmarked(false);
        } catch (error) {
            console.log(errorRes(error));
        }
    }

    return (
        <View style={styles.container}>

            {showBookmark && <AddBookmarks modalVisible={showBookmark} setModalVisible={setShowBookmark} />}

            <Animated.ScrollView
                bounces={false}
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
            >
                <Animated.View style={[styles.topStyle, imageAnimatedStyle]}>
                    <Image
                        source={{ uri: serviceItem.image }}
                        resizeMode='cover'
                        style={[{ width: wp(50), height: hp(20), marginLeft: wp(4) }]} />
                    <View style={styles.topFooter}>
                        <View style={{ width: wp(8), height: 10, borderRadius: 8, backgroundColor: '#0A5CA8' }} />
                        <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: '#548DC2' }} />
                        <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: '#548DC2' }} />
                    </View>
                </Animated.View>


                <View style={styles.middleStyle}>

                    <View style={[styles.middelTopRow]}>
                        <Text style={styles.middleText}>{serviceItem.title} Services</Text>

                        <TouchableOpacity onPress={isBookmarked ? removeBookmark : addingBookmark}>
                            {
                                isBookmarked ?
                                    <Image source={require('@/assets/icons/bookmarkActive.jpg')} resizeMode='contain' style={{ width: wp(5.4), height: hp(4) }} />
                                    :
                                    <Image source={require('@/assets/icons/bookmarkInactive.jpg')} resizeMode='contain' style={{ width: wp(5.4), height: hp(4), }} />
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rateStyle}>
                        <Text style={styles.core}>{serviceItem.sub_title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                            <Image source={require('@/assets/icons/star.jpg')} resizeMode='contain' style={{ width: wp(5) }} />
                            <Text style={styles.rating}>4.8 (3,824 reviews)</Text>
                        </View>
                    </View>


                    <View style={styles.laundryStyle}>
                        <Text style={styles.laundryText}>Laundry</Text>
                    </View>


                    <View style={styles.priceStyle}>
                        <Text style={styles.priceText}>AED {serviceItem.base_price}</Text>
                        <Text style={styles.subText}>(base price)</Text>
                    </View>


                    <View style={styles.separator} />



                    <View style={styles.detailsStyle}>
                        <Text style={styles.detailText}>Details</Text>
                        <Text style={styles.subDetailText}>{serviceItem.details}</Text>
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



                    <View style={styles.detailsStyle}>
                        <Text style={styles.detailText}>Reviews</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                                <Image source={require('@/assets/icons/star.jpg')} resizeMode='contain' style={{ width: wp(5) }} />
                                <Text style={styles.ratingBold}>4.8 (3,824 reviews)</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.seeallText}>See all</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: hp(2) }}>
                        {
                            starRating.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} style={topSelect === item?.label ? [styles.scrollStyle, { backgroundColor: '#0A5CA8' }] : [styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}
                                        onPress={() => setTopSelect(item?.label)}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2) }}>
                                            {item.label != "All" && <FontAwesome name='star' size={hp(1.6)} color={topSelect === item?.label ? 'white' : '#0A5CA8'} />}
                                            <Text style={topSelect === item?.label ? [styles.scrollText, { color: 'white' }] : [styles.scrollText, { color: '#0A5CA8' }]}>{item.label}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={{ paddingBottom: hp(15), paddingHorizontal: wp(5) }}>
                    {
                        customer.map((item, index) => (
                            <View key={index} style={{ marginTop: hp(2) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                                        <Image source={item.img} resizeMode='contain' style={{ width: wp(14), height: hp(8) }} />
                                        <Text style={styles.customerName}>{item.name}</Text>
                                    </View>
                                    <View style={[styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2) }}>
                                            <FontAwesome name='star' size={hp(1.6)} color={'#0A5CA8'} />
                                            <Text style={[styles.scrollText, { color: '#0A5CA8' }]}>{item.rate}</Text>
                                        </View>
                                    </View>
                                </View>

                                <Text style={styles.message}>{item.message}</Text>
                                <View style={styles.customerHeart}>
                                    {item.status ? <Image source={require('@/assets/icons/heartActive.jpg')} resizeMode='contain' style={{ width: wp(5) }} /> : <Image source={require('@/assets/icons/heartIn.jpg')} resizeMode='contain' style={{ width: wp(6) }} />}
                                    <Text style={styles.heartText}>{item.heart}</Text>
                                    <Text style={styles.heartTime}>{item.time}</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>

            </Animated.ScrollView>

            <View style={styles.footer}>
                <View style={styles.bottomBtnRow}>
                    <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: "#DAE7F2" }]}
                        onPress={() => router.push('chatPage/NewMessage')}
                    >
                        <Text style={[styles.bottomText, { color: "#0A5CA8" }]}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: "#0A5CA8" }]}
                        onPress={() => router.push({
                            pathname: 'homePage/services/BookNow',
                            params: { item: item },
                        })}
                    >
                        <Text style={[styles.bottomText, { color: "white" }]}>Book Now </Text>
                    </TouchableOpacity>
                </View>
            </View>



            {/* back */}
            <View style={styles.topBtnStyle}>
                <TouchableOpacity
                    onPress={() => router.back()}>
                    {/* <AntDesign name='arrowleft' size={hp(3)} color={'#212121'} /> */}
                    <Ionicons name='chevron-back' size={hp(3)} />
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.header, headerStyle]}>
                <View style={styles.headerHide}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name='chevron-back' size={hp(3)} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{serviceItem.title} Services</Text>
                    </View>
                    <TouchableOpacity onPress={isBookmarked ? removeBookmark : addingBookmark}>
                        {isBookmarked ? <Image source={require('@/assets/icons/bookmarkActive.jpg')} resizeMode='contain' style={{ width: wp(5) }} />
                            : <Image source={require('@/assets/icons/bookmarkInactive.jpg')} resizeMode='contain' style={{ width: wp(5) }} />}
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View >
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

    topCircle: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'center'
    },

    header: {
        position: 'absolute',
        top: 0,
        width: wp(100),
        backgroundColor: "#fff",
        height: Platform.OS === 'android' ? 92 : 100,
        justifyContent: 'flex-end',
        borderBottomColor: 'gray',
        paddingHorizontal: wp(5)
    },
    headerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
    },
    headerHide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    topBtnStyle: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? hp(7) : hp(8),
        left: wp(5),
    },
    topFooter: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2)
    },


    separator: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginTop: hp(3)
    },
    image: {
        height: IMG_HEIGHT,
        width,
    },

    scrollStyle: {
        width: wp(18),
        height: hp(4),
        borderRadius: wp(4),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp(3)
    },
    scrollText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8)
    },


    middleStyle: {
        paddingHorizontal: wp(5),
        marginTop: hp(4),
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
    rateStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    core: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.5),
        color: '#0A5CA8'
    },
    rating: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(2),
        color: '#424242'
    },
    ratingBold: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
    },
    laundryStyle: {
        width: wp(22),
        height: hp(4),
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
    customerName: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2)
    },
    message: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.8),
        marginTop: hp(1)
    },
    customerHeart: {
        marginTop: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    heartText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8)
    },
    heartTime: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: '#616161'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: Platform.OS === 'ios' ? hp(12) : hp(11),
        backgroundColor: 'white',
        alignItems: 'center'
    },

    bottomBtnRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3),
        marginTop: hp(2),
        borderTopRightRadius: wp(4),
        borderTopLeftRadius: wp(4),
    },
    bottomBtn: {
        width: wp(40),
        height: hp(6),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(6),
    },
    bottomText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
    }
})