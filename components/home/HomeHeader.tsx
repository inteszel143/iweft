import { StyleSheet, Text, View, Image, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { useUserQuery } from '@/query/fetchAuthQuery';
import { useIsFocused } from '@react-navigation/native';
export default function HomeHeader() {
    const isFocused = useIsFocused();
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const isMorning = currentHour >= 0 && currentHour < 12;
    const { data } = useUserQuery(isFocused);
    if (!data) {
        return;
    }
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>

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
                            ? 'Good Morning! 👋'
                            : currentHour >= 12 && currentHour < 18
                                ? 'Good Afternoon ☀️'
                                : 'Good Evening! 🌙'}
                    </Text>
                    <Text style={styles.headerName} >{data?.fullname}</Text>
                </View>

            </View>


            <View style={styles.headerIcon}>

                <Link href={'/homePage/Notification'} asChild>
                    <TouchableOpacity>
                        <Image source={require('@/assets/icons/bell.png')} resizeMode='contain' style={{ width: wp(8) }} />
                    </TouchableOpacity>
                </Link>

                <Link href={'/homePage/Bookmarks'} asChild>
                    <TouchableOpacity>
                        <Image source={require('@/assets/icons/bookmark.png')} resizeMode='contain' style={{ width: wp(8) }} />
                    </TouchableOpacity>
                </Link>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: wp(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'android' ? hp(4) : 0,
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'row',
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3.5)
    },
})