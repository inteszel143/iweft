import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router, useLocalSearchParams } from 'expo-router';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import MapView, { Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import useStoreBooking from '@/store/useStoreBooking';
export default function BookingAddress() {
    const { setAddress, setLatitude,
        setLongitude } = useStoreBooking();
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
    const snapPoints = useMemo(() => ['35%', '64%'], []);
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
        const address = nameAddress;
        const latitude = lat;
        const longitude = long;
        setAddress(address as string);
        setLatitude(latitude as string);
        setLongitude(longitude as string);
        router.push('homePage/services/DriverInstruction');
        // router.push({
        //     pathname: 'homePage/services/DriverInstruction',
        //     params: { service, service_name, itemData, total, pick_up_date_time, delivery_date_time, address, latitude, longitude, base_price }
        // });
    }

    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Your Address/Location</Text>
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
                    <Image source={require('@/assets/temp/mapmarker.png')} resizeMode='contain' style={{ width: wp(10) }} />
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
                    <Text style={styles.bottomSheetTitle}>Location Details</Text>
                    <View style={styles.BottomSheetSeparator} />
                    <View>
                        <Text style={styles.adddressTitle}>Address</Text>
                        <View style={styles.textField}>
                            <Text style={styles.address}>{nameAddress}</Text>
                            <Fontisto name='map-marker-alt' size={hp(2)} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.adddressTitle}>House/ Apartment number</Text>
                        <View style={styles.textField}>
                            <Text style={styles.address}>{street}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.adddressTitle}>City</Text>
                        <View style={styles.textField}>
                            <Text style={styles.address}>{city}</Text>
                        </View>
                    </View>
                </BottomSheetView>
            </BottomSheet>
            <View style={styles.footer}>
                <TouchableOpacity style={defaultStyles.footerBtn}
                    onPress={onSubmit}
                >
                    {btnLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={styles.sheetText}>Continue</Text>}
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
        top: hp(15.5),
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bottomSheetTitle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.5)
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