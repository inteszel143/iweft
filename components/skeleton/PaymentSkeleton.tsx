import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

export default function PaymentSkeleton() {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

    return (
        <View>



            <View style={styles.cardStyle}>
                <View style={styles.row}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.subtitle} />
                        <ShimmerPlaceholder style={styles.belowsub} />
                    </View>
                </View>
            </View>
            <View style={styles.cardStyle}>
                <View style={styles.row}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.subtitle} />
                        <ShimmerPlaceholder style={styles.belowsub} />
                    </View>
                </View>
            </View>

            <View style={styles.cardStyle}>
                <View style={styles.row}>
                    <ShimmerPlaceholder style={styles.circle} />
                    <View>
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.subtitle} />
                        <ShimmerPlaceholder style={styles.belowsub} />
                    </View>
                </View>
            </View>
            <View style={styles.cardStyle}>
                <View style={styles.row}>
                    <ShimmerPlaceholder style={styles.circle} />
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
    cardStyle: {
        alignSelf: 'center',
        width: wp(90),
        borderRadius: wp(2),
        backgroundColor: 'white',
        marginTop: hp(2.5),
        paddingHorizontal: wp(6),
        paddingVertical: hp(2),
    },
    row: {
        flexDirection: 'row', alignItems: 'center', gap: wp(4)
    },
    circle: {
        width: wp(14),
        height: wp(14),
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
        height: hp(2.5),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1.5),
    },
    belowsub: {
        width: wp(30),
        height: hp(2.5),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1.5),
    },
    container: {
        marginTop: hp(3),
        paddingHorizontal: wp(5),
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