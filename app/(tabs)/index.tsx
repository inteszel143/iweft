import { Image, SafeAreaView, ScrollView, StyleSheet, TextInput } from 'react-native';
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
export default function TabOneScreen() {



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <HomeHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(4), }}>
        <HomeSearch />
        <HomeSpecialOffers />
        <HomeServices />
        <LaundryBundles />
        <HomeAds />
        <BundleOffers />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
