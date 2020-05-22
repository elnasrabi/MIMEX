import React, { FunctionComponent, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, TouchableOpacity, Alert, ImageStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button, TextField, Icon } from "../../components"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { MyButton } from "../../components/button/my-button"
import { isInternetAvailable } from "../../utils/utils"

export interface LoginScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  justifyContent: "center",
  paddingStart: 25,
  paddingEnd: 25
}
const RESET_PASSWORD: TextStyle = {
  color: color.palette.red,
  alignSelf: "center",
  marginTop: 25,
  fontSize: 16,
  padding: 10
}

const TEXT_INVALID: TextStyle = {
  ...RESET_PASSWORD,
  fontSize: 20,
  textAlign: "center"
}

const USERNAME: TextStyle = { marginTop: 25 }
const CONTINUE: ViewStyle = {
  marginTop: 30,
  alignSelf: "center"
}

const AFS_LOGO: ImageStyle = {
  height: 120,
  width: 240,
  alignSelf: "center"
}
const TRUCK_LOGO: ImageStyle = {
  height: 140,
  width: 280,
  alignSelf: "center",
  marginTop: 50
}
const INPUT_USERNAME = "username"
const INPUT_PASSWORD = "password"
export const LoginScreen: FunctionComponent<LoginScreenProps> = observer((props) => {
  const { authStore } = useStores()
  // const [username, onChangeUsername] = useState("")
  // const [password, onChangePassword] = useState("")
  const [isValidUsername, setValidUsername] = useState(true)
  const [isValidPassword, setValidPassword] = useState(true)

  const [username, onChangeUsername] = useState("cs@ste")
  const [password, onChangePassword] = useState("a6a/qNs}Np")
  let passwordRef: any

  useEffect(() => {
    authStore.resetLoginAuth()
  }, [])

  const onLogin = () => {
    const isConnected = isInternetAvailable()
    if (!username) {
      setValidUsername(false)
    } else if (!password) {
      setValidPassword(false)
    } else if (isConnected) {
      authStore.login(username, password)
      // authStore.resetAuth()
    }
  }

  const onChangeText = (type, text) => {
    if (type === INPUT_USERNAME) {
      onChangeUsername(text)
      text ? setValidUsername(true) : setValidUsername(false)
    } else {
      onChangePassword(text)
      text ? setValidPassword(true) : setValidPassword(false)
    }
  }

  const onResetPassword = () => {
    props.navigation.navigate("forgotpassword")
  }
  return (
    <Screen style={ROOT} preset="scroll" backgroundColor="black">

      <Icon style={AFS_LOGO} icon={"afsLogo"} />
      {authStore.hasLoginError ? <Text style={TEXT_INVALID} tx={"loginScreen.invalidUsernamePassword"} />
        : <Icon style={TRUCK_LOGO} icon={"loginLogo"} />}

      <TextField
        labelTx={"loginScreen.username"}
        returnKeyType={"next"}
        onSubmitEditing={() => { passwordRef.focus() }}
        blurOnSubmit={false}
        style={USERNAME}
        errorTx={isValidUsername ? undefined : "loginScreen.errorUsername"}
        placeholder={"Enter Username"}
        onChangeText={text => onChangeText(INPUT_USERNAME, text)}
        value={username}
        keyboardType={"email-address"}
      />
      <TextField
        labelTx={"loginScreen.password"}
        forwardedRef={(input) => { passwordRef = input }}
        returnKeyType={"done"} onSubmitEditing={onLogin}
        placeholder={"Enter Password"}
        errorTx={isValidPassword ? undefined : "loginScreen.errorPassword"}
        secureTextEntry={true}
        onChangeText={text => onChangeText(INPUT_PASSWORD, text)}
        value={password}
      />
      <TouchableOpacity onPress={onResetPassword}>
        <Text style={RESET_PASSWORD} tx={"loginScreen.resetPassword"} />
      </TouchableOpacity>
      <MyButton
        style={CONTINUE}
        isLoading={authStore.isLoginLoading}
        tx="loginScreen.login"
        onPress={onLogin}
      />
    </Screen>
  )
})
