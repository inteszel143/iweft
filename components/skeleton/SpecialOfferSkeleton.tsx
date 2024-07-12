import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';

export default function SpecialOfferSkeleton() {
    const { t } = useTranslation();
    const current = getCurrentLanguage();
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

    return (
        <View style={{ marginTop: hp(3), }}>

            <View style={[styles.header, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                <Text style={styles.specialText}>{t('Special Offers')}</Text>
                <Link href={'/homePage/SepecialOffers'} asChild>
                    <TouchableOpacity>
                        <Text style={styles.seeallText}>{t('See all')}</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <View style={styles.cardStyle}>
                <View style={styles.row}>
                    <View style={{ width: wp(45) }}>
                        <ShimmerPlaceholder style={styles.discount} />
                        <ShimmerPlaceholder style={styles.title} />
                        <ShimmerPlaceholder style={styles.subtitle} />
                    </View>
                    <View>
                        <ShimmerPlaceholder style={styles.imagecircle} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp(3),
    },
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
    },
    specialText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.4),
    },
    seeallText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
        color: '#0a5ca8'
    },

    indicatorStyle: {
        alignItems: 'center'
    },

    cardStyle: {
        alignSelf: 'center',
        width: wp(90),
        height: hp(21),
        borderWidth: 0.5,
        borderColor: "#CACACA",
        marginVertical: hp(3),
        borderRadius: wp(10),
        justifyContent: 'center',
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(8)
    },
    imagecircle: {
        width: wp(22),
        height: wp(22),
        backgroundColor: "#DADADA",
        borderRadius: wp(12),
        opacity: 0.3
    },
    discount: {
        width: wp(30),
        height: hp(4),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3
    },
    title: {
        width: wp(45),
        height: hp(3),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(2),
    },
    subtitle: {
        width: wp(52),
        height: hp(2),
        backgroundColor: "#DADADA",
        borderRadius: wp(10),
        opacity: 0.3,
        marginTop: hp(2),
    }
})