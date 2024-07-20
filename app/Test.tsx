import { View, Text } from 'react-native'
import React from 'react'
import { useIsFocused } from '@react-navigation/native';
import { useGetMessage } from '@/query/message';

export default function Test() {
    
    return (
        <View>
            <Text>Test</Text>
        </View>
    )
}