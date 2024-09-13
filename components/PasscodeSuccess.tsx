import { StyleSheet, Text, View, Modal, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}
export default function PasscodeSuccess({ modalVisible, setModalVisible }: ModalProps) {
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
                        <Image
                            source={require('@/assets/images/check.png')}
                            resizeMode='contain'
                            style={{
                                width: wp(10),
                                height: hp(5)
                            }}
                        />
                    </View>
                    <Text style={styles.title}>Success</Text>
                    <Text style={styles.subTitle}>Passcode set up! Your account is now more secure.</Text>
                    <TouchableOpacity style={styles.btnStyle}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text
                            style={{
                                fontFamily: "UrbanistSemiBold",
                                fontSize: hp(2),
                                color: "#00BA00"
                            }}
                        >Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBox: {
        width: wp(84),
        // height: Platform.OS === 'ios' ? hp(34) : hp(38),
        paddingVertical: hp(4),
        backgroundColor: "white",
        borderRadius: wp(6),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Platform.OS === 'ios' ? wp(6) : wp(8),
    },
    title: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.2),
        marginTop: hp(2)
    },
    subTitle: {
        fontFamily: "UrbanistSemiBold",
        fontSize: hp(1.8),
        color: "#616161",
        marginTop: hp(1.5),
        textAlign: 'center',
        paddingHorizontal: wp(4)
    },
    btnStyle: {
        width: wp(30),
        height: hp(6),
        borderWidth: 1,
        marginTop: hp(2),
        borderRadius: wp(2),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#00BA00"
    }
})