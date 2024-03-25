import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';

export default function GlobalHeader({ screenName }: { screenName: string }) {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>

                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                    </TouchableOpacity>
                    <Text style={styles.bookingText} >{screenName}</Text>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(8) }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp(5),
        paddingTop: hp(6),
        backgroundColor: "#ffffff",
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(6),
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(5),
    },
    bookingText: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.5)
    }
})