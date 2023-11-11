/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ActivityIndicator, ColorSchemeName, Pressable, View } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import SignInScreen from "../screens/AuthScreens/SignInScreen";
import SignUpScreen from "../screens/AuthScreens/SignUpScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { useAuthenticationStatus } from '@nhost/react';
import ChatStackNavigator from "./ChatStackNavigator";
import ChatContextProvider from "../context/ChatContext";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const {isAuthenticated, isLoading} = useAuthenticationStatus();

  if(isLoading) {
    return <ActivityIndicator />
  }

  if (!isAuthenticated) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: "Sign up" }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <ChatContextProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Event" component={ModalScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </ChatContextProvider>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "",
          tabBarIcon: ({ color }) => (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 10 }}>
              <TabBarIcon name="home" color={color} />   
          </View>
          ),
        })}
      />

      <BottomTab.Screen 
        name="Chat" 
        component={ChatStackNavigator}
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 10 }}>
              <Ionicons name="chatbox-ellipses-outline" size={28} color={color} />
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "",
          tabBarIcon: ({ color }) =>( 
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 10 }}>
            <TabBarIcon name="user" color={color} />
          </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
