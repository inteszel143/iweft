import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import useStore from '@/store/store';
export default function Test() {

    const { count, user, increase, decrease, setName, setAge } = useStore();
    const [name, setNameInput] = React.useState(user.name);
    return (
        <View>

            <Text style={styles.counter}>Count: {count}</Text>
            <Button title="Increase" onPress={increase} />
            <Button title="Decrease" onPress={decrease} />
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setNameInput}
                onEndEditing={() => setName(name)}
            />
            <Text style={styles.label}>Age:</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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