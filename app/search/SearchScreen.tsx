import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useHomeServices, useSearchMe } from '@/query/homeQuery';
import FilterSearchData from '@/components/home/FilterSearchData';
export default function SearchScreen() {
  const isFocused = useIsFocused();
  const { data } = useHomeServices(isFocused);
  const [searchKey, setSearchKey] = useState<string>("");
  const { data: searchData, isPending } = useSearchMe(isFocused, searchKey);

  return (
    <View style={styles.container}>

      <View style={styles.headerView}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.replace('/(tabs)/')}>
            <Ionicons name='chevron-back' size={hp(3)} />
          </Pressable>
          <View style={styles.searchStyle}>
            <Ionicons name='search-outline' size={hp(2.6)} color={'gray'} />
            <TextInput
              placeholder='Search here . .'
              placeholderTextColor={"gray"}
              onChangeText={(text) => setSearchKey(text)}
              style={{
                flex: 1,
                fontFamily: "UrbanistMedium", fontSize: hp(1.9)
              }}
            />
          </View>
          <Pressable
            onPress={() => router.push({
              pathname: '/search/SearchDataScreen',
              params: { searchKey: searchKey },
            })}
          >
            <Text style={styles.searchText}>Search</Text>
          </Pressable>
        </View>
      </View>

      {/* Result */}
      <FilterSearchData searchKey={searchKey} />


      {/* You may also like */}
      {
        searchKey === "" && <View style={styles.likeView}>
          <Text style={styles.likeText}>You may also like</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item?._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.cardStyle}
                onPress={() => router.push({
                  pathname: 'homePage/services/ServicesScreen',
                  params: { serviceId: item?._id },
                })}

              >
                <View style={styles.listRow}>
                  <View style={styles.imaging}>
                    <Image
                      source={{ uri: item?.image }}
                      resizeMode='contain'
                      style={styles.imageStyle}
                    />
                  </View>

                  <View style={{ width: wp(45) }}>
                    <Text style={styles.titleText}>{item?.title}</Text>
                    <Text style={styles.subText}>{item?.sub_title}</Text>
                    <Text style={styles.priceText} >AED {item?.base_price}</Text>
                  </View>

                </View>
              </TouchableOpacity>
            )}

          />
        </View>
      }



    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  headerView: {
    paddingHorizontal: wp(3),
    paddingTop: hp(6),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchStyle: {
    flex: 1,
    height: hp(5),
    backgroundColor: "#F2F2F2",
    paddingHorizontal: wp(3),
    borderRadius: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(2),
    gap: wp(2)
  },
  searchText: {
    fontFamily: "UrbanistBold",
    fontSize: hp(1.8),
    color: "#0a5ca8"
  },
  likeView: {
    marginTop: hp(4),
    paddingHorizontal: wp(4)
  },
  likeText: {
    fontFamily: "UrbanistBold",
    fontSize: hp(2.2)
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3)
  },
  cardStyle: {
    alignSelf: 'center',
    width: wp(92),
    paddingVertical: hp(2),
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: wp(4),
    marginTop: hp(1.5),
    paddingHorizontal: wp(2),
  },
  imageStyle: {
    width: wp(20),
    height: hp(10)
  },
  titleText: {
    fontFamily: 'UrbanistBold',
    fontSize: hp(2.2),
    marginTop: hp(1.5)
  },
  imaging: {
    width: wp(24),
    height: hp(11),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: wp(2),
  },
  priceText: {
    fontFamily: 'UrbanistBold',
    fontSize: hp(2.2),
    color: '#0A5CA8'
  },
  subText: {
    fontFamily: 'UrbanistRegular',
    fontSize: hp(1.8),
    color: '#616161',
    paddingVertical: hp(1)
  },
  resultView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },
  resultLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4)
  },
  resultCircle: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(50),
    backgroundColor: "#F2F2F2",
    alignItems: 'center',
    justifyContent: 'center'
  },
  resultText: {
    fontFamily: "UrbanistMedium",
    fontSize: hp(1.9)
  },
  resultBtn: {
    marginTop: hp(2)
  },
  emptyResultView: {
    alignItems: 'center',
    marginTop: hp(2.5)
  },
  emptyResultText: {
    fontFamily: "UrbanistMedium",
    fontSize: hp(1.9)
  }
})