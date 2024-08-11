import React, { useState } from 'react'
import useValidateRefresh from '@/store/useValidateRefresh';
import NoTokenProfile from '@/components/notoken/NoTokenProfile';
import ProfilePage from '@/components/profile/ProfilePage';
export default function Page() {
    const { refreshToken } = useValidateRefresh();
    if (refreshToken === null) {
        return <NoTokenProfile />
    } else {
        return <ProfilePage />
    }
}