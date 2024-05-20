import { StyleSheet, Text, View, Modal, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { BallIndicator } from 'react-native-indicators'
interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}

export default function ApprovedPhone({ modalVisible, setModalVisible }: ModalProps) {
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
                            source={require('@/assets/animate/check.json')}
                        />
                    </View>
                    <Text style={styles.titleStyle}>Success !</Text>
                    <Text style={styles.subStyle}>Your phone number has been verified.</Text>
                    <View style={{ marginTop: hp(5) }} />
                    <View style={styles.indicator}>
                        <BallIndicator color="#6DCC5B" size={hp(4)} />
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
        width: wp(86),
        height: Platform.OS === 'ios' ? hp(46) : hp(46),
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
        color: '#6DCC5B',
        marginTop: hp(1.5)
    },
    subStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2.5),
        textAlign: 'center',
        color: "gray",
        marginTop: hp(2),
        paddingHorizontal: wp(4),
    },
    btnStyle: {
        height: hp(7),
        width: wp(50),
        backgroundColor: '#6DCC5B',
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
        width: wp(32),
        height: hp(14)
    }
})