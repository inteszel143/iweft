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
import { StripeProvider } from '@stripe/stripe-react-native';
import {
  QueryClient, QueryClientProvider,
} from '@tanstack/react-query';
import { LogBox } from "react-native";
export {
  ErrorBoundary,
} from 'expo-router';
const queryClient = new QueryClient();
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);
LogBox.ignoreLogs(['Warning: CountryModal: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead..']);
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
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StripeProvider
          publishableKey={`${process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY}`}
          urlScheme="iweft" // required for 3D Secure and bank redirects
          merchantIdentifier="merchant.com.iweft" // required for Apple Pay
        >
          <RootLayoutNav />
        </StripeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack
      screenOptions={{
        animation: "slide_from_right"
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false, }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      <Stack.Screen name="BookingChat" options={{ header: () => <HeaderChat />, headerShadowVisible: false }} />
      <Stack.Screen name="Undercontruct" options={{ headerShown: false }} />

      {/* auth */}
      <Stack.Screen name="authPage/OnboardingScreen" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="authPage/SelectLoginPage" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="authPage/LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="authPage/AfterLogin" options={{ headerShown: false }} />
      <Stack.Screen name="authPage/AfterEmailVerification" options={{ headerShown: false }} />

      <Stack.Screen name="authPage/RegisterScreen" options={{ headerShown: false }} />
      <Stack.Screen name="authPage/forgot/ForgotPassScreen" options={{ headerShown: false }} />
      <Stack.Screen name="authPage/forgot/ForgotCode" options={{ headerShown: false }} />
      <Stack.Screen name="authPage/forgot/CreateNewPassword" options={{ headerShown: false }} />
      <Stack.Screen name="authPage/AfterSocialLogin" options={{ headerShown: false, gestureEnabled: false }} />


      <Stack.Screen name="authPage/create/ProfileData" options={{ headerShown: false }} />
      <Stack.Screen name="authPage/create/YourAddress" options={{ headerShown: false }} />
      <Stack.Screen name="authPage/create/CreateNewPIN" options={{ headerShown: false }} />
      <Stack.Screen name="authPage/create/VerificationCode" options={{ headerShown: false }} />

      {/* home */}
      <Stack.Screen name='homePage/Notification' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/Bookmarks' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/SepecialOffers' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/OfferOtherPage' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/SubscriptionOffer' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/SubscriptionPlan' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/BookingDetails' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/BookingAddress' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/HomePaymentMethods' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/HomeReviewSummary' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/HomeConfirmPin' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/HomeBookingReceipt' options={{ headerShown: false }} />

      {/* servcies */}
      <Stack.Screen name='homePage/services/ServicesScreen' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/services/PhotosVideos' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/services/BookNow' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/services/AfterItemPage' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/services/ChooseSubscription' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/services/PlansScreen' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/services/PlantSelectMethod' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/services/AllServices' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/services/PlanType' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/services/DriverInstruction' options={{ headerShown: false }} />

      {/* items */}
      <Stack.Screen name='homePage/item/ItemPage' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/item/FilterPage' options={{ headerShown: false }} />


      {/* bundles */}
      <Stack.Screen name='homePage/budles/BuddleScreen' options={{ headerShown: false }} />
      <Stack.Screen name='homePage/budles/AllLaundryBundles' options={{ headerShown: false }} />


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
      <Stack.Screen name='profilePage/ProfilePaymentHistory' options={{ headerShown: false }} />
      <Stack.Screen name='profilePage/AddNewCard' options={{ headerShown: false }} />
      <Stack.Screen name='profilePage/Notification' options={{ headerShown: false }} />
      <Stack.Screen name='profilePage/Security' options={{ headerShown: false }} />
      <Stack.Screen name='profilePage/ChangePassword' options={{ headerShown: false }} />
      <Stack.Screen name='profilePage/ChangePin' options={{ headerShown: false }} />
      <Stack.Screen name='profilePage/ChangePhoneNumber' options={{ headerShown: false }} />
      <Stack.Screen name='profilePage/PhoneNumberCode' options={{ headerShown: false }} />
      <Stack.Screen name='profilePage/Language' options={{ headerShown: false }} />
      <Stack.Screen name='profilePage/Subscription' options={{ headerShown: false }} />
      <Stack.Screen name='profilePage/SubscriptionSummary' options={{ headerShown: false }} />
      <Stack.Screen name='profilePage/SubscriptionCancelSummary' options={{ headerShown: false }} />
      <Stack.Screen name='profilePage/PrivacyPolicy' options={{ headerShown: false }} />
      <Stack.Screen name='profilePage/InviteFriends' options={{ headerShown: false }} />

      {/* payment */}
      <Stack.Screen name='profilePage/payment/ManagePayment' options={{ headerShown: false }} />

    </Stack>
    // </ThemeProvider>
  );
}