import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

export default function SubSkeleton() {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


    return (
        <View>
            {/* <View style={styles.container}>
                <ShimmerPlaceholder style={styles.textLabel} />
            </View> */}
            <View style={styles.cardRow}>
                <View style={styles.row}>
                    <View style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.subtitle} />
                        <ShimmerPlaceholder style={styles.belowsub} />
                    </View>
                </View>
            </View>
            <View style={styles.cardRow}>
                <View style={styles.row}>
                    <View style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.subtitle} />
                        <ShimmerPlaceholder style={styles.belowsub} />
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <ShimmerPlaceholder style={styles.textLabel} />
            </View>
            <View style={styles.cardRow}>
                <View style={styles.row}>
                    <View style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.subtitle} />
                        <ShimmerPlaceholder style={styles.belowsub} />
                    </View>
                </View>
            </View>
            <View style={styles.cardRow}>
                <View style={styles.row}>
                    <View style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.subtitle} />
                        <ShimmerPlaceholder style={styles.belowsub} />
                    </View>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    cardRow: {
        alignSelf: 'center',
        width: wp(92),
        paddingVertical: hp(2),
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: wp(4),
        marginTop: hp(2.5),
        paddingHorizontal: wp(5),
    },
    container: {
        marginTop: hp(3),
        paddingHorizontal: wp(5),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    circle: {
        width: wp(20),
        height: wp(20),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    title: {
        width: wp(50),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1),
        // alignSelf: 'center'
    },
    subtitle: {
        width: wp(40),
        height: hp(2),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1.5),
        // alignSelf: 'center'
    },
    belowsub: {
        width: wp(30),
        height: hp(2),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1.5),
    },
    textLabel: {
        width: wp(35),
        height: hp(3.5),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1),
    }
})