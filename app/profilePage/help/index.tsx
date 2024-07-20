import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FAQ } from '@/constants/profile/data';
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
            </ScrollView>

            <View>
                
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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