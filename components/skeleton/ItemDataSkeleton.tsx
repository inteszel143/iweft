import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
export default function ItemDataSkeleton() {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    return (
        <View style={styles.container}>
            <View style={styles.cardStyle}>
                <View style={styles.inner} >
                    <View style={styles.leftSide}>
                        <ShimmerPlaceholder style={styles.circle} />
                        <View>
                            <ShimmerPlaceholder style={styles.title} />
                            <ShimmerPlaceholder style={styles.subtitle} />
                        </View>
                    </View>
                    <View style={styles.rightSide}>
                        <ShimmerPlaceholder style={styles.btncircle} />
                        <ShimmerPlaceholder style={styles.btncircle} />
                    </View>
                </View>
            </View>
            <View style={styles.cardStyle}>
                <View style={styles.inner} >
                    <View style={styles.leftSide}>
                        <ShimmerPlaceholder style={styles.circle} />
                        <View>
                            <ShimmerPlaceholder style={styles.title} />
                            <ShimmerPlaceholder style={styles.subtitle} />
                        </View>
                    </View>
                    <View style={styles.rightSide}>
                        <ShimmerPlaceholder style={styles.btncircle} />
                        <ShimmerPlaceholder style={styles.btncircle} />
                    </View>
                </View>
            </View>
            <View style={styles.cardStyle}>
                <View style={styles.inner} >
                    <View style={styles.leftSide}>
                        <ShimmerPlaceholder style={styles.circle} />
                        <View>
                            <ShimmerPlaceholder style={styles.title} />
                            <ShimmerPlaceholder style={styles.subtitle} />
                        </View>
                    </View>
                    <View style={styles.rightSide}>
                        <ShimmerPlaceholder style={styles.btncircle} />
                        <ShimmerPlaceholder style={styles.btncircle} />
                    </View>
                </View>
            </View>
            <View style={styles.cardStyle}>
                <View style={styles.inner} >
                    <View style={styles.leftSide}>
                        <ShimmerPlaceholder style={styles.circle} />
                        <View>
                            <ShimmerPlaceholder style={styles.title} />
                            <ShimmerPlaceholder style={styles.subtitle} />
                        </View>
                    </View>
                    <View style={styles.rightSide}>
                        <ShimmerPlaceholder style={styles.btncircle} />
                        <ShimmerPlaceholder style={styles.btncircle} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    cardStyle: {
        width: wp(90),
        backgroundColor: '#FFFFFF',
        borderRadius: wp(4),
        marginTop: hp(2.5),
        justifyContent: 'center',
        paddingVertical: hp(4),
        paddingHorizontal: wp(5),
        shadowColor: "#DDDDDD",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },
    circle: {
        width: wp(14),
        height: wp(14),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    title: {
        width: wp(30),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    subtitle: {
        width: wp(20),
        height: hp(2),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(1)
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    btncircle: {
        width: wp(12),
        height: wp(12),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    }
})