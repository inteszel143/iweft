import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import { subscribeServices } from '@/constants/booking/data';
import { defaultStyles } from '@/constants/Styles';
interface ServiceItem {
    _id: string;
    title: string;
    sub_title: string;
    base_price: number;
    image: string;
    other_images: string[];
    details: string;
    status: string;
    created_by: {
        _id: string;
        email: string;
    };
    updated_by: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export default function BookNow() {
    const { item } = useLocalSearchParams();
    const serviceItem: ServiceItem = JSON.parse(item as string);
    const [subscription, setSubscription] = useState<string | null>(null); // service subscription data

    const toggleSubmit = () => {
        if (subscription === "Yes") {
            router.push('/homePage/services/ChooseSubscription');
        } else {
            router.push('/homePage/BookingDetails');
        }
    }


    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.Headercontainer}>
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


            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(14) }}>
                <View style={[styles.containerStyle]}>
                    <Text style={[styles.topText, { paddingHorizontal: wp(5) }]}>Enter the amount of items or bags you need.</Text>

                    <View style={{ marginTop: hp(4), paddingHorizontal: wp(5) }}>
                        <Text style={styles.topTitle}>Total clothing items/bags</Text>

                        <Link href={'/homePage/item/ItemPage'} asChild>
                            <TouchableOpacity style={styles.textField}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={styles.textStyle}>2 items</Text>
                                    <FontAwesome name='caret-right' size={hp(2.5)} />
                                </View>
                            </TouchableOpacity>
                        </Link>
                    </View>
                    <View style={styles.viewTop}>
                        <Text style={styles.topTitle}>Service name</Text>
                        <TouchableOpacity style={styles.textField}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={styles.textStyle}>{serviceItem?.title}</Text>
                                <FontAwesome name='caret-right' size={hp(2.5)} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewTop}>
                        <Text style={styles.topTitle}>Want to subscribe to this service?</Text>
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
                            arrowicon={<FontAwesome name='caret-right' size={hp(2.5)} />}
                            maxHeight={300}
                            defaultOption={{ key: 'Yes', value: 'Yes' }}
                        />
                    </View>
                    <View style={styles.viewTop}>
                        <Text style={styles.topTitle}>Promo Code</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={styles.promoTextField}>
                                <TextInput
                                    placeholder='Enter Promo Code'
                                    placeholderTextColor={'#9E9E9E'}
                                    style={{ flex: 1, fontFamily: 'UrbanistMedium', fontSize: hp(1.9) }} />
                            </View>
                            <TouchableOpacity style={styles.promoCircle}>
                                <Feather name='plus' size={hp(2.5)} color={'#0A5CA8'} />
                            </TouchableOpacity>
                        </View>
                    </View>


                    {/* Applied */}
                    <View style={{ marginTop: hp(4), }}>
                        <Text style={[styles.topTitle, { paddingHorizontal: wp(5) }]}>Applied Promotions & Offers</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={[styles.appliedInner, { paddingLeft: wp(5) }]}>
                                <View style={styles.appliedView} >
                                    <Text style={styles.appliedText} >Refer a Friend - 30% Off</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                </View>
            </ScrollView>





            <View style={styles.footer}>
                <TouchableOpacity style={[defaultStyles.footerBtn, { marginTop: hp(1) }]}
                    onPress={toggleSubmit}
                >
                    <Text style={defaultStyles.footerText}>Continue AED 125</Text>
                </TouchableOpacity>
            </View>


        </View>
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
        marginTop: hp(2),
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
    textStyle: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.9)
    },
    viewTop: {
        marginTop: hp(4), paddingHorizontal: wp(5)
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

    footerBtn: {
        width: wp(90),
        height: hp(6.5),
        backgroundColor: "#0A5CA8",
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(2.5)
    },
    footerText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2),
        color: 'white'
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
        width: wp(60),
        height: hp(5.5),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    appliedText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
        color: 'white'
    }

})