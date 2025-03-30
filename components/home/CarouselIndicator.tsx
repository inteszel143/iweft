import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface CarouselIndicatorProps {
    totalItem: number,
    currentIndex: number
}


export default function CarouselIndicator({ totalItem, currentIndex }: CarouselIndicatorProps) {
    return (
        <View style={styles.indicatorContainer}>
            {[...Array(totalItem)].map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.indicator,
                        index === currentIndex && styles.activeIndicator,
                    ]}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    indicator: {
        width: wp(1),
        height: wp(1),
        borderRadius: 4,
        marginHorizontal: 3,
        backgroundColor: '#FFFFFF', // Inactive color
    },
    activeIndicator: {
        backgroundColor: '#FFFFFF', // Active color
        width: 14,
    },

})