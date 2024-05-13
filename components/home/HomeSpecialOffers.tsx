import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel from 'react-native-reanimated-carousel';
import CarouselIndicator from './CarouselIndicator';
import { Link, router } from 'expo-router';
const data = [
    {
        img: require('@/assets/temp/special/carousel1.png')
    },
    {
        img: require('@/assets/temp/special/carousel2.png')
    },
    {
        img: require('@/assets/temp/special/carousel3.png')
    },
];
const width = Dimensions.get('window').width;
export default function HomeSpecialOffers() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.specialText}>Special Offers</Text>
                <Link href={'/homePage/SepecialOffers'} asChild>
                    <TouchableOpacity>
                        <Text style={styles.seeallText}>See all</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <View>
                <Carousel
                    loop
                    width={width}
                    height={width / 2}
                    autoPlay={true}
                    pagingEnabled
                    data={data}
                    autoPlayInterval={4000}
                    scrollAnimationDuration={500}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    renderItem={({ item, index }) => (
                        <View

                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                paddingTop: hp(6),
                            }}
                        >
                            <View
                            // onPress={() => router.push({
                            //     pathname: '/homePage/OfferOtherPage',
                            //     params: item
                            // })}
                            >
                                <Image source={item.img}
                                    resizeMode='contain'
                                    style={{
                                        width: wp(100),
                                    }}
                                />
                            </View>
                            <Text style={{ textAlign: 'center', fontSize: 30 }}>
                                {index}
                            </Text>
                        </View>
                    )}
                />
            </View>

            <View style={styles.indicatorStyle}>
                <CarouselIndicator totalItem={data.length} currentIndex={activeIndex} />
            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: hp(3),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
    },
    specialText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(2.4),
    },
    seeallText: {
        fontFamily: 'UrbanistBold',
        fontSize: hp(1.8),
        color: '#0a5ca8'
    },

    indicatorStyle: {
        alignItems: 'center'
    }
})