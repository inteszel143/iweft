import "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import HeaderChat from "@/components/inbox/HeaderChat";
import HeaderCustomerSupport from "@/components/inbox/HeaderCustomerSupport";
export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    UrbanistBlack: require('../assets/fonts/Urbanist-Black.ttf'),
    UrbanistBold: require('../assets/fonts/Urbanist-Bold.ttf'),
    UrbanistSemiBold: require('../assets/fonts/Urbanist-SemiBold.ttf'),
    UrbanistMedium: require('../assets/fonts/Urbanist-Medium.ttf'),
    UrbanistRegular: require('../assets/fonts/Urbanist-Regular.ttf'),

    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootLayoutNav />
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="BookingChat" options={{ header: () => <HeaderChat />, headerShadowVisible: false }} />


        {/* home */}
        <Stack.Screen name='homePage/Notification' options={{ headerShown: false }} />
        <Stack.Screen name='homePage/Bookmarks' options={{ headerShown: false }} />


        {/* booking */}
        <Stack.Screen name='bookingPage/Ereceipt' options={{ headerShown: false }} />
        <Stack.Screen name='bookingPage/BookingPaymentMethod' options={{ headerShown: false }} />
        <Stack.Screen name='bookingPage/BookingPin' options={{ headerShown: false }} />
        <Stack.Screen name='bookingPage/BookingSummary' options={{ headerShown: false }} />
        {/* booking */}


        {/* chat */}
        <Stack.Screen name='chatPage/CustomerSupport' options={{ header: () => <HeaderCustomerSupport />, headerShadowVisible: false }} />
        <Stack.Screen name='chatPage/CallCustomer' options={{ headerShown: false }} />
        <Stack.Screen name='chatPage/CallUserHistory' options={{ headerShown: false }} />


        {/* profile */}
        <Stack.Screen name='profilePage/EditProfile' options={{ headerShown: false }} />
        <Stack.Screen name='profilePage/CurrentAddress' options={{ headerShown: false }} />
        <Stack.Screen name='profilePage/ProfilePayment' options={{ headerShown: false }} />
        <Stack.Screen name='profilePage/AddNewCard' options={{ headerShown: false }} />
        <Stack.Screen name='profilePage/Notification' options={{ headerShown: false }} />
        <Stack.Screen name='profilePage/Security' options={{ headerShown: false }} />
        <Stack.Screen name='profilePage/ChangePassword' options={{ headerShown: false }} />
        <Stack.Screen name='profilePage/ChangePin' options={{ headerShown: false }} />
        <Stack.Screen name='profilePage/Language' options={{ headerShown: false }} />
        <Stack.Screen name='profilePage/Subscription' options={{ headerShown: false }} />
        <Stack.Screen name='profilePage/SubscriptionSummary' options={{ headerShown: false }} />
        <Stack.Screen name='profilePage/PrivacyPolicy' options={{ headerShown: false }} />
        <Stack.Screen name='profilePage/InviteFriends' options={{ headerShown: false }} />

      </Stack>
    </ThemeProvider>
  );
}