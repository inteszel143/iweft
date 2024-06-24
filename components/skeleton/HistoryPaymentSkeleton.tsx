import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

export default function HistoryPaymentSkeleton() {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

    return (
        <View>
            <View style={styles.cardStyle} >
                <View style={styles.cardInner}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View style={{ flex: 1, }}>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.sub} />
                        <ShimmerPlaceholder style={styles.price} />
                        <ShimmerPlaceholder style={styles.date} />
                    </View>
                </View>
            </View>
            <View style={styles.cardStyle} >
                <View style={styles.cardInner}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View style={{ flex: 1, }}>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.sub} />
                        <ShimmerPlaceholder style={styles.price} />
                        <ShimmerPlaceholder style={styles.date} />
                    </View>
                </View>
            </View>
            <View style={styles.cardStyle} >
                <View style={styles.cardInner}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View style={{ flex: 1, }}>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.sub} />
                        <ShimmerPlaceholder style={styles.price} />
                        <ShimmerPlaceholder style={styles.date} />
                    </View>
                </View>
            </View>
            <View style={styles.cardStyle} >
                <View style={styles.cardInner}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View style={{ flex: 1, }}>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.sub} />
                        <ShimmerPlaceholder style={styles.price} />
                        <ShimmerPlaceholder style={styles.date} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardStyle: {
        alignSelf: 'center',
        width: wp(92),
        paddingVertical: hp(2),
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: wp(4),
        marginTop: hp(2),
        paddingHorizontal: wp(5),

    },
    cardInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(6)
    },
    circle: {
        width: wp(18),
        height: wp(18),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    title: {
        width: wp(55),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    sub: {
        width: wp(40),
        height: hp(2.5),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1.5)
    },
    price: {
        width: wp(30),
        height: hp(2),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1.5)
    },
    date: {
        width: wp(50),
        height: hp(2),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1.5)
    }
})