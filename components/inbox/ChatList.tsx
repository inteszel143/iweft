import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { chatListing } from '@/constants/chat/data'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function ChatList() {
    return (
        <View style={styles.container}>
            <FlatList
                data={chatListing}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cardrow}>
                        <View style={styles.cardLeftRow}>
                            <Image source={item.img} resizeMode='contain' style={{ width: wp(14), height: hp(8) }} />
                            <View>
                                <Text>{item.name}</Text>
                                <Text>{item.message}</Text>
                            </View>
                        </View>

                        <View style={{ backgroundColor: 'gray', height: hp(6) }}>
                            <Text>{item.unread}</Text>
                            <Text>{item.time}</Text>
                        </View>

                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp(5),
    },
    cardrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardLeftRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        width: wp(60),
    }

})