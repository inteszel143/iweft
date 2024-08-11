import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ContactUs } from '@/constants/profile/data';
import { router } from 'expo-router';
export default function Page() {

    return (
        <View style={styles.container}>
            {
                ContactUs?.map((item, index) => (
                    <TouchableOpacity style={styles.cardStyle} key={index}
                        onPress={() => router.push('chatPage/CustomerSupport')}
                    >
                        <View style={styles.row}>
                            <MaterialCommunityIcons name={item?.icon as any} size={hp(3)} color={"#0a5ca8"} />
                            <Text style={styles.labelStyle}>{item?.label}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: wp(5)
    },
    cardStyle: {
        marginTop: hp(2.5),
        backgroundColor: 'white',
        height: hp(10),
        justifyContent: 'center',
        borderRadius: wp(4),
        paddingHorizontal: wp(6),
        shadowColor: "#DDDDDD",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },
    row: {
        flexDirection: 'row', alignItems: 'center', gap: wp(5)
    },
    labelStyle: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.2)
    }

})