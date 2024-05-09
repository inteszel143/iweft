import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import * as SecureStore from 'expo-secure-store';
import { logoutUser } from '@/apis/auth';
import { router } from 'expo-router';
export default function Logout() {

    const [btnLoading, setBtnLoading] = useState(false);
    // bottomSheet
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '26%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1}{...props} />, []
    )
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);
    // end bottomSheet

    const logout = async () => {
        setBtnLoading(true);
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        const response = await logoutUser(refreshToken as string);
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        setTimeout(() => {
            setBtnLoading(false);
            bottomSheetModalRef.current?.close();
            router.push('/authPage/SelectLoginPage');
        }, 2000);
    }


    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <TouchableOpacity style={styles.cardRow}
                    onPress={handlePresentModalPress}
                >
                    <View style={styles.leftRow}>
                        <Image source={require('@/assets/temp/profileicons/logout.jpg')} resizeMode='contain' style={{ width: wp(7) }} />
                        <Text style={styles.labelStyle}>Logout</Text>
                    </View>

                    <View style={styles.rightRow}>
                        <Feather name='chevron-right' size={hp(2.5)} color={'#212121'} />
                    </View>
                </TouchableOpacity>
            </View>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                enablePanDownToClose={true}
                handleIndicatorStyle={{ backgroundColor: '#DADADA' }}
                onChange={handleSheetChanges}

            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text style={styles.bottomSheetIndi}>Logout</Text>
                    <View style={styles.BottomSheetSeparator} />
                    <View style={{ marginTop: hp(3), paddingHorizontal: wp(10) }}>
                        <Text style={styles.bottomSheetTitle}>Are you sure you want to log out?</Text>
                    </View>

                    <View style={styles.bottomBtnRow}>
                        <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: "#DAE7F2" }]}
                            onPress={() => bottomSheetModalRef.current?.close()}
                        >
                            <Text style={[styles.bottomText, { color: "#0A5CA8" }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.bottomBtn, { backgroundColor: "#0A5CA8" }]}
                            onPress={logout}>
                            {btnLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={[styles.bottomText, { color: "white" }]}>Yes, Logout</Text>}
                        </TouchableOpacity>
                    </View>

                </BottomSheetView>
            </BottomSheetModal>


        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp(5),
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(0.5),
    },
    leftRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    labelStyle: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2.2)
    },
    rightRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    textValue: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2)
    },



    contentContainer: {
        flex: 1,
        alignItems: 'center',

    },
    bottomSheetIndi: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.6),
        color: "#F75555",
        marginTop: hp(2)
    },
    BottomSheetSeparator: {
        height: 1,
        backgroundColor: "#EEEEEE",
        width: wp(82),
        marginTop: hp(2.2)
    },
    bottomSheetTitle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
        textAlign: 'center'
    },
    bottomBtnRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3),
        marginTop: hp(3.5),
    },
    bottomBtn: {
        width: wp(40),
        height: hp(6),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(6),
    },
    bottomText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.9),
    }
})