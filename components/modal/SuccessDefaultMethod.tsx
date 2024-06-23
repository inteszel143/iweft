import { StyleSheet, Text, View, Modal, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}
export default function SuccessDefaultMethod({ modalVisible, setModalVisible }: ModalProps) {

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
                    <View style={{ alignItems: 'center' }}>
                        <Ionicons name='checkmark-circle' size={hp(3.5)} color={'#90EE90'} />
                        <Text style={styles.labelStyle}>Your default payment method has been changed successfully.</Text>
                        <TouchableOpacity style={styles.btnstyle}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.btnText} >OK</Text>
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
        // backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBox: {
        width: wp(86),
        height: Platform.OS === 'ios' ? hp(22) : hp(24),
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: wp(4),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Platform.OS === 'ios' ? wp(6) : wp(8),
    },
    labelStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        textAlign: 'center',
        color: "white",
        marginTop: hp(1.5),
    },
    btnstyle: {
        width: wp(30),
        height: hp(4.5),
        borderWidth: 1,
        borderColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(2),
        borderRadius: wp(1)
    },
    btnText: {
        fontFamily: "UrbanistBold",
        fontSize: hp(1.8),
        color: '#90EE90'
    }
})