import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


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
        width: 8,
        height: 6,
        borderRadius: 4,
        marginHorizontal: 5,
        backgroundColor: '#D3D3D3', // Inactive color
    },
    activeIndicator: {
        backgroundColor: '#0a5ca8', // Active color
        width: 14,
    },

})