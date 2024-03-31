import { StyleSheet, Text, View, Modal, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { BallIndicator } from 'react-native-indicators'
interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}

export default function ChangePasswordSuccessModal({ modalVisible, setModalVisible }: ModalProps) {


    useEffect(() => {
        const timer = setTimeout(() => {
            setModalVisible(false);
            router.push('/(tabs)/');
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

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
                        <Image source={require('@/assets/temp/success.jpg')} resizeMode='contain' style={styles.imageStyle} />
                    </View>
                    <Text style={styles.titleStyle}>Congratulations!</Text>
                    <Text style={styles.subStyle}>Your account is ready to use. You will be redirected to the Home page in a few seconds..</Text>
                    <View style={{ marginTop: hp(8) }} />
                    <View style={styles.indicator}>
                        <BallIndicator color="#93C120" size={hp(4)} />
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
        height: Platform.OS === 'ios' ? hp(50) : hp(52),
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
        bottom: hp(4),
    }
})