import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
            <Image
                source={require('@/assets/temp/bookmark/rateStar.png')}
                resizeMode='contain'
                style={{
                    width: wp(5),
                    height: hp(2),
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
    },
});

export default SingleStarRating;