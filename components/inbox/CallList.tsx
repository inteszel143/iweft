import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { callListing } from '@/constants/chat/data'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import FloatButton from './FloatButton';
import { Link, router } from 'expo-router';
import EmptyCall from './EmptyCall';
export default function CallList() {

    const [isEmpty, setIsEmpty] = useState(true);

    if (isEmpty) {
        return <EmptyCall />
    }

    return (
        <Animated.View style={styles.container}
            entering={FadeInUp.duration(300).springify()}
        >
            <FlatList
                data={callListing}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.cardrow}
                        onPress={() => router.push('/chatPage/CallUserHistory')}
                    >
                        <View style={styles.cardLeftRow}>
                            <Image source={item.img} resizeMode='contain' style={{ width: wp(14), height: hp(8) }} />
                            <View>
                                <Text style={styles.nameStyle}>{item.name}</Text>
                                <View style={styles.statusRow}>
                                    <Image source={item.statusicon} resizeMode='contain' style={{ width: wp(4.5) }} />
                                    <Text style={styles.statusStyle}>{item.status}</Text>
                                    <View style={styles.statusSeparator} />
                                    <Text style={styles.dateStyle} >{item.date}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.cardRightRow}>
                            <Link href={'/chatPage/CallCustomer'} asChild>
                                <TouchableOpacity>
                                    <Feather name="phone" size={hp(2.5)} color={'#0A5CA8'} />
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </TouchableOpacity>
                )}
            />
            {/* <FloatButton /> */}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(5),
    },
    cardrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp(2),
    },
    cardLeftRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(5),
        width: wp(70),
    },
    cardRightRow: {
        marginRight: wp(2),
    },
    nameStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
    },
    statusStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: "#616161"
    },
    dateStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: "#616161"
    },
    statusSeparator: {
        height: hp(1.6), width: 1.5, borderRadius: 4, backgroundColor: '#616161'
    },
    statusRow: {
        flexDirection: 'row', alignItems: 'center', gap: wp(2),
    }

})