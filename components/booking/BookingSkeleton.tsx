import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
export default function BookingSkeleton() {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.row}>
                    <ShimmerPlaceholder style={styles.imageStyle} />
                    <View style={{ marginLeft: wp(2) }}>
                        <ShimmerPlaceholder style={[styles.textStyle, { width: wp(30), }]} />
                        <ShimmerPlaceholder style={[styles.textStyle, { width: wp(20), marginTop: hp(1) }]} />
                        <ShimmerPlaceholder style={[styles.textStyle, { width: wp(40), marginTop: hp(2) }]} />
                    </View>
                    <ShimmerPlaceholder style={styles.messageBtn} />
                </View>
                <ShimmerPlaceholder style={styles.separator} />
            </View>
            <View style={styles.card}>
                <View style={styles.row}>
                    <ShimmerPlaceholder style={styles.imageStyle} />
                    <View style={{ marginLeft: wp(2) }}>
                        <ShimmerPlaceholder style={[styles.textStyle, { width: wp(30), }]} />
                        <ShimmerPlaceholder style={[styles.textStyle, { width: wp(20), marginTop: hp(1) }]} />
                        <ShimmerPlaceholder style={[styles.textStyle, { width: wp(40), marginTop: hp(2) }]} />
                    </View>
                    <ShimmerPlaceholder style={styles.messageBtn} />
                </View>
                <ShimmerPlaceholder style={styles.separator} />
            </View>
            <View style={styles.card}>
                <View style={styles.row}>
                    <ShimmerPlaceholder style={styles.imageStyle} />
                    <View style={{ marginLeft: wp(2) }}>
                        <ShimmerPlaceholder style={[styles.textStyle, { width: wp(30), }]} />
                        <ShimmerPlaceholder style={[styles.textStyle, { width: wp(20), marginTop: hp(1) }]} />
                        <ShimmerPlaceholder style={[styles.textStyle, { width: wp(40), marginTop: hp(2) }]} />
                    </View>
                    <ShimmerPlaceholder style={styles.messageBtn} />
                </View>
                <ShimmerPlaceholder style={styles.separator} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
    },
    card: {
        width: wp(90),
        paddingVertical: hp(1),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: hp(2),
        borderRadius: wp(7),
        paddingHorizontal: wp(4),
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(2)
    },
    messageBtn: {
        width: wp(18),
        height: wp(18),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    imageStyle: {
        width: wp(22),
        height: wp(22),
        backgroundColor: "#DADADA",
        borderRadius: wp(12),
        opacity: 0.3
    },
    textStyle: {
        height: hp(3.5),
        backgroundColor: "#DADADA",
        borderRadius: wp(4),
        opacity: 0.3
    },
    separator: {
        width: wp(78),
        height: 1,
        backgroundColor: "#DADADA",
        marginVertical: hp(2),
        alignSelf: 'center',
        opacity: 0.3
    }
})