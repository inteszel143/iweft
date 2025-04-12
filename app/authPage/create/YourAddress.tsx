import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router, useLocalSearchParams } from 'expo-router';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import MapView, { Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import { postPhoneVerificationCode } from '@/apis/auth';
import { useTranslation } from 'react-i18next';

export default function YourAddress() {
    const { image, fullName, nickName, dob, email, password, phone, address, valueNumber } = useLocalSearchParams();
    const { t } = useTranslation();
    const [errorMsg, setErrorMsg] = useState("");
    const [nameAddress, setNameAddress] = useState<any>();
    const [city, setCity] = useState<any>();
    const [street, setStreet] = useState<any>();
    const [lat, setLat] = useState<any>("");
    const [long, setLong] = useState<any>("");
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
        })();

    }, []);


    // bottomsheet
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['36%', '66%'], []);
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);

    const INITIAL_REGION = {
        latitude: 24.457908598236774,
        longitude: 54.380385652184486,
        latitudeDelta: 0.0034042830388827383,
        longitudeDelta: 0.005005337297916412,
    };
    const onRegionChange = async (region: Region) => {
        setLat(region.latitude);
        setLong(region.longitude);
        const userAddress = await Location.reverseGeocodeAsync({
            latitude: region.latitude,
            longitude: region.longitude
        });
        setNameAddress(userAddress[0].district + ', ' + userAddress[0].street + ', ' + userAddress[0].city + ', ' + userAddress[0].country);
        setStreet(userAddress[0].street);
        setCity(userAddress[0].district);
    };

    const onSubmit = async () => {
        setBtnLoading(true);
        try {
            // await postPhoneVerificationCode(phone as string);
            setTimeout(() => {
                router.push({
                    pathname: '/authPage/create/ProfileOverview',
                    params: {
                        image: image,
                        fullName: fullName,
                        nickName: nickName,
                        dob: dob,
                        email: email,
                        password: password,
                        phone: phone,
                        nameAddress: nameAddress,
                        street: street,
                        city: city,
                        latitude: lat,
                        longitude: long,
                        valNumber: valueNumber,
                    }
                });
                setBtnLoading(false);
            }, 2000);
        } catch (error) {
            console.log(error);
            setBtnLoading(false);
        }
    };


    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >{t('Your Address/Location')}</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={{ height: Platform.OS === 'ios' ? hp(53) : hp(55) }}>
                <MapView
                    style={StyleSheet.absoluteFill}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    showsMyLocationButton
                    loadingEnabled={true}
                    initialRegion={INITIAL_REGION}
                    onRegionChangeComplete={onRegionChange}
                />
                <View style={styles.markerStyle}>
                    <View style={{
                        position: 'absolute',
                        top: hp(2.4),
                        alignSelf: 'center',
                    }}>
                        <Fontisto name='map-marker-alt' size={hp(3)} color={"#548DC2"} />
                    </View>
                    <View style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: wp(50),
                        padding: 3,
                    }}>
                        <Image
                            source={{ uri: image as string }}
                            resizeMode='cover'
                            style={{
                                width: wp(6),
                                height: wp(6),
                                borderRadius: wp(50)
                            }} />
                    </View>
                </View>
            </View>



            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                handleIndicatorStyle={{ backgroundColor: '#DADADA' }}
                onChange={handleSheetChanges}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text style={styles.bottomSheetTitle}>{t('Location Details')}</Text>
                    <View style={styles.BottomSheetSeparator} />
                    <View>
                        <Text style={styles.adddressTitle}>{t('Address')}</Text>
                        <View style={styles.textField}>
                            <Text style={styles.address}>{nameAddress}</Text>
                            <Fontisto name='map-marker-alt' size={hp(2)} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.adddressTitle}>{t('House/ Apartment number')}</Text>
                        <View style={styles.textField}>
                            <Text style={styles.address}>{street}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.adddressTitle}>{t('City')}</Text>
                        <View style={styles.textField}>
                            <Text style={styles.address}>{city}</Text>
                        </View>
                    </View>
                </BottomSheetView>
            </BottomSheet>
            <View style={styles.footer}>
                <TouchableOpacity style={defaultStyles.footerBtn} onPress={onSubmit}>
                    {btnLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={styles.sheetText}>{t('Continue')}</Text>}
                </TouchableOpacity>
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
    map: {
        width: '100%',
        height: '100%',
    },

    adddressTitle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
        marginTop: hp(3)
    },

    textField: {
        width: wp(90),
        minHeight: hp(7),
        maxHeight: hp(9),
        borderRadius: wp(4),
        backgroundColor: "#FAFAFA",
        paddingHorizontal: wp(5),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(2)
    },
    address: {
        flex: 1,
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8)
    },

    markerStyle: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        top: hp(22),
        backgroundColor: "#548DC2",
        borderRadius: wp(50),
        width: wp(10),
        height: wp(10),
    },









    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bottomSheetTitle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.6),
        marginTop: hp(2)
    },
    BottomSheetSeparator: {
        height: 1,
        backgroundColor: "#EEEEEE",
        width: wp(82),
        marginTop: hp(2.2)
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(10),
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    sheetBtn: {
        width: wp(90),
        height: hp(6),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0A5CA8",
        borderRadius: wp(4),
    },
    sheetText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: '#FFFFFF'
    }
})