import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
export default function HomeBundleSkeleton() {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


    return (
        <View style={styles.container}>
            <View style={styles.rows}>
                <ShimmerPlaceholder style={styles.image} />
                <ShimmerPlaceholder style={styles.text} />
            </View>
            <View style={styles.rows}>
                <ShimmerPlaceholder style={styles.image} />
                <ShimmerPlaceholder style={styles.text} />
            </View>
            <View style={styles.rows}>
                <ShimmerPlaceholder style={styles.image} />
                <ShimmerPlaceholder style={styles.text} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp(3),
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3),
        paddingLeft: wp(2)
    },
    image: {
        width: wp(25),
        height: wp(25),
        borderRadius: wp(15),
        backgroundColor: "#DADADA",
        opacity: 0.3
    },
    text: {
        width: wp(28),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(2)
    },
    rows: {
        alignItems: 'center'
    }
})