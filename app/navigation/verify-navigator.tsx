import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { LoginScreen } from "../screens";
import { OTPScreen } from "../screens/auth-screens/otp-screen";
import { AuthParamList } from "./types";


const Stack = createNativeStackNavigator<AuthParamList>();

export function VerifyNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
    
     
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["login"];
