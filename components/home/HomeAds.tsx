import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import useValidateRefresh from '@/store/useValidateRefresh';

export default function HomeAds() {
    const { refreshToken } = useValidateRefresh();


    const data = [
        {
            image: require('@/assets/temp/ads/ads1.png'),
        },
        // {
        //     image: require('@/assets/temp/ads/ads2.png'),
        // },
    ]


    return (
        <View style={styles.container}>

            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignSelf: 'center' }}
            >
                {
                    data?.map((item, index) => (
                        <Pressable
                            key={index}
                            style={{
                                paddingLeft: wp(4),
                                paddingRight: index == 0 ? 0 : wp(4),
                            }}
                            onPress={() => router.push('/homePage/SubscriptionOffer')}
                        >
                            <View style={{

                            }}>
                                <Image
                                    source={item?.image}
                                    resizeMode='contain'
                                    style={{
                                        width: index == 0 ? wp(89) : wp(80),
                                        height: hp(35),
                                    }}
                                />
                            </View>
                        </Pressable>
                    ))
                }
                <View style={{ paddingLeft: wp(4), paddingRight: wp(4) }}>
                    <View style={[styles.bundleOfferContainer, {
                        backgroundColor: "#DAE7F2",
                        height: hp(23),
                        marginTop: hp(6)
                    }]}>
                        <View style={{ paddingLeft: wp(6) }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Text style={{ fontFamily: 'UrbanistBold', fontSize: hp(2) }}>Subscription Offer</Text>
                                <MaterialCommunityIcons name='information' size={hp(2.3)} />
                            </View>

                            <View style={{ marginTop: hp(1) }}>
                                <Text style={{ fontFamily: "UrbanistBold", fontSize: hp(5) }}>Refer a friend</Text>
                            </View>


                            <View style={{ flexDirection: 'row' }}>
                                <Pressable style={styles.btnOffer}
                                    onPress={() => router.push('/homePage/SubscriptionOffer')}
                                >
                                    <Text style={{ fontFamily: 'UrbanistSemiBold', fontSize: hp(2), color: "#0a5ca8" }} >Grab Offer</Text>
                                    <MaterialIcons name='keyboard-arrow-right' size={hp(2.5)} color={"#6F767E"} />
                                </Pressable>
                            </View>

                        </View>

                        <View style={{
                            position: "absolute",
                            zIndex: -1,
                            right: 0,
                        }}>
                            <Image source={require('@/assets/temp/ads/bundle.png')} resizeMode='contain' style={{ width: wp(30) }} />
                        </View>
                    </View>
                </View>

                {/* <View style={{ paddingLeft: wp(4) }}>
                    <View style={[styles.bundleOfferContainer, { backgroundColor: "#EFF6DE", }]}>
                        <View style={{ paddingLeft: wp(6) }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Text style={{ fontFamily: 'UrbanistBold', fontSize: hp(2.2) }}>Subscription Offer</Text>
                                <MaterialCommunityIcons name='information' size={hp(2.5)} />
                            </View>

                            <View style={{
                                marginTop: hp(1),
                            }}>
                                <Text style={{ fontFamily: "UrbanistBold", fontSize: hp(4) }}>Priority Orders</Text>
                            </View>


                            <View style={{
                                flexDirection: 'row',
                            }}>
                                {
                                    refreshToken === null ? <TouchableOpacity style={styles.btnOffer}
                                        onPress={() => router.push('(modal)/login')}
                                    >
                                        <Text style={{ fontFamily: 'UrbanistBold', fontSize: hp(1.8), color: "#93c120" }} >Grab Offer</Text>
                                        <MaterialIcons name='keyboard-arrow-right' size={hp(2.5)} color={"#6F767E"} />
                                    </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={styles.btnOffer}
                                            onPress={() => router.push('/homePage/SubscriptionOffer')}
                                        >
                                            <Text style={{ fontFamily: 'UrbanistBold', fontSize: hp(1.8), color: "#93c120" }} >Grab Offer</Text>
                                            <MaterialIcons name='keyboard-arrow-right' size={hp(2.5)} color={"#6F767E"} />
                                        </TouchableOpacity>
                                }
                            </View>

                        </View>

                        <View style={styles.imageposition}>
                            <Image source={require('@/assets/temp/ads/suboffer.jpg')} resizeMode='contain' style={{ width: wp(30) }} />

                        </View>
                    </View>
                </View>


                <View style={{ paddingLeft: wp(4), paddingRight: wp(4) }}>
                    <View style={[styles.bundleOfferContainer, { backgroundColor: "#DAE7F2", }]}>
                        <View style={{ paddingLeft: wp(6) }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Text style={{ fontFamily: 'UrbanistBold', fontSize: hp(2.2) }}>Subscription Offer</Text>
                                <MaterialCommunityIcons name='information' size={hp(2.5)} />
                            </View>

                            <View style={{ marginTop: hp(1) }}>
                                <Text style={{ fontFamily: "UrbanistBold", fontSize: hp(4) }}>Refer a friend</Text>
                            </View>


                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.btnOffer}
                                    onPress={() => router.push('/homePage/SubscriptionOffer')}
                                >
                                    <Text style={{ fontFamily: 'UrbanistSemiBold', fontSize: hp(2), color: "#0a5ca8" }} >Grab Offer</Text>
                                    <MaterialIcons name='keyboard-arrow-right' size={hp(2.5)} color={"#6F767E"} />
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={styles.imageposition}>
                            <Image source={require('@/assets/temp/ads/bundle.png')} resizeMode='contain' style={{ width: wp(30) }} />

                        </View>
                    </View>
                </View> */}
            </ScrollView>
            <View style={{ height: 0.7, backgroundColor: "#DADADA", marginTop: hp(1), marginHorizontal: wp(4) }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    btnOffer: {
        paddingHorizontal: wp(3),
        height: hp(4),
        borderRadius: wp(8),
        backgroundColor: 'white',
        marginTop: hp(2),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    bundleOfferContainer: {
        width: wp(92),
        height: hp(23),
        borderRadius: wp(6),
        alignSelf: 'center',
        justifyContent: 'center'
    },

    imageposition: {
        position: 'absolute',
        right: 0,
    }
})