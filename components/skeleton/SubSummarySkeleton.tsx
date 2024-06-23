import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

export default function SubSummarySkeleton() {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


    return (
        <View>
            <View style={[styles.summarCard, { marginTop: hp(3) }]}>
                <View style={styles.summarRow}>
                    <ShimmerPlaceholder style={styles.value} />
                    <ShimmerPlaceholder style={styles.value} />
                </View>
                <View style={[styles.summarRow, { marginTop: hp(1) }]}>
                    <ShimmerPlaceholder style={styles.title} />
                    <ShimmerPlaceholder style={styles.value} />
                </View>
                <View style={[styles.summarRow, { marginTop: hp(1) }]}>
                    <ShimmerPlaceholder style={styles.value} />
                    <ShimmerPlaceholder style={styles.title} />
                </View>
            </View>
            <View style={[styles.summarCard, { marginTop: hp(3) }]}>
                <View style={styles.summarRow}>
                    <ShimmerPlaceholder style={styles.value} />
                    <ShimmerPlaceholder style={styles.value} />
                </View>
                <View style={[styles.summarRow, { marginTop: hp(1) }]}>
                    <ShimmerPlaceholder style={styles.title} />
                    <ShimmerPlaceholder style={styles.value} />
                </View>
                <View style={[styles.summarRow, { marginTop: hp(1) }]}>
                    <ShimmerPlaceholder style={styles.value} />
                    <ShimmerPlaceholder style={styles.title} />
                </View>
            </View>

            <View style={[styles.summarCard, { marginTop: hp(3) }]}>
                <View style={[styles.summarRow]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2) }}>
                        <ShimmerPlaceholder style={styles.circle} />
                        <ShimmerPlaceholder style={[styles.title, { width: wp(50), }]} />
                    </View>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    summarCard: {
        width: wp(90),
        paddingVertical: hp(4),
        paddingHorizontal: wp(6),
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: wp(4),
        alignSelf: 'center'
    },
    summarRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        width: wp(40),
        height: hp(3.5),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1),
        // alignSelf: 'center'
    },
    value: {
        width: wp(30),
        height: hp(3.5),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1),
    },
    circle: {
        width: wp(14),
        height: wp(14),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
})