import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface SingleStarRatingProps {
    rating: number;
}

const SingleStarRating: React.FC<SingleStarRatingProps> = ({ rating }) => {
    let starName = 'star-o'; // Default empty star

    if (rating == 5) {
        starName = 'star'; // Full star
    } else if (rating == 0) {
        starName = 'star-o';
    } else {
        starName = 'star-half-empty'; // Half star
    }
    return (
        <View style={styles.starContainer}>
            <FontAwesome name={starName} size={hp(2.2)} color="#FB9400" />
        </View>
    );
};

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
    },
});

export default SingleStarRating;