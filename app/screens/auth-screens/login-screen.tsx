import React, { FunctionComponent, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button } from "../../components"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"


export interface LoginScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}


const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTINUE: ViewStyle = {
  flex: 1,
  position: 'relative',
  bottom: 0,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

export const LoginScreen: FunctionComponent<LoginScreenProps> = observer((props) => {
  const { authStore } = useStores()
  const onLogin = () => {
    authStore.login();
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" tx="loginScreen.header" />
      <Button
        style={CONTINUE}
        textStyle={CONTINUE_TEXT}
        tx="loginScreen.login"
        onPress={onLogin}
      />
    </Screen>
  )
})
