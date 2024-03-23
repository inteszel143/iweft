import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
export default function LaundryBundles() {

    const data = [
        {
            id: 1,
            name: "Bedding Set",
            img: require('@/assets/temp/laundryBundle/laundry1.png')
        },
        {
            id: 2,
            name: "Suit Care",
            img: require('@/assets/temp/laundryBundle/laundry1.png')
        },
        {
            id: 3,
            name: "Bedding Set",
            img: require('@/assets/temp/laundryBundle/laundry1.png')
        }
    ]

    return (
        <View style={styles.container}>

            <View style={styles.header} >
                <View style={styles.headerRight}>
                    <View style={styles.indicator} />
                    <Text style={styles.headerText}>Laundry Bundles</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.seeAllText} >See all</Text>
                        <MaterialIcons name='keyboard-arrow-right' size={hp(2.5)} color={"#6F767E"} />
                    </TouchableOpacity>
                </View>
            </View>


            <View>
                <FlatList
                    data={data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{ paddingLeft: wp(2), alignItems: 'center' }}>
                                <Image
                                    source={item.img}
                                    resizeMode='contain'
                                    style={{
                                        width: wp(40),
                                        height: hp(24),
                                    }}
                                />
                                <Text style={styles.bundleText}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }}

                />
            </View>
            <View style={{ height: 0.7, backgroundColor: "#DADADA", marginTop: hp(6), marginHorizontal: wp(4) }} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp(4)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5)
    },
    indicator: {
        height: hp(3),
        borderRadius: 10,
        width: wp(1.4),
        backgroundColor: "#0a5ca8",
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
    },
    headerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.4),
    },
    seeAllText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.6),
        color: "#6F767E"
    },
    btnStyle: {
        width: wp(23),
        height: hp(4.5),
        borderRadius: wp(10),
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: "#DADADA",
    },
    bundleText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2)
    }
})