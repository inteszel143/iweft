import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, I18nManager } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useLaundryBundles } from '@/query/homeQuery';
import HomeBundleSkeleton from '../skeleton/HomeBundleSkeleton';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
export default function LaundryBundles() {
    const isFocused = useIsFocused();
    const { data, isPending } = useLaundryBundles(isFocused);
    const { t } = useTranslation();
    const current = getCurrentLanguage();
    const sortedData = data?.slice().sort((a: any, b: any) => a.title.localeCompare(b.title));
    return (
        <View style={styles.container}>

            <View style={[styles.header, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]} >
                <View style={[styles.headerRight, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                    <View style={styles.indicator} />
                    <Text style={styles.headerText}>{t('Laundry Bundles')}</Text>
                </View>
                <View>
                    <Link href={'/homePage/budles/AllLaundryBundles'} asChild>
                        <TouchableOpacity style={styles.btnStyle}>
                            <Text style={styles.seeAllText} >See All</Text>
                            <MaterialIcons name='keyboard-arrow-right' size={hp(2.5)} color={"#6F767E"} />
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
            
            {
                isPending ? <HomeBundleSkeleton />
                    :
                    <View>
                        <FlatList
                            data={sortedData?.slice(0, 2)}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item?._id.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{ paddingLeft: wp(2), alignItems: 'center' }}
                                        onPress={() => router.push({
                                            pathname: '/homePage/budles/BuddleScreen',
                                            params: { bundleId: item?._id },
                                        })}
                                    >
                                        <Image
                                            source={{ uri: item?.image }}
                                            resizeMode='contain'
                                            style={{
                                                width: wp(40),
                                                height: hp(24),
                                                marginLeft: wp(3)
                                            }}
                                        />
                                        <Text style={styles.bundleText}>{item?.title.replace(" Bundle", "")}</Text>
                                    </TouchableOpacity>
                                )
                            }}

                        />
                    </View>
            }

            <View style={{ height: 0.7, backgroundColor: "#DADADA", marginTop: hp(6), marginHorizontal: wp(4) }} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp(4)
    },
    header: {
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
        alignItems: 'center',
        gap: wp(4),
    },
    headerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.5),
    },
    seeAllText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.7),
        color: "#6F767E"
    },
    btnStyle: {
        width: wp(25),
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