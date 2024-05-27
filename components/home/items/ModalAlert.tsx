import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { caterogy } from '@/constants/home/data';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
interface ModalAProps {
    modalRef: React.RefObject<BottomSheetModal>;
}

export default function ModalAlert({ modalRef }: ModalAProps) {
    const snapPoints = useMemo(() => ['25%', '54%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1}{...props} />, []
    );
    return (
        <BottomSheetModalProvider>
            <View>
                <BottomSheetModal
                    ref={modalRef}
                    index={1}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose={true}
                    handleIndicatorStyle={{ backgroundColor: '#DADADA' }}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <Image source={require('@/assets/temp/bookingdetails.jpg')} resizeMode='contain' style={{ width: wp(90), height: hp(30) }} />
                        <Text style={styles.bottomSheetText}>Before your first order, select a time to meet one of our drivers! They will hand over everything you need to get started. </Text>

                        <View style={styles.bottomBtnRow}>
                            <TouchableOpacity style={[defaultStyles.footerBtn, { backgroundColor: "#0A5CA8" }]}
                                onPress={() => {
                                    modalRef.current?.dismiss();
                                }}
                            >
                                <Text style={[defaultStyles.footerText, { color: "#FFFFFF" }]}>Got it</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bottomSheetText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: '#0A5CA8',
        textAlign: 'center',
        paddingHorizontal: wp(5),
        marginTop: Platform.OS === 'ios' ? hp(1) : hp(2)
    },
    bottomBtnRow: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(10.5),
        alignItems: 'center',
    },
    bottomBtn: {
        paddingHorizontal: wp(9),
        height: hp(6),
        width: wp(90),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(6),
    },
    bottomText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
    },
})