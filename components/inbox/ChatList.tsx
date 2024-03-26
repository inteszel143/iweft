import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { chatListing } from '@/constants/chat/data'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import FloatButton from './FloatButton';
export default function ChatList() {
    return (
        <Animated.View style={styles.container}
            entering={FadeInUp.duration(300).springify()}
        >
            <FlatList
                data={chatListing}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Link href={'/BookingChat'} asChild>
                        <TouchableOpacity style={styles.cardrow}>
                            <View style={styles.cardLeftRow}>
                                <Image source={item.img} resizeMode='contain' style={{ width: wp(14), height: hp(8) }} />
                                <View>
                                    <Text style={styles.nameStyle} >{item.name}</Text>
                                    <Text style={styles.messageStyle}>{item.message}</Text>
                                </View>
                            </View>
                            <View style={{ height: hp(6), alignItems: 'flex-end' }}>
                                {
                                    item.unread != 0 && <LinearGradient
                                        style={styles.unreadcircle}
                                        colors={['#548DC2', '#0A5CA8']}>
                                        <Text style={styles.unreadText}>{item.unread}</Text>
                                    </LinearGradient>
                                }
                                <Text style={styles.timeStyle}>{item.time}</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                )
                }
            />
            <FloatButton />
        </Animated.View >
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp(5),
    },
    cardrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp(1.5),
    },
    cardLeftRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        width: wp(60),
    },
    nameStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
    },
    messageStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: "#616161",
        marginTop: hp(1),
    },
    unreadcircle: {
        width: wp(6),
        height: wp(6),
        borderRadius: wp(5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    unreadText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.7),
        color: 'white',
    },
    timeStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        marginTop: hp(1),
        color: "#616161"
    }

})