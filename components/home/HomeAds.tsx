import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import useValidateRefresh from '@/store/useValidateRefresh';

export default function HomeAds() {
    const { refreshToken } = useValidateRefresh();
    return (
        <View style={styles.container}>

            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignSelf: 'center' }}
            >
                <View style={{ paddingLeft: wp(4) }}>
                    <View style={[styles.bundleOfferContainer, { backgroundColor: "#EFF6DE", }]}>
                        <View style={{ paddingLeft: wp(6) }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Text style={{ fontFamily: 'UrbanistBold', fontSize: hp(2.2) }}>Subscription Offer</Text>
                                <MaterialCommunityIcons name='information' size={hp(2.5)} />
                            </View>

                            <View style={{ marginTop: hp(1) }}>
                                <Text style={{ fontFamily: "UrbanistBold", fontSize: hp(4) }}>Priority</Text>
                                <Text style={{ fontFamily: "UrbanistBold", fontSize: hp(4) }}>Orders</Text>
                            </View>


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

                        <View style={styles.imageposition}>
                            <Image source={require('@/assets/temp/ads/bundle.png')} resizeMode='contain' style={{ width: wp(30) }} />

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
                                <Text style={{ fontFamily: "UrbanistBold", fontSize: hp(4) }}>Refer a</Text>
                                <Text style={{ fontFamily: "UrbanistBold", fontSize: hp(4) }}>friend</Text>
                            </View>


                            <TouchableOpacity style={styles.btnOffer}
                                onPress={() => router.push('/homePage/SubscriptionOffer')}
                            >
                                <Text style={{ fontFamily: 'UrbanistBold', fontSize: hp(1.8), color: "#0a5ca8" }} >Grab Offer</Text>
                                <MaterialIcons name='keyboard-arrow-right' size={hp(2.5)} color={"#6F767E"} />
                            </TouchableOpacity>

                        </View>

                        <View style={styles.imageposition}>
                            <Image source={require('@/assets/temp/ads/bundle.png')} resizeMode='contain' style={{ width: wp(30) }} />

                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp(4),
    },
    btnOffer: {
        width: wp(40),
        height: hp(6),
        borderRadius: wp(8),
        backgroundColor: 'white',
        marginTop: hp(2),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    bundleOfferContainer: {
        flex: 1,
        width: wp(92),
        height: hp(26),
        borderRadius: wp(6),
        alignSelf: 'center',
        justifyContent: 'center'
    },

    imageposition: {
        position: 'absolute',
        right: 0,
    }
})