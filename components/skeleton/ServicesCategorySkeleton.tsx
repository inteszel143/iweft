import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

export default function ServicesCategorySkeleton() {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

    return (
        <View style={{ backgroundColor: 'white' }}>
            <View style={styles.row}>
                <ShimmerPlaceholder style={styles.rowStyle} />
                <ShimmerPlaceholder style={styles.rowStyle} />
                <ShimmerPlaceholder style={styles.rowStyle} />
                <ShimmerPlaceholder style={styles.rowStyle} />
                <ShimmerPlaceholder style={styles.rowStyle} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3),
        paddingLeft: wp(4)
    },
    rowStyle: {
        width: wp(20),
        height: hp(4.5),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    }
})