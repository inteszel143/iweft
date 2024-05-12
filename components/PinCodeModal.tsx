import { StyleSheet, Text, View, Modal, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}

export default function PinCodeModal({ modalVisible, setModalVisible }: ModalProps) {

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };



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
                    <View>
                        <LottieView
                            autoPlay
                            style={styles.errorLottieStyle}
                            source={require('@/assets/animate/invalid.json')}
                        />
                    </View>
                    <Text style={styles.titleStyle}>Incorrect PIN CODE</Text>
                    <Text style={styles.subStyle}>Please enter the correct PIN. For your account secured.</Text>
                    <View style={{ marginTop: hp(3) }} />
                    <TouchableOpacity style={styles.btnStyle} onPress={toggleModal}>
                        <Text style={styles.btnText}>Try again</Text>
                    </TouchableOpacity>
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
        width: wp(86),
        height: Platform.OS === 'ios' ? hp(48) : hp(50),
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
        color: '#DB3747',
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
        width: wp(50),
        backgroundColor: '#DC3545',
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: 'white'
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