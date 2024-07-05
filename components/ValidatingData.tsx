import { StyleSheet, Text, View, Modal, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { BallIndicator, WaveIndicator } from 'react-native-indicators'
import { useTranslation } from 'react-i18next';
interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}

export default function ValidatingData({ modalVisible, setModalVisible }: ModalProps) {
    const { t } = useTranslation();
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
                    <View style={styles.indicator}>
                        <BallIndicator color="#0A5CA8" size={hp(4)} />
                    </View>
                    <View style={{ marginTop: hp(4) }} />
                    <Text style={styles.titleStyle}>{t('Please wait')}</Text>
                    <Text style={styles.subStyle}>{t('Validating user data...')}</Text>
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
        width: wp(84),
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
        color: '#0A5CA8',
        marginTop: hp(1)
    },
    subStyle: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(2.1),
        textAlign: 'center',
        color: "#212121",
        marginTop: hp(2),
    },
    btnStyle: {
        marginTop: hp(4),
        height: hp(7),
        width: wp(72),
        backgroundColor: '#0A5CA8',
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
        top: hp(6),
    }
})