import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

export default function MethodSkeleton() {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.row}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.label} />
                        <ShimmerPlaceholder style={styles.sub} />
                    </View>
                    {/* <ShimmerPlaceholder style={styles.circleRight} /> */}
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.row}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.label} />
                        <ShimmerPlaceholder style={styles.sub} />
                    </View>
                    {/* <ShimmerPlaceholder style={styles.circleRight} /> */}
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.row}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.label} />
                        <ShimmerPlaceholder style={styles.sub} />
                    </View>
                    {/* <ShimmerPlaceholder style={styles.circleRight} /> */}
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.row}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.label} />
                        <ShimmerPlaceholder style={styles.sub} />
                    </View>
                    {/* <ShimmerPlaceholder style={styles.circleRight} /> */}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp(6),
    },
    card: {
        width: wp(90),
        height: hp(12),
        borderRadius: wp(4),
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: "#F1F1F1",
        marginTop: hp(3),
        justifyContent: 'center',
        paddingHorizontal: wp(5),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(5)
    },
    circle: {
        width: wp(14),
        height: wp(14),
        borderRadius: wp(15),
        backgroundColor: "#DADADA",
        opacity: 0.3
    },
    circleRight: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(15),
        backgroundColor: "#DADADA",
        opacity: 0.3,
        marginLeft: wp(6)
    },
    label: {
        width: wp(50),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
    },
    sub: {
        width: wp(40),
        height: hp(2),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1)
    }
})