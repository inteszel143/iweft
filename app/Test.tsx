// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import Barcode from '@kichiyaki/react-native-barcode-generator';
// export default function Test() {
//     return (
//         <View>
//             <Barcode
//                 format="CODE128"
//                 value="SK7263727399"
//                 text="SK7263727399"
//                 width={3}
//                 maxWidth={350}
//                 height={120}
//                 textStyle={{ fontFamily: 'UrbanistSemiBold', fontSize: 16, marginTop: 10 }}
//                 lineColor="#000000"
//                 background="#FFFFFF"
//                 style={{ marginTop: 10 }}
//             />

//         </View>
//     )
// }

// const styles = StyleSheet.create({})

import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Linking } from 'react-native';
import { initPaymentSheet, useStripe } from '@stripe/stripe-react-native';
import { postCollectPayment, postPaymentIntent } from '@/apis/stripe';
export default function Test() {

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const initializePaymentSheet = async () => {
        const {
            setupIntent,
            ephemeralKey,
            customer,
        } = await postCollectPayment();

        const { error } = await initPaymentSheet({
            returnURL: 'https://com.paras23.iweft/exp+iweft://expo-development-client/?url=http%3A%2F%2F192.168.100.20%3A8081',
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            setupIntentClientSecret: setupIntent,
        });
        if (!error) {
            setLoading(true);
        }
    };


    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your payment method is successfully set up for future payments!');
        }
    };


    useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <View style={styles.container}>
            <Button
                disabled={!loading}
                title="Set up"
                onPress={openPaymentSheet}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    counter: {
        fontSize: 48,
        marginBottom: 20,
    },
    label: {
        marginTop: 20,
        fontSize: 18,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: 200,
        marginVertical: 10,
    },
    userInfo: {
        marginTop: 20,
        fontSize: 20,
    },
});


