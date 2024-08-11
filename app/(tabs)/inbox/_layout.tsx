import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions, MaterialTopTabNavigationEventMap } from "@react-navigation/material-top-tabs"
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withLayoutContext } from "expo-router";
import useValidateRefresh from "@/store/useValidateRefresh";
import NoTokenInbox from "@/components/notoken/NoTokenInbox";
const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions, typeof Navigator, TabNavigationState<ParamListBase>, MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
    const { refreshToken } = useValidateRefresh();

    if (refreshToken === null) {
        return <NoTokenInbox />
    } else {
        return (
            <MaterialTopTabs screenOptions={{
                tabBarActiveTintColor: '#0a5ca8',
                tabBarInactiveTintColor: 'gray',
                tabBarPressColor: 'white',
                tabBarLabelStyle: { fontSize: hp(1.9), fontFamily: 'UrbanistSemiBold', textTransform: 'capitalize' },
                tabBarIndicatorStyle: { backgroundColor: '#0a5ca8', height: 3, width: wp(42), marginLeft: wp(4), borderRadius: wp(4), }
            }} >
                <MaterialTopTabs.Screen name="index" options={{ title: 'Chats' }} />
                <MaterialTopTabs.Screen name="calls" options={{ title: 'Calls' }} />

            </MaterialTopTabs>
        )
    }
}
