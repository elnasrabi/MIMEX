import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { useStores } from "../../models/root-store"
import { color, typography } from "../../theme"
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer'

export interface CustomDrawerContentProps {
  navigation?: NativeStackNavigationProp<ParamListBase>
}

const LABEL: TextStyle = { fontFamily: typography.primary, fontSize: 16, color: color.palette.darkText }

export const CustomDrawerContent: FunctionComponent<CustomDrawerContentProps> = observer((props) => {
  const { authStore } = useStores()

  const onLogout = () => {
    authStore.logout()
  }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        labelStyle={LABEL}
        onPress={() => props.navigation.navigate("LandingStack")}
      />
      <DrawerItem
        labelStyle={LABEL}
        label="My List"
        onPress={() => props.navigation.navigate("MyListStack")}
      />
      {/* <DrawerItem
        labelStyle={LABEL}
        label="Safety Check"
        onPress={() => props.navigation.navigate("SafetyStack")}
      /> */}
      {/* <DrawerItem
        labelStyle={LABEL}
        label="Get a Rate"
        onPress={() => props.navigation.navigate("GetARateStack")}
      /> */}
      <DrawerItem
        labelStyle={LABEL}
        label="Help"
        onPress={() => props.navigation.navigate("HelpScreen")}
      />
      <DrawerItem
        labelStyle={LABEL}
        label="User Setting"
        onPress={() => props.navigation.navigate("userSetting")}
      />
      {/* <DrawerItem
        labelStyle={LABEL}
        label="Vehicle Setting"
        onPress={() => props.navigation.navigate("vehicleSetting")}
      /> */}
      <DrawerItem
        labelStyle={LABEL}
        label="Logout"
        onPress={onLogout}
      />

    </DrawerContentScrollView>
  )
})
