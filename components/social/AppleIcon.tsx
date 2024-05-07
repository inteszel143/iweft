import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as AppleAuthentication from 'expo-apple-authentication';
export default function AppleIcon() {

    const [appleAuthAvailable, setAppleAvailable] = useState(false);
    useEffect(() => {
        const checkAvailable = async () => {
            const isAvailable = await AppleAuthentication.isAvailableAsync();
            setAppleAvailable(isAvailable);
        }
        checkAvailable();
    }, []);



    const login = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });
            console.log(credential);
        } catch (e) {
            console.log(e);
        }
    }




    return (
        <View>
            <TouchableOpacity style={styles.box} onPress={() => login()}>
                <Image source={require('@/assets/temp/authIcons/apple.png')} resizeMode='contain' style={styles.btnImage} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: wp(22),
        height: hp(7),
        borderWidth: 1,
        borderColor: "#EEEEEE",
        borderRadius: wp(4),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnImage: {
        width: wp(5),
        height: hp(5),
    },
})