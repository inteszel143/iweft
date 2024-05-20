import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform, ActivityIndicator } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { Switch } from 'react-native-switch';
import { Feather } from '@expo/vector-icons';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { defaultStyles } from '@/constants/Styles';
import { TextInput } from 'react-native-gesture-handler';
import { deleteAccount } from '@/apis/auth';
import * as SecureStore from 'expo-secure-store';
export default function Security() {

    const [remeber, setRemember] = useState(true);
    const [face, setFace] = useState(false);
    const [biometric, setBiometric] = useState(false);

    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);


    // bottomSheet
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['36%', '36%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1}{...props} />, []
    )
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);

    const toggleDeleteAccount = async () => {
        setDeleteBtnLoading(true);
        setTimeout(async () => {
            try {
                await deleteAccount();
                await SecureStore.deleteItemAsync('accessToken');
                await SecureStore.deleteItemAsync('refreshToken');
                await SecureStore.deleteItemAsync('onboarded');
                router.push('/authPage/OnboardingScreen');
                setDeleteBtnLoading(false);
            } catch (error) {
                console.log(error);
            } finally {
                setDeleteBtnLoading(false);
            }
        }, 2000);
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
                            <Text style={styles.bookingText} >Security</Text>
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity>
                                <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <View style={styles.containerStyle}>
                    <View style={styles.rowStyle}>
                        <Text style={styles.rowText}>Remember me</Text>
                        <Switch
                            value={remeber}
                            onValueChange={(val) => setRemember(val)}
                            renderActiveText={false}
                            renderInActiveText={false}
                            circleSize={28}
                            circleBorderWidth={1}
                            circleBorderInactiveColor='#EEEEEE'
                            backgroundActive={'#0A5CA8'}
                            backgroundInactive='#EEEEEE'
                            circleActiveColor={'#FFFFFF'}
                            circleInActiveColor={'#FFFFFF'}
                            innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
                            switchBorderRadius={30}
                            barHeight={28}
                        />
                    </View>
                    <View style={styles.rowStyle}>
                        <Text style={styles.rowText}>Face ID</Text>
                        <Switch
                            value={face}
                            onValueChange={(val) => setFace(val)}
                            renderActiveText={false}
                            renderInActiveText={false}
                            circleSize={28}
                            circleBorderWidth={1}
                            circleBorderInactiveColor='#EEEEEE'
                            backgroundActive={'#0A5CA8'}
                            backgroundInactive='#EEEEEE'
                            circleActiveColor={'#FFFFFF'}
                            circleInActiveColor={'#FFFFFF'}
                            innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
                            switchBorderRadius={30}
                            barHeight={28}
                        />
                    </View>
                    <View style={styles.rowStyle}>
                        <Text style={styles.rowText}>Biometric ID</Text>
                        <Switch
                            value={biometric}
                            onValueChange={(val) => setBiometric(val)}
                            renderActiveText={false}
                            renderInActiveText={false}
                            circleSize={28}
                            circleBorderWidth={1}
                            circleBorderInactiveColor='#EEEEEE'
                            backgroundActive={'#0A5CA8'}
                            backgroundInactive='#EEEEEE'
                            circleActiveColor={'#FFFFFF'}
                            circleInActiveColor={'#FFFFFF'}
                            innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
                            switchBorderRadius={30}
                            barHeight={28}
                        />
                    </View>
                </View>

                <View style={{ paddingHorizontal: wp(5), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: hp(2) }}>
                    <Text style={styles.rowText}>Google Authenticator</Text>
                    <Feather name='chevron-right' size={hp(3)} color={'#0A5CA8'} />
                </View>


                <View style={styles.footer}>
                    <TouchableOpacity style={[styles.footerBtn, { backgroundColor: '#DAE7F2', }]}
                        onPress={() => router.push('/profilePage/ChangePin')}
                    >
                        <Text style={[styles.footerText, { color: '#0A5CA8' }]}>Change PIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.footerBtn, { backgroundColor: '#DAE7F2', }]}
                        onPress={() => router.push('/profilePage/ChangePassword')}
                    >
                        <Text style={[styles.footerText, { color: '#0A5CA8' }]}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.footerBtn, { backgroundColor: '#DAE7F2', }]}
                        onPress={() => router.push('/profilePage/ChangePhoneNumber')}
                    >
                        <Text style={[styles.footerText, { color: '#0A5CA8' }]}>Change Phone Number</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.footerBtn, { backgroundColor: '#F75555', }]}
                        onPress={handlePresentModalPress}
                    >
                        <Text style={[styles.footerText, { color: '#FFFFFF' }]}>Delete Account</Text>
                    </TouchableOpacity>
                </View>




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
                    <Text style={styles.bottomSheetIndi}>Deleting iWeft account</Text>
                    <View style={styles.BottomSheetSeparator} />
                    <View style={{ marginTop: hp(3), paddingHorizontal: wp(10) }}>
                        <Text style={styles.bottomSheetTitle}>Are you sure you want to delete your account?</Text>
                    </View>
                    <View style={styles.bottomBtnRow}>
                        <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: "#DAE7F2" }]}
                            onPress={() => bottomSheetModalRef.current?.close()}
                        >
                            <Text style={[styles.bottomText, { color: "#0A5CA8" }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.bottomBtn, { backgroundColor: "#0A5CA8" }]}
                            onPress={toggleDeleteAccount}
                        >
                            {deleteBtnLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={[styles.bottomText, { color: "white" }]}>Confirm</Text>}
                        </TouchableOpacity>
                    </View>

                </BottomSheetView>
            </BottomSheetModal>




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


    containerStyle: {
        paddingHorizontal: wp(6),
        marginTop: hp(3),
    },


    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(5)
    },
    rowText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2.3),
        color: "#424242"
    },

    bottomBtnRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3),
        marginTop: hp(3.5),
    },

    footer: {
        alignItems: 'center'
    },

    footerBtn: {
        width: wp(88),
        height: hp(7),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(3)
    },
    footerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
    },


    // modal

    contentContainer: {
        flex: 1,
        alignItems: 'center',

    },
    bottomSheetIndi: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.4),
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
        fontSize: Platform.OS === 'android' ? hp(2.6) : hp(2.4),
        textAlign: 'center'
    },
    bottomBtn: {
        width: wp(42),
        height: hp(6.6),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(10),
    },
    bottomText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
    }

})