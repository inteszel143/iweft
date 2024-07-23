import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { itemList, items } from '@/constants/home/data';
import { defaultStyles } from '@/constants/Styles';
import { useItemCategory, useItems } from '@/query/homeQuery';
import { useIsFocused } from '@react-navigation/native';
import ItemCategorySkeleton from '@/components/skeleton/ItemCategorySkeleton';
import ItemDataSkeleton from '@/components/skeleton/ItemDataSkeleton';
import useStoreBooking from '@/store/useStoreBooking';

export default function ItemPage() {
    const { service, service_name, base_price } = useLocalSearchParams();
    const isFocused = useIsFocused();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [itemData, setItemData] = useState<any>({});
    const { data: categoryData, isPending: categoryPending } = useItemCategory(isFocused);
    const { data: DATA, isPending: dataPending } = useItems(isFocused);
    const { setServiceModel } = useStoreBooking();
    // hook
    const [topSelect, setTopSelect] = useState(null);

    const increment = (item: any) => {
        setItemData((prevData: any) => ({
            ...prevData,
            [item._id]: {
                quantity: (prevData[item._id]?.quantity || 0) + 1,
                price: item.price,
                item_total_amount: (prevData[item._id]?.quantity || 0) + 1 * item.price,
            }
        }));
    };

    // Function to decrement the quantity of a specific item
    const decrement = (item: any) => {
        setItemData((prevData: any) => {
            const updatedQuantity = Math.max((prevData[item._id]?.quantity || 0) - 1, 0);

            // If quantity becomes 0, remove the item
            if (updatedQuantity === 0) {
                const { [item._id]: removedItem, ...rest } = prevData;
                return rest;
            }

            return {
                ...prevData,
                [item._id]: {
                    quantity: updatedQuantity,
                    price: item.price,
                    item_total_amount: updatedQuantity * item.price,
                }
            };
        });
    };
    // Function to calculate the total cost of all items
    const getTotalCost = (): number => {
        return Object.values(itemData).reduce((total: number, item: any) => total + (item.quantity * item.price), 0);
    };
    const getTotalItems = (): number => {
        return Object.keys(itemData).filter(itemId => itemData[itemId].quantity > 0).length;
    };
    const handleCategoryPress = (caterogydata: string) => {
        setSelectedCategory(caterogydata);
    }

    const transformData = (data: any) => {
        // Initialize an empty array to store the transformed items
        const transformedItems: any = [];

        // Iterate over each key-value pair in the input data
        Object.keys(data).forEach(key => {
            const quantity = data[key].quantity; // Extract the quantity
            const item_total_amount = data[key].item_total_amount;
            transformedItems.push({
                item: key,
                quantity: quantity,
                item_total_amount: item_total_amount
            });
        });
        return transformedItems;
    };
    const transformedData = transformData(itemData);
    const filteredData = selectedCategory === 'All' ? DATA : DATA?.filter((item: any) => item.item_category_id.toLowerCase().includes(selectedCategory.toLowerCase()));
    const searchFilter = filteredData?.filter((item: any) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const total = getTotalCost().toFixed(2);
    const onSubmit = async () => {
        setServiceModel("Service");
        const itemDataString = JSON.stringify(transformedData);
        router.push({
            pathname: 'homePage/services/AfterItemPage',
            params: { service, service_name, base_price, total, itemData: itemDataString, total_data: getTotalItems() }
        });
    }

    return (
        <View style={styles.container}>

            <View style={styles.Headercontainer}>
                <View style={styles.innerContainer}>

                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} resizeMode='contain' style={{ width: wp(8) }} />
                        </TouchableOpacity>
                        <Text style={styles.bookingText} >Items</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bookingMenu.png')} resizeMode='contain' style={{ width: wp(7.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={styles.searchContainer}>
                <View style={styles.searchLeft}>
                    <Image source={require('@/assets/icons/search.png')} resizeMode='contain' style={{ width: wp(6.5) }} />
                    <TextInput
                        placeholder='Seach items'
                        placeholderTextColor={'#BDBDBD'}
                        onChangeText={(text) => setSearchQuery(text)}
                        style={{ flex: 1, fontFamily: 'UrbanistMedium', fontSize: hp(1.9) }} />
                </View>
                <TouchableOpacity onPress={() => router.push('homePage/item/FilterPage')}>
                    <Image source={require('@/assets/icons/filter.png')} resizeMode='contain' style={{ width: wp(6.5) }} />
                </TouchableOpacity>
            </View>
            {
                categoryPending ? <ItemCategorySkeleton />
                    :
                    <View style={{ paddingVertical: hp(1), backgroundColor: 'white' }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: hp(2) }}>
                            <TouchableOpacity
                                style={topSelect === null ? [styles.scrollStyle, { backgroundColor: '#0A5CA8' }] : [styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}
                                onPress={() => {
                                    setTopSelect(null);
                                    handleCategoryPress("All");
                                }}
                            >
                                <Text style={topSelect === null ? [styles.scrollText, { color: 'white' }] : [styles.scrollText, { color: '#0A5CA8' }]}>All</Text>
                            </TouchableOpacity>

                            {
                                categoryData?.map((item: any, index: any) => {
                                    return (
                                        <TouchableOpacity key={index} style={topSelect == index ? [styles.scrollStyle, { backgroundColor: '#0A5CA8' }] : [styles.scrollStyle, { borderWidth: 1.5, borderColor: "#0A5CA8" }]}
                                            onPress={() => {
                                                setTopSelect(index);
                                                handleCategoryPress(item._id);
                                            }}
                                        >
                                            <Text style={topSelect == index ? [styles.scrollText, { color: 'white' }] : [styles.scrollText, { color: '#0A5CA8' }]}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
            }


            {
                dataPending ? <ItemDataSkeleton />
                    :
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(12) }}>
                        {
                            searchFilter?.map((item: any, index: any) => (
                                <View style={[styles.cardStyle, { alignSelf: 'center' }]} key={index}>
                                    <View style={styles.innerCardStyle}>
                                        <Image
                                            source={{ uri: item.image }}
                                            resizeMode='contain'
                                            style={{ width: wp(12), height: hp(5) }} />
                                        <View style={{ flex: 1, marginLeft: wp(4), paddingHorizontal: wp(1) }}>
                                            <Text style={styles.bundleText}>{item.name}</Text>
                                            <Text style={styles.price}>+ AED {item.price}</Text>
                                        </View>
                                        <View style={styles.rightStyle}>
                                            <TouchableOpacity style={styles.circle}
                                                onPress={() => decrement(item)}
                                                disabled={!itemData[item._id]?.quantity}
                                            >
                                                <Text style={styles.btnText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.quantity}>{itemData[item._id]?.quantity || 0}</Text>
                                            <TouchableOpacity style={styles.circle}
                                                onPress={() => increment(item)}
                                            >
                                                <Text style={styles.btnText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }

                    </ScrollView>
            }

            <View style={styles.footer}>
                <TouchableOpacity style={[defaultStyles.footerBtn, { marginTop: hp(1) }]} onPress={onSubmit}
                    disabled={getTotalItems() === 0 ? true : false}
                >
                    <Text style={defaultStyles.footerText}>Continue AED {getTotalCost().toFixed(2)}</Text>
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
    innerCardStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },



    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(6),
        height: hp(6.5),
        width: wp(91),
        backgroundColor: "#F5F5F5",
        marginTop: hp(1.5),
        borderRadius: wp(4),
        alignSelf: 'center'
    },
    searchLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
        width: '90%',
        backgroundColor: 'transparent'
    },



    scrollStyle: {
        paddingHorizontal: wp(5),
        height: hp(4),
        borderRadius: wp(4),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp(4),
    },
    scrollText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(1.8)
    },


    cardStyle: {
        width: wp(90),
        backgroundColor: '#FFFFFF',
        borderRadius: wp(4),
        marginTop: hp(2.5),
        justifyContent: 'center',
        paddingVertical: hp(4),
        paddingHorizontal: wp(5),
        shadowColor: "#DDDDDD",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },
    bundleText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.2)
    },
    price: {
        fontFamily: 'UrbanistMedium',
        fontSize: hp(1.6),
        color: "#616161",
        marginTop: hp(1)
    },
    quantity: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2)
    },
    circle: {
        width: wp(11),
        height: wp(11),
        borderRadius: wp(6),
        backgroundColor: '#DAE7F2',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontFamily: 'UrbanistSemiBold',
        fontSize: hp(2),
        color: '#0A5CA8'
    },
    rightStyle: {
        flexDirection: 'row', alignItems: 'center', gap: wp(4)
    },


    footer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(12),
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
    }

})