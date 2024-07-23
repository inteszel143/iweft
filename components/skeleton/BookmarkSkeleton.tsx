import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

export default function BookmarkSkeleton() {

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


    return (
        <View>
            <View style={styles.toprow}>
                <ShimmerPlaceholder style={[styles.topview, { marginLeft: wp(5) }]} />
                <ShimmerPlaceholder style={styles.topview} />
                <ShimmerPlaceholder style={styles.topview} />
                <ShimmerPlaceholder style={styles.topview} />
            </View>
            <View style={styles.cardStyle}>
                <View style={styles.cardRow}>
                    <View style={styles.cardLeft}>
                        <ShimmerPlaceholder style={styles.circle} />
                        <View>
                            <ShimmerPlaceholder style={styles.toptext} />
                            <ShimmerPlaceholder style={styles.title} />
                            <ShimmerPlaceholder style={styles.price} />
                        </View>
                    </View>

                </View>
            </View>
            <View style={styles.cardStyle}>
                <View style={styles.cardRow}>
                    <View style={styles.cardLeft}>
                        <ShimmerPlaceholder style={styles.circle} />
                        <View>
                            <ShimmerPlaceholder style={styles.toptext} />
                            <ShimmerPlaceholder style={styles.title} />
                            <ShimmerPlaceholder style={styles.price} />
                        </View>
                    </View>

                </View>
            </View>
            <View style={styles.cardStyle}>
                <View style={styles.cardRow}>
                    <View style={styles.cardLeft}>
                        <ShimmerPlaceholder style={styles.circle} />
                        <View>
                            <ShimmerPlaceholder style={styles.toptext} />
                            <ShimmerPlaceholder style={styles.title} />
                            <ShimmerPlaceholder style={styles.price} />
                        </View>
                    </View>

                </View>
            </View>
            <View style={styles.cardStyle}>
                <View style={styles.cardRow}>
                    <View style={styles.cardLeft}>
                        <ShimmerPlaceholder style={styles.circle} />
                        <View>
                            <ShimmerPlaceholder style={styles.toptext} />
                            <ShimmerPlaceholder style={styles.title} />
                            <ShimmerPlaceholder style={styles.price} />
                        </View>
                    </View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    toprow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        marginTop: hp(2)
    },
    topview: {
        width: wp(28),
        height: hp(4.5),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    cardStyle: {
        alignSelf: 'center',
        width: wp(92),
        paddingVertical: hp(2),
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: wp(4),
        marginTop: hp(3),
        paddingHorizontal: wp(5),

    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardLeft: {
        flexDirection: 'row',
        gap: wp(4)
    },

    circle: {
        width: wp(32),
        height: hp(15),
        backgroundColor: "#DADADA",
        borderRadius: wp(8),
        opacity: 0.3
    },
    toptext: {
        width: wp(44),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    title: {
        width: wp(36),
        height: hp(4),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(2)
    },
    price: {
        width: wp(28),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(2)
    }
})