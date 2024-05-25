import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { caterogy } from '@/constants/home/data';
import { MaterialCommunityIcons } from '@expo/vector-icons';
interface ModalAProps {
    modalRef: React.RefObject<BottomSheetModal>;
}

export default function CategoryModal({ modalRef }: ModalAProps) {
    const snapPoints = useMemo(() => ['25%', '65%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1}{...props} />, []
    );
    return (
        <BottomSheetModalProvider>
            <View>
                {/* modal_1 */}
                <BottomSheetModal
                    ref={modalRef}
                    index={1}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose={true}
                    handleIndicatorStyle={{ backgroundColor: '#DADADA' }}
                    style={{
                        borderTopLeftRadius: wp(10),
                        borderTopRightRadius: wp(10),
                        overflow: 'hidden',
                    }}

                >
                    <BottomSheetView style={styles.modal_1}>
                        <Text style={styles.bottomSheetText}>Set Category</Text>
                        <View style={styles.separatorModal1} />
                        <View style={styles.modalInnner1}>
                            <View style={styles.boxmodal}>
                                {
                                    caterogy.map((item, index) => (
                                        <TouchableOpacity key={index}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4), marginTop: hp(2.5) }}>
                                                <MaterialCommunityIcons name='checkbox-blank-outline' size={hp(2.6)} color={'#0A5CA8'} />
                                                <Text style={styles.boxmodaltext}>{item.label}</Text>
                                            </View>
                                            <View style={{ height: 1, backgroundColor: "#EEEEEE", marginTop: hp(2) }} />
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={{ position: 'absolute', bottom: 0, width: wp(100), height: hp(11) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(3), alignSelf: 'center' }}>
                                <TouchableOpacity style={[styles.modalBtnFooter, { backgroundColor: '#DAE7F2' }]}
                                    onPress={() => {
                                        modalRef.current?.dismiss();
                                    }}
                                >
                                    <Text style={[styles.modalTextFooter, { color: '#0A5CA8' }]}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalBtnFooter, { backgroundColor: "#0A5CA8" }]}>
                                    <Text style={[styles.modalTextFooter, { color: 'white' }]}>Set Category</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        flex: 1,
        backgroundColor: "#FAFAFA",
        width: wp(100),
    },
    boxmodal: {
        alignSelf: 'center',
        width: wp(86),
        backgroundColor: 'white',
        marginTop: hp(2),
        borderRadius: wp(3),
        paddingHorizontal: wp(5),
        paddingBottom: hp(2)

    },
    boxmodaltext: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2)
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
    }
})