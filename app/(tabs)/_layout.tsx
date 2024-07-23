import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import Header from "@/components/booking/Header";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import InboxHeader from "@/components/inbox/InboxHeader";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { Image, Platform } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import { useUserQuery } from "@/query/fetchAuthQuery";
import { BlurView } from 'expo-blur';
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "@/services/i18n";
import useProfileBadge from "@/store/useProfileBadge";
import useInboxBadge from "@/store/useInboxBadge";
import useBookingBadge from "@/store/useBookingBadge";
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return (
    <Ionicons
      size={Platform.OS === "android" ? 24 : 27}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}
export default function TabLayout() {
  const { value } = useProfileBadge();
  const { bookingValue } = useBookingBadge();
  const { inboxValue } = useInboxBadge();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const current = getCurrentLanguage();
  if (current === 'ar') {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#0a5ca8",
          headerShadowVisible: false,
          tabBarLabelStyle: {
            fontFamily: "UrbanistSemiBold",
            paddingBottom: Platform.OS === "android" ? 2 : 0,
          },
          // lazy: false
        }}
      >
        <Tabs.Screen
          name="profile"
          options={{
            title: t('Profile'),
            headerShown: false,
            // tabBarBadge: validate ? 1 : null,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
                color={color}
              />
            ),
            // header: () => <ProfileHeader />,
          }}
        />



        <Tabs.Screen
          name="inbox"
          options={{
            title: t('Inbox'),
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="chatbubble-ellipses-outline" color={color} />
            ),
            header: () => <InboxHeader />,
          }}
        />


        <Tabs.Screen
          name="calendar"
          options={{
            title: t('Calendar'),
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "calendar" : "calendar-outline"}
                color={color}
              />
            ),
            header: () => <CalendarHeader />,
          }}
        />

        <Tabs.Screen
          name="booking"
          options={{
            title: t('Bookings'),
            headerTitle: "",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "reader" : "reader-outline"}
                color={color}
              />
            ),
            header: () => <Header />,
          }}
        />


        <Tabs.Screen
          name="index"
          options={{
            title: t('Home'),
            headerShown: false,
            // tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "compass" : "compass-outline"} color={color} />,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Image
                  source={require("@/assets/icons/boldhome.png")}
                  resizeMode="contain"
                  style={{
                    width: Platform.OS === "ios" ? 23 : 20,
                    tintColor: "#0a5ca8",
                  }}
                />
              ) : (
                <Image
                  source={require("@/assets/icons/home.png")}
                  resizeMode="contain"
                  style={{
                    width: Platform.OS === "ios" ? 23 : 20,
                    tintColor: "gray",
                  }}
                />
              ),
          }}
        />

      </Tabs>
    )
  } else {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#0a5ca8",
          headerShadowVisible: false,
          tabBarLabelStyle: {
            fontFamily: "UrbanistSemiBold",
            paddingBottom: Platform.OS === "android" ? 2 : 0,
          },
          // lazy: false
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t('Home'),
            headerShown: false,
            // tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "compass" : "compass-outline"} color={color} />,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Image
                  source={require("@/assets/icons/boldhome.png")}
                  resizeMode="contain"
                  style={{
                    width: Platform.OS === "ios" ? 23 : 20,
                    tintColor: "#0a5ca8",
                  }}
                />
              ) : (
                <Image
                  source={require("@/assets/icons/home.png")}
                  resizeMode="contain"
                  style={{
                    width: Platform.OS === "ios" ? 23 : 20,
                    tintColor: "gray",
                  }}
                />
              ),
          }}
        />

        <Tabs.Screen
          name="booking"
          options={{
            title: t('Bookings'),
            headerTitle: "",
            tabBarBadge: bookingValue as string,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "reader" : "reader-outline"}
                color={color}
              />
            ),
            header: () => <Header />,
          }}
        />

        <Tabs.Screen
          name="calendar"
          options={{
            title: t('Calendar'),
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "calendar" : "calendar-outline"}
                color={color}
              />
            ),
            header: () => <CalendarHeader />,
          }}
        />

        <Tabs.Screen
          name="inbox"
          options={{
            title: t('Inbox'),
            tabBarBadge: inboxValue as string,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="chatbubble-ellipses-outline" color={color} />
            ),
            header: () => <InboxHeader />,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: t('Profile'),
            headerShown: false,
            tabBarBadge: value as string,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
                color={color}
              />
            ),
            // header: () => <ProfileHeader />,
          }}
        />
      </Tabs>
    );
  }

}
