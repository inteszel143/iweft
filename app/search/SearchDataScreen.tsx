import { FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router, useLocalSearchParams } from 'expo-router';
import FilterSearchData from '@/components/home/FilterSearchData';
import { useIsFocused } from '@react-navigation/native';
import { useHomeServiceCategory, useSearchMe } from '@/query/homeQuery';
import ServicesCategorySkeleton from '@/components/skeleton/ServicesCategorySkeleton';
import SingleStarRating from '@/components/SingleStarRating';
import { validateServiceInTheBookmark } from '@/utils/validate';
import FilterServicesSkeleton from '@/components/skeleton/FilterServicesSkeleton';
export default function SearchDataScreen() {
    const { searchKey } = useLocalSearchParams();
    const [searchKeyInput, setSearchKeyInput] = useState<string>(searchKey as string);
    const [focusInput, setFocusInput] = useState<boolean>(false);
    const [topSelect, setTopSelect] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const isFocused = useIsFocused();
    const { data: servciesCategory, isPending: pendingCategory } = useHomeServiceCategory(isFocused);
    const { data, isPending } = useSearchMe(isFocused, searchKey as string);

    const handleCategoryPress = (caterogydata: string) => {
        setSelectedCategory(caterogydata);
    };


    return (
        <View style={styles.container}>

            <View style={styles.headerView}>
                <View style={styles.headerRow}>
                    <Pressable onPress={() => router.replace('/(tabs)/')}>
                        <Ionicons name='chevron-back' size={hp(3)} />
                    </Pressable>
                    <View style={styles.searchStyle}>
                        <Ionicons name='search-outline' size={hp(2.6)} color={'gray'} />
                        <TextInput
                            placeholder='Search here . .'
                            defaultValue={searchKey as string}
                            onFocus={() => {
                                setFocusInput(true);
                            }}
                            placeholderTextColor={"gray"}
                            onChangeText={(text) => setSearchKeyInput(text)}
                            style={{
                                flex: 1,
                                fontFamily: "UrbanistMedium", fontSize: hp(1.9)
                            }}
                        />
                        <Pressable
                            onPress={() => router.push({
                                pathname: '/search/SearchDataScreen',
                                params: { searchKey: searchKeyInput },
                            })}
                        >
                            <Text style={styles.searchText}>Search</Text>
                        </Pressable>
                    </View>
                </View>
            </View>


            {/* Result */}
            {
                focusInput && <FilterSearchData searchKey={searchKeyInput} />
            }
            {
                !focusInput && <View>
                    <View style={{ backgroundColor: 'white', paddingVertical: hp(2), marginTop: hp(1) }}>

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


                    {
                        isPending ? <FilterServicesSkeleton />
                            :
                            <View>
                                {
                                    !data || data == 0 ? <View style={{ alignItems: 'center' }}>
                                        <View style={{ marginTop: hp(15) }}>
                                            <Image
                                                source={require("@/assets/icons/under.png")}
                                                resizeMode="contain"
                                                style={{ width: wp(100), height: hp(23) }}
                                            />
                                        </View>
                                        <View>
                                            <Text style={styles.textStyle}>No result found !</Text>
                                        </View>
                                    </View>
                                        :
                                        <FlatList
                                            data={data}
                                            showsVerticalScrollIndicator={false}
                                            keyExtractor={(item) => item?._id}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity style={styles.CardStyle}
                                                    onPress={() => router.push({
                                                        pathname: 'homePage/services/ServicesScreen',
                                                        params: { serviceId: item?._id },
                                                    })}
                                                >
                                                    <View style={styles.cardRow}>
                                                        <View style={styles.cardLeft}>
                                                            <View style={styles.imaging}>
                                                                <Image source={{ uri: item?.image }}
                                                                    resizeMode='contain'
                                                                    style={{ width: wp(20), height: hp(10), }} />
                                                            </View>
                                                            <View style={{ width: wp(45) }}>
                                                                < Text style={styles.topText} >{item?.sub_title}</Text>
                                                                <Text style={styles.middleText}>{item?.title}</Text>
                                                                <Text style={styles.priceText}>AED {item?.base_price}</Text>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2), marginTop: hp(1.5), }}>
                                                                    {/* <FontAwesome name='star' size={hp(2)} color={'#FB9400'} /> */}
                                                                    <SingleStarRating rating={item?.review?.average_rating} />
                                                                    <Text style={styles.rateText}>{item?.review?.average_rating}</Text>
                                                                    <View style={styles.cardSeperator} />
                                                                    <Text style={styles.rateText}>
                                                                        {item?.review?.review_count} {item?.review?.review_count <= 1 ? 'review' : 'reviews'}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View>
                                                            {
                                                                validateServiceInTheBookmark(data, item?._id) ? <Image source={require('@/assets/icons/bookmarkActive.jpg')} resizeMode='contain' style={{ width: wp(5), height: hp(4) }} />
                                                                    :
                                                                    <Image source={require('@/assets/icons/bookmarkInactive.jpg')} resizeMode='contain' style={{ width: wp(5), height: hp(4) }} />
                                                            }
                                                        </View>

                                                    </View>
                                                </TouchableOpacity >
                                            )}
                                        />
                                }

                            </View>
                    }
                </View>
            }


        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    headerView: {
        paddingHorizontal: wp(3),
        paddingTop: hp(6),
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchStyle: {
        flex: 1,
        height: hp(5),
        backgroundColor: "#F2F2F2",
        paddingHorizontal: wp(3),
        borderRadius: wp(3),
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: wp(2),
        gap: wp(2)
    },
    searchText: {
        fontFamily: "UrbanistBold",
        fontSize: hp(1.8),
        color: "#0a5ca8"
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
    imaging: {
        width: wp(28),
        height: hp(13),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(2),
        overflow: 'hidden'
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
    textStyle: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.4),
        textAlign: "center",
        marginTop: hp(4.5),
    },
})