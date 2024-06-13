import { Platform, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
export default function HomeHeaderSkeleton() {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <ShimmerPlaceholder style={styles.circle} />
                <View>
                    <ShimmerPlaceholder style={styles.good} />
                    <ShimmerPlaceholder style={styles.name} />
                </View>
            </View>
            <View style={styles.headerRight}>
                <ShimmerPlaceholder style={styles.circleIcon} />
                <ShimmerPlaceholder style={styles.circleIcon} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: wp(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'android' ? hp(4) : 0,
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        paddingVertical: hp(1),
    },
    circle: {
        width: wp(14),
        height: wp(14),
        backgroundColor: "#DADADA",
        borderRadius: wp(7),
        opacity: 0.3
    },
    circleIcon: {
        width: wp(10),
        height: wp(10),
        backgroundColor: "#DADADA",
        borderRadius: wp(7),
        opacity: 0.3
    },
    good: {
        width: wp(30),
        height: hp(2),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    name: {
        width: wp(42),
        height: hp(2.5),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1)
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3.5)
    }
})