import { StyleSheet, Text, View, Modal, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}

export default function ModalConfirm({ modalVisible, setModalVisible }: ModalProps) {
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const toggleConfirm = async () => {

    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            presentationStyle='overFullScreen'
            statusBarTranslucent={true}
        >
            <View style={styles.modalStyle}>
                <View style={styles.modalBox}>
                    <Text style={styles.titleStyle}>Are you sure?</Text>
                    <Text style={styles.subStyle}>You want to update your profile images?</Text>
                    <View style={{ marginTop: hp(2.5) }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2) }}>
                        <TouchableOpacity style={[styles.btnStyle, { borderWidth: 1, borderColor: '#DADADA' }]} onPress={toggleModal}>
                            <Text style={[styles.btnText, { color: '#424242' }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyle, { backgroundColor: '#0a5ca8', }]} onPress={toggleConfirm}>
                            <Text style={[styles.btnText, { color: 'white' }]}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBox: {
        width: wp(88),
        height: Platform.OS === 'ios' ? hp(30) : hp(32),
        backgroundColor: "white",
        borderRadius: wp(6),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Platform.OS === 'ios' ? wp(6) : wp(8),
    },
    imageStyle: {
        width: wp(42),
        height: hp(22)
    },
    titleStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.9),
        textAlign: 'center',
        color: '#0a5ca8',
        marginTop: hp(1)
    },
    subStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2.3),
        textAlign: 'center',
        color: "gray",
        marginTop: hp(2),
    },
    btnStyle: {
        height: hp(7),
        width: wp(35),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
    },
    indicator: {
        position: 'absolute',
        bottom: hp(4),
    },
    errorLottieStyle: {
        width: wp(34),
        height: hp(15)
    }
})