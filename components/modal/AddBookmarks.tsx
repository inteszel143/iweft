import { Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Ensure correct typing
}
export default function AddBookmarks({ modalVisible, setModalVisible }: ModalProps) {

    useEffect(() => {
        setTimeout(() => {
            setModalVisible(false);
        }, 3000)
    }, [])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            // presentationStyle='overFullScreen'
            collapsable={true}
            statusBarTranslucent={true}
        >
            <Pressable style={styles.modalStyle}
                onPress={() => setModalVisible(false)}
            >
                <View style={styles.modalBox}>
                    <View style={styles.row}>
                        <View style={styles.leftRow}>
                            <Ionicons name='checkmark-circle' size={hp(2.5)} color={'#93c120'} />
                            <Text style={styles.title}>Added to Bookmarks</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false);
                                router.push('/homePage/Bookmarks');
                            }}
                        >
                            <Text style={styles.btnText}>Manage</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBox: {
        position: 'absolute',
        bottom: Platform.OS === 'android' ? hp(3) : hp(5),
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: wp(92),
        height: hp(6.5),
        borderRadius: wp(3),
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5)
    },
    leftRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2)
    },
    title: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.9),
        color: "white"
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: "white"
    }
})