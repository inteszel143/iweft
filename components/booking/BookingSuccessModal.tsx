import { StyleSheet, Text, View, Modal, Platform, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';

interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}
export default function BookingSuccessModal({ modalVisible, setModalVisible }: ModalProps) {
    const toggleEreciept = () => {
        setModalVisible(false);
        router.push('/homePage/HomeBookingReceipt');
    };
    const toggleBookings = () => {
        setModalVisible(false);
        router.push('/(tabs)/booking/');
    }


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
                    <Text style={styles.titleStyle}>Booking Successful!</Text>
                    <Text style={styles.subStyle}>You have successfully made payment and book the services.</Text>

                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: '#0A5CA8', }]}
                        onPress={toggleEreciept}
                    >
                        <Text style={[styles.btnText, { color: '#FFFFFF' }]}>View E-Receipt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: '#DAE7F2', }]}
                        onPress={toggleBookings}
                    >
                        <Text style={[styles.btnText, { color: '#0A5CA8' }]}>See Bookings</Text>
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
        height: Platform.OS === 'ios' ? hp(60) : hp(62),
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
        marginTop: hp(2),
        height: hp(7),
        width: wp(72),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
    }
})