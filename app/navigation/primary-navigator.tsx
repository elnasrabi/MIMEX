/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react"

import { createDrawerNavigator } from '@react-navigation/drawer'
import { LandingScreen } from "../screens"
import { UserSetting } from "../screens/user-screen/user-setting-screen"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { PrimaryParamList } from "./types"
import { CustomDrawerContent } from "../components/drawer-menu/CustomDrawerContent"
import { VehicleSetting } from "../screens/vehicle-screen/vehicle-setting-screen"
import { QRScanner } from "../components/qr-scanner/qr-scanner"
import { ConsignmentList } from "../screens/consignment-screen/consignment-list"
import { ConsignmentDetail } from "../screens/consignment-screen/consignment-detail"
import { MyList } from "../screens/myList-screen/myList-screen";
import { SafetyCheck } from "../screens/safety-check-screen/safety-check-list-screen";
import { SafetyCheckDetail } from "../screens/safety-check-screen/safety-check-detail-screen";
import { PDFViewer } from "../screens/pdf-view/pdf-viewer"
import { ConsignmentSuccess } from "../screens/consignment-screen/consignment-success"
import { SignatureView } from "../components/signature-view/signature-view"
import { GetARate } from "../screens/get-a-rate-screen/get-a-rate-input-screen";


const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator<PrimaryParamList>()

const SafetyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: 'push'
      }}
    >
      <Stack.Screen name="SafetyCheck" component={SafetyCheck} />
      <Stack.Screen name="SafetyCheckDetail" component={SafetyCheckDetail} />
    </Stack.Navigator>
  )
}
const ConsignmentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: 'push'
      }}
    >
      <Stack.Screen name="consignmentList" component={ConsignmentList} />
      <Stack.Screen name="consignmentDetail" component={ConsignmentDetail} />
      <Stack.Screen name="pdfViewer" component={PDFViewer} />
      <Stack.Screen name="consignmentSuccess" component={ConsignmentSuccess} />
      <Stack.Screen name="qrScanner" component={QRScanner} />
      <Stack.Screen name="signatureView" component={SignatureView} />
    </Stack.Navigator>
  )
}
const LandingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: 'push'
      }}
    >
      <Stack.Screen name="Home" component={LandingScreen} />
      <Stack.Screen name="qrScanner" component={QRScanner} />
    </Stack.Navigator>
  )
}

export function PrimaryNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerPosition='right'
      drawerType='slide'
      keyboardDismissMode="on-drag"
      drawerStyle={{
        width: 250,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="LandingStack" component={LandingStack} />
      <Drawer.Screen name="userSetting" component={UserSetting} />
      <Drawer.Screen name="MyList" component={MyList} />
      <Drawer.Screen name="GetARate" component={GetARate} />
      <Drawer.Screen name="SafetyStack" component={SafetyStack} />
      <Drawer.Screen name="vehicleSetting" component={VehicleSetting} />
      <Drawer.Screen name="ConsignmentStack" component={ConsignmentStack} />
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
