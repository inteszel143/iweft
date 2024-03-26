import { Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome5 } from '@expo/vector-icons';
export default function ProfileTop() {

    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.container}>

            <View style={styles.headerStyle}>
                <Image source={require('@/assets/temp/chaticons/profilecall.jpg')} resizeMode='contain' style={{ width: wp(40), height: hp(16) }} />
                <TouchableOpacity style={styles.editBtn}
                    onPress={toggleModal}
                >
                    <FontAwesome5 name='pen' color={'white'} />
                </TouchableOpacity>
            </View>
            <View style={styles.headerTextStyle}>
                <Text style={styles.nameStyle}>Andrew Ainsley</Text>
                <Text style={styles.emailStyle}>andrewainsley@gmail.com.ph</Text>
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

                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#0A5CA8' }]}>
                            <Text style={[styles.modalText, { color: '#FFFFFF' }]}>Take Photo</Text>
                        </TouchableOpacity >


                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#0A5CA8' }]}>
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
        fontSize: hp(1.8),
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