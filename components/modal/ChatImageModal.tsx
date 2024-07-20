import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}

export default function ChatImageModal({ modalVisible, setModalVisible }: ModalProps) {
    const [image, setImage] = useState<any>(null); // image data

    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera is required!');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            selectionLimit: 1,
            allowsEditing: true,
            quality: 1,
        });
        if (result.canceled === true) {
            return;
        }
        if (!result.canceled) {
            // toggleModal();
            // setModalConfirm(true);
            setImage(result.assets[0].uri);
        }
    };
    const openCamera = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera is required!');
            return;
        }
        let pickerResult = await ImagePicker.launchCameraAsync({
            aspect: [4, 3],
            quality: 1,
        });
        if (pickerResult.canceled === true) {
            return;
        }
        if (!pickerResult.canceled) {
            // toggleModal();
            // setModalConfirm(true);
            setImage(pickerResult?.assets[0].uri);
        }
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
                    <Text style={styles.modalTitle}>Upload Picture</Text>

                    <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#0A5CA8' }]} onPress={openCamera}>
                        <Text style={[styles.modalText, { color: '#FFFFFF' }]}>Take Photo</Text>
                    </TouchableOpacity >


                    <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#0A5CA8' }]} onPress={pickImage}>
                        <Text style={[styles.modalText, { color: '#FFFFFF' }]}>Choose Photo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#DAE7F2' }]}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={[styles.modalText, { color: '#0A5CA8' }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBox: {
        width: wp(84),
        height: Platform.OS === 'ios' ? hp(42) : hp(44),
        backgroundColor: "white",
        borderRadius: wp(6),
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalTitle: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.8),
        color: '#0A5CA8',
        marginBottom: hp(1)
    },
    modalBtn: {
        width: wp(70),
        height: hp(7),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(2)
    },
    modalText: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2)
    },
})
