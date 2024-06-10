import { Alert, BackHandler, Image, SafeAreaView, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Text, View } from '@/components/Themed';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HomeHeader from '@/components/home/HomeHeader';
import HomeSearch from '@/components/home/HomeSearch';
import HomeSpecialOffers from '@/components/home/HomeSpecialOffers';
import HomeServices from '@/components/home/HomeServices';
import LaundryBundles from '@/components/home/LaundryBundles';
import HomeAds from '@/components/home/HomeAds';
import BundleOffers from '@/components/home/BundleOffers';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
export default function TabOneScreen() {
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Exit App', 'Are you sure you want to exit?', [
          { text: 'Cancel', onPress: () => { } },
          { text: 'OK', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);




  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <HomeHeader />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#DADADA" />
        }
        showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(4), }}>
        <HomeSearch />
        <HomeSpecialOffers />
        <HomeServices />
        <LaundryBundles />
        <HomeAds />
        <BundleOffers />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
