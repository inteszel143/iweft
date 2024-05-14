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
import { useIsFocused } from "@react-navigation/native";
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
  // const isFocused = useIsFocused();
  const colorScheme = useColorScheme();
  // const { data } = useUserQuery(isFocused);
  // console.log(data);
  // const validate =
  //   ((data?.profile_picture ===
  //     "https://res.cloudinary.com/dgepgnzoc/image/upload/v1715604259/uploads_profile_pictures/default_profile_picture.jpg") ||
  //     (data?.address === null) ||
  //     (data?.apartment_number === null) ||
  //     (data?.city === null) ||
  //     (data?.contact_number === null) ||
  //     (data?.nickname === null)) as boolean;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0a5ca8",
        headerShadowVisible: false,
        tabBarLabelStyle: {
          fontFamily: "UrbanistMedium",
          paddingBottom: Platform.OS === "android" ? 2 : 0,
        },
        // lazy: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
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
          title: "Bookings",
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
        name="calendar"
        options={{
          title: "Calendar",
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
          title: "Inbox",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chatbubble-ellipses-outline" color={color} />
          ),
          header: () => <InboxHeader />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
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
    </Tabs>
  );
}
