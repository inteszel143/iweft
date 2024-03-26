import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Octicons } from '@expo/vector-icons';
interface CellProps {
    index: number;
    symbol: string;
    isFocused: boolean;
}
export default function ChangePin() {


    const CELL_COUNT = 4;

    const [enableMask, setEnableMask] = useState(true);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
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



    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Change PIN</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5), tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>



            <View style={styles.containerStyle}>
                <View style={{ marginTop: hp(3) }}>
                    <Text style={styles.containerText} >Enter Your Old PIN</Text>
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
                </View>
                <View style={{ marginTop: hp(3) }}>
                    <Text style={styles.containerText} >Enter Your New PIN</Text>
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
                </View>
                <View style={{ marginTop: hp(3) }}>
                    <Text style={styles.containerText} >Confirm Your PIN</Text>
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
                </View>
            </View>


            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerBtn}>
                    <Text style={styles.footerText}>Confirm</Text>
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
    containerStyle: {
        paddingHorizontal: wp(5)
    },
    containerText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2.2),
        color: '#212121'
    },


    codeFieldRoot: {
        marginTop: hp(4),
        gap: wp(4),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cell: {
        width: wp(17),
        height: wp(16),
        borderRadius: wp(4),
        borderWidth: 1,
        borderColor: "#F1F1F1",
        backgroundColor: "#EEEEEE",
        textAlign: 'center',
        justifyContent: 'center',
    },
    focusCell: {
        width: wp(16),
        height: wp(16),
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
    },


    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(12),
        alignItems: 'center'
    },
    footerBtn: {
        width: wp(90),
        height: hp(7),
        backgroundColor: '#0A5CA8',
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