import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset, withSpring } from 'react-native-reanimated';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { bundle } from '@/constants/home/data';
import { useIsFocused } from '@react-navigation/native';
import { LaundryBundle } from '@/utils/interface';
import useStoreBooking from '@/store/useStoreBooking';
import { postBookmarks, removeBookmarks } from '@/apis/bookmark';
import { useBookBundleStore } from '@/store/useBookmarkBundleStore';
import { usetGetBookmarks } from '@/query/bookmarkQuery';
import { checkBookmarkBundle } from '@/utils/validate';
import AddBookmarks from '@/components/modal/AddBookmarks';
import { useLaundryBundlesUsingId } from '@/query/homeQuery';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import useValidateRefresh from '@/store/useValidateRefresh';
const IMG_HEIGHT = 350;

export default function BuddleScreen() {
    const { bundleId } = useLocalSearchParams();
    // const bundleData: LaundryBundle = JSON.parse(item as string);
    const { refreshToken } = useValidateRefresh();
    const [addbook, setAddbook] = useState(false);
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
    const isFocused = useIsFocused();
    const { data: bundleData, isPending } = useLaundryBundlesUsingId(bundleId as string, isFocused);
    const [showBookmark, setShowBookmark] = useState(false);
    const { isBookmarked, setBookmarked } = useBookBundleStore();
    const { data: bookdata } = usetGetBookmarks(isFocused);
    useEffect(() => {
        if (bookdata) {
            checkBookmarkBundle(bookdata, bundleData?._id);
        }
    }, [bookdata]);
    const toggleAdd = () => {
        setAddbook(!addbook);
    }
    const { setServiceModel, setBundleId } = useStoreBooking();
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


    const covertData = (data: any) => {
        return data?.map((item: any) => ({
            item: item._id,
            quantity: 1,
            item_total_amount: item.price * 1
        }));
    };


    const addingBookmark = async () => {
        try {
            await postBookmarks(bundleData?._id, "LaundryBundle");
            setBookmarked(true);
            setShowBookmark(true);
        } catch (error) {
            console.log(error);
        }
    };

    const removeBookmark = async () => {
        try {
            await removeBookmarks(bundleData?._id);
            setBookmarked(false);
        } catch (error) {
            console.log(error)
        }
    };


    // if (isPending) {
    //     return <ViewServicesSkeleton />
    // };


    return (
        <View style={styles.container}>

            {showBookmark && <AddBookmarks modalVisible={showBookmark} setModalVisible={setShowBookmark} />}

            <Animated.ScrollView
                bounces={false}
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
            >

                {
                    isPending ? <ShimmerPlaceholder style={styles.imageTop} />
                        :
                        <Animated.View style={[styles.topStyle, imageAnimatedStyle]}>
                            <Image source={{ uri: bundleData?.image }} resizeMode='contain' style={[{ width: wp(70), height: hp(30), }]} />
                            <View style={styles.topFooter}>
                                <View style={{ width: wp(8), height: 10, borderRadius: 8, backgroundColor: '#0A5CA8' }} />
                                <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: '#548DC2' }} />
                                <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: '#548DC2' }} />
                                <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: '#548DC2' }} />
                                <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: '#548DC2' }} />
                            </View>
                        </Animated.View>
                }


                <View style={styles.middleStyle}>

                    <View style={styles.middelTopRow}>
                        <Text style={styles.middleText}>{bundleData?.title}</Text>
                        {
                            refreshToken === null ? <TouchableOpacity onPress={() => router.push('(modal)/login')}>
                                <Image source={require('@/assets/icons/bookmarkInactive.jpg')} resizeMode='contain' style={{ width: wp(5.4), height: hp(4), }} />
                            </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={isBookmarked ? removeBookmark : addingBookmark}>
                                    {
                                        isBookmarked ?
                                            <Image source={require('@/assets/icons/bookmarkActive.jpg')} resizeMode='contain' style={{ width: wp(5.4), height: hp(4) }} />
                                            :
                                            <Image source={require('@/assets/icons/bookmarkInactive.jpg')} resizeMode='contain' style={{ width: wp(5.4), height: hp(4), }} />
                                    }
                                </TouchableOpacity>
                        }
                    </View>

                    <View style={styles.rateStyle}>
                        <Text style={styles.core}>{bundleData?.service?.title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                            <Image source={require('@/assets/icons/star.jpg')} resizeMode='contain' style={{ width: wp(5) }} />
                            <Text style={styles.rating}>4.8 (3,824 reviews)</Text>
                        </View>
                    </View>


                    <View style={styles.laundryStyle}>
                        <Text style={styles.laundryText}>Laundry</Text>
                    </View>



                    <View style={styles.priceStyle}>
                        <Text style={styles.priceText}>AED {bundleData?.base_price}</Text>
                        <Text style={styles.subText}>(base price)</Text>
                    </View>

                    <View style={styles.separator} />



                    <View style={styles.detailsStyle}>
                        <Text style={styles.detailText}>Bundle Includes:</Text>
                        {
                            bundleData?.includes?.map((item: any, index: any) => (
                                <View key={index} style={styles.cardStyle}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(5) }}>
                                            <Image source={{ uri: item?.image }}
                                                resizeMode='contain'
                                                style={{ width: wp(10), height: hp(6) }} />
                                            <Text style={styles.bundleText}>{item?.name}</Text>
                                        </View>
                                        <View>
                                            <FontAwesome name='check-square' size={hp(2.7)} color={'#0A5CA8'} />
                                        </View>
                                    </View>
                                </View>
                            ))
                        }

                    </View>







                    <View style={[styles.detailsStyle, { paddingBottom: hp(15) }]}>
                        <Text style={styles.detailText}>Details</Text>
                        <Text style={styles.subDetailText}>{bundleData?.details}</Text>
                    </View>

                </View>
            </Animated.ScrollView>


            <View style={styles.footer}>
                {
                    refreshToken === null ?
                        <View style={styles.bottomBtnRow}>
                            <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: "#DAE7F2" }]}
                                disabled={isPending ? true : false}
                                onPress={() => router.push('(modal)/login')}
                            >
                                <Text style={[styles.bottomText, { color: "#0A5CA8" }]}>Message</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.bottomBtn, {
                                backgroundColor: "#0A5CA8",
                                shadowColor: "#0A5CA8",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.34,
                                shadowRadius: 6.27,
                                elevation: 10,
                            }]}
                                disabled={isPending ? true : false}
                                onPress={() => router.push('(modal)/login')}
                            >
                                <Text style={[styles.bottomText, { color: "white" }]}>Book Now </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.bottomBtnRow}>
                            <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: "#DAE7F2" }]}
                                disabled={isPending ? true : false}
                                onPress={() => router.push('chatPage/NewMessage')}
                            >
                                <Text style={[styles.bottomText, { color: "#0A5CA8" }]}>Message</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.bottomBtn, {
                                backgroundColor: "#0A5CA8",
                                shadowColor: "#0A5CA8",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.34,
                                shadowRadius: 6.27,
                                elevation: 10,
                            }]}
                                disabled={isPending ? true : false}
                                onPress={() => {
                                    setServiceModel("Service");
                                    setBundleId(bundleData?._id);
                                    const itemData = covertData(bundleData?.includes);
                                    const itemDataString = JSON.stringify(itemData);
                                    router.push({
                                        pathname: 'homePage/services/AfterItemPage',
                                        params: { service: bundleData?.service?._id, service_name: bundleData?.service?.title, base_price: bundleData?.base_price, total: bundleData?.base_price, itemData: itemDataString, total_data: itemData?.length }
                                    })
                                }
                                }
                            >
                                <Text style={[styles.bottomText, { color: "white" }]}>Book Now </Text>
                            </TouchableOpacity>
                        </View>
                }

            </View>

            {/* back */}
            <View style={styles.topBtnStyle}>
                <TouchableOpacity
                    style={styles.backbutton}
                    onPress={() => router.back()}>
                    {/* <AntDesign name='arrowleft' size={hp(3)} /> */}
                    <Ionicons name='chevron-back' size={hp(3)} />
                </TouchableOpacity>
            </View>

            <Animated.View style={[styles.header, headerStyle]}>
                <View style={styles.headerHide}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name='chevron-back' size={hp(3)} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{bundleData?.title}</Text>
                    </View>
                    <TouchableOpacity>
                        {isBookmarked ? <Image source={require('@/assets/icons/bookmarkActive.jpg')} resizeMode='contain' style={{ width: wp(5) }} /> : <Image source={require('@/assets/icons/bookmarkInactive.jpg')} resizeMode='contain' style={{ width: wp(5) }} />}
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
        justifyContent: 'center',
        paddingTop: hp(2),
    },
    topFooter: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(1.5)
    },
    topBtnStyle: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? hp(7) : hp(8),
        left: wp(5),
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
        fontSize: hp(3.5)
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
        gap: wp(4),
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
        height: 1,
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
        fontSize: hp(1.9),
        color: '#424242',
        marginTop: hp(2),
        textAlign: 'justify'
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
        marginTop: hp(3),
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
    },
    bundleText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2)
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
    cardStyle: {
        width: wp(90),
        height: hp(10),
        backgroundColor: '#FFFFFF',
        borderRadius: wp(4),
        marginTop: hp(2.5),
        justifyContent: 'center',
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
    imageTop: {
        height: hp(50),
        width: wp(100),
        backgroundColor: "#DADADA",
        opacity: 0.3,
        alignSelf: 'center'
    },
    backbutton: {
        width: wp(10),
        height: wp(10)
    }
})