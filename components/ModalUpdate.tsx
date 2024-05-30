import { StyleSheet, Text, View, Modal, Platform, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';

interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}
export default function ModalUpdate({ modalVisible, setModalVisible }: ModalProps) {

    const openAppStore = () => {
        const appStoreURL = 'https://apps.apple.com/us/app/facebook/id284882215';
        const playStoreURL = 'https://play.google.com/store/apps/details?id=com.paras23.iMotor.app';
        const url = Platform.OS === 'ios' ? appStoreURL : playStoreURL;
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
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
                    <Text style={styles.updateTitle}>App update</Text>
                    <Text style={styles.subtitle}>We have a new iWeft updates. To continue benefiting from our services, please update your app.</Text>
                    <TouchableOpacity style={styles.updateBtn} onPress={openAppStore}>
                        <Text style={styles.btnText}>Update</Text>
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
        height: Platform.OS === 'ios' ? hp(34) : hp(38),
        backgroundColor: "white",
        borderRadius: wp(6),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Platform.OS === 'ios' ? wp(6) : wp(8),
    },
    updateTitle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2)
    },
    subtitle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.8),
        textAlign: 'center',
        marginTop: hp(2),
        color: "gray",
        paddingHorizontal: wp(1)
    },
    updateBtn: {
        width: wp(50),
        height: hp(6),
        backgroundColor: "#0a5ca8",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(2),
        marginTop: hp(3)
    },
    btnText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8),
        color: 'white'
    }
})