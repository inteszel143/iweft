import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { invite } from '@/constants/profile/data';

export default function InviteFriends() {

    const [selectedItems, setSelectedItems] = useState([]);


    const handleItemPress = (item: any) => {
        const index = selectedItems.indexOf(item);
        if (index === -1) {
            setSelectedItems([...selectedItems, item]);
        } else {
            const updatedItems = [...selectedItems];
            updatedItems.splice(index, 1);
            setSelectedItems(updatedItems);
        }
    };


    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Invite Friends</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>



            <View style={styles.rowStyle}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: hp(14) }}
                    data={invite}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.cardrow}>
                            <View style={styles.cardLeftRow}>
                                <Image source={item.img} resizeMode='contain' style={{ width: wp(14), height: hp(8) }} />
                                <View>
                                    <Text style={styles.nameStyle} >{item.name}</Text>
                                    <Text style={styles.messageStyle}>{item.phone}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                {
                                    selectedItems.includes(item) ? <TouchableOpacity style={[styles.btnStyle, { borderWidth: 1, borderColor: '#0A5CA8' }]}
                                        onPress={() => handleItemPress(item)}
                                    >
                                        <Text style={[styles.btnText, { color: '#0A5CA8', }]}>Invited</Text>
                                    </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={[styles.btnStyle, { backgroundColor: '#0A5CA8' }]}
                                            onPress={() => handleItemPress(item)}
                                        >
                                            <Text style={[styles.btnText, { color: 'white', }]}>Invite</Text>
                                        </TouchableOpacity>
                                }

                            </View>
                        </View>
                    )
                    }
                />
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
    rowStyle: {
        paddingHorizontal: wp(5.5)
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

    btnStyle: {
        width: wp(20),
        height: hp(4),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(4),
    },
    btnText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8),
    },
})