import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
export default function HomeSearch() {
    const { t } = useTranslation();
    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchLeft}>
                <Image source={require('@/assets/icons/search.png')} resizeMode='contain' style={{ width: wp(6.5) }} />
                <TextInput placeholder={t('Seach what you need...')}
                    placeholderTextColor={'#d5d5d5'}
                    style={{ fontFamily: 'UrbanistSemiBold', fontSize: hp(1.9) }} />
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