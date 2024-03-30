import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import MapView, { Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';
export default function BookingAddress() {

    const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [mapLocation, setMapLocation] = useState([]);
    const [nameAddress, setNameAddress] = useState<any>();

    const [lat, setLat] = useState<any>("");
    const [long, setLong] = useState<any>("");


    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setLat(latitude);
            setLong(longitude)
        })();

    }, []);



    // bottomsheet
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['35%', '35%'], []);
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
        setMapLocation([region.latitude, region.longitude]);

        const userAddress = await Location.reverseGeocodeAsync({
            latitude: region.latitude,
            longitude: region.longitude
        });
        setNameAddress(userAddress[0].district + ', ' + userAddress[0].street + ', ' + userAddress[0].city + ', ' + userAddress[0].country);
    };


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
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={{ height: hp(60) }}>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    // showsUserLocation={true}
                    // showsMyLocationButton
                    loadingEnabled={true}
                    initialRegion={INITIAL_REGION}
                    region={{
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.1034042830388827383,
                        longitudeDelta: 0.105005337297916412,
                    }}
                    onRegionChangeComplete={onRegionChange}
                />
                <View style={styles.markerStyle}>
                    <Image source={require('@/assets/temp/mapmarker.png')} resizeMode='contain' style={{ width: wp(10) }} />
                </View>
            </View>



            <BottomSheet
                ref={bottomSheetRef}
                index={1}
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

                    <Link href={'/homePage/HomePaymentMethods'} asChild>
                        <TouchableOpacity style={styles.sheetBtn}>
                            <Text style={styles.sheetText}>Continue</Text>
                        </TouchableOpacity>
                    </Link>
                </BottomSheetView>
            </BottomSheet>



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
        fontSize: hp(2.4),
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
        top: hp(20)
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
    sheetBtn: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? hp(4) : hp(2),
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
        color: '#FFFFFF',
    }
})