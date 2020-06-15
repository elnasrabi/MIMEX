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
import { ConsignmentList } from "../screens/consignment-screen/consignment-list-screen"
import { ConsignmentDetail } from "../screens/consignment-screen/consignment-detail-screen"
import { MyList } from "../screens/myList-screen/myList-screen";
import { SafetyCheck } from "../screens/safety-check-screen/safety-check-list-screen";
import { SafetyCheckDetail } from "../screens/safety-check-screen/safety-check-detail-screen";
import { ConsignmentSuccess } from "../screens/consignment-screen/consignment-success-screen"
import { ConsignmentSpecial } from "../screens/consignment-screen/consignment-special-screen"
import { PDFViewer } from "../screens/pdf-view/pdf-viewer-screen"
import { SignatureView } from "../screens/signature-view-screen/signature-view-screen"
import { GetARate } from "../screens/get-a-rate-screen/get-a-rate-input-screen";
import { GetARateList } from "../screens/get-a-rate-screen/get-a-rate-list-screen";
import { HelpScreen } from "../screens/help-screen/help-screen";


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
const GetARateStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: 'push'
      }}
    >
      <Stack.Screen name="GetARate" component={GetARate} />
      <Stack.Screen name="GetARateList" component={GetARateList} />
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
      <Stack.Screen name="consignmentSpecial" component={ConsignmentSpecial} />
      <Stack.Screen name="qrScanner" component={QRScanner} />
      <Stack.Screen name="signatureView" component={SignatureView} />
    </Stack.Navigator>
  )
}

const MyListStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: 'push'
      }}
    >
      <Stack.Screen name="MyList" component={MyList} />
      <Stack.Screen name="pdfViewer" component={PDFViewer} />
      <Stack.Screen name="consignmentSuccess" component={ConsignmentSuccess} />
      <Stack.Screen name="consignmentDetail" component={ConsignmentDetail} />
      <Stack.Screen name="consignmentSpecial" component={ConsignmentSpecial} />
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
      <Stack.Screen name="consignmentList" component={ConsignmentStack} />
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
      <Drawer.Screen name="GetARateStack" component={GetARateStack} />
      <Drawer.Screen name="MyListStack" component={MyListStack} />
      <Drawer.Screen name="SafetyStack" component={SafetyStack} />
      <Drawer.Screen name="vehicleSetting" component={VehicleSetting} />
      <Drawer.Screen name="ConsignmentStack" component={ConsignmentStack} />
      <Drawer.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="consignmentSuccess" component={ConsignmentSuccess} />
      <Stack.Screen name="consignmentSpecial" component={ConsignmentSpecial} />
      <Stack.Screen name="signatureView" component={SignatureView} />
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
