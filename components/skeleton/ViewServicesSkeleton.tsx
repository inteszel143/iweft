import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

export default function ViewServicesSkeleton() {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);


    return (
        <View style={styles.container}>
            <View>
                <ShimmerPlaceholder style={styles.imageTop} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: hp(2) }}>
                <ShimmerPlaceholder style={styles.title} />
                <ShimmerPlaceholder style={styles.bookmark} />
            </View>
            <View style={{ marginTop: hp(2) }}>
                <ShimmerPlaceholder style={styles.subTitle} />
            </View>
            <View style={{ marginTop: hp(3) }}>
                <ShimmerPlaceholder style={styles.seperator} />
            </View>

            <View style={{ marginTop: hp(3) }}>
                <ShimmerPlaceholder style={[styles.details, { width: wp(80), }]} />
                <ShimmerPlaceholder style={[styles.details, { width: wp(60), marginTop: hp(1) }]} />
                <ShimmerPlaceholder style={[styles.details, { width: wp(70), marginTop: hp(1) }]} />
                <ShimmerPlaceholder style={[styles.details, { width: wp(55), marginTop: hp(1) }]} />
            </View>

            <View style={{ marginTop: hp(3) }}>
                <ShimmerPlaceholder style={styles.seperator} />
            </View>

            <View style={{ marginTop: hp(3) }}>
                <ShimmerPlaceholder style={[styles.footerTop, { width: wp(90), }]} />
                <ShimmerPlaceholder style={[styles.footerTop, { width: wp(60), marginTop: hp(2) }]} />
                <ShimmerPlaceholder style={[styles.footerTop, { height: hp(8), width: wp(90), marginTop: hp(2) }]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: wp(5)
    },
    imageTop: {
        marginTop: hp(8),
        height: hp(25),
        width: wp(90),
        backgroundColor: "#DADADA",
        borderRadius: wp(4),
        opacity: 0.3,
        // alignSelf: 'center'
    },
    title: {
        width: wp(60),
        height: hp(4),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
    },
    subTitle: {
        width: wp(70),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
    },
    bookmark: {
        width: wp(10),
        height: wp(10),
        backgroundColor: "#DADADA",
        borderRadius: wp(8),
        opacity: 0.3
    },
    seperator: {
        width: wp(90),
        height: 1,
        backgroundColor: "#DADADA",
        borderRadius: wp(8),
        opacity: 0.3
    },
    details: {
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
    },
    footerTop: {
        height: hp(4),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
    }

})