import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, useLocalSearchParams } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import { useHomeServices } from '@/query/homeQuery';
import { postAvailSubscription } from '@/apis/stripe';
import AvailSubscriptionModal from '@/components/home/AvailSubscriptionModal';
import useStoreSub from '@/store/useStoreSub';
import errorRes from '@/apis/errorRes';

export default function PlanType() {
    const { collection, total, priceId, setSubscriptionId } = useStoreSub();
    const isFocused = useIsFocused();
    const { data, isPending } = useHomeServices(isFocused);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<number[]>([]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [modalSuccess, setModalSuccess] = useState(false);

    const handleSelect = (index: number) => {
        setSelected(prevSelected => {
            if (prevSelected.includes(index)) {
                return prevSelected.filter(item => item !== index);
            } else {
                return [...prevSelected, index];
            }
        });
    };

    const handleSelectServices = (id: string): void => {
        setSelectedServices((prevSelected: string[]) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((serviceId: string) => serviceId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const onSubmit = async () => {
        setLoading(true);
        try {
            const response = await postAvailSubscription(priceId as string, selectedServices);
            setSubscriptionId(response?.subscriptionId);
            setTimeout(() => {
                setLoading(false);
                setModalSuccess(true);
            }, 1000);
        } catch (error) {
            setLoading(false);
            Alert.alert(errorRes(error));
        }
    };

    return (
        <View style={styles.container}>
            {modalSuccess && <AvailSubscriptionModal modalVisible={modalSuccess} setModalVisible={setModalSuccess} />}
            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Subscription Services</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.containerStyle}>
                <Text style={[styles.topText,]}>Choose {collection} the service you want to subscribe to:</Text>


                {/* card */}
                <FlatList
                    data={data}
                    keyExtractor={item => item?._id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={styles.cardStyle}
                            onPress={() => {
                                handleSelect(index);
                                handleSelectServices(item?._id);
                            }}
                        >
                            <View style={styles.cardRow}>
                                <Image source={{ uri: item?.image }} resizeMode='contain' style={{ width: wp(18), height: hp(10) }} />
                                <Text style={styles.titleStyle}>{item?.title}</Text>
                                {selected.includes(index) ? <FontAwesome name='check-circle' size={hp(3)} color={'#0A5CA8'} /> : <FontAwesome name='circle-thin' size={hp(3)} color={'#0A5CA8'} />}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    // style={[defaultStyles.footerBtn, { backgroundColor: selected.length > parseInt(collection as any) ? "#0A5CA8" : "#DADADA" }]}
                    style={[defaultStyles.footerBtn, { backgroundColor: "#0A5CA8" }]}
                    disabled={selected.length >= 1 ? false : true}
                    onPress={onSubmit}
                >
                    {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Continue - AED {total} Monthly</Text>}
                </TouchableOpacity>
            </View>


        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    Headercontainer: {
        paddingHorizontal: wp(5),
        paddingTop: hp(6),
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(6),
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(5),
    },
    bookingText: {
        fontFamily: "UrbanistBold",
        fontSize: hp(2.5)
    },
    containerStyle: {
        flex: 1,
        marginTop: hp(3),

    },
    topText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2),
        paddingHorizontal: wp(5)
    },
    cardStyle: {
        alignSelf: 'center',
        width: wp(92),
        paddingVertical: hp(2),
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: wp(4),
        marginTop: hp(2.5),
        paddingHorizontal: wp(5.5),
        shadowColor: "#DDDDDD",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleStyle: {
        flex: 1,
        paddingHorizontal: wp(5),
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        height: hp(11),
        backgroundColor: 'white',
        alignSelf: 'center'
    }
})