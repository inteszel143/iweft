import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { itemList, items } from '@/constants/home/data';

export default function ItemPage() {


    // hook
    const [topSelect, setTopSelect] = useState(0);
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Items</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>




            <View style={styles.searchContainer}>
                <View style={styles.searchLeft}>
                    <Image source={require('@/assets/icons/search.png')} resizeMode='contain' style={{ width: wp(6.5) }} />
                    <TextInput placeholder='Seach' style={{ width: wp(60), fontFamily: 'UrbanistMedium', fontSize: hp(1.8) }} />
                </View>
                <Image source={require('@/assets/icons/filter.png')} resizeMode='contain' style={{ width: wp(6.5) }} />
            </View>




            <View style={{ marginTop: hp(1) }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: hp(2) }}>
                    {
                        items.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={topSelect == index ? [styles.scrollStyle, { backgroundColor: '#0A5CA8' }] : [styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}
                                    onPress={() => setTopSelect(index)}
                                >
                                    <Text style={topSelect == index ? [styles.scrollText, { color: 'white' }] : [styles.scrollText, { color: '#0A5CA8' }]}>{item.label}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>


            <View style={{ alignItems: 'center', paddingBottom: hp(40) }} >

                <FlatList
                    data={itemList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.icon}
                    renderItem={({ item }) => (
                        <View style={styles.cardStyle}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(5) }}>
                                    <Image source={item.icon} resizeMode='contain' style={{ width: wp(12), height: hp(5) }} />
                                    <View style={{ width: wp(32) }}>
                                        <Text style={styles.bundleText}>{item.label}</Text>
                                        <Text style={styles.price}>+ AED {item.price}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(3) }}>
                                    <TouchableOpacity style={styles.circle}
                                        onPress={decrement}
                                        disabled={count == 0 ? true : false}
                                    >
                                        <Text style={styles.btnText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantity}>{count}</Text>
                                    <TouchableOpacity style={styles.circle}
                                        onPress={increment}
                                    >
                                        <Text style={styles.btnText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}

                />
            </View>




            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerBtn} onPress={() => router.back()}>
                    <Text style={styles.footerText}>Continue AED 120</Text>
                </TouchableOpacity>
            </View>





        </View >
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



    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
        height: hp(7),
        width: wp(91),
        backgroundColor: "#F5F5F5",
        marginTop: hp(1.5),
        borderRadius: 12,
        alignSelf: 'center'
    },
    searchLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        backgroundColor: 'transparent'
    },



    scrollStyle: {
        paddingHorizontal: wp(5),
        height: hp(4),
        borderRadius: wp(4),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp(4),
    },
    scrollText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8)
    },


    cardStyle: {
        width: wp(90),
        height: hp(12),
        backgroundColor: '#FFFFFF',
        borderRadius: wp(4),
        marginTop: hp(2.5),
        justifyContent: 'center',
        paddingHorizontal: wp(5),
        shadowColor: "#DDDDDD",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },
    bundleText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2)
    },
    price: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.6),
        color: "#616161",
        marginTop: hp(1)
    },
    quantity: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2)
    },
    circle: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: '#DAE7F2',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
        color: '#0A5CA8'
    },




    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(14),
        backgroundColor: 'white',
        borderTopRightRadius: wp(4),
        borderTopLeftRadius: wp(4),
        alignItems: 'center'
    },

    footerBtn: {
        width: wp(90),
        height: hp(6.5),
        backgroundColor: "#0A5CA8",
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(2.5)
    },
    footerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: 'white'
    }

})