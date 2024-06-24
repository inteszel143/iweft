import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, useLocalSearchParams } from 'expo-router';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Octicons } from '@expo/vector-icons';
import BookingCancelModal from '@/components/booking/BookingCancelModal';
import PinCodeModal from '@/components/PinCodeModal';
import { getPinNumber } from '@/apis/fetchAuth';
import { cancelBooking } from '@/apis/order';
import errorRes from '@/apis/errorRes';
import { postRefundPayment } from '@/apis/stripe';
interface CellProps {
    index: number;
    symbol: string;
    isFocused: boolean;
}
export default function BookingPin() {
    const { bookingId } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const CELL_COUNT = 4;

    const [enableMask, setEnableMask] = useState(true);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    useEffect(() => {
        if (ref?.current) {
            ref.current.focus();
        }
    }, []);

    const toggleMask = () => setEnableMask((f) => !f);
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
        const pin = parseInt(value);
        const response = await getPinNumber(pin);
        if (response?.isMatch) {
            try {
                const cancelResult = await cancelBooking(bookingId as string);
                if (cancelResult?.message === "Booking successfully cancelled") {
                    await postRefundPayment(bookingId as string);
                    setTimeout(() => {
                        setBtnLoading(false);
                        setModalVisible(true);
                    }, 2000);
                }
            } catch (error) {
                setBtnLoading(false);
                console.log(errorRes(error));
            }
        } else {
            setErrorModalVisible(true);
            setBtnLoading(false);
        }
    };



    return (
        <View style={styles.container}>
            {errorModalVisible && <PinCodeModal modalVisible={errorModalVisible} setModalVisible={setErrorModalVisible} />}
            {modalVisible && <BookingCancelModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}

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
                    <Text style={styles.conatinertitle}>Enter your PIN to cancel booking</Text>
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