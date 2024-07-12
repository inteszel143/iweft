import { StyleSheet, Text, View, Modal, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}
export default function SuccessPromo({ modalVisible, setModalVisible }: ModalProps) {
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
                    <Text style={styles.titleStyle}>Activation Successful!</Text>
                    <Text style={styles.subStyle}>Promo activation successful ! Enjoy your discount.</Text>

                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: '#0A5CA8', }]}
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    >
                        <Text style={[styles.btnText, { color: '#FFFFFF' }]}>OK</Text>
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
        height: Platform.OS === 'ios' ? hp(50) : hp(50),
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
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2.1),
        textAlign: 'center',
        color: "gray",
        marginTop: hp(1),
    },
    btnStyle: {
        height: hp(7),
        width: wp(55),
        backgroundColor: '#DC3545',
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(2.5),
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
    }
})