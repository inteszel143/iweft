import { StyleSheet, Text, View, Modal, Platform, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { getCurrentLanguage } from '@/services/i18n';
interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}

export default function ChangeLanguage({ modalVisible, setModalVisible }: ModalProps) {
    const current = getCurrentLanguage();
    useEffect(() => {
        const timer = setTimeout(() => {
            setModalVisible(false);
            router.replace('/(tabs)/');
        }, 2000);
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
                    <ActivityIndicator size={'large'} color={'#0A5CA8'} />
                    <Text style={styles.titleStyle}>Please wait...</Text>
                    <Text style={styles.subStyle}>Updating in <Text style={{ color: "#0A5CA8" }} >{current === "en" ? "English (US)" : current === "ar" ? "Arabic" : current === "man" ? "Mandarin" : current === "hindi" ? "Hindi" : current === "spa" ? "Spanish" : current === "fr" ? "French" : current === "ben" ? "Bengali" : current === "rus" ? "Russian" : "Indonesia"}</Text> Language. please wait patiently. </Text>
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
        height: Platform.OS === 'ios' ? hp(28) : hp(30),
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
        fontSize: hp(2.5),
        textAlign: 'center',
        color: '#0A5CA8',
        marginTop: hp(1)
    },
    subStyle: {
        fontFamily: 'UrbanistRegular',
        fontSize: hp(2.1),
        textAlign: 'center',
        color: "#212121",
        marginTop: hp(1),
        paddingHorizontal: wp(3),
        letterSpacing: 0.8,
    },
    btnStyle: {
        marginTop: hp(2.5),
        height: hp(7),
        width: wp(65),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
    }
})