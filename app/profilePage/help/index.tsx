import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FAQ } from '@/constants/profile/data';
import { FontAwesome } from '@expo/vector-icons';
export default function index() {

    const { t } = useTranslation();
    const current = getCurrentLanguage();
    const [onFocused, setOnFocused] = useState(false);
    const [topSelect, setTopSelect] = useState(0);

    return (
        <View style={styles.container}>

            <ScrollView>
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: hp(3) }}>
                        {
                            FAQ.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} style={topSelect === index ? [styles.scrollStyle, { backgroundColor: '#0A5CA8' }] : [styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}
                                        onPress={() => setTopSelect(index)}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2) }}>
                                            <Text style={[styles.scrollText, { color: topSelect == index ? "white" : "#0A5CA8" }]}>{item?.label}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>



                <View style={[styles.searchContainer, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', borderColor: onFocused ? "#0a5ca8" : "#F5F5F5" }]}>
                    <View style={[styles.searchLeft, { flexDirection: current === 'ar' ? 'row-reverse' : 'row', }]}>
                        <Image source={require('@/assets/icons/search.png')} resizeMode='contain' style={{ width: wp(6.5), tintColor: onFocused ? "#0a5ca8" : "#BDBDBD" }} />
                        <TextInput placeholder={t('Seach')}
                            placeholderTextColor={'#d5d5d5'}
                            style={{ flex: 1, fontFamily: 'UrbanistSemiBold', fontSize: hp(1.9) }}
                            onFocus={() => {
                                setOnFocused(true);
                            }}
                            onBlur={() => {
                                setOnFocused(false);
                            }}
                        />
                    </View>
                    <Image source={require('@/assets/icons/filter.png')} resizeMode='contain' style={{ width: wp(6.5) }} />
                </View>



                <View style={{ marginTop: hp(6) }}>
                    <View>
                        <Image source={require('@/assets/icons/under.png')} resizeMode='contain' style={{ width: wp(100), height: hp(20) }} />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Sorry, this page is currently under construction.</Text>
                    </View>
                </View>


            </ScrollView>




        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    textStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
        textAlign: 'center',
        marginTop: hp(4),
        paddingHorizontal: wp(5)
    },
    searchContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
        height: hp(7),
        width: wp(91),
        borderWidth: 1,
        backgroundColor: "#F5F5F5",
        marginTop: hp(2.5),
        borderRadius: 12,
        alignSelf: 'center'
    },
    searchLeft: {
        alignItems: 'center',
        gap: wp(4),
        backgroundColor: 'transparent',
        width: wp(60)
    },


    cardStyle: {
        marginTop: hp(2.5),
        backgroundColor: 'white',
        width: wp(90),
        height: Platform.OS === 'android' ? hp(15) : hp(13),
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: wp(5),
        paddingHorizontal: wp(7),
        shadowColor: "#DADADA",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    toprow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },


    scrollStyle: {
        height: hp(4),
        paddingHorizontal: wp(5),
        borderRadius: wp(4),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp(3)
    },
    scrollText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8)
    },


})