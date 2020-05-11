import React, { FunctionComponent, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button, TextField } from "../../components"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { Header } from "./../../components"

export interface ForgotpasswordScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  flex: 1
}
const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  justifyContent: "center",
  paddingStart: 20,
  paddingEnd: 20,
  flex: 1,
  marginBottom: 50
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}

const HEADER: TextStyle = {
  color: color.palette.black,
  alignSelf: "center"
}

const BOLD: TextStyle = { fontWeight: "bold" }
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  marginTop: 25
}

const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
  color: "#666666"
}
const EMAIL: TextStyle = {
  marginTop: 25
}

const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

export const ForgotpasswordScreen: FunctionComponent<ForgotpasswordScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
  const { authStore } = useStores()
  const onUpdate = () => {
    // authStore.update()
  }
  return (
    <Screen style={CONTAINER} preset="fixed">
      <Header
        headerTx="forgotpasswordScreen.header"
        leftIcon="back"
        onLeftPress={goBack}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <View style={ROOT}>

        <Text style={HEADER} preset="header" tx="forgotpasswordScreen.header" />

        <TextField style={EMAIL} placeholder={"Enter Email"} />
        <Button
          style={CONTINUE}
          textStyle={CONTINUE_TEXT}
          tx="forgotpasswordScreen.submit"
          onPress={onUpdate}
        />
      </View>
    </Screen>

  )
})
