import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, FlatList, Platform } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import CategoryModal from '@/components/home/items/CategoryModal';
import RangeModal from '@/components/home/items/RangeModal';

export default function FilterPage() {
    const modalARef = useRef<BottomSheetModal>(null);
    const modalBRef = useRef<BottomSheetModal>(null);
    const openModalA = () => {
        modalARef.current?.present();
    };
    const openModalB = () => {
        modalBRef.current?.present();
    };

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>

                <View style={styles.Headercontainer}>
                    <View style={styles.innerContainer}>

                        <View style={styles.headerLeft}>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                            </TouchableOpacity>
                            <Text style={styles.bookingText} >Filters</Text>
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity>
                                <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(14) }}>
                    <View style={{ marginTop: hp(2) }}>
                        <Text style={[styles.topText, { paddingHorizontal: wp(5) }]}>Enter the amount of items or bags you need.</Text>

                        <View style={styles.viewTop}>
                            <Text style={styles.topTitle}>Category</Text>
                            <TouchableOpacity style={styles.textField} onPress={openModalA}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={styles.textStyle}>Clothing</Text>
                                    <FontAwesome name='caret-right' size={hp(2.5)} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewTop}>
                            <Text style={styles.topTitle}>Subcategory</Text>
                            <TouchableOpacity style={styles.textField}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={styles.textStyle}>Womens</Text>
                                    <FontAwesome name='caret-right' size={hp(2.5)} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewTop}>
                            <Text style={styles.topTitle}>Price</Text>
                            <TouchableOpacity style={styles.textField} onPress={openModalB}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={styles.textStyle}>1 AED - 20 AED</Text>
                                    <FontAwesome name='caret-right' size={hp(2.5)} />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={defaultStyles.footerBtn}>
                        <Text style={defaultStyles.footerText}>Apply Filter</Text>
                    </TouchableOpacity>
                </View>

                <CategoryModal modalRef={modalARef} />
                <RangeModal modalRef={modalBRef} />


            </View>
        </BottomSheetModalProvider>
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


    topText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2)
    },
    viewTop: {
        marginTop: hp(4), paddingHorizontal: wp(5)
    },
    topTitle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
    },
    textField: {
        width: wp(90),
        height: hp(7),
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        paddingHorizontal: wp(6),
        marginTop: hp(2),
        borderRadius: wp(4),
    },
    textStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.9)
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(11),
        backgroundColor: 'white',
        borderTopRightRadius: wp(4),
        borderTopLeftRadius: wp(4),
        alignItems: 'center',
    },

})