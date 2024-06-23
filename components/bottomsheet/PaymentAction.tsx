import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useQueryClient } from '@tanstack/react-query';
import { changeToDefaultMethod, deletePaymentMethod } from '@/apis/stripe';
interface ModalAProps {
    modalRef: React.RefObject<BottomSheetModal>;
    payment_method_id: string;
    setDefaultSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function PaymentAction({ modalRef, payment_method_id, setDefaultSuccess }: ModalAProps) {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const snapPoints = useMemo(() => ['25%', '35%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1}{...props} />, []
    );

    const setAsDefault = async () => {
        setLoading(true);
        try {
            await changeToDefaultMethod(payment_method_id as string);
            queryClient.invalidateQueries({ queryKey: ['default-method'] });
            queryClient.invalidateQueries({ queryKey: ['list-methods'] });
            setTimeout(() => {
                modalRef?.current?.close();
                setLoading(false);
                setDefaultSuccess(true);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePaymentMethods = async () => {
        setDeleteLoading(true);
        try {
            await deletePaymentMethod(payment_method_id as string);
            queryClient.invalidateQueries({ queryKey: ['list-methods'] });
            queryClient.invalidateQueries({ queryKey: ['default-method'] });
            setTimeout(() => {
                modalRef?.current?.close();
                setDeleteLoading(false);
            }, 1000);
        } catch (error) {
            console.log(error);
        }

    };


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
                        borderTopLeftRadius: wp(6),
                        borderTopRightRadius: wp(6),
                        overflow: 'hidden',
                    }}

                >
                    <BottomSheetView style={styles.contentContainer}>
                        <Text style={styles.bottomSheetIndi}>Manage Payment Method</Text>
                        <View style={styles.BottomSheetSeparator} />

                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#0A5CA8' }]}
                            onPress={setAsDefault}
                        >
                            {loading ?
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                                    <Text style={[styles.modalText, { color: '#FFFFFF' }]}>Processing</Text>
                                    <ActivityIndicator size={'small'} color={'white'} />
                                </View>

                                : <Text style={[styles.modalText, { color: '#FFFFFF' }]}>Set as Default</Text>}
                        </TouchableOpacity >


                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#F75555' }]}
                            onPress={deletePaymentMethods}
                        >
                            {deleteLoading ?
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(4) }}>
                                    <Text style={[styles.modalText, { color: '#FFFFFF' }]}>Processing</Text>
                                    <ActivityIndicator size={'small'} color={'white'} />
                                </View>

                                : <Text style={[styles.modalText, { color: '#FFFFFF' }]}>Delete Card</Text>}
                        </TouchableOpacity >
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
    contentContainer: {
        flex: 1,
        alignItems: 'center',

    },
    bottomSheetIndi: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.4),
        marginTop: hp(2)
    },
    BottomSheetSeparator: {
        height: 1,
        backgroundColor: "#EEEEEE",
        width: wp(82),
        marginTop: hp(2.2)
    },
    bottomSheetTitle: {
        fontFamily: 'UrbanistBold',
        fontSize: Platform.OS === 'android' ? hp(2.4) : hp(2.2),
        textAlign: 'center'
    },
    bottomBtnRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3),
        marginTop: Platform.OS === 'ios' ? hp(3.5) : hp(4),
    },
    bottomBtn: {
        width: wp(40),
        height: hp(6),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(6),
    },
    bottomText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.9),
    },
    modalBtn: {
        width: wp(84),
        height: hp(7),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(2.5)
    },
    modalText: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2)
    },
})