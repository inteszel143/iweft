import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeOut, FadeOutUp, FadingTransition, JumpingTransition, Layout, withSpring } from 'react-native-reanimated';
import { upcoming } from '@/constants/booking/data';
import { Link } from 'expo-router';


export default function Page() {

    const [isHiding, setIsHiding] = useState(0);

    const toggleHide = (index: any) => {
        setIsHiding(index);
    };
    const toggleClose = () => {
        setIsHiding(0);
    };



    return (
        <View style={styles.container}>

            <FlatList
                data={upcoming}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Animated.View style={styles.card}
                        entering={FadeInUp.duration(300).springify()}
                    >



                        <Link href={'/bookingPage/BookingSummary'} style={styles.row} asChild>
                            <TouchableOpacity>
                                <View style={styles.rowLeft}>
                                    <View>
                                        <Image
                                            source={item.img}
                                            resizeMode='contain'
                                            style={styles.imageStyle}
                                        />
                                    </View>
                                    <View style={styles.leftInner}>
                                        <Text style={styles.titleStyle} >{item.title}</Text>
                                        <Text style={styles.subTitle} >{item.sub}</Text>
                                        <View style={styles.indicator}>
                                            <Text style={styles.upcoming}>Cancelled</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.btnStyle}>
                                        <Ionicons name='chatbubble-ellipses' size={hp(2.5)} color={'#0a5ca8'} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </Link>





                        <View style={styles.separator} />


                        {
                            isHiding === item.id && <Animated.View
                                entering={FadeInUp.duration(300).springify()}
                                style={{ marginTop: hp(2) }}>
                                <View style={styles.mapRow}>
                                    <Text style={styles.mapLabel} >Date & Time</Text>
                                    <Text style={styles.mapLabelValue}>Dec 23. 2024 | 10:00 - 12:00 AM</Text>
                                </View>
                                <View style={[styles.mapRow, { marginTop: hp(2) }]}>
                                    <Text style={styles.mapLabel} >Location</Text>
                                    <Text style={styles.mapLabelValue}>267 New Avenue Park, New York</Text>
                                </View>

                                <View>
                                    <Image
                                        source={require('@/assets/temp/maps.png')}
                                        resizeMode='contain'
                                        style={styles.map}
                                    />
                                </View>


                                <Link href={'/bookingPage/Ereceipt'} style={[styles.mapBtn, { backgroundColor: "#0a5ca8" }]} asChild>
                                    <TouchableOpacity >
                                        <Text style={[styles.mapText, { color: 'white' }]}>View E-Receipt</Text>
                                    </TouchableOpacity>
                                </Link>



                                <TouchableOpacity style={styles.footerBtn} onPress={() => toggleClose()}>
                                    <Ionicons name='chevron-up-outline' size={hp(2.5)} />
                                </TouchableOpacity>

                            </Animated.View>
                        }


                        {
                            isHiding != item.id ? <TouchableOpacity style={styles.footerBtn} onPress={() => toggleHide(item.id)}>
                                <Ionicons name='chevron-down-outline' size={hp(2.5)} />
                            </TouchableOpacity>
                                :
                                <></>
                        }



                    </Animated.View>
                )}
            />



        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
    },
    card: {
        width: wp(90),
        paddingVertical: hp(1),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: hp(2),
        borderRadius: wp(7),
        paddingHorizontal: wp(4),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(2)
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnStyle: {
        width: wp(14),
        height: wp(14),
        borderRadius: wp(7),
        backgroundColor: "#DAE7F2",
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        width: wp(20),
        height: hp(10)
    },
    leftInner: {
        marginLeft: wp(4)
    },
    titleStyle: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2)
    },
    subTitle: {
        paddingVertical: hp(2),
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: 'gray',
    },
    indicator: {
        width: wp(26),
        height: hp(4),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F75555',
        borderRadius: wp(2)
    },
    upcoming: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.6),
        color: 'white'
    },
    separator: {
        height: 1,
        backgroundColor: "#EEEEEE",
        marginHorizontal: wp(2),
        marginTop: hp(3)
    },
    footerBtn: {
        height: hp(4),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(1)
    },
    mapRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mapLabel: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        color: '#616161',
    },
    mapLabelValue: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8)
    },
    map: {
        width: wp(82),
        height: hp(30)
    },
    mapBtn: {
        width: wp(80),
        height: hp(4.5),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(4),
        alignSelf: 'center'
    },
    mapText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8)
    }
})