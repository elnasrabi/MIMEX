import React, { FunctionComponent, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, TouchableOpacity, Alert, Linking } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button, TextField } from "../../components"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'

export interface CustomDrawerContentProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const LABEL: TextStyle = { fontSize: 16, fontWeight: "bold", color: color.palette.darkText }

export const CustomDrawerContent: FunctionComponent<CustomDrawerContentProps> = observer((props) => {
  const { authStore } = useStores()
  let passwordRef: any

  const onLogout = () => {
    authStore.logout()
  }
  const onResetPassword = () => {
    props.navigation.navigate("forgotpassword")
  }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        labelStyle={LABEL}
        onPress={() => props.navigation.navigate("Home")}
      />
      <DrawerItem
        labelStyle={LABEL}
        label="User Setting"
        onPress={() => props.navigation.navigate("userSetting")}
      />

      <DrawerItem
        labelStyle={LABEL}
        label="Vehicle Setting"
        onPress={() => props.navigation.navigate("vehicleSetting")}
      />

      <DrawerItem
        labelStyle={LABEL}
        label="Logout"
        onPress={onLogout}
      />

    </DrawerContentScrollView>
  )
})
