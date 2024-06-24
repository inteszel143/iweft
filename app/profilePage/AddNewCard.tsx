import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, Alert, TextInput, ScrollView, Button, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CardField, useStripe, CardForm } from '@stripe/stripe-react-native';
import { addPaymentMethod } from '@/apis/stripe';
import SuccessAddPaymentMethod from '@/components/modal/SuccessAddPaymentMethod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
export default function AddNewCard() {

    const { createPaymentMethod } = useStripe();
    const [modalVisible, setModalVisible] = useState(false);
    const [cardDetails, setCardDetails] = useState<any>(null);
    const [complete, setComplete] = useState(false);
    const [loading, setLoading] = useState(false);

    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [errors, setErrors] = useState({});

    const validateCardNumber = (number: string) => {
        const regex = /^[0-9]{16}$/;
        return regex.test(number.replace(/\s+/g, ''));
    };



    const handleExpiryDateChange = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        let formatted = cleaned;
        if (cleaned.length >= 3) {
            formatted = `${cleaned.slice(0, 2)} / ${cleaned.slice(2, 4)}`;
        }
        setExpiryDate(formatted);
    };

    const handleCardNumberChange = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        let formatted = '';

        for (let i = 0; i < cleaned.length; i += 4) {
            formatted += cleaned.substr(i, 4) + ' ';
        }
        setCardNumber(formatted.trim());
    };


    const handleSubmit = () => {
        const newErrors: any = {};
        if (!validateCardNumber(cardNumber)) newErrors.cardNumber = 'Invalid card number';

        setErrors(newErrors);

    }


    const handleAddPaymentMethod = async () => {
        setLoading(true);
        if (!complete) {
            Alert.alert('Please enter complete card details');
            setLoading(false);
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
            setLoading(false);
            if (error) {
                setLoading(false);
                console.log('Error creating payment method:', error);
                Alert.alert('Error creating payment method', error.message);
            } else {
                // try {
                //     const response = await addPaymentMethod(paymentMethod?.id as string);
                //     console.log(response);
                //     setLoading(false);
                // } catch (error) {
                //     setLoading(false);
                //     console.log(error)
                // }
            }
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }


    return (
        <View style={styles.container}>

            {modalVisible && <SuccessAddPaymentMethod modalVisible={modalVisible} setModalVisible={setModalVisible} />}

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

            <KeyboardAwareScrollView keyboardDismissMode='on-drag' extraScrollHeight={hp(4)} contentContainerStyle={{ flex: 1, }}>
                <View style={{ alignItems: 'center', marginTop: Platform.OS === 'ios' ? hp(2) : hp(1) }}>
                    <Image source={require('@/assets/temp/profileicons/card.jpg')}
                        resizeMode='contain'
                        style={{ width: wp(90), height: hp(25) }} />
                </View>


                {/* <CardForm
                    // disabled={inputDisabled}
                    placeholders={{
                        number: '4242 4242 4242 4242',
                        postalCode: '12345',
                        cvc: 'CVC',
                        expiration: 'MM|YY',
                    }}
                    // autofocus
                    cardStyle={{
                        // backgroundColor: '',
                        borderRadius: 8,
                        borderColor: '#cccccc',
                        borderWidth: 1,
                        // color: '#000000',
                        fontSize: 18,
                        placeholderColor: '#888888',
                        textErrorColor: '#ff0000',
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
                /> */}
                {/* <Button title='Add Payment Method' onPress={handleAddPaymentMethod} /> */}

                {/* <CardField
                    postalCodeEnabled={false}
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
                        console.log(cardDetails);
                        setComplete(cardDetails.complete);
                        // console.log(cardDetails);
                    }}
                /> */}


                <View style={{ alignItems: 'center' }}>

                    <View style={{ marginTop: hp(3) }}>
                        <Text style={styles.textStyleLabel}>Card Name</Text>
                        <View style={styles.textFieldStyle}>
                            <TextInput
                                placeholder='Andrew Ainsley'
                                placeholderTextColor={'#9E9E9E'}
                                style={styles.textStyle}
                                autoCapitalize='words'
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: hp(3) }}>
                        <Text style={styles.textStyleLabel}>Card Number</Text>
                        <View style={styles.textFieldStyle}>
                            <View style={styles.row}>
                                <TextInput
                                    style={[styles.textStyle, { flex: 1, }]}
                                    placeholder="Card Number"
                                    placeholderTextColor={'#9E9E9E'}
                                    value={cardNumber}
                                    onChangeText={handleCardNumberChange}
                                    keyboardType="numeric"
                                    maxLength={19} // 16 digits + 3 spaces
                                />
                                <Ionicons name="card-outline" size={hp(2.5)} />
                            </View>
                        </View>
                        {errors?.cardNumber && <Text style={styles.error}>{errors.cardNumber}</Text>}
                    </View>


                    <View style={styles.expiryRow}>
                        <View>
                            <Text style={styles.textStyleLabel}>Expiry Date</Text>
                            <View style={styles.newField}>
                                <View style={styles.row}>
                                    <TextInput
                                        style={[styles.textStyle, { flex: 1, }]}
                                        placeholder="MM / YY"
                                        placeholderTextColor={'#9E9E9E'}
                                        value={expiryDate}
                                        onChangeText={handleExpiryDateChange}
                                        keyboardType="numeric"
                                        maxLength={7}
                                    />
                                    <Image source={require('@/assets/temp/profileicons/calendar.jpg')} resizeMode='contain' style={{ width: wp(5) }} />
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.textStyleLabel}>CVV</Text>
                            <View style={styles.newField}>
                                <TextInput
                                    style={styles.textStyle}
                                    placeholder="123"
                                    placeholderTextColor={'#9E9E9E'}
                                    // value={expiryDate}
                                    // onChangeText={handleExpiryDateChange}
                                    keyboardType="numeric"
                                    maxLength={4}
                                />
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{ flex: 1, }} />
                <View style={{ alignItems: 'center', paddingBottom: hp(4) }}>
                    <TouchableOpacity style={styles.footerBtn}
                        onPress={handleSubmit}
                    >
                        {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={styles.footerText}>Add New Card</Text>}
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>



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
        fontSize: hp(2.1)
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
        flex: 1,
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




    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },





    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: Platform.OS === 'ios' ? hp(12) : hp(12),
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
    },
    error: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.8),
        color: "red",
        marginTop: hp(1),
        marginLeft: wp(1)
    }
})