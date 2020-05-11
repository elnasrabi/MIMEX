/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react"

// import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { createDrawerNavigator } from '@react-navigation/drawer'
import { LandingScreen } from "../screens"
import { UserSetting } from "../screens/user-screen/user-setting"
// import { PrimaryParamList } from "./types"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { AuthParamList } from "./types"

// const Stack = createNativeStackNavigator<PrimaryParamList>()

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator<AuthParamList>()

export function PrimaryNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerPosition='left'
      drawerType='slide'
      overlayColor="transparent"
      keyboardDismissMode="on-drag"
      drawerStyle={{
        backgroundColor: '#c6cbef',
        width: 240,
      }}
    >
      <Drawer.Screen name="Home" component={LandingScreen} />
      <Drawer.Screen name="User Setting" component={UserSetting} />
    </Drawer.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
// export const exitRoutes: string[] = ["landing"]
