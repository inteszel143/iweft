import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
export default function EmptyServiceBooking() {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>

            {/* <View style={styles.topRow}>
                <Text style={styles.textTop}>Service Booking (2)</Text>
                <Link href={'/(tabs)/booking/'} asChild>
                    <TouchableOpacity>
                        <Text style={styles.textSeeAll}>See all</Text>
                    </TouchableOpacity>
                </Link>
            </View> */}


            <View style={styles.imageStyle}>
                <Image
                    source={require('@/assets/icons/emptybook.jpg')}
                    resizeMode='contain'
                    style={{
                        width: wp(35),
                        height: hp(24)
                    }}
                />
            </View>

            <View style={styles.wordingsStyle} >
                <Text style={styles.textStyle}>{t('You have no bookings scheduled')}</Text>
                <Text style={styles.textSubStyle} >{t("You don't have a service booking on this date")}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingBottom: hp(20)
    },
    textTop: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
    },
    textSeeAll: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
        color: "#0A5CA8"
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
        height: hp(6),
    },
    imageStyle: {
        marginTop: hp(2),
        alignItems: 'center'
    },
    wordingsStyle: {
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
        textAlign: 'center',
    },
    textSubStyle: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.8),
        textAlign: 'center',
        marginTop: hp(1),
    }

})