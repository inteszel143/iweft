import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function HomeSearch() {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchLeft}>
                <Image source={require('@/assets/icons/search.png')} resizeMode='contain' style={{ width: wp(6.5) }} />
                <TextInput placeholder='Seach what you need ...' style={{ fontFamily: 'UrbanistMedium', fontSize: hp(1.8) }} />
            </View>
            <Image source={require('@/assets/icons/filter.png')} resizeMode='contain' style={{ width: wp(6.5) }} />
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
        height: hp(7),
        width: wp(91),
        backgroundColor: "#F5F5F5",
        marginTop: hp(1.5),
        borderRadius: 12,
        alignSelf: 'center'
    },
    searchLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        backgroundColor: 'transparent'
    }
})