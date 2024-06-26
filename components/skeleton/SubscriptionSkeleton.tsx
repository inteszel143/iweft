import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
export default function SubscriptionSkeleton() {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    return (
        <View>
            <View style={styles.CardStyle}>
                <View style={styles.inner}>
                    <ShimmerPlaceholder style={styles.image} />
                    <View>
                        <ShimmerPlaceholder style={styles.collection} />
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.price} />
                    </View>
                </View>
            </View>
            <View style={styles.CardStyle}>
                <View style={styles.inner}>
                    <ShimmerPlaceholder style={styles.image} />
                    <View>
                        <ShimmerPlaceholder style={styles.collection} />
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.price} />
                    </View>
                </View>
            </View>
            <View style={styles.CardStyle}>
                <View style={styles.inner}>
                    <ShimmerPlaceholder style={styles.image} />
                    <View>
                        <ShimmerPlaceholder style={styles.collection} />
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.price} />
                    </View>
                </View>
            </View>
            <View style={styles.CardStyle}>
                <View style={styles.inner}>
                    <ShimmerPlaceholder style={styles.image} />
                    <View>
                        <ShimmerPlaceholder style={styles.collection} />
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.price} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    image: {
        width: wp(34),
        height: hp(14),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    collection: {
        width: wp(40),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    title: {
        width: wp(30),
        height: hp(4),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1.5)
    },
    price: {
        width: wp(35),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1.5)
    },
})