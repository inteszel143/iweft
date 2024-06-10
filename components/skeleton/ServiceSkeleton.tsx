import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
export default function ServiceSkeleton() {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View>
                    <ShimmerPlaceholder style={styles.circle} />
                    <ShimmerPlaceholder style={styles.title} />
                </View>
                <View>
                    <ShimmerPlaceholder style={styles.circle} />
                    <ShimmerPlaceholder style={styles.title} />
                </View>
                <View>
                    <ShimmerPlaceholder style={styles.circle} />
                    <ShimmerPlaceholder style={styles.title} />
                </View>
                <View>
                    <ShimmerPlaceholder style={styles.circle} />
                    <ShimmerPlaceholder style={styles.title} />
                </View>
                <View>
                    <ShimmerPlaceholder style={styles.circle} />
                    <ShimmerPlaceholder style={styles.title} />
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: wp(5),
        marginTop: hp(4),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(5)
    },
    circle: {
        width: wp(18),
        height: wp(18),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    title: {
        width: wp(18),
        height: hp(2),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1),
        alignSelf: 'center'
    },
})