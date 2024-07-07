import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useHomeServices } from '@/query/homeQuery';
import { useIsFocused } from '@react-navigation/native';
import ServiceSkeleton from '../skeleton/ServiceSkeleton';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
export default function HomeServices() {
    const isFocused = useIsFocused();
    const { data, isPending } = useHomeServices(isFocused)
    const { t } = useTranslation();
    const current = getCurrentLanguage();
    return (
        <View style={styles.container}>
            <View style={[styles.header, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                <Text style={styles.specialText}>{t('Services')}</Text>
            </View>
            {
                isPending ? <ServiceSkeleton />
                    :
                    <View style={[styles.listStyle, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                        {
                            data?.map((item: any, index: any) => {
                                return (
                                    <TouchableOpacity key={index}
                                        onPress={() => router.push({
                                            pathname: 'homePage/services/ServicesScreen',
                                            params: { item: JSON.stringify(item) },
                                        })}
                                    >
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
                                    {current === 'ar' ? <Ionicons name='arrow-back' size={hp(3)} color={"#6F767E"} /> : <Ionicons name='arrow-forward' size={hp(3)} color={"#6F767E"} />}
                                </View>
                            </TouchableOpacity>
                        </Link>
                    </View>
            }
            {/* <Link href={'/homePage/services/ServicesScreen'} asChild>
                <TouchableOpacity>
                    <Image source={require('@/assets/temp/services/list1.png')} resizeMode='contain' style={styles.imageStyle} />
                </TouchableOpacity>
            </Link> */}


            <View style={{ height: 0.7, backgroundColor: "#DADADA", marginTop: hp(4), marginHorizontal: wp(4) }} />
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: hp(2.5),
    },
    header: {
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