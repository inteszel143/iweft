import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
export default function Undercontruct() {
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('@/assets/temp/under.jpg')} resizeMode='contain' style={{ width: wp(100), height: hp(22) }} />
            </View>
            <View>
                <Text style={styles.textStyle}>Sorry, this page is currently under construction.</Text>
            </View>

            <TouchableOpacity style={styles.btnStyle} onPress={() => router.back()}>
                <Text style={styles.btnText}>Go back</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(10)
    },
    textStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.5),
        textAlign: 'center',
        marginTop: hp(4)
    },
    btnStyle: {
        width: wp(80),
        height: hp(7),
        backgroundColor: '#DAE7F2',
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(10)
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: '#0A5CA8'
    }
})