import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import PaymentPaypal from '@/components/profile/paymentmethod/PaymentPaypal';
import PaymentGoogle from '@/components/profile/paymentmethod/PaymentGoogle';
import PaymentApple from '@/components/profile/paymentmethod/PaymentApple';
import PaymentCreditCard from '@/components/profile/paymentmethod/PaymentCreditCard';
import { defaultStyles } from '@/constants/Styles';
export default function ProfilePayment() {
    
    return (
        <View style={styles.container}>
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Payment Methods</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View>
                <PaymentPaypal />
                <PaymentGoogle />
                <PaymentApple />
                <PaymentCreditCard />
            </View>


            <View style={styles.footer} >
                <TouchableOpacity style={defaultStyles.footerBtn}
                    onPress={() => router.push('/profilePage/AddNewCard')}
                >
                    <Text style={defaultStyles.footerText}>Add New Card</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    Headercontainer: {
        paddingHorizontal: wp(5),
        paddingTop: hp(6),
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(6),
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(5),
    },
    bookingText: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.5)
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        width: wp(100),
        height: hp(12),
        alignItems: 'center'
    },
})