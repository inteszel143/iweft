import { StyleSheet, Text, View, Image, Platform, TouchableOpacity, Linking } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { useUserQuery } from '@/query/fetchAuthQuery';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import HomeHeaderSkeleton from '../skeleton/HomeHeaderSkeleton';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
import { inboxBadge, profileBadge } from '@/utils/validate';
import useUserId from '@/store/useUserInfo';
export default function HomeHeader() {
    const { t } = useTranslation();
    const current = getCurrentLanguage();
    const isFocused = useIsFocused();
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const isMorning = currentHour >= 0 && currentHour < 12;
    const { data, isPending } = useUserQuery(isFocused);
    const { setUserId } = useUserId();
    useEffect(() => {
        if (data) {
            profileBadge(data);
            setUserId(data?._id);
        }
    }, [data]);

    const openAppStore = () => {
        const appStoreURL = 'https://apps.apple.com/us/app/facebook/id284882215';
        const playStoreURL = 'https://play.google.com/store/apps/details?id=com.paras23.iMotor.app';
        const url = Platform.OS === 'ios' ? appStoreURL : playStoreURL;
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };



    if (isPending) {
        return <HomeHeaderSkeleton />
    }

    return (
        <View style={[styles.header, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>

            <View style={[styles.headerLeft, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>

                <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                    {!data ? <Image
                        source={require('@/assets/temp/default.jpg')}
                        resizeMode='center'
                        style={{ width: wp(14), height: wp(14), borderRadius: wp(7) }}
                    /> :
                        <Image
                            source={{ uri: data?.profile_picture }}
                            resizeMode='center'
                            style={{ width: wp(14), height: wp(14), borderRadius: wp(7) }}
                        />
                    }

                </TouchableOpacity>

                <View>
                    <Text style={styles.headerGood}>
                        {currentHour >= 0 && currentHour < 12
                            ? `${t('Good Morning!')} 👋`
                            : currentHour >= 12 && currentHour < 18
                                ? `${t('Good Afternoon!')} ☀️`
                                : `${t('Good Evening!')} 🌙`}
                    </Text>
                    <Text style={styles.headerName} >{data?.fullname}</Text>
                </View>

            </View>


            <View style={[styles.headerIcon, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                <View>
                    <TouchableOpacity
                        onPress={() => router.push('/homePage/Notification')}
                    >
                        <Image source={require('@/assets/icons/bell.png')} resizeMode='contain' style={{ width: wp(8.2) }} />
                    </TouchableOpacity>
                    {/* <View
                        style={styles.notifRed}
                    >

                    </View> */}
                </View>

                {/* bookmark */}
                <View>
                    <TouchableOpacity
                        onPress={() => router.push('/homePage/Bookmarks')}
                    >
                        <Image source={require('@/assets/icons/bookmark.png')} resizeMode='contain' style={{ width: wp(8) }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: wp(5),
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'android' ? hp(4) : 0,
    },
    headerLeft: {
        flex: 1,
        alignItems: 'center',
        gap: wp(4),
        paddingVertical: hp(1),
    },
    headerGood: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(2.1),
        color: "#757575"
    },
    headerName: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.4),
    },
    headerIcon: {
        alignItems: 'center',
        gap: wp(3.5)
    },
    notifRed: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? hp(1.2) : hp(2),
        right: 1,
        width: wp(3),
        height: wp(3),
        backgroundColor: '#F61705',
        borderRadius: wp(2),
    },

})