import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { caterogy } from '@/constants/home/data';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
interface ModalAProps {
    modalRef: React.RefObject<BottomSheetModal>;
}

export default function RangeModal({ modalRef }: ModalAProps) {
    const snapPoints = useMemo(() => ['45%', '70%',], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1}{...props} />, []
    );
    const handleFocus = () => {
        modalRef.current?.snapToIndex(1);
    };

    const handleBlur = () => {
        modalRef.current?.snapToIndex(0);
    };
    const handleFocus2 = () => {
        modalRef.current?.snapToIndex(1);
    };

    const handleBlur2 = () => {
        modalRef.current?.snapToIndex(0);
    };
    return (
        <BottomSheetModalProvider>
            <View>
                {/* modal_1 */}
                <BottomSheetModal
                    ref={modalRef}
                    index={0}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose={true}
                    handleIndicatorStyle={{ backgroundColor: '#DADADA' }}
                    style={{
                        borderTopLeftRadius: wp(12),
                        borderTopRightRadius: wp(12),
                        overflow: 'hidden',
                    }}

                >
                    <BottomSheetView style={styles.modal_1}>
                        <Text style={styles.bottomSheetText}>Set Price Range</Text>
                        <View style={styles.separatorModal1} />
                        <ScrollView>
                            <View style={styles.modalInnner1}>
                                <View>
                                    <Text style={styles.modalTextStyle}>Price from: </Text>
                                    <TextInput
                                        placeholder='0.00 AED'
                                        keyboardType='numeric'
                                        placeholderTextColor={'#9E9E9E'}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        style={styles.modalInputStyle}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.modalTextStyle}>To: </Text>
                                    <TextInput
                                        placeholder='0.00 AED'
                                        placeholderTextColor={'#9E9E9E'}
                                        keyboardType='numeric'
                                        onFocus={handleFocus2}
                                        onBlur={handleBlur2}
                                        style={styles.modalInputStyle}
                                    />
                                </View>
                            </View>
                            <View style={styles.separatorModal1} />
                            <View style={{ marginTop: hp(3) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(3), alignSelf: 'center' }}>
                                    <TouchableOpacity style={[styles.modalBtnFooter, { backgroundColor: '#DAE7F2' }]}
                                        onPress={() => {
                                            modalRef.current?.dismiss();
                                        }}
                                    >
                                        <Text style={[styles.modalTextFooter, { color: '#0A5CA8' }]}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.modalBtnFooter, { backgroundColor: "#0A5CA8" }]}>
                                        <Text style={[styles.modalTextFooter, { color: 'white' }]}>Set Range</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    modal_1: {
        flex: 1,
        alignItems: 'center'
    },
    bottomSheetText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.6),
        textAlign: 'center',
        paddingHorizontal: wp(5),
        marginTop: hp(2.5),
        color: '#212121',
    },
    separatorModal1: {
        height: 1,
        width: wp(80),
        backgroundColor: "#EEEEEE",
        marginTop: hp(3)
    },
    modalInnner1: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3),
        marginTop: hp(3.5)
    },
    modalBtnFooter: {
        paddingHorizontal: wp(11),
        height: hp(6.5),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalTextFooter: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2)
    },
    modalInputStyle: {
        width: wp(42),
        height: hp(7),
        backgroundColor: "#FAFAFA",
        borderRadius: wp(3),
        paddingHorizontal: wp(4),
        marginTop: hp(2.5),
        fontFamily: "UrbanistMedium",
        fontSize: hp(1.7)
    },
    modalTextStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
        color: "#212121"
    }
})