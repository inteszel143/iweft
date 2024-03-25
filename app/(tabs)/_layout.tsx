import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Header from '@/components/booking/Header';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import InboxHeader from '@/components/inbox/InboxHeader';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { Platform } from 'react-native';
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={Platform.OS === 'android' ? 24 : 27} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0a5ca8",
        headerShadowVisible: false,
        tabBarLabelStyle: { fontFamily: 'UrbanistSemiBold' }
      }}>



      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "compass" : "compass-outline"} color={color} />,
        }}
      />


      <Tabs.Screen
        name="booking"
        options={{
          title: 'Bookings',
          headerTitle: "",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "reader" : "reader-outline"} color={color} />,
          header: () => <Header />
        }}
      />



      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "calendar" : "calendar-outline"} color={color} />,
          header: () => <CalendarHeader />
        }}
      />



      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <TabBarIcon name="chatbubble-ellipses-outline" color={color} />,
          header: () => <InboxHeader />
        }}
      />


      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />,
          header: () => <ProfileHeader />
        }}
      />



    </Tabs>
  );
}