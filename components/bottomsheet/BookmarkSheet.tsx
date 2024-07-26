import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { removeBookmarks } from '@/apis/bookmark';
import errorRes from '@/apis/errorRes';
import { useQueryClient } from '@tanstack/react-query';
import SingleStarRating from '../SingleStarRating';
interface ModalAProps {
    modalRef: React.RefObject<BottomSheetModal>;
    item: any
}

export default function BookmarkSheet({ modalRef, item }: ModalAProps) {
    const queryClient = useQueryClient();
    const snapPoints = useMemo(() => ['25%', '48%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1}{...props} />, []
    );


    const removeBookmark = async () => {
        try {
            await removeBookmarks(item?.service?._id);
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
        } catch (error) {
            console.log(errorRes(error));
        }
    }

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={modalRef}
                index={1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                enablePanDownToClose={true}
                handleIndicatorStyle={{ backgroundColor: '#DADADA' }}
                style={{
                    borderTopLeftRadius: wp(6),
                    borderTopRightRadius: wp(6),
                    overflow: 'hidden',
                }}

            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text style={styles.bottomSheetIndi}>Offer information</Text>
                    <View style={styles.BottomSheetSeparator} />
                    <View>
                        <TouchableOpacity style={styles.CardStyle}>
                            <View style={styles.cardRow}>
                                <View style={styles.cardLeft}>
                                    <Image source={{ uri: item?.service?.image }} resizeMode='contain' style={{ width: wp(28), height: hp(15), }} />
                                    <View style={{ width: wp(45) }}>
                                        < Text style={styles.topText} >{item?.service?.sub_title}</Text>
                                        <Text style={styles.middleText}>{item?.service?.title}</Text>
                                        <Text style={styles.priceText}>AED {item?.base_price}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2), marginTop: hp(1.5), }}>
                                            <SingleStarRating rating={item?.review?.average_rating} />
                                            <Text style={styles.rateText}>{item?.review?.average_rating}</Text>
                                            <View style={styles.cardSeperator} />
                                            <Text style={styles.rateText}>{item?.review?.review_count} {item?.review?.review_count == 1 ? 'review' : 'reviews'}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <FontAwesome name='bookmark' size={hp(2.9)} color={'#0A5CA8'} />
                                </View>
                            </View>
                        </TouchableOpacity >

                    </View>

                    <View style={styles.bottomBtnRow}>
                        <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: "#F75555" }]}
                            onPress={() => {
                                removeBookmark();
                                modalRef.current?.close();

                            }}
                        >
                            <Text style={[styles.bottomText, { color: "white" }]}>Remove</Text>
                        </TouchableOpacity>
                        {/* <Link href={'/(tabs)/'} style={[styles.bottomBtn, { backgroundColor: "#0A5CA8" }]} asChild> */}
                        <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: "#0A5CA8" }]}
                            onPress={() => router.push({
                                pathname: 'homePage/services/ServicesScreen',
                                params: { item: JSON.stringify(item?.service) },
                            })}
                        >
                            <Text style={[styles.bottomText, { color: "white" }]}>Activate </Text>
                        </TouchableOpacity>
                        {/* </Link> */}
                    </View>


                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
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


})