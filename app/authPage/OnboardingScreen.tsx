import { ImageURISource, SafeAreaView, StyleSheet, Text, View, ViewToken } from 'react-native'
import React, { useCallback } from 'react'
import Animated, {
    useAnimatedRef,
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import ListItem from '@/components/boarding/ListItem';
import PaginationElement from '@/components/boarding/PaginationElement';
import Button from '@/components/boarding/Button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const pages = [
    {
        text: 'We provide professional service at a friendly price',
        image: require('@/assets/temp/onboarding/onboarding1.jpg'),
    },
    {
        text: 'The best results and your satisfaction is our top priority',
        image: require('@/assets/temp/onboarding/onboarding2.jpg'),
    },
    {
        text: 'Never worry about laundry again with iweft',
        image: require('@/assets/temp/onboarding/onboarding3.jpg'),
    },
];

export default function OnboardingScreen() {
    const x = useSharedValue(0);
    const flatListIndex = useSharedValue(0);
    const flatListRef = useAnimatedRef<
        Animated.FlatList<{
            text: string;
            image: ImageURISource;
        }>
    >();

    const onViewableItemsChanged = useCallback(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
            flatListIndex.value = viewableItems[0].index ?? 0;
        },
        []
    );
    const scrollHandle = useAnimatedScrollHandler({
        onScroll: (event) => {
            x.value = event.contentOffset.x;
        },
    });


    const renderItem = useCallback(
        ({
            item,
            index,
        }: {
            item: { text: string; image: ImageURISource };
            index: number;
        }) => {
            return <ListItem item={item} index={index} x={x} />;
        },
        [x]
    );

    return (
        <SafeAreaView style={styles.container}>
            <Animated.FlatList
                ref={flatListRef}
                onScroll={scrollHandle}
                horizontal
                scrollEventThrottle={16}
                pagingEnabled={true}
                data={pages}
                keyExtractor={(_, index) => index.toString()}
                bounces={false}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                style={{ paddingTop: hp(3) }}
            />
            <PaginationElement length={pages.length} x={x} />
            <Button
                currentIndex={flatListIndex}
                length={pages.length}
                flatListRef={flatListRef}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
})