import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import useStoreBooking from '@/store/useStoreBooking';
import { getDiscountedTotal, getPromoDiscount, getTotal } from '@/utils/format';

export default function DriverInstruction() {

    const { service_name, total, base_price, discount, setTotalAmount, setdiscountAmount, setDriverInstruction, setCollectionInstruction } = useStoreBooking();
    const [driverInstruc, setDriverInstruc] = useState<any>([]);
    const [collectInstruc, setCollectInstruc] = useState<any>([]);

    const topData = [
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "No Preferences"
        },
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "Ring the door bell"
        },
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "Knock on the door"
        },
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "Do not disturb, bags outside"
        },
    ];

    const [selected, setSelected] = useState<number[]>([]);
    const [deliverySelect, setDeliverySelect] = useState<number[]>([]);

    const botData = [
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "No Preferences"
        },
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "Ring the door bell"
        },
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "Knock on the door"
        },
        {
            image: require('@/assets/temp/services/plansa.jpg'),
            label: "Do not disturb, bags outside"
        },
    ];

    const handleSelect = (index: number) => {
        setSelected(prevSelected => {
            let newSelected: number[];
            if (prevSelected.includes(index)) {
                newSelected = prevSelected.filter(item => item !== index);
            } else {
                newSelected = [...prevSelected, index];
            }
            const selectedLabels = newSelected.map(i => topData[i].label);
            setCollectInstruc(selectedLabels);
            return newSelected;
        });
    };

    const handleSelectDelivery = (index: number) => {
        setDeliverySelect(prevSelected => {
            let newSelected: number[];
            if (prevSelected.includes(index)) {
                newSelected = prevSelected.filter(item => item !== index);
            } else {
                newSelected = [...prevSelected, index];
            }
            const selectedLabels = newSelected.map(i => botData[i].label);
            setDriverInstruc(selectedLabels);
            return newSelected;
        });
    }


    const toggleSubmit = async () => {
        if (!discount) {
            setTotalAmount(getTotal(base_price, total) as any);
            setDriverInstruction(driverInstruc);
            setCollectionInstruction(collectInstruc);
            router.push('homePage/HomePaymentMethods')
        } else {
            setTotalAmount(getDiscountedTotal(base_price, total, discount) as any);
            setDriverInstruction(driverInstruc);
            setCollectionInstruction(collectInstruc);
            setdiscountAmount(getPromoDiscount(base_price, total, discount) as string);
            router.push('homePage/HomePaymentMethods')
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Driver Instructions</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <ScrollView contentContainerStyle={{ paddingBottom: hp(16) }} >
                <View style={styles.containerStyle}>
                    <Text style={[styles.topText,]}>Do you have any collection instructions?</Text>


                    {/* card */}
                    {
                        topData?.map((item, index) => (
                            <TouchableOpacity style={styles.cardStyle} key={index}
                                onPress={() => handleSelect(index)}
                            >
                                <View style={styles.cardRow}>
                                    <Image source={item?.image} resizeMode='contain' style={{ width: wp(10) }} />
                                    <Text style={styles.titleStyle}>{item?.label}</Text>
                                    {selected.includes(index) ? <FontAwesome name='check-circle' size={hp(3)} color={'#0A5CA8'} /> : <FontAwesome name='circle-thin' size={hp(3)} color={'#0A5CA8'} />}
                                </View>
                            </TouchableOpacity>
                        ))
                    }



                    <Text style={[styles.topText, { marginTop: hp(4) }]}>Do you have any delivery instructions?</Text>
                    {/* card */}
                    {
                        botData?.map((item, index) => (
                            <TouchableOpacity style={styles.cardStyle} key={index}
                                onPress={() => handleSelectDelivery(index)}
                            >
                                <View style={styles.cardRow}>
                                    <Image source={item?.image} resizeMode='contain' style={{ width: wp(10) }} />
                                    <Text style={styles.titleStyle}>{item?.label}</Text>
                                    {deliverySelect.includes(index) ? <FontAwesome name='check-circle' size={hp(3)} color={'#0A5CA8'} /> : <FontAwesome name='circle-thin' size={hp(3)} color={'#0A5CA8'} />}
                                </View>
                            </TouchableOpacity>
                        ))
                    }

                </View>
            </ScrollView >



            <View style={styles.footer}>
                <TouchableOpacity style={defaultStyles.footerBtn}
                    disabled={selected.length == 0 || deliverySelect.length == 0 ? true : false}
                    onPress={toggleSubmit}
                >
                    <Text style={defaultStyles.footerText}>Apply</Text>
                </TouchableOpacity>
            </View>


        </View >
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
        marginTop: hp(3),
        paddingHorizontal: wp(5)
    },
    topText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2)
    },
    cardStyle: {
        alignSelf: 'center',
        width: wp(92),
        paddingVertical: hp(2),
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: wp(4),
        marginTop: hp(2.5),
        paddingHorizontal: wp(5.5),
        shadowColor: "#DDDDDD",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleStyle: {
        flex: 1,
        paddingHorizontal: wp(5),
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2)
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        height: hp(14),
        width: wp(100),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: wp(8),
        borderTopLeftRadius: wp(8),
    }


})