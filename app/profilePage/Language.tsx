import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { Switch } from 'react-native-switch';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function Language() {
    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Language</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={styles.containerStyle}>

                <Text style={styles.titleStyle}>Suggested</Text>

                <TouchableOpacity style={styles.containerInner}>
                    <Text style={styles.textStyle}>English (US)</Text>
                    <Ionicons name='radio-button-on' size={hp(3)} color={'#0A5CA8'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerInner}>
                    <Text style={styles.textStyle}>Arabic</Text>
                    <Ionicons name='radio-button-off' size={hp(3)} color={'#0A5CA8'} />
                </TouchableOpacity>


                <View style={styles.separator} />
            </View>








        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    Headercontainer: {
        paddingHorizontal: wp(5),
        paddingTop: hp(6),
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
    },


    containerStyle: {
        paddingHorizontal: wp(6)
    },
    containerInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(4)
    },
    textStyle: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2.2)
    },
    titleStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.3),
        marginTop: hp(3)
    },
    separator: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginTop: hp(4)
    }
})