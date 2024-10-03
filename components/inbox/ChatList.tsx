import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { chatListing } from '@/constants/chat/data'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import FloatButton from './FloatButton';
import { useIsFocused } from '@react-navigation/native';
import { useGetMessageInbox } from '@/query/message';
import EmptyChats from './EmptyChats';
import InboxSkeleton from '../skeleton/InboxSkeleton';
import { messageTime } from '@/utils/format';
import { useQueryClient } from '@tanstack/react-query';
export default function ChatList() {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const { data, isPending } = useGetMessageInbox(isFocused);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        queryClient.invalidateQueries({ queryKey: ["inbox"] });
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    if (isPending) {
        return <InboxSkeleton />
    }

    if (!data || data == 0) {
        return <EmptyChats />
    };

    return (
        <Animated.View style={styles.container}
            entering={FadeInUp.duration(300).springify()}
        >
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#DADADA"
                    />
                }
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.cardrow}
                        onPress={() => router.push({
                            pathname: '/chatPage/ChatInboxScreen',
                            params: { convoId: item?._id, receiverId: item?.receiver?._id }
                        })}
                    >
                        <View style={styles.cardLeftRow}>
                            {
                                item?.sender_model === "Admin" ? <Image source={{ uri: item?.sender?.profile_picture }}
                                    resizeMode='cover'
                                    style={{ width: wp(14), height: wp(14), borderRadius: wp(7) }} />
                                    :
                                    <Image source={{ uri: item?.receiver?.profile_picture }}
                                        resizeMode='cover'
                                        style={{ width: wp(14), height: wp(14), borderRadius: wp(7) }} />
                            }
                            <View>
                                {item?.receiver_model === "Admin" ? <Text style={styles.nameStyle} >{item?.receiver?.fullname}</Text> : <Text style={styles.nameStyle} >{item?.sender?.fullname}</Text>}
                                <Text style={styles.messageStyle}>{item?.latest_message?.text}</Text>
                            </View>
                        </View>
                        <View style={{ height: hp(6), alignItems: 'flex-end' }}>
                            {
                                item?.receiver_model === "Admin" || !item?.is_read && <LinearGradient
                                    style={styles.unreadcircle}
                                    colors={['#548DC2', '#0A5CA8']}>
                                    <Text style={styles.unreadText}>1</Text>
                                </LinearGradient>
                            }
                            <Text style={styles.timeStyle}>{messageTime(item?.updatedAt)}</Text>
                        </View>
                    </TouchableOpacity>
                )
                }
            />
            <FloatButton />
        </Animated.View >
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