import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { Switch } from 'react-native-switch';
export default function Notification() {

    const [general, setGeneral] = useState(true);
    const [sound, setSound] = useState(true);
    const [vibrate, setVibrate] = useState(false);
    const [specialOffers, setSpecialOffers] = useState(true);
    const [promo, setPromo] = useState(false);
    const [payments, setPayments] = useState(true);
    const [cashback, setCashback] = useState(false);
    const [updates, setUpdates] = useState(true);
    const [services, setServices] = useState(false);
    const [tips, setTips] = useState(false);

    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Notification</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <ScrollView>
                <View style={styles.containerStyle}>



                    <View style={styles.rowStyle}>
                        <Text style={styles.rowText}>General Notification</Text>
                        <Switch
                            value={general}
                            onValueChange={(val) => setGeneral(val)}
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
                        <Text style={styles.rowText}>Sound</Text>
                        <Switch
                            value={sound}
                            onValueChange={(val) => setSound(val)}
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
                        <Text style={styles.rowText}>Vibrate</Text>
                        <Switch
                            value={vibrate}
                            onValueChange={(val) => setVibrate(val)}
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
                        <Text style={styles.rowText}>Special Offers</Text>
                        <Switch
                            value={specialOffers}
                            onValueChange={(val) => setSpecialOffers(val)}
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
                        <Text style={styles.rowText}>Promo & Discount</Text>
                        <Switch
                            value={promo}
                            onValueChange={(val) => setPromo(val)}
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
                        <Text style={styles.rowText}>Payments</Text>
                        <Switch
                            value={payments}
                            onValueChange={(val) => setPayments(val)}
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
                        <Text style={styles.rowText}>Cashback</Text>
                        <Switch
                            value={cashback}
                            onValueChange={(val) => setCashback(val)}
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
                        <Text style={styles.rowText}>App Updates</Text>
                        <Switch
                            value={updates}
                            onValueChange={(val) => setUpdates(val)}
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
                        <Text style={styles.rowText}>New Service Available</Text>
                        <Switch
                            value={services}
                            onValueChange={(val) => setServices(val)}
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
                        <Text style={styles.rowText}>New Tips Available</Text>
                        <Switch
                            value={tips}
                            onValueChange={(val) => setTips(val)}
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
            </ScrollView>



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
        marginBottom: hp(4.5)
    },
    rowText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2.2),
        color: "#424242"
    }
})