import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, useLocalSearchParams } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import { subscribeServices } from '@/constants/booking/data';
import { useIsFocused } from '@react-navigation/native';
import { useActivationPromo, useHomeServices, useHomeServicesId } from '@/query/homeQuery';
import { defaultStyles } from '@/constants/Styles';
import { applyCodeSpecialOffer, getHomeServicesById } from '@/apis/homeApi';
import { useQueryClient } from '@tanstack/react-query';
import ErrorPromoCodeModa from '@/components/ErrorPromoCodeModa';
import NotFoundCode from '@/components/modal/NotFoundCode';
import SuccessPromo from '@/components/modal/SuccessPromo';
import useStoreBooking from '@/store/useStoreBooking';
import useStoreSub from '@/store/useStoreSub';

type ConvertedData = {
    key: string;
    value: string;
};

export default function PriorityAfterItemPage() {
    const queryClient = useQueryClient();
    const isFocused = useIsFocused();
    const { itemData, total, total_data } = useLocalSearchParams();
    const [subscription, setSubscription] = useState<string | null>(null); // service subscription data
    const [servciesName, setServicesName] = useState<string | null>(null); // service name?
    const [code, setCode] = useState<string>("");
    const [applyPromo, setApplyPromo] = useState<boolean>(true);
    const { setService, setServiceName, setBasePrice, setItemData, setTotal, setTotalData, setDiscount, setPromoCode } = useStoreBooking();
    const { plan_name } = useStoreSub();
    // modal
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [succesCode, setSuccesCode] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);
    // error
    const [emptyService, setEmptyService] = useState<boolean>(false);
    // data
    const { data: DATA } = useHomeServices(isFocused);
    const { data, isPending } = useActivationPromo(isFocused);
    const serviceData: ConvertedData[] = DATA?.map((item: any) => ({
        key: item._id,
        value: item.title
    }));
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const handleSubmit = async () => {
        if (!code) {
            setErrorModalVisible(true);
        } else {
            try {
                await applyCodeSpecialOffer(code as string);
                queryClient.invalidateQueries({ queryKey: ['activations'] });
                setSuccesCode(true);
            } catch (error) {
                setNotFound(true);
            }
        }
    };

    const toggleSubmit = async () => {
        if (!servciesName) {
            return setEmptyService(true);
        };
        try {
            setEmptyService(false);
            setBtnLoading(true);
            const response = await getHomeServicesById(servciesName as string);
            if (subscription === "Yes") {
                setService(response?.service?._id as string);
                setServiceName(response?.service?.title as string);
                setBasePrice(response?.service?.base_price);
                setItemData(itemData);
                setTotal(total);
                if (data && Array.isArray(data) && data[0] && data[0].special_offer) {
                    setPromoCode(data[0]?.special_offer?.promo_code);
                    setDiscount(data[0]?.special_offer?.discount_value);
                } else {
                    setPromoCode(null)
                    setDiscount("")
                }
                setTotalData(total_data as string);
                router.push('/homePage/services/ChooseSubscription');
                setBtnLoading(false);
            } else {
                setService(response?.service?._id as string);
                setServiceName(response?.service?.title as string);
                setBasePrice(response?.service?.base_price);
                setItemData(itemData);
                setTotal(total);
                if (data && Array.isArray(data) && data[0] && data[0].special_offer) {
                    setPromoCode(data[0]?.special_offer?.promo_code);
                    setDiscount(data[0]?.special_offer?.discount_value);
                } else {
                    setPromoCode(null)
                    setDiscount("")
                }
                setTotalData(total_data as string);
                router.push('/homePage/BookingDetails');
                setBtnLoading(false);
            }
        } catch (error) {
            console.log(error);
            setBtnLoading(false);
        };



    }
    return (
        <View style={styles.container}>

            {errorModalVisible && <ErrorPromoCodeModa modalVisible={errorModalVisible} setModalVisible={setErrorModalVisible} />}
            {notFound && <NotFoundCode modalVisible={notFound} setModalVisible={setNotFound} />}
            {succesCode && <SuccessPromo modalVisible={succesCode} setModalVisible={setSuccesCode} />}
            {/* header */}
            <View style={styles.headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Laundry Details</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* end header */}


            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                extraScrollHeight={hp(2)}
                contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? hp(14) : 0 }}
            >
                <View style={{ marginTop: hp(2), }}>
                    <Text style={[styles.topText, { paddingHorizontal: wp(5) }]}>Enter the amount of items or bags you need.</Text>


                    <View style={{ marginTop: hp(4), paddingHorizontal: wp(5) }}>
                        <Text style={styles.topTitle}>Total clothing items/bags</Text>

                        <TouchableOpacity style={styles.textField}
                            onPress={() => router.back()}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={styles.textStyle}>{total_data} items</Text>
                                <FontAwesome name='caret-right' size={hp(2.5)} />
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.viewTop}>
                        <Text style={styles.topTitle}>Service name</Text>
                        <SelectList
                            setSelected={(val: string) => setServicesName(val)}
                            data={serviceData}
                            save="key"
                            placeholder='Select Service'
                            search={false}
                            boxStyles={[styles.boxStyles, { borderColor: emptyService ? "red" : "#FAFAFA" }]}
                            inputStyles={{ fontFamily: "UrbanistMedium", fontSize: hp(1.9), }}
                            dropdownStyles={styles.dropdownStyles}
                            dropdownTextStyles={styles.dropdownTextStyles}
                            arrowicon={<FontAwesome name='caret-down' size={hp(2.5)} />}
                            maxHeight={300}
                        // defaultOption={{ key: 'Yes', value: '664236fd2ebb7acd3f14c839' }}
                        />
                    </View>

                    <View style={styles.viewTop}>
                        <Text style={styles.topTitle}>Want to subscribe to this service?</Text>
                        {
                            plan_name ? <TouchableOpacity style={styles.textField}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={styles.textStyle}>Yes</Text>
                                    {/* <FontAwesome name='caret-down' size={hp(2.5)} /> */}
                                </View>
                            </TouchableOpacity>
                                :
                                <SelectList
                                    setSelected={(val: string) => setSubscription(val)}
                                    data={subscribeServices}
                                    save="value"
                                    placeholder='Gender'
                                    search={false}
                                    boxStyles={styles.boxStyles}
                                    inputStyles={{ fontFamily: "UrbanistMedium", fontSize: hp(1.9), }}
                                    dropdownStyles={styles.dropdownStyles}
                                    dropdownTextStyles={styles.dropdownTextStyles}
                                    arrowicon={<FontAwesome name='caret-down' size={hp(2.5)} />}
                                    maxHeight={300}
                                    defaultOption={{ key: 'Yes', value: 'Yes' }}
                                />
                        }
                    </View>



                    <View style={styles.viewTop}>
                        <Text style={styles.topTitle}>Promo Code</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={styles.promoTextField}>
                                <TextInput
                                    placeholder='Enter Promo Code'
                                    onChangeText={(text) => setCode(text)}
                                    placeholderTextColor={'#9E9E9E'}
                                    style={{ flex: 1, fontFamily: 'UrbanistMedium', fontSize: hp(1.9) }} />
                            </View>
                            <TouchableOpacity style={styles.promoCircle}
                                onPress={handleSubmit}
                            >
                                <Feather name='plus' size={hp(2.5)} color={'#0A5CA8'} />
                            </TouchableOpacity>
                        </View>
                    </View>



                    {/* Applied */}
                    {
                        data && <View style={{ marginTop: hp(4), }}>
                            <Text style={[styles.topTitle, { paddingHorizontal: wp(5) }]}>Applied Promotions & Offers</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {
                                    data?.map((item: any, index: any) => (
                                        <View style={[styles.appliedInner, { paddingLeft: wp(5) }]} key={index}>
                                            <TouchableOpacity style={applyPromo ? styles.appliedView : styles.appliedNotView}
                                            // onPress={() => setApplyPromo(!applyPromo)}
                                            >
                                                <Text style={styles.appliedText} > {item?.special_offer?.title} - {item?.special_offer?.discount_value}% Off</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </ScrollView>
                        </View>
                    }



                    {
                        Platform.OS === 'android' && <TouchableOpacity style={[defaultStyles.footerBtn, { marginTop: hp(10), alignSelf: 'center' }]}
                            onPress={toggleSubmit}
                        >
                            {btnLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Continue AED {total}</Text>}
                        </TouchableOpacity>
                    }

                </View>
            </KeyboardAwareScrollView>

            {
                Platform.OS === 'ios' && <View style={styles.footer}>
                    <TouchableOpacity style={[defaultStyles.footerBtn, { marginTop: hp(1) }]}
                        onPress={toggleSubmit}
                    >
                        {btnLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={defaultStyles.footerText}>Continue AED {total}</Text>}
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headercontainer: {
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



    topText: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(2)
    },
    topTitle: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2),
    },
    textField: {
        width: wp(90),
        height: hp(7),
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        paddingHorizontal: wp(6),
        marginTop: hp(2),
        borderRadius: wp(4),
    },
    textStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.9)
    },
    viewTop: {
        marginTop: hp(4), paddingHorizontal: wp(5)
    },
    boxStyles: {
        width: wp(90),
        height: hp(7),
        backgroundColor: '#FAFAFA',
        paddingHorizontal: wp(6),
        alignItems: 'center',
        borderColor: 'white',
        marginTop: hp(2),
        borderRadius: wp(4),
    },

    dropdownStyles: {
        borderColor: '#DADADA',
        borderRadius: 6,
        borderWidth: 0.5,
    },
    dropdownTextStyles: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.9),
        marginTop: hp(1.5),
    },


    appliedInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2),
        marginTop: hp(2)
    },
    appliedView: {
        backgroundColor: '#0A5CA8',
        paddingHorizontal: wp(5),
        height: hp(5),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    appliedNotView: {
        paddingHorizontal: wp(5),
        height: hp(5.5),
        borderWidth: 1,
        borderColor: "#0A5CA8",
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    appliedText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
        color: 'white'
    },
    notApplyPromoText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
    },
    promoTextField: {
        width: wp(70),
        height: hp(7),
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        paddingHorizontal: wp(6),
        marginTop: hp(2),
        borderRadius: wp(4),
    },
    promoCircle: {
        width: wp(14),
        height: wp(14),
        marginTop: hp(2),
        backgroundColor: "#DAE7F2",
        borderRadius: wp(7),
        alignItems: 'center',
        justifyContent: 'center'
    },



    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(11.5),
        backgroundColor: 'white',
        borderTopRightRadius: wp(4),
        borderTopLeftRadius: wp(4),
        alignItems: 'center',
    },



})