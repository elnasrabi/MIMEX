import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { LoginScreen, ForgotpasswordScreen } from "../screens"
import { AuthParamList } from "./types"
import { HelpScreen } from "../screens/help-screen/help-screen";
import { PrimaryNavigator } from "./primary-navigator";

const Stack = createNativeStackNavigator<AuthParamList>()

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: 'push'
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="PrimaryNavigator" component={PrimaryNavigator} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="forgotpassword" component={ForgotpasswordScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["login", "PrimaryNavigator"]
