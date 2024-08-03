import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FloatButton from './FloatButton';
export default function EmptyChats() {
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('@/assets/icons/under.png')} resizeMode='contain' style={{ width: wp(100), height: hp(20) }} />
            </View>
            <Text style={styles.textStyle}>You have no messages.</Text>
            <Text style={styles.subText}>Your inbox is empty. Start a conversation to see messages here.</Text>
            <FloatButton />
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