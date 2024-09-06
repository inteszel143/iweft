import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSearchMe } from '@/query/homeQuery';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
interface State {
    searchKey: string;
}
export default function FilterSearchData({ searchKey }: State) {
    const isFocused = useIsFocused();
    const { data, isPending } = useSearchMe(isFocused, searchKey);
    if (searchKey === "") {
        return (
            <View></View>
        )
    };

    if (!data || data == 0) {
        return (
            // <View style={styles.emptyResultView}>
            //     <Text style={styles.emptyResultText}>~ No result found ~</Text>
            // </View>
            <></>
        )
    } else {
        return (
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.resultBtn}
                        // onPress={() => router.push({
                        //     pathname: 'homePage/services/ServicesScreen',
                        //     params: { serviceId: item?._id },
                        // })}
                        onPress={() => router.push({
                            pathname: '/search/SearchDataScreen',
                            params: { searchKey: item?.title },
                        })}
                    >
                        <View style={styles.resultView}>
                            <View style={styles.resultLeft}>
                                <View style={styles.resultCircle}>
                                    <Feather name='search' size={hp(2)} />
                                </View>
                                <Text style={styles.resultText}>{item?.title}</Text>
                            </View>
                            <Feather name='arrow-up-left' size={hp(2)} />
                        </View>
                    </TouchableOpacity>
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    resultView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
    },
    resultLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4)
    },
    resultCircle: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(50),
        backgroundColor: "#F2F2F2",
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultText: {
        fontFamily: "UrbanistMedium",
        fontSize: hp(1.9)
    },
    resultBtn: {
        marginTop: hp(2)
    },
    emptyResultView: {
        alignItems: 'center',
        marginTop: hp(2.5)
    },
    emptyResultText: {
        fontFamily: "UrbanistMedium",
        fontSize: hp(1.9)
    }
})