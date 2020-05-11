import React, { FunctionComponent, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button, TextField } from "../../components"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Header } from "./../../components"

export interface UserSettingProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  // justifyContent: "center",
  // paddingStart: 20,
  // paddingEnd: 20
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}
const BOLD: TextStyle = { fontWeight: "bold" }

const HEADER: TextStyle = {
  color: color.palette.black,
  alignSelf: "center"
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
  color: "#666666"
}

const RESET_PASSWORD: TextStyle = {
  color: color.palette.link,
  alignSelf: "center",
  marginTop: 20,
  padding: 10
}
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

export const UserSetting: FunctionComponent<UserSettingProps> = observer((props) => {
  const { authStore } = useStores()
  const onLogin = () => {
    authStore.login()
  }
  const onResetPassword = () => {
    props.navigation.navigate("forgotpassword")
  }
  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])

  return (
    <Screen style={ROOT} preset="fixed">
      <Header
        headerTx="userSetting.header"
        leftIcon="back"
        onLeftPress={goBack}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <Text preset="header" style={HEADER} tx={"userSetting.title"} />

      {/* <TextField style={USERNAME} placeholder={"Enter Username"} />
      <TextField placeholder={"Enter Password"} />

      <Button
        style={CONTINUE}
        textStyle={CONTINUE_TEXT}
        tx="userSetting.login"
      />
      <TouchableOpacity onPress={onResetPassword}>
        <Text style={RESET_PASSWORD} tx={"userSetting.resetPassword"} />
      </TouchableOpacity> */}
    </Screen>
  )
})
