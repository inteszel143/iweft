import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions, MaterialTopTabNavigationEventMap } from "@react-navigation/material-top-tabs"
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withLayoutContext } from "expo-router";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "@/services/i18n";
const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions, typeof Navigator, TabNavigationState<ParamListBase>, MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
    const { t } = useTranslation();
    const current = getCurrentLanguage();
    if (current === 'ar') {
        return (
            <MaterialTopTabs screenOptions={{
                tabBarActiveTintColor: '#0a5ca8',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: { fontSize: hp(1.9), fontFamily: 'UrbanistSemiBold', textTransform: 'capitalize' },
                tabBarPressColor: 'white',
                tabBarIndicatorStyle: { backgroundColor: '#0a5ca8', height: 3, width: wp(27), marginLeft: wp(4), borderRadius: wp(4), },
            }} >
                <MaterialTopTabs.Screen name="cancel" options={{ title: t('Cancelled') }} />
                <MaterialTopTabs.Screen name="complete" options={{ title: t('Completed') }} />
                <MaterialTopTabs.Screen name="index" options={{ title: t('Upcoming') }} />
            </MaterialTopTabs>
        )
    } else {
        return (
            <MaterialTopTabs screenOptions={{
                tabBarActiveTintColor: '#0a5ca8',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: { fontSize: hp(1.9), fontFamily: 'UrbanistSemiBold', textTransform: 'capitalize' },
                tabBarPressColor: 'white',
                tabBarIndicatorStyle: { backgroundColor: '#0a5ca8', height: 3, width: wp(27), marginLeft: wp(4), borderRadius: wp(4), },
            }} >
                <MaterialTopTabs.Screen name="index" options={{ title: t('Upcoming') }} />
                <MaterialTopTabs.Screen name="complete" options={{ title: t('Completed') }} />
                <MaterialTopTabs.Screen name="cancel" options={{ title: t('Cancelled') }} />
            </MaterialTopTabs>
        )
    }
}
