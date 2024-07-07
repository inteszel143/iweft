import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useUserQuery } from '@/query/fetchAuthQuery';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
export default function ProfileMiddle() {
    const isFocused = useIsFocused();
    const { data, isFetching } = useUserQuery(isFocused);
    const current = getCurrentLanguage();
    const { t } = useTranslation();
    const validate =
        ((data?.address === null) ||
            (data?.nickname === null)) as boolean;

    const profileData = [
        {
            id: 1,
            icon: require('@/assets/temp/profileicons/editprofile.jpg'),
            label: t('Edit Profile'),
            url: '/profilePage/EditProfile',
            warning: validate,
        },
        {
            id: 2,
            icon: require('@/assets/temp/profileicons/notif.jpg'),
            label: t('Notification'),
            url: '/profilePage/Notification'
        },
        {
            id: 3,
            icon: require('@/assets/temp/profileicons/payment.jpg'),
            label: t('Payment Methods'),
            url: '/profilePage/ProfilePayment'
        },
        {
            id: 4,
            icon: require('@/assets/temp/profileicons/payment.jpg'),
            label: t('Payment History'),
            url: '/profilePage/ProfilePaymentHistory'
        },
        {
            id: 5,
            icon: require('@/assets/temp/profileicons/security.jpg'),
            label: t('Security'),
            url: '/profilePage/Security'
        },
        {
            id: 6,
            icon: require('@/assets/temp/profileicons/language.jpg'),
            label: t('Language'),
            value: current === "en" ? "English (US)" : current === "ar" ? "Arabic" : current === "man" ? "Mandarin" : current === "hindi" ? "Hindi" : current === "spa" ? "Spanish" : current === "fr" ? "French" : current === "ben" ? "Bengali" : current === "rus" ? "Russian" : "Indonesia",
            url: '/profilePage/Language'
        },
        {
            id: 7,
            icon: require('@/assets/temp/profileicons/subs.jpg'),
            label: t('Subscription'),
            url: '/profilePage/Subscription',
            switch: true
        },
        {
            id: 8,
            icon: require('@/assets/temp/profileicons/privacy.jpg'),
            label: t('Privacy Policy'),
            url: '/profilePage/PrivacyPolicy'
        },
        {
            id: 9,
            icon: require('@/assets/temp/profileicons/help.jpg'),
            label: t('Help Center'),
            url: '/profilePage/EditProfile'
        },
        {
            id: 10,
            icon: require('@/assets/temp/profileicons/invite.jpg'),
            label: t('Invite Friends'),
            url: '/profilePage/InviteFriends'
        },
    ];

    return (
        <View style={styles.container}>
            {
                profileData.map((item, index) => {
                    if (current === 'ar') {
                        return (
                            <Link href={item.url} asChild key={index} >
                                <TouchableOpacity style={styles.cardRow}>
                                    <View style={styles.rightRow}>
                                        {item.warning && <AntDesign name="exclamationcircle" size={hp(2)} color={'red'} />}
                                        {item.switch ? <Feather name='chevron-left' size={hp(2.5)} color={'#212121'} /> : <Feather name='chevron-left' size={hp(2.5)} color={'#212121'} />}
                                        <Text style={styles.textValue}>{item.value}</Text>
                                    </View>
                                    <View style={styles.leftRow}>
                                        <Text style={styles.labelStyle}>{item.label}</Text>
                                        <Image source={item.icon} resizeMode='contain' style={{ width: wp(7) }} />
                                    </View>
                                </TouchableOpacity>
                            </Link>
                        )
                    } else {
                        return (
                            <Link href={item.url} asChild key={index} >
                                <TouchableOpacity style={styles.cardRow}>
                                    <View style={styles.leftRow}>
                                        <Image source={item.icon} resizeMode='contain' style={{ width: wp(7) }} />
                                        <Text style={styles.labelStyle}>{item.label}</Text>
                                    </View>

                                    <View style={styles.rightRow}>
                                        {item.warning && <AntDesign name="exclamationcircle" size={hp(2)} color={'red'} />}
                                        <Text style={styles.textValue}>{item.value}</Text>
                                        {item.switch ? <Feather name='chevron-right' size={hp(2.5)} color={'#212121'} /> : <Feather name='chevron-right' size={hp(2.5)} color={'#212121'} />}
                                    </View>
                                </TouchableOpacity>
                            </Link>
                        )
                    }
                })
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp(2),
        paddingHorizontal: wp(5),
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
    }
})