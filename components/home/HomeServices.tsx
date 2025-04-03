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
    const { data, isPending } = useHomeServices(isFocused);
    const { t } = useTranslation();
    const current = getCurrentLanguage();

    const list1 = require('@/assets/temp/services/list1.png');
    const list2 = require('@/assets/temp/services/list2.png');
    const list3 = require('@/assets/temp/services/list3.png');
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
                            data?.slice(0, 3)?.map((item: any, index: any) => {
                                return (
                                    <TouchableOpacity key={index}
                                        onPress={() => router.push({
                                            pathname: 'homePage/services/ServicesScreen',
                                            params: { serviceId: item?._id },
                                        })}
                                        style={{ alignItems: 'center' }}
                                    >
                                        <View style={styles.circleImage}>
                                            <View
                                                style={{
                                                    width: wp(16),
                                                    height: wp(16),
                                                    borderRadius: wp(50),
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <Image
                                                    source={item?.title === "Wash & Folds" ? list3 : item?.title === "Clean & Press" ? list1 : list2}
                                                    resizeMode='cover'
                                                    style={styles.imageStyle}
                                                />
                                            </View>
                                        </View>
                                        <Text style={styles.titleStyle} >{item?.title.replace(" Services", "")}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        <Link href={'/homePage/services/AllServices'} asChild>
                            <TouchableOpacity
                                style={{ alignItems: 'center' }}
                            >
                                <View style={styles.seeallStyle}>
                                    {current === 'ar' ? <Ionicons name='arrow-back' size={hp(3)} color={"#6F767E"} />
                                        :
                                        <Ionicons name='arrow-forward' size={hp(3)} color={"#6F767E"} />}
                                </View>
                                <Text style={styles.titleStyle} >See All</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
            }
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
        width: wp(15),
        height: hp(7.5),
    },
    seeallStyle: {
        width: wp(19),
        height: wp(19),
        borderWidth: 0.5,
        borderColor: "#DADADA",
        borderRadius: wp(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F8F8F8",
    },
    titleStyle: {
        fontFamily: "UrbanistSemiBold",
        fontSize: hp(1.7),
        marginTop: hp(1.5)
    },
    circleImage: {
        width: wp(21),
        height: wp(21),
        borderRadius: wp(12),
        backgroundColor: "#F8F8F8",
        justifyContent: 'center',
        alignItems: 'center',
    }
})