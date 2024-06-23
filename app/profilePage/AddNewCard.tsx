import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, Alert, TextInput, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CardField, useStripe, CardForm } from '@stripe/stripe-react-native';
import { addPaymentMethod } from '@/apis/stripe';
import errorRes from '@/apis/errorRes';
export default function AddNewCard() {


    const { createPaymentMethod } = useStripe();
    const [cardDetails, setCardDetails] = useState<any>(null);
    const [complete, setComplete] = useState(false);


    const handleAddPaymentMethod = async () => {
        if (!complete) {
            Alert.alert('Please enter complete card details');
            return;
        }
        try {
            const { paymentMethod, error } = await createPaymentMethod({
                paymentMethodType: "Card",
                paymentMethodData: cardDetails
                // paymentMethodData: {
                //     billingDetails: {
                //         name: "Edzel Intes",
                //         phone: "09284856233",
                //         email: "intesedzel@gmail.com"
                //     }
                // },
            });
            if (error) {
                console.log('Error creating payment method:', error);
                Alert.alert('Error creating payment method', error.message);
            } else {
                try {
                    const response = await addPaymentMethod(paymentMethod?.id as string);
                    console.log(response);
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
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
                        <Text style={styles.bookingText} >Add New Card</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>




            <View style={{ alignItems: 'center', marginTop: Platform.OS === 'ios' ? hp(2) : hp(1) }}>
                <Image source={require('@/assets/temp/profileicons/card.jpg')} resizeMode='contain' style={{ width: wp(90), height: hp(25) }} />
            </View>





            <CardForm
                // disabled={inputDisabled}
                placeholders={{
                    number: '4242 4242 4242 4242',
                    postalCode: '12345',
                    cvc: 'CVC',
                    expiration: 'MM|YY',
                }}
                // autofocus
                cardStyle={{
                    // backgroundColor: '#D3D3D3',
                    // textColor: '#A020F0',
                    // borderColor: 'white',
                    // borderWidth: 0,
                    // borderRadius: 10,
                    // fontSize: 50,
                    // fontFamily: 'Macondo-Regular',
                    // placeholderColor: '#A020F0',
                    // textErrorColor: '#ff0000',
                }}
                style={{
                    width: wp(90),
                    ...Platform.select({
                        ios: {
                            height: 250,
                        },
                        android: {
                            height: 320,
                        },
                    }),
                    alignSelf: 'center',
                    marginTop: 30,
                }}
                onFormComplete={(cardDetails) => {
                    console.log(cardDetails);
                    setCardDetails(cardDetails);
                    setComplete(cardDetails.complete);
                }}
                defaultValues={{
                    countryCode: 'US',
                }}
            />



            {/* 
            <View style={{ alignItems: 'center' }}>

                <View style={{ marginTop: hp(3) }}>
                    <Text style={styles.textStyleLabel}>Card Name</Text>
                    <View style={styles.textFieldStyle}>
                        <Text style={styles.textStyle}>Andrew Ainsley</Text>
                    </View>
                </View>
                <View style={{ marginTop: hp(3) }}>
                    <Text style={styles.textStyleLabel}>Card Number</Text>
                    <View style={styles.textFieldStyle}>
                        <Text style={styles.textStyle}>2672 4738 7837 7285</Text>
                    </View>
                </View>


                <View style={styles.expiryRow}>
                    <View>
                        <Text style={styles.textStyleLabel}>Expiry Date</Text>
                        <View style={styles.newField}>
                            <Text style={styles.textStyle}>07/26</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textStyleLabel}>CVV</Text>
                        <View style={styles.newField}>
                            <Text style={styles.textStyle}>699</Text>
                        </View>
                    </View>
                </View>

            </View> */}


            {/* <CardField
                postalCodeEnabled={true}
                placeholders={{
                    number: '4242 4242 4242 4242',
                    // postalCode: '12345',
                    cvc: 'CVC',
                    expiration: 'MM / YY',
                }}
                cardStyle={{ backgroundColor: '#FFFFFF', }}
                style={{
                    width: wp(90),
                    height: hp(20),
                    marginVertical: 30,
                    alignSelf: 'center'
                }}
                onCardChange={(cardDetails) => {
                    setCardDetails(cardDetails);
                    // console.log(cardDetails);
                }}
            /> */}

            <View style={styles.footer} >
                <TouchableOpacity style={styles.footerBtn}
                    onPress={handleAddPaymentMethod}
                >
                    <Text style={styles.footerText}>Add New Card</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
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


    textStyleLabel: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2)
    },




    textFieldStyle: {
        width: wp(90),
        minHeight: hp(7.5),
        maxHeight: hp(8),
        backgroundColor: "#FAFAFA",
        borderRadius: wp(4),
        justifyContent: 'center',
        marginTop: hp(2),
        paddingHorizontal: wp(6)
    },
    textStyle: {
        fontFamily: "UrbanistSemiBold",
        fontSize: hp(2)
    },


    expiryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        marginTop: hp(3)
    },

    newField: {
        width: wp(40),
        minHeight: hp(7.5),
        maxHeight: hp(8),
        backgroundColor: "#FAFAFA",
        borderRadius: wp(4),
        justifyContent: 'center',
        marginTop: hp(2),
        paddingHorizontal: wp(6)
    },








    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: Platform.OS === 'ios' ? hp(13) : hp(12),
        alignItems: 'center'
    },
    footerBtn: {
        width: wp(90),
        height: hp(7),
        backgroundColor: "#0A5CA8",
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: 'white',
    }
})