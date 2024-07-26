import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Octicons } from '@expo/vector-icons';
import BookingSuccessModal from '@/components/booking/BookingSuccessModal';
import { getPinNumber } from '@/apis/fetchAuth';
import PinCodeModal from '@/components/PinCodeModal';
import { createBooking } from '@/apis/order';
import useStoreBooking from '@/store/useStoreBooking';
import { addPayUsingCard } from '@/apis/stripe';
import ErrorBookingModal from '@/components/ErrorBookingModal';
import useStoreSub from '@/store/useStoreSub';
import { getDiscountedTotal, getTotal } from '@/utils/format';
import errorRes from '@/apis/errorRes';
interface CellProps {
    index: number;
    symbol: string;
    isFocused: boolean;
}

export default function HomeConfirmPin() {
    const { subscriptionId } = useStoreSub();
    const { service, itemData, pick_up_date_time, delivery_date_time, address, latitude, longitude, total_amount, discounted_amount, driver_instruction, promo_code, collection_instruction, service_model, bundleId } = useStoreBooking();
    const [modalVisible, setModalVisible] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const CELL_COUNT = 4;
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorBooking, setErrorBooking] = useState(false);
    const [enableMask, setEnableMask] = useState(true);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [orderId, setOrderId] = useState("");
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const toggleMask = () => setEnableMask((f) => !f);
    useEffect(() => {
        if (ref?.current) {
            ref.current.focus();
        }
    }, []);
    const renderCell = ({ index, symbol, isFocused }: CellProps) => {
        let textChild = null;

        if (symbol) {
            textChild = enableMask ? <Octicons name='dot-fill' size={hp(2)} /> : symbol;
        } else if (isFocused) {
            textChild = <Cursor />;
        }

        return (
            <View
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                <Text style={styles.cellText}>{textChild}</Text>
            </View>
        );
    };


    const onSubmit = async () => {

        setBtnLoading(true);
        const totalPayment = parseFloat(total_amount);
        const orderData = {
            order_details: {
                service,
                order_items: JSON.parse(itemData as any),
                promo_code: promo_code,
                service_model: service_model
            },
            pick_up_date_time: pick_up_date_time,
            delivery_date_time: delivery_date_time,
            address,
            delivery_instruction: driver_instruction,
            collection_instruction: collection_instruction,
            total_amount: totalPayment,
            discounted_amount: discounted_amount,
            bundle_offer: bundleId,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
        };
        const pin = parseInt(value);
        const response = await getPinNumber(pin);
        if (response?.isMatch) {
            try {
                const orderResult = await createBooking(orderData);
                if (orderResult?.message === "Order successfully created") {
                    await addPayUsingCard(totalPayment, orderResult?.orders?._id, subscriptionId as string);

                    setOrderId(orderResult?.orders?._id);
                    setModalVisible(true);
                    setBtnLoading(false);
                }
            } catch (error) {
                console.log(errorRes(error));
                setErrorBooking(true);
                setBtnLoading(false);
            }
        } else {
            setErrorModalVisible(true);
            setBtnLoading(false);
        }
    };




    return (
        <View style={styles.container}>
            {errorModalVisible && <PinCodeModal modalVisible={errorModalVisible} setModalVisible={setErrorModalVisible} />}
            {modalVisible && <BookingSuccessModal modalVisible={modalVisible} setModalVisible={setModalVisible} orderId={orderId} />}
            {errorBooking && <ErrorBookingModal modalVisible={errorBooking} setModalVisible={setErrorBooking} />}

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Enter Your Pin</Text>
                    </View>
                </View>
            </View>


            <ScrollView contentContainerStyle={styles.scollviewContainer}>
                <View>
                    <Text style={styles.conatinertitle}>Enter your PIN to confirm payment</Text>
                </View>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={renderCell}
                />
                <TouchableOpacity style={[styles.footerBtn, { backgroundColor: value.length != 4 ? "#DADADA" : "#0A5CA8", }]}
                    disabled={value.length != 4 ? true : false}
                    onPress={onSubmit}
                >
                    {
                        btnLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={styles.footerText}>Continue</Text>
                    }
                </TouchableOpacity>
            </ScrollView>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
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



    conatinertitle: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(2),
        color: "#212121"
    },

    scollviewContainer: {
        marginTop: hp(10),
        justifyContent: 'center',
        alignItems: 'center'
    },


    footerBtn: {
        width: wp(90),
        height: hp(7),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(8),
        marginTop: hp(8)
    },
    footerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: 'white'
    },


    codeFieldRoot: {
        marginTop: hp(10),
        gap: wp(4),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cell: {
        width: wp(17),
        height: wp(17),
        borderRadius: wp(4),
        borderWidth: 1,
        borderColor: "#F1F1F1",
        backgroundColor: "#EEEEEE",
        textAlign: 'center',
        justifyContent: 'center',
    },
    focusCell: {
        width: wp(17),
        height: wp(17),
        textAlign: 'center',
        justifyContent: 'center',
        borderColor: '#0A5CA8',
        backgroundColor: "#0A5CA826",
        borderRadius: wp(4),
    },
    cellText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(3),
        alignSelf: 'center',
    }
})