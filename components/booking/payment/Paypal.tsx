import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface state {
    bookingId: any
}

export default function Paypal({ bookingId }: state) {

    const { t } = useTranslation();
    const current = getCurrentLanguage();
    return (
        <TouchableOpacity
            style={[defaultStyles.footerBtn, { marginTop: hp(2) }]}
            // onPress={() => router.push({
            //     pathname: '/bookingPage/BookingPin',
            //     params: { bookingId }
            // })}
            onPress={() => Alert.alert('Paypal is not available', 'Please select other payment method')}
        >
            <Text style={defaultStyles.footerText}>{t('Continue')}</Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({})