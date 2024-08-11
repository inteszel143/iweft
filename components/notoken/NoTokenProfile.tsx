import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
import { Link, router } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
export default function NoTokenProfile() {
    const current = getCurrentLanguage();
    const { t } = useTranslation();
    const profileData = [
        {
            id: 1,
            icon: require('@/assets/temp/profileicons/privacy.jpg'),
            label: t('Privacy Policy'),
            url: '/profilePage/PrivacyPolicy'
        },
        {
            id: 2,
            icon: require('@/assets/temp/profileicons/help.jpg'),
            label: t('Help Center'),
            url: '/profilePage/help'
        },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.topStyle}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.subTitle}>Log in to start booking laundry services.</Text>
            </View>

            <View style={{ paddingHorizontal: wp(6), }}>
                <TouchableOpacity style={styles.btnStyle} onPress={() => router.push('(modal)/login')}>
                    <Text style={styles.btnText}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.rowStyle}>
                    <Text style={[styles.accountStyle, { color: "#616161" }]}>Don't have an account ?</Text>
                    <TouchableOpacity onPress={() => router.push('(modal)/login')}>
                        <Text style={[styles.accountStyle, { fontFamily: 'UrbanistSemiBold', }]}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={styles.cardStyle}
            >
                <View
                    style={styles.cardRowStyle}
                >
                    <View>
                        <Text style={styles.sloganTitle}>Iweft Laundry & Dry Cleaning</Text>
                        <Text style={styles.slogan}>Effortless Laundry, Just a Tap Away. </Text>
                    </View>
                    <Image source={require('@/assets/temp/special/specialoffers1.png')} resizeMode='contain' style={{ width: wp(26), height: hp(8) }} />
                </View>
            </View>

            <View style={{ paddingHorizontal: wp(6), marginTop: hp(5) }}>
                {
                    profileData.map((item, index) => (
                        <Link href={item.url} asChild key={index} >
                            <TouchableOpacity style={styles.cardRow}>
                                <View style={styles.leftRow}>
                                    <Image source={item.icon} resizeMode='contain' style={{ width: wp(7) }} />
                                    <Text style={styles.labelStyle}>{item.label}</Text>
                                </View>

                                <View style={styles.rightRow}>
                                    <Feather name='chevron-right' size={hp(2.5)} color={'#212121'} />
                                </View>
                            </TouchableOpacity>
                        </Link>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    topStyle: {
        paddingHorizontal: wp(6),
        marginTop: hp(12)
    },
    title: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(3.5)
    },
    subTitle: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.9),
        color: "#616161",
        marginTop: hp(2)
    },
    btnStyle: {
        width: wp(88),
        height: hp(7),
        backgroundColor: "#0A5CA8",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(2),
        alignSelf: 'center',
        marginTop: hp(6)
    },
    btnText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
        color: 'white'
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(1.5),
        marginTop: hp(2.5)
    },
    accountStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.7)
    },

    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(0.5),
    },
    leftRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    labelStyle: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2.2)
    },
    rightRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3)
    },
    textValue: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2)
    },
    cardStyle: {
        width: wp(88),
        paddingVertical: hp(4),
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignSelf: 'center',
        borderRadius: wp(4),
        marginTop: hp(5),
        paddingHorizontal: wp(4)
    },
    cardRowStyle: {
        width: wp(60),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    slogan: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.8),
        color: "#616161",
        marginTop: hp(1.2)
    },
    sloganTitle: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2)
    }
})