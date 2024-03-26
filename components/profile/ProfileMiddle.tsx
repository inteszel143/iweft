import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { profileData } from '@/constants/profile/data';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
export default function ProfileMiddle() {
    return (
        <View style={styles.container}>
            {
                profileData.map((item, index) => {
                    return (
                        <Link href={item.url} asChild key={index} >
                            <TouchableOpacity style={styles.cardRow}>
                                <View style={styles.leftRow}>
                                    <Image source={item.icon} resizeMode='contain' style={{ width: wp(7) }} />
                                    <Text style={styles.labelStyle}>{item.label}</Text>
                                </View>

                                <View style={styles.rightRow}>
                                    <Text style={styles.textValue}>{item.value}</Text>
                                    {item.switch ? <Feather name='chevron-right' size={hp(2.5)} color={'#212121'} /> : <Feather name='chevron-right' size={hp(2.5)} color={'#212121'} />}
                                </View>
                            </TouchableOpacity>
                        </Link>
                    )
                })
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp(2),
        paddingHorizontal: wp(5),
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(0.5),
    },
    leftRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    labelStyle: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2.2)
    },
    rightRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    textValue: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2)
    }
})