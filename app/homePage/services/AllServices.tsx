import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useHomeServiceCategory, useHomeServices } from '@/query/homeQuery';
import AllServiceSkeleton from '@/components/skeleton/AllServiceSkeleton';
import SingleStarRating from '@/components/SingleStarRating';
import { usetGetBookmarks } from '@/query/bookmarkQuery';
import { validateServiceInTheBookmark } from '@/utils/validate';
import ServicesCategorySkeleton from '@/components/skeleton/ServicesCategorySkeleton';

export default function AllServices() {
    const isFocused = useIsFocused();
    const { data, isPending } = useHomeServices(isFocused);
    const { data: bookdata } = usetGetBookmarks(isFocused);
    const { data: servciesCategory, isPending: pendingCategory } = useHomeServiceCategory(isFocused);
    // hook
    const [topSelect, setTopSelect] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const activeBook = require('@/assets/icons/bookmarkActive.jpg');
    const inActiveBook = require('@/assets/icons/bookmarkInactive.jpg');

    const handleCategoryPress = (caterogydata: string) => {
        setSelectedCategory(caterogydata);
    }

    const tempdata = [
        {
            image: require('@/assets/temp/bookmark/bookmark1.png'),
            subTitle: "Cleaning / Pressing",
            title: "Weekly Work Refresh",
            price: "25",
            rate: 4.8,
            reviews: "8,289"
        },
        {
            image: require('@/assets/temp/bookmark/bookmark2.png'),
            subTitle: "Wash & Fold",
            title: "Family Bundle",
            price: "30",
            rate: 4.9,
            reviews: "6,182"
        },
        {
            image: require('@/assets/temp/bookmark/bookmark3.png'),
            subTitle: "Cleaning / Pressing",
            title: "Delicate Dresses",
            price: "22",
            rate: 4.7,
            reviews: "7,938"
        },
        {
            image: require('@/assets/temp/bookmark/bookmark4.png'),
            subTitle: "Wash & Fold",
            title: "Sporty Bundle",
            price: "24",
            rate: 4.9,
            reviews: "6,182"
        },
    ]

    const filteredData = selectedCategory === 'All' ? data : data?.filter((item: any) => item?.service_category?._id.toLowerCase().includes(selectedCategory.toLowerCase()));
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

            {
                isPending ? <AllServiceSkeleton />
                    :
                    <>

                        <View style={{ backgroundColor: 'white', paddingVertical: hp(2) }}>

                            {
                                pendingCategory ? <ServicesCategorySkeleton />
                                    :
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        <TouchableOpacity
                                            style={topSelect === null ? [styles.scrollStyle, { backgroundColor: '#0A5CA8' }] : [styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}
                                            onPress={() => {
                                                setTopSelect(null);
                                                handleCategoryPress("All");
                                            }}
                                        >
                                            <Text style={topSelect === null ? [styles.scrollText, { color: 'white' }] : [styles.scrollText, { color: '#0A5CA8' }]}>All</Text>
                                        </TouchableOpacity>
                                        {
                                            servciesCategory?.map((item: any, index: any) => (
                                                <TouchableOpacity key={index} style={topSelect == index ? [styles.scrollStyle, { backgroundColor: '#0A5CA8' }] : [styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}
                                                    onPress={() => {
                                                        setTopSelect(index);
                                                        handleCategoryPress(item._id);
                                                    }}
                                                >
                                                    <Text style={topSelect == index ? [styles.scrollText, { color: 'white' }] : [styles.scrollText, { color: '#0A5CA8' }]}>{item?.name}</Text>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </ScrollView>
                            }
                        </View>

                        <FlatList
                            data={tempdata}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={styles.CardStyle}
                                    // onPress={() => router.push({
                                    //     pathname: 'homePage/services/ServicesScreen',
                                    //     params: { serviceId: item?._id },
                                    // })}
                                    key={index}
                                >
                                    <View style={styles.cardRow}>
                                        <View style={styles.cardLeft}>
                                            <View style={styles.imaging}>
                                                <Image
                                                    // source={{ uri: item?.image }}
                                                    source={item?.image}
                                                    resizeMode='cover'
                                                    style={{
                                                        width: wp(30),
                                                        height: wp(30),
                                                    }}
                                                />
                                            </View>
                                            <View style={{ width: wp(45) }}>
                                                < Text style={styles.topText} >{item?.subTitle}</Text>
                                                <Text style={styles.middleText}>{item?.title}</Text>
                                                <Text style={styles.priceText}>AED {item?.price}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2), marginTop: hp(1.5), }}>
                                                    <SingleStarRating rating={item?.rate} />
                                                    <Text style={styles.rateText}>{item?.rate}</Text>
                                                    <View style={styles.cardSeperator} />
                                                    <Text style={styles.rateText}>
                                                        {item?.reviews} reviews
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            {
                                                validateServiceInTheBookmark(bookdata, item?._id) ? <Image source={require('@/assets/icons/bookmarkActive.jpg')} resizeMode='contain' style={{ width: wp(5), height: hp(4) }} />
                                                    :
                                                    <Image source={require('@/assets/icons/bookmarkInactive.jpg')} resizeMode='contain' style={{ width: wp(5), height: hp(4) }} />
                                            }
                                        </View>

                                    </View>
                                </TouchableOpacity >
                            )}
                        />

                    </>
            }
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
        alignItems: 'center',
        gap: wp(4)
    },
    topText: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.6),
        color: '#616161'
    },
    middleText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        marginTop: hp(2)
    },
    priceText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
        marginTop: hp(2),
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
    imaging: {
        width: wp(30),
        height: wp(30),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(4),
        overflow: 'hidden',
    }


})