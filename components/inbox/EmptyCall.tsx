import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function EmptyCall() {
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('@/assets/icons/under.png')} resizeMode='contain' style={{ width: wp(100), height: hp(18) }} />
            </View>
            <Text style={styles.textStyle}>No Call History Yet</Text>
            <Text style={styles.subText}>Your call history will appear here once you start making calls.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
        marginTop: hp(4)
    },
    subText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: "#616161",
        textAlign: 'center',
        paddingHorizontal: wp(6),
        marginTop: hp(2)
    }
})