import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
export default function BundleOffers() {


    return (
        <View style={styles.container}>



            <View style={styles.header} >
                <View style={styles.headerRight}>
                    <View style={styles.indicator} />
                    <Text style={styles.headerText}>Bundle Offers</Text>
                </View>
                <View>

                </View>
            </View>



            <View>
                <View style={styles.bundleOfferContainer}>
                    <View style={{ paddingLeft: wp(6) }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Text style={{ fontFamily: 'UrbanistBold', fontSize: hp(2.2) }}>Subscription Offer</Text>
                            <MaterialCommunityIcons name='information' size={hp(2.5)} />
                        </View>

                        <View style={{ marginTop: hp(1) }}>
                            <Text style={{ fontFamily: "UrbanistBold", fontSize: hp(4) }}>Bundle</Text>
                            <Text style={{ fontFamily: "UrbanistBold", fontSize: hp(4) }}>Discount</Text>
                        </View>


                        <TouchableOpacity style={styles.btnOffer}>
                            <Text style={{ fontFamily: 'UrbanistBold', fontSize: hp(1.8), color: "#0a5ca8" }} >Grab Offer</Text>
                            <MaterialIcons name='keyboard-arrow-right' size={hp(2.5)} color={"#6F767E"} />
                        </TouchableOpacity>

                    </View>

                    <View style={styles.imageposition}>
                        <Image source={require('@/assets/temp/ads/bundle.png')} resizeMode='contain' style={{ width: wp(30) }} />

                    </View>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp(4)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5)
    },
    indicator: {
        height: hp(3),
        borderRadius: 10,
        width: wp(1.4),
        backgroundColor: "#93c120",
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
    },
    headerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.4),
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
        marginTop: hp(4),
        backgroundColor: "#DAE7F2",
        alignSelf: 'center',
        justifyContent: 'center'
    },

    imageposition: {
        position: 'absolute',
        right: 0,
    }

})