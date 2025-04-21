import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import { usetGetBookmarks } from '@/query/bookmarkQuery';
export default function HomeBookmark() {

    const isFocused = useIsFocused();
    const { data, isPending } = usetGetBookmarks(isFocused);

    if (!data || data == 0) {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => router.push('/homePage/Bookmarks')}
                >
                    <Image source={require('@/assets/icons/bookmark.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => router.push('/homePage/Bookmarks')}
                >
                    <Image source={require('@/assets/icons/bookmark.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                </TouchableOpacity>
                {/* <View style={styles.notifRed} /> */}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    notifRed: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? hp(1.1) : hp(2),
        right: -1,
        width: wp(3.5),
        height: wp(3.5),
        backgroundColor: '#F61705',
        borderRadius: wp(2),
    },
})