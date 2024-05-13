import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useHomeServices } from '@/query/homeQuery';
export default function HomeServices() {

    const { data } = useHomeServices();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.specialText}>Services</Text>
            </View>
            <View style={styles.listStyle}>
                {
                    data?.map((item: any, index: any) => {
                        return (
                            <TouchableOpacity key={index}>
                                <Image
                                    source={{ uri: item?.image }}
                                    resizeMode='contain'
                                    style={styles.imageStyle}
                                />
                                <Text style={styles.titleStyle} >{item?.title.replace(" Services", "")}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
                <Link href={'/homePage/services/AllServices'} asChild>
                    <TouchableOpacity>
                        <View style={styles.seeallStyle}>
                            <Ionicons name='arrow-forward' size={hp(3)} color={"#6F767E"} />
                        </View>
                    </TouchableOpacity>
                </Link>
            </View>
            {/* <Link href={'/homePage/services/ServicesScreen'} asChild>
                <TouchableOpacity>
                    <Image source={require('@/assets/temp/services/list1.png')} resizeMode='contain' style={styles.imageStyle} />
                </TouchableOpacity>
            </Link> */}


            <View style={{ height: 0.7, backgroundColor: "#DADADA", marginTop: hp(4), marginHorizontal: wp(4) }} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: hp(2.5),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
    },
    specialText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.4),
    },
    listStyle: {
        marginTop: hp(3),
        paddingHorizontal: wp(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    imageStyle: {
        width: wp(20),
        height: hp(10)
    },
    seeallStyle: {
        width: wp(18),
        height: wp(18),
        borderRadius: wp(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: "#DADADA",
        backgroundColor: "#FAFAFA"
    },
    titleStyle: {
        fontFamily: "UrbanistMedium",
        fontSize: hp(1.8),
    }
})