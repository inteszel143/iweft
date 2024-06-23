import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { cancelSubscription } from '@/apis/stripe';
import { useQueryClient } from '@tanstack/react-query';
interface ModalAProps {
    modalRef: React.RefObject<BottomSheetModal>;
    subId: string;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CancelSubscription({ modalRef, subId, setModalVisible }: ModalAProps) {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const snapPoints = useMemo(() => ['25%', '34%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1}{...props} />, []
    );

    const onSubmit = async () => {
        setLoading(true);
        try {
            await cancelSubscription(subId as string);
            queryClient.invalidateQueries({ queryKey: ['all-subscription'] });
            setLoading(false);
            modalRef.current?.close();
            setModalVisible(true);
        } catch (error) {
            setLoading(false);
            // console.log(error)
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
                        <Text style={styles.bottomSheetIndi}>Cancel Subscription</Text>
                        <View style={styles.BottomSheetSeparator} />
                        <View style={{ marginTop: Platform.OS === 'ios' ? hp(3) : hp(4), paddingHorizontal: wp(10) }}>
                            <Text style={styles.bottomSheetTitle}>Are you sure want to cancel your subscription plan?</Text>
                        </View>

                        <View style={styles.bottomBtnRow}>
                            <TouchableOpacity style={[styles.bottomBtn, { backgroundColor: "#DAE7F2" }]}
                                onPress={() => modalRef.current?.close()}
                            >
                                <Text style={[styles.bottomText, { color: "#0A5CA8" }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.bottomBtn, { backgroundColor: "#0A5CA8" }]}
                                onPress={onSubmit}
                            >
                                {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={[styles.bottomText, { color: "white" }]}>Yes, Confirm</Text>}
                            </TouchableOpacity>
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
    contentContainer: {
        flex: 1,
        alignItems: 'center',

    },
    bottomSheetIndi: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.6),
        color: "#F75555",
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
    }
})