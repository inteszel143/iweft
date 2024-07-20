import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    Platform,
    ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router } from 'expo-router';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import { getPinNumber } from '@/apis/fetchAuth';
import { socialAddPinCode } from '@/apis/auth';
import SuccessChangePin from '@/components/modal/SuccessChangePin';
import ErrorPinChange from '@/components/modal/ErrorPinChange';

interface CellProps {
    index: number;
    symbol: string;
    isFocused: boolean;
}

const ChangePin = () => {
    const CELL_COUNT = 4;
    const [enableMask, setEnableMask] = useState(true);
    const [oldPin, setOldPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [loading, setLoading] = useState(false);

    //modal
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const [errorPassword, setErrorPassword] = useState(false);
    const oldPinRef = useBlurOnFulfill({ value: oldPin, cellCount: CELL_COUNT });
    const newPinRef = useBlurOnFulfill({ value: newPin, cellCount: CELL_COUNT });
    const confirmPinRef = useBlurOnFulfill({ value: confirmPin, cellCount: CELL_COUNT });

    const [oldPinProps, getOldPinCellOnLayoutHandler] = useClearByFocusCell({
        value: oldPin,
        setValue: setOldPin,
    });

    const [newPinProps, getNewPinCellOnLayoutHandler] = useClearByFocusCell({
        value: newPin,
        setValue: setNewPin,
    });

    const [confirmPinProps, getConfirmPinCellOnLayoutHandler] = useClearByFocusCell({
        value: confirmPin,
        setValue: setConfirmPin,
    });

    const renderCell = ({ index, symbol, isFocused }: CellProps, getCellOnLayoutHandler: (index: number) => void) => {
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
        setLoading(true);
        if (newPin !== confirmPin) {
            setErrorPassword(true);
        } else if (!newPin && !confirmPin) {
            setErrorPassword(true);
        } else {
            setErrorPassword(false);
            const pin = parseInt(oldPin);
            const response = await getPinNumber(pin);
            if (!response?.isMatch) {
                setLoading(false);
                setErrorModal(true);
            }
            if (response?.isMatch) {
                const newpin = parseInt(newPin);
                try {
                    await socialAddPinCode(newpin);
                    setLoading(false);
                    setSuccessModal(true);
                } catch (error) {
                    setLoading(false);
                    return;
                }
            }

        }
    };

    return (
        <View style={styles.container}>
            {successModal && <SuccessChangePin modalVisible={successModal} setModalVisible={setSuccessModal} />}
            {errorModal && <ErrorPinChange modalVisible={errorModal} setModalVisible={setErrorModal} />}
            <View style={styles.headerContainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText}>Change PIN</Text>
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
                    <Text style={styles.containerText}>Enter Your Old PIN</Text>
                    <CodeField
                        ref={oldPinRef}
                        {...oldPinProps}
                        value={oldPin}
                        onChangeText={setOldPin}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={(cellProps) => renderCell(cellProps, getOldPinCellOnLayoutHandler)}
                    />
                </View>
                <View style={{ marginTop: hp(3) }}>
                    <Text style={styles.containerText}>Enter Your New PIN</Text>
                    <CodeField
                        ref={newPinRef}
                        {...newPinProps}
                        value={newPin}
                        onChangeText={setNewPin}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={(cellProps) => renderCell(cellProps, getNewPinCellOnLayoutHandler)}
                    />
                </View>
                <View style={{ marginTop: hp(3) }}>
                    <Text style={styles.containerText}>Confirm Your PIN</Text>
                    <CodeField
                        ref={confirmPinRef}
                        {...confirmPinProps}
                        value={confirmPin}
                        onChangeText={setConfirmPin}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={(cellProps) => renderCell(cellProps, getConfirmPinCellOnLayoutHandler)}
                    />
                </View>


                {
                    errorPassword && <View style={styles.errorViewStyle}>
                        <Ionicons name='alert-circle-outline' size={hp(2.4)} color={'#ED4337'} />
                        <Text style={styles.errorStyle}>New PIN and Confirm PIN do not match</Text>
                    </View>
                }
            </View>

            {
                Platform.OS === 'android' ? <TouchableOpacity style={[defaultStyles.footerBtn, { alignSelf: 'center', marginTop: hp(20) }]}
                    onPress={onSubmit}
                >
                    {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Confirm</Text>}
                </TouchableOpacity>
                    :
                    <View style={styles.footer}>
                        <TouchableOpacity style={defaultStyles.footerBtn}
                            onPress={onSubmit}
                        >
                            {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Confirm</Text>}
                        </TouchableOpacity>
                    </View>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        paddingHorizontal: wp(5),
        paddingTop: hp(6),
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        fontSize: hp(2.5),
    },
    containerStyle: {
        paddingHorizontal: wp(5),
    },
    containerText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2.2),
        color: '#212121',
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
        height: hp(14),
        alignItems: 'center',
    },
    footerBtn: {
        width: wp(90),
        height: hp(7),
        backgroundColor: '#0A5CA8',
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: 'white',
    },
    errorStyle: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(1.8),
        color: "#ED4337"
    },
    errorViewStyle: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    }
});

export default ChangePin;
