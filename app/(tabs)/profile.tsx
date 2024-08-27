import { StyleSheet, Text, View, } from 'react-native'
import React, { memo, useState } from 'react'
import useValidateRefresh from '@/store/useValidateRefresh';
import NoTokenProfile from '@/components/notoken/NoTokenProfile';
import ProfilePage from '@/components/profile/ProfilePage';
const profile = () => {
    const { refreshToken } = useValidateRefresh();
    if (refreshToken === null) {
        return <NoTokenProfile />
    } else {
        return <ProfilePage />
    }
}

export default memo(profile)

const styles = StyleSheet.create({})