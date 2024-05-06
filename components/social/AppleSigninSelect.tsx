import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';

export default function AppleSigninSelect() {
    useEffect(() => {
        return appleAuth.onCredentialRevoked(async () => {
            console.warn('If this function executes, User Credentials have been Revoked');
        });
    }, []);

    async function onAppleButtonPress() {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            // Note: it appears putting FULL_NAME first is important, see issue #293
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });
        console.log(appleAuthRequestResponse);
        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            // user is authenticated
            router.push('/(tabs)/');
        }
    };


    return (
        <View>
            <TouchableOpacity style={styles.btnStyle} onPress={() => onAppleButtonPress()}>
                <View style={styles.btnInner}>
                    <Image source={require('@/assets/temp/authIcons/apple.png')} resizeMode='contain' style={styles.btnImage} />
                    <Text style={styles.btnText}>Continue with Apple</Text>
                </View>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        width: wp(90),
        height: hp(7.5),
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: wp(4),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(5),
        marginTop: hp(2)
    },
    btnText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: '#212121'
    },
    btnInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    btnImage: {
        width: wp(5),
        height: hp(5),
    },
})