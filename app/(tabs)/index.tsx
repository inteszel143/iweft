import { Alert, BackHandler, SafeAreaView, ScrollView, StyleSheet, RefreshControl } from 'react-native';
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
import { useCallback, useEffect, useState } from 'react';
import Test from '../Test';
import { useIsFocused } from '@react-navigation/native';
import { useGetMessageInbox } from '@/query/message';
import { inboxBadge } from '@/utils/validate';
import { useQueryClient } from '@tanstack/react-query';
export default function TabOneScreen() {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const { data: inbox } = useGetMessageInbox(isFocused);
  useEffect(() => {
    if (inbox) {
      inboxBadge(inbox);
    }
  }, [inbox]);
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
    queryClient.invalidateQueries({ queryKey: ['inbox'] });
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
        {/* <Test /> */}
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
