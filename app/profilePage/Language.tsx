import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import i18n from '@/services/i18n';
import { languageData } from '@/constants/profile/data';
import { setItem, setLanguage, getItem } from '@/storage/languageStorage';
import ChangeLanguage from '@/components/modal/ChangeLanguage';
export default function Language() {
    const { t } = useTranslation();
    const [selectedLang, setSelectedLang] = useState<string>('en');
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const fetchLanguage = async () => {
            const storedLanguage = await getItem('language');
            if (storedLanguage) {
                setSelectedLang(storedLanguage);
                i18n.changeLanguage(storedLanguage);
            }
        };
        fetchLanguage();
    }, []);

    const changeLanguage = async (lng: string, name: string) => {
        try {
            setShowModal(true);
            setItem('language', lng);
            setLanguage('languageName', name);
            i18n.changeLanguage(lng);
            setSelectedLang(lng);
        } catch (e) {
            console.error('Failed to save the language to storage', e);
        }
    };

    return (
        <View style={styles.container}>
            {showModal && <ChangeLanguage modalVisible={showModal} setModalVisible={setShowModal} />}
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >{t('Language')}</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={styles.containerStyle}>
                <Text style={styles.titleStyle}>Suggested</Text>
                <FlatList
                    data={languageData}
                    keyExtractor={(item) => item?.key}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.containerInner}
                            onPress={() => changeLanguage(item?.key, item?.name)}
                        >
                            <Text style={styles.textStyle}>{item?.name}</Text>
                            {selectedLang === item?.key ? <Ionicons name='radio-button-on' size={hp(3)} color={'#0A5CA8'} /> : <MaterialCommunityIcons name="circle-outline" size={hp(3)} color={'#0A5CA8'} />}
                        </TouchableOpacity>
                    )}
                />

                {/* <TouchableOpacity style={styles.containerInner}>
                    <Text style={styles.textStyle}>Arabic</Text>
                    <Ionicons name='radio-button-off' size={hp(3)} color={'#0A5CA8'} />
                </TouchableOpacity> */}


                {/* <View style={styles.separator} /> */}
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


    containerStyle: {
        paddingHorizontal: wp(6)
    },
    containerInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(5)
    },
    textStyle: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2.2)
    },
    titleStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.3),
        marginTop: hp(3)
    },
    separator: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginTop: hp(3)
    }
})