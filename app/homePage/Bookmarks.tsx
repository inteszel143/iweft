import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { bookmakeTop } from '@/constants/home/data';
import { FontAwesome } from '@expo/vector-icons';
import {
    BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import { usetGetBookmarks } from '@/query/bookmarkQuery';
import BookmarkSheet from '@/components/bottomsheet/BookmarkSheet';
import BookmarkSkeleton from '@/components/skeleton/BookmarkSkeleton';
import NoBookmark from '@/components/empty/NoBookmark';
export default function Bookmarks() {
    const isFocused = useIsFocused();
    const { data, isPending } = usetGetBookmarks(isFocused);
    const [itemData, setItemData] = useState<any[]>([]);
    const [topSelect, setTopSelect] = useState(0);
    const modalARef = useRef<BottomSheetModal>(null);

    const openModalA = (item: any) => {
        setItemData(item);
        modalARef.current?.present();
    };

    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >My Bookmarks</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingSearch.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {
                isPending ? <BookmarkSkeleton /> : <>
                    {
                        !data || data == 0 ? <NoBookmark />
                            :
                            <View style={{ flex: 1, }}>

                                <View style={{ paddingVertical: hp(1), marginTop: hp(1.5) }}>
                                    <FlatList
                                        data={bookmakeTop}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item?.label}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity style={topSelect == index ? [styles.scrollStyle, { backgroundColor: '#0A5CA8' }] : [styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}
                                                onPress={() => setTopSelect(index)}
                                            >
                                                <Text style={topSelect == index ? [styles.scrollText, { color: 'white' }] : [styles.scrollText, { color: '#0A5CA8' }]}>{item.label}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                                {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: hp(2) }}>
                                    {
                                        bookmakeTop.map((item, index) => {
                                            return (
                                                <TouchableOpacity key={index} style={topSelect == index ? [styles.scrollStyle, { backgroundColor: '#0A5CA8' }] : [styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}
                                                    onPress={() => setTopSelect(index)}
                                                >
                                                    <Text style={topSelect == index ? [styles.scrollText, { color: 'white' }] : [styles.scrollText, { color: '#0A5CA8' }]}>{item.label}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </ScrollView> */}
                                <FlatList
                                    data={data}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.CardStyle}
                                            onPress={() => openModalA(item)}
                                        >
                                            <View style={styles.cardRow}>
                                                <View style={styles.cardLeft}>
                                                    <Image source={{ uri: item?.service?.image }} resizeMode='contain' style={{ width: wp(28), height: hp(15), }} />
                                                    <View style={{ width: wp(45) }}>
                                                        < Text style={styles.topText} >{item?.service?.sub_title}</Text>
                                                        <Text style={styles.middleText}>{item?.service?.title}</Text>
                                                        <Text style={styles.priceText}>AED {item?.service?.base_price}</Text>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2), marginTop: hp(1.5), }}>
                                                            <FontAwesome name='star' size={hp(2)} color={'#FB9400'} />
                                                            <Text style={styles.rateText}>4.8</Text>
                                                            <View style={styles.cardSeperator} />
                                                            <Text style={styles.rateText}>8,289 reviews</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View>
                                                    <FontAwesome name='bookmark' size={hp(2.9)} color={'#0A5CA8'} />
                                                </View>
                                            </View>
                                        </TouchableOpacity >
                                    )}
                                />

                                {/* 
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {
                                        data?.map((item: any, index: any) => (
                                            <TouchableOpacity style={styles.CardStyle}
                                                onPress={() => openModalA(item)}
                                                key={index}
                                            >
                                                <View style={styles.cardRow}>
                                                    <View style={styles.cardLeft}>
                                                        <Image source={{ uri: item?.service?.image }} resizeMode='contain' style={{ width: wp(28), height: hp(15), }} />
                                                        <View style={{ width: wp(45) }}>
                                                            < Text style={styles.topText} >{item?.service?.sub_title}</Text>
                                                            <Text style={styles.middleText}>{item?.service?.title}</Text>
                                                            <Text style={styles.priceText}>AED {item?.service?.base_price}</Text>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2), marginTop: hp(1.5), }}>
                                                                <FontAwesome name='star' size={hp(2)} color={'#FB9400'} />
                                                                <Text style={styles.rateText}>4.8</Text>
                                                                <View style={styles.cardSeperator} />
                                                                <Text style={styles.rateText}>8,289 reviews</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View>
                                                        <FontAwesome name='bookmark' size={hp(2.9)} color={'#0A5CA8'} />
                                                    </View>
                                                </View>
                                            </TouchableOpacity >
                                        ))
                                    }
                                </ScrollView> */}



                            </View>
                    }
                </>

            }
            <BookmarkSheet modalRef={modalARef} item={itemData} />

        </View >
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
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
        marginTop: hp(3),
        paddingHorizontal: wp(5),

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

    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bottomSheetIndi: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.6),
        marginTop: hp(2)
    },
    BottomSheetSeparator: {
        height: 1,
        backgroundColor: "#EEEEEE",
        width: wp(82),
        marginTop: hp(2.2)
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
    }
})