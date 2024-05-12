import { Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome5 } from '@expo/vector-icons';
import { useUserQuery } from '@/query/fetchAuthQuery';
import * as ImagePicker from 'expo-image-picker';
import ModalConfirm from './ModalConfirm';
export default function ProfileTop() {
    const { data } = useUserQuery();
    const [image, setImage] = useState<any>(null); // image data
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(true);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera is required!');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (result.canceled === true) {
            return;
        }
        if (!result.canceled) {
            toggleModal();
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
            toggleModal();
            setImage(pickerResult?.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            {modalConfirm && <ModalConfirm modalVisible={modalConfirm} setModalVisible={setModalConfirm} />}
            <View style={styles.headerStyle}>
                {
                    image === null ? <Image
                        source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${data?.profile_picture}` }}
                        resizeMode='cover'
                        style={{ width: wp(36), height: wp(36), borderRadius: wp(18) }}
                    />
                        :
                        <Image
                            source={{ uri: image }}
                            resizeMode='cover'
                            style={{ width: wp(36), height: wp(36), borderRadius: wp(18) }}
                        />
                }
                <TouchableOpacity style={styles.editBtn}
                    onPress={toggleModal}
                >
                    <FontAwesome5 name='pen' color={'white'} />
                </TouchableOpacity>
            </View>


            <View style={styles.headerTextStyle}>
                <Text style={styles.nameStyle}>{data?.fullname}</Text>
                <Text style={styles.emailStyle}>{data?.email}</Text>
            </View>


            {/* modal */}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                presentationStyle='overFullScreen'
                statusBarTranslucent={true}
            >
                <View style={styles.modalStyle}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Edit Profile Picture</Text>

                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#0A5CA8' }]} onPress={openCamera}>
                            <Text style={[styles.modalText, { color: '#FFFFFF' }]}>Take Photo</Text>
                        </TouchableOpacity >


                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#0A5CA8' }]} onPress={pickImage}>
                            <Text style={[styles.modalText, { color: '#FFFFFF' }]}>Choose Photo</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#F75555' }]}>
                            <Text style={[styles.modalText, { color: '#FFFFFF' }]}>Delete Photo</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#DAE7F2' }]}
                            onPress={toggleModal}
                        >
                            <Text style={[styles.modalText, { color: '#0A5CA8' }]}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    headerStyle: {
        width: wp(35),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(2),
    },
    editBtn: {
        position: 'absolute',
        bottom: 0,
        right: wp(3),
        width: wp(8),
        height: wp(8),
        backgroundColor: "#0A5CA8",
        borderRadius: wp(2),
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTextStyle: {
        alignItems: 'center',
        marginTop: hp(2),
    },
    nameStyle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.8)
    },
    emailStyle: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
        marginTop: hp(1),
        color: "#212121",
    },

    // modal
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
    }
})