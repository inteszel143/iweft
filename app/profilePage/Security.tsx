import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import { Switch } from 'react-native-switch';
import { Feather } from '@expo/vector-icons';
export default function Security() {

    const [remeber, setRemember] = useState(true);
    const [face, setFace] = useState(false);
    const [biometric, setBiometric] = useState(false);

    return (
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
                <Link href={'/profilePage/ChangePin'} asChild>
                    <TouchableOpacity style={styles.footerBtn}>
                        <Text style={styles.footerText}>Change PIN</Text>
                    </TouchableOpacity>
                </Link>
                <Link href={'/profilePage/ChangePassword'} asChild>
                    <TouchableOpacity style={styles.footerBtn}>
                        <Text style={styles.footerText}>Change Password</Text>
                    </TouchableOpacity>
                </Link>
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



    footer: {
        alignItems: 'center'
    },

    footerBtn: {
        width: wp(90),
        height: hp(7),
        backgroundColor: '#DAE7F2',
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(3)
    },
    footerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: '#0A5CA8'
    }


})