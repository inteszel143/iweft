import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function HomeHeader() {
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <View>
                    <Image
                        source={require('@/assets/temp/profile.png')}
                        resizeMode='contain'
                        style={{ width: wp(14), height: hp(10) }}
                    />
                </View>
                <View>
                    <Text style={styles.headerGood} >Good Morning 👋</Text>
                    <Text style={styles.headerName} >Andrew Ainsley</Text>
                </View>
            </View>


            <View style={styles.headerIcon}>
                <Image source={require('@/assets/icons/bell.png')} resizeMode='contain' style={{ width: wp(8) }} />
                <Image source={require('@/assets/icons/bookmark.png')} resizeMode='contain' style={{ width: wp(8) }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: wp(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
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