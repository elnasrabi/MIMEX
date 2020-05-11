import React, { FunctionComponent, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button } from "../../components"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"

export interface ForgotpasswordScreenProps {
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

export const ForgotpasswordScreen: FunctionComponent<ForgotpasswordScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const { authStore } = useStores()
  const onUpdate = () => {
    authStore.update();
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" tx="forgotpasswordScreen.header" />
      <Button
        style={CONTINUE}
        textStyle={CONTINUE_TEXT}
        tx="loginScreen.login"
        onPress={onUpdate}
      />
    </Screen>
  )
})
