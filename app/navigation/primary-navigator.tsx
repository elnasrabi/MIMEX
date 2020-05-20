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
import { color } from "../theme"
import { CustomDrawerContent } from "../components/drawer-menu/CustomDrawerContent"
import { VehicleSetting } from "../screens/vehicle/vehicle-setting"
import { QRScanner } from "../components/qr-scanner/qr-scanner"
import { ConsignmentList } from "../screens/consignment-screen/consignment-list"
import { ConsignmentDetail } from "../screens/consignment-screen/consignment-detail"
import { MyList } from "../screens/myList-screen/myList";
import { SafetyCheck } from "../screens/safety-check-screen/safety-check-list";
import { SafetyCheckDetail } from "../screens/safety-check-screen/safety-check-detail";

// const Stack = createNativeStackNavigator<PrimaryParamList>()

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator<AuthParamList>()

export function PrimaryNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerPosition='right'
      drawerType='slide'
      keyboardDismissMode="on-drag"
      drawerStyle={{
        width: 240,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={LandingScreen} />
      <Drawer.Screen name="userSetting" component={UserSetting} />
      <Drawer.Screen name="MyList" component={MyList} />
      <Drawer.Screen name="SafetyCheck" component={SafetyCheck} />
      <Drawer.Screen name="vehicleSetting" component={VehicleSetting} />
      <Drawer.Screen name="consignmentList" component={ConsignmentList} />
      <Stack.Screen name="qrScanner" component={QRScanner} />
      <Stack.Screen name="consignmentDetail" component={ConsignmentDetail} />
      <Stack.Screen name="SafetyCheckDetail" component={SafetyCheckDetail} />
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
