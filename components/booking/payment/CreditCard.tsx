import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/services/i18n';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
interface state {
    bookingId: any
}
export default function CreditCard({ bookingId }: state) {
    const { t } = useTranslation();
    const current = getCurrentLanguage();
    return (
        <TouchableOpacity
            style={[defaultStyles.footerBtn, { marginTop: hp(2) }]}
            onPress={() => router.push({
                pathname: '/bookingPage/BookingPin',
                params: { bookingId }
            })}
        >
            <Text style={defaultStyles.footerText}>{t('Continue')}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})