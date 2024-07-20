import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

export default function InboxSkeleton() {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


    return (
        <View style={styles.container}>
            <View style={styles.cardrow}>
                <View style={styles.cardLeftRow}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.sub} />
                    </View>
                </View>
                <View>
                    <ShimmerPlaceholder style={styles.smallCircle} />
                </View>
            </View>
            <View style={styles.cardrow}>
                <View style={styles.cardLeftRow}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.sub} />
                    </View>
                </View>
                <View>
                    <ShimmerPlaceholder style={styles.smallCircle} />
                </View>
            </View>
            <View style={styles.cardrow}>
                <View style={styles.cardLeftRow}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.sub} />
                    </View>
                </View>
                <View>
                    <ShimmerPlaceholder style={styles.smallCircle} />
                </View>
            </View>
            <View style={styles.cardrow}>
                <View style={styles.cardLeftRow}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.sub} />
                    </View>
                </View>
                <View>
                    <ShimmerPlaceholder style={styles.smallCircle} />
                </View>
            </View>
            <View style={styles.cardrow}>
                <View style={styles.cardLeftRow}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.sub} />
                    </View>
                </View>
                <View>
                    <ShimmerPlaceholder style={styles.smallCircle} />
                </View>
            </View>
            <View style={styles.cardrow}>
                <View style={styles.cardLeftRow}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.sub} />
                    </View>
                </View>
                <View>
                    <ShimmerPlaceholder style={styles.smallCircle} />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp(5),
    },
    cardrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp(2),
    },
    cardLeftRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        width: wp(60),
    },
    circle: {
        width: wp(18),
        height: wp(18),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    smallCircle: {
        width: wp(10),
        height: wp(10),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    title: {
        width: wp(50),
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
})