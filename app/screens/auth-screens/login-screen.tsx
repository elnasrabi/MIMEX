import React, { FunctionComponent, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, TouchableOpacity, Alert } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button, TextField } from "../../components"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"

export interface LoginScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  justifyContent: "center",
  paddingStart: 20,
  paddingEnd: 20
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}

const HEADER: TextStyle = {
  color: color.palette.black,
  alignSelf: "center"
}
const RESET_PASSWORD: TextStyle = {
  color: color.palette.link,
  alignSelf: "center",
  marginTop: 20,
  padding: 10
}
const BOLD: TextStyle = { fontWeight: "bold" }
const USERNAME: TextStyle = { marginTop: 25 }
const CONTINUE: ViewStyle = {
  borderRadius: 4,
  height: 45,
  marginTop: 30
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
export const LoginScreen: FunctionComponent<LoginScreenProps> = observer((props) => {
  const { authStore } = useStores()
  let passwordRef: any

  const onLogin = () => {
    authStore.login()
  }
  const onResetPassword = () => {
    props.navigation.navigate("forgotpassword")
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <Text preset="header" style={HEADER} tx={"loginScreen.title"} />

      <TextField returnKeyType={"next"} onSubmitEditing={() => { passwordRef.focus() }}
        blurOnSubmit={false} style={USERNAME} placeholder={"Enter Username"} />

      <TextField forwardedRef={(input) => { passwordRef = input }}
        returnKeyType={"done"} onSubmitEditing={onLogin}
        placeholder={"Enter Password"} secureTextEntry={true} />

      <Button
        style={CONTINUE}
        textStyle={CONTINUE_TEXT}
        tx="loginScreen.login"
        onPress={onLogin}
      />
      <TouchableOpacity onPress={onResetPassword}>
        <Text style={RESET_PASSWORD} tx={"loginScreen.resetPassword"} />
      </TouchableOpacity>
    </Screen>
  )
})
