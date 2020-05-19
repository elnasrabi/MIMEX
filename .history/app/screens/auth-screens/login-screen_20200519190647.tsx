import React, { FunctionComponent, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, TouchableOpacity, Alert, ImageStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button, TextField, Icon } from "../../components"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { MyButton } from "../../components/button/my-button"
import { isInternetAvailable } from "../../utils/utils"
import api from "@storybook/addon-storyshots"
import { Api } from "../../services/api"

export interface LoginScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  justifyContent: "center",
  paddingStart: 25,
  paddingEnd: 25
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}

const BOLD: TextStyle = { fontWeight: "bold" }
const RESET_PASSWORD: TextStyle = {
  color: color.palette.red,
  alignSelf: "center",
  marginTop: 25,
  fontSize: 16,
  padding: 10
}
const USERNAME: TextStyle = { marginTop: 25 }
const CONTINUE: ViewStyle = {
  marginTop: 30,
  alignSelf: "center"
}

const AFS_LOGO: ImageStyle = { height: 120, width: 240, alignSelf: "center" }
const TRUCK_LOGO: ImageStyle = { height: 140, width: 280, alignSelf: "center", marginTop: 50 }

export const LoginScreen: FunctionComponent<LoginScreenProps> = observer((props) => {
  const { authStore } = useStores()
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  let passwordRef: any

  const onLogin = async () => {
    // authStore.login()
    const isConnected = await isInternetAvailable()
    if (isConnected) {
      const api = new Api()
      api.setup()
      api.loginUser()
    }
  }
  const onResetPassword = () => {
    props.navigation.navigate("forgotpassword")
  }
  return (
    <Screen style={ROOT} preset="scroll">

      <Icon style={AFS_LOGO} icon={"afsLogo"} />
      <Icon style={TRUCK_LOGO} icon={"loginLogo"} />

      <TextField
        labelTx={"loginScreen.username"}
        returnKeyType={"next"}
        onSubmitEditing={() => { passwordRef.focus() }}
        blurOnSubmit={false}
        style={USERNAME}
        placeholder={"Enter Username"}
        onChangeText={text => onChangeUsername(text)}
        value={username}
      />
      <TextField
        labelTx={"loginScreen.password"}
        forwardedRef={(input) => { passwordRef = input }}
        returnKeyType={"done"} onSubmitEditing={onLogin}
        placeholder={"Enter Password"}
        secureTextEntry={true}
        onChangeText={text => onChangePassword(text)}
        value={password}
      />
      <TouchableOpacity onPress={onResetPassword}>
        <Text style={RESET_PASSWORD} tx={"loginScreen.resetPassword"} />
      </TouchableOpacity>
      <MyButton
        style={CONTINUE}
        tx="loginScreen.login"
        onPress={onLogin}
      />
    </Screen>
  )
})
