import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from "react-native-screens/native-stack";
import { useStores } from "../models/root-store";
import { ForgotpasswordScreen, LandingScreen, LoginScreen } from "../screens";
import { ChangePassword } from "../screens/auth-screens/changepassword-screen";
import { OTPScreen } from "../screens/auth-screens/otp-screen";
import { OTPChangePassword } from "../screens/auth-screens/OTPChangePassword-screen";
import { OTPForgotPassword } from "../screens/auth-screens/OTPForgotPassword-screen";
import { HelpScreen } from "../screens/help-screen/help-screen";
import { AuthParamList } from "./types";


export interface AuthNavigatorProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const Stack = createNativeStackNavigator<AuthParamList>();
export const AuthNavigator: FunctionComponent<AuthNavigatorProps> = observer(props => {
  const { authStore } = useStores();
 
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
      {(authStore.IsFirstLogin && authStore.IsMobileVerified) ? (
        <Stack.Screen
          name="OTPScreen"
          component={OTPScreen}
          options={{
            headerShown: false,
          }}
        />
        
       ) : (authStore.PasswordShouldChange) ? (
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: false,
          }}
        />
        
       )
       : (authStore.isLoggedIn) ? (
        <Stack.Screen
          name="Home"
          component={LandingScreen}
        />
        
       )
        :  (
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        ) }
      
         <Stack.Screen name="OTPForgotPassword" component={OTPForgotPassword} />
      <Stack.Screen name="OTPChangePassword" component={OTPChangePassword} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="forgotpassword" component={ForgotpasswordScreen} />
     
    </Stack.Navigator>
  );
});
/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["login"];
