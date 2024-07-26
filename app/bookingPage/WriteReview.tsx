import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform, Linking, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { postReview } from '@/apis/review';
import errorRes from '@/apis/errorRes';
import SuccessReviewAdd from '@/components/modal/SuccessReviewAdd';
import { useQueryClient } from '@tanstack/react-query';
export default function WriteReview() {
    const queryClient = useQueryClient();
    const { orderId, serviceId, imageUrl, title, subTitle, basePrice } = useLocalSearchParams();
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const reviews = ["Terrible", "Bad", "Okay", "Good", "Excellent"];
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const maxLength = 10;
    const handleStarPress = (index: any) => {
        setRating(index + 1);
    };

    const postAddReview = async () => {
        setLoading(true);
        try {
            await postReview(serviceId as string, rating as number, comment as string, orderId as string);
            queryClient.invalidateQueries({ queryKey: ['booking-status', "Completed"] });
            setTimeout(() => {
                setLoading(false);
                setShowModal(true);
            }, 1000);
        } catch (error) {
            setLoading(false);
            console.log(errorRes(error))
        }
    };

    return (
        <View style={styles.container}>
            {showModal && <SuccessReviewAdd modalVisible={showModal} setModalVisible={setShowModal} />}
            <View style={styles.headerContainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Write review</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* ---header */}

            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
            >

                <View style={styles.topView}>
                    <View style={styles.topRow}>
                        <View style={styles.imaging}>
                            <Image source={{ uri: imageUrl as string }} resizeMode='contain' style={styles.imageStyle} />
                        </View>
                        <View style={{ flex: 1, marginTop: hp(2) }}>
                            <Text style={styles.labelStyle}>{title}</Text>
                            <Text style={styles.subStyle}>{subTitle}</Text>
                            <Text style={styles.priceStyle}>AED {basePrice}</Text>
                        </View>
                    </View>
                </View>


                <View style={styles.middle}>
                    <Text style={styles.reviewStyle}>{reviews[rating - 1]}</Text>
                    <View style={{ flexDirection: 'row', }}>
                        {Array(5)
                            .fill(0)
                            .map((_, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{ marginHorizontal: wp(4), marginTop: hp(2) }}
                                    onPress={() => handleStarPress(index)}
                                >
                                    <AntDesign
                                        name="star"
                                        size={hp(3.8)}
                                        color={index < rating ? "#FCD014" : "#ccc"} // Change color based on rating
                                    />
                                </TouchableOpacity>
                            ))}
                    </View>
                    <Text style={styles.topviewText}>Rate this service</Text>
                </View>
                <View style={styles.separator} />


                <View style={styles.bottom}>
                    <View style={styles.bottomRow}>
                        <Text style={{ fontFamily: 'UrbanistSemiBold', fontSize: hp(2) }}>Write a review</Text>
                        <Text style={{ fontFamily: 'UrbanistSemiBold', fontSize: hp(1.8), color: "#616161" }} >{comment.length}/300</Text>
                    </View>
                    <View>
                        <TextInput
                            placeholder='What would you recommend this service to others?'
                            placeholderTextColor={'#9E9E9E'}
                            onChangeText={(text) => setComment(text)}
                            multiline
                            maxLength={300}
                            style={{
                                fontFamily: "UrbanistRegular",
                                fontSize: hp(1.8)
                            }}
                        />
                    </View>
                </View>

            </KeyboardAwareScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={defaultStyles.footerBtn} onPress={postAddReview}>
                    {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Submit</Text>}
                </TouchableOpacity>
            </View>







        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
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
    topView: {
        paddingHorizontal: wp(5),
        marginTop: hp(1.5)
    },
    topRow: {
        flexDirection: 'row',
        gap: wp(4),
    },
    labelStyle: {
        fontFamily: "UrbanistSemiBold",
        fontSize: hp(2.2),
        paddingHorizontal: wp(1)
    },
    subStyle: {
        fontFamily: "UrbanistRegular",
        fontSize: hp(1.9),
        color: "#616161",
        marginTop: hp(1)
    },
    priceStyle: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.2),
        color: "#0a5ca8",
        marginTop: hp(1)
    },
    topviewText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.9),
        color: "gray",
        marginTop: hp(2.5)
    },
    imageStyle: {
        width: wp(20),
        height: hp(10)
    },
    middle: {
        alignItems: 'center',
        marginTop: hp(3)
    },
    reviewStyle: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(2),
        color: "#616161",
    },
    bottom: {
        paddingHorizontal: wp(5),
        marginTop: hp(2),
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp(1)
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(11),
        alignItems: 'center'
    },
    imaging: {
        width: wp(24),
        height: hp(11),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: wp(2)
    },
    separator: {
        height: 0.5,
        backgroundColor: "#DADADA",
        marginTop: hp(2.5),
        marginHorizontal: wp(4)
    }
})