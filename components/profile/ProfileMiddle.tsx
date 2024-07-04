import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useUserQuery } from '@/query/fetchAuthQuery';
import { useIsFocused } from '@react-navigation/native';
export default function ProfileMiddle() {
    const isFocused = useIsFocused();
    const { data, isFetching } = useUserQuery(isFocused);

    const validate =
        ((data?.address === null) ||
            (data?.nickname === null)) as boolean;

    const profileData = [
        {
            id: 1,
            icon: require('@/assets/temp/profileicons/editprofile.jpg'),
            label: "Edit Profile",
            url: '/profilePage/EditProfile',
            warning: validate,
        },
        {
            id: 2,
            icon: require('@/assets/temp/profileicons/notif.jpg'),
            label: "Notification",
            url: '/profilePage/Notification'
        },
        {
            id: 3,
            icon: require('@/assets/temp/profileicons/payment.jpg'),
            label: "Payment Methods",
            url: '/profilePage/ProfilePayment'
        },
        {
            id: 4,
            icon: require('@/assets/temp/profileicons/payment.jpg'),
            label: "Payment History",
            url: '/profilePage/ProfilePaymentHistory'
        },
        {
            id: 5,
            icon: require('@/assets/temp/profileicons/security.jpg'),
            label: "Security",
            url: '/profilePage/Security'
        },
        {
            id: 6,
            icon: require('@/assets/temp/profileicons/language.jpg'),
            label: "Language",
            value: "English (US)",
            url: '/profilePage/Language'
        },
        {
            id: 7,
            icon: require('@/assets/temp/profileicons/subs.jpg'),
            label: "Subscription",
            url: '/profilePage/Subscription',
            switch: true
        },
        {
            id: 8,
            icon: require('@/assets/temp/profileicons/privacy.jpg'),
            label: "Privacy Policy",
            url: '/profilePage/PrivacyPolicy'
        },
        {
            id: 9,
            icon: require('@/assets/temp/profileicons/help.jpg'),
            label: "Help Center",
            url: '/profilePage/EditProfile'
        },
        {
            id: 10,
            icon: require('@/assets/temp/profileicons/invite.jpg'),
            label: "Invite Friends",
            url: '/profilePage/InviteFriends'
        },
    ];

    return (
        <View style={styles.container}>
            {
                profileData.map((item, index) => {
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