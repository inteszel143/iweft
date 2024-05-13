import { ActivityIndicator, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useUserQuery } from '@/query/fetchAuthQuery';
import * as ImagePicker from 'expo-image-picker';
import { userDeleteProfileImage, userUpdateProfileImage } from '@/apis/userupdate';
import errorRes from '@/apis/errorRes';
import { useQueryClient } from "@tanstack/react-query";
export default function ProfileTop() {
    const queryClient = useQueryClient();
    const { data, isFetching } = useUserQuery();
    const [image, setImage] = useState<any>(null); // image data
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [btnModalLoading, setBtnModalLoading] = useState(false)
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
            setModalConfirm(true);
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
            setModalConfirm(true);
            setImage(pickerResult?.assets[0].uri);
        }
    };

    const toggleConfirm = async () => {
        setBtnModalLoading(true);
        const formData = new FormData();
        try {
            // FEATURE IMAGE
            const filename = image.split("/").pop();
            const fileType = filename.split('.').pop();
            formData.append("profile_picture", {
                uri: image,
                name: filename,
                type: `image/${fileType}`,
            });
            await userUpdateProfileImage(formData);
            queryClient.invalidateQueries({ queryKey: ['user-data'] });
            setImage(null);
            setBtnModalLoading(false);
            setModalConfirm(false);
        } catch (error) {
            setModalConfirm(false);
            setBtnModalLoading(false);
            console.log(errorRes(error));
        }
    };

    const toggleDeletePhoto = async () => {
        try {
            await userDeleteProfileImage();
            setImage(null);
            queryClient.invalidateQueries({ queryKey: ['user-data'] });
            toggleModal();
        } catch (error) {
            toggleModal();
            console.log(error);
        }
    }

    function confirmModal() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalConfirm}
                presentationStyle='overFullScreen'
                statusBarTranslucent={true}
            >
                <View style={styles.modalStyle}>
                    <View style={styles.modalBoxConfirm}>
                        <Text style={styles.titleStyle}>Are you sure?</Text>
                        <Text style={styles.subStyle}>You want to update your profile picture ?</Text>
                        <View style={{ marginTop: hp(2.5) }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2) }}>
                            <TouchableOpacity style={[styles.btnStyle, { borderWidth: 1, borderColor: '#DADADA' }]} onPress={() => {
                                setModalConfirm(false);
                                setImage(null);
                            }}>
                                <Text style={[styles.btnText, { color: '#424242' }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btnStyle, { backgroundColor: '#0a5ca8', }]} onPress={toggleConfirm}>
                                {btnModalLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={[styles.btnText, { color: 'white' }]}>Confirm</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        )
    }

    if (isFetching) {
        return (
            <ActivityIndicator size={'small'} color={'gray'} />
        )
    }

    return (
        <View style={styles.container}>
            {confirmModal()}
            <View style={styles.headerStyle}>
                {
                    image === null ? <Image
                        source={{ uri: data?.profile_picture }}
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
                {data?.profile_picture === "https://res.cloudinary.com/dgepgnzoc/image/upload/v1715604259/uploads_profile_pictures/default_profile_picture.jpg" && <View style={styles.warning}>
                    <AntDesign name='exclamationcircle' size={hp(2.5)} color={'red'} />
                </View>}
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


                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#F75555' }]} onPress={toggleDeletePhoto}>
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
    warning: {
        position: 'absolute',
        top: hp(2),
        right: wp(1),
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
        height: hp(6),
        width: wp(34),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
    },
    modalBoxConfirm: {
        width: wp(88),
        height: Platform.OS === 'ios' ? hp(28) : hp(30),
        backgroundColor: "white",
        borderRadius: wp(6),
        alignItems: 'center',
        justifyContent: 'center'
    }

})