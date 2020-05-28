import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ImageStyle, ScrollView } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, TextField, Icon } from "../../components"
import { color, typography } from "../../theme"
import { BackButton } from "../../components/header/back-button"
import { MyButton } from "../../components/button/my-button"
import { isInternetAvailable } from "../../utils/utils"
import { useStores } from "../../models/root-store"

export interface ForgotpasswordScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const CONTAINER: ViewStyle = {
  flex: 1,
  paddingStart: 25,
  paddingEnd: 25
}
const ROOT: ViewStyle = {
  flex: 1,
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary
}

const HEADER: TextStyle = {
  ...TEXT,
  color: color.palette.red,
  fontSize: 25,
  textAlign: "center",
  marginTop: 40,
  alignSelf: "flex-start"
}

const LABEL: TextStyle = {
  ...TEXT,
  color: color.palette.white,
  fontSize: 20,
  marginTop: 30,
  textAlign: "center",
}

const DESC: TextStyle = {
  ...TEXT,
  color: color.palette.white,
  fontSize: 16,
  marginTop: 40,
  alignSelf: "center",
  textAlign: "center"
}

const CONTINUE: ViewStyle = {
  alignSelf: "center",
  position: "absolute",
  bottom: 30
}

const EMAIL: TextStyle = {
  marginTop: 10,
  fontSize: 14
}

const BACK_BUTTON: ImageStyle = {
  tintColor: color.palette.white
}

const AFS_LOGO: ImageStyle = {
  height: 100,
  width: 200,
  alignSelf: "center",
  marginTop: 80
}

const CONTAINER_AFS_LOGO: ImageStyle = {
  position: "absolute",
  top: 70,
  alignSelf: "center"
}

export const ForgotpasswordScreen: FunctionComponent<ForgotpasswordScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
  const { authStore } = useStores()

  const [isValidEmail, setValidEmail] = useState(true)

  const [email, onChangeEmail] = useState("")

  useEffect(() => {
    // authStore.resetForgotAuth()
  }, [])

  const onChangeText = (text) => {
    onChangeEmail(text)
    text ? setValidEmail(true) : setValidEmail(false)
  }
  const onSubmit = () => {
    const isConnected = isInternetAvailable()
    if (!email) {
      setValidEmail(false)
    } else if (isConnected) {
      authStore.forgotPassword(email)
    }
  }

  return (
    <Screen style={ROOT} preset="fixed" backgroundColor="black">
      <BackButton
        style={BACK_BUTTON}
        hasBackground={false}
        onPress={goBack} />

      <ScrollView contentContainerStyle={CONTAINER}>

        <Icon style={AFS_LOGO} icon={"afsLogo"} />

        {authStore.hasForgotError ? <Text style={HEADER} preset="button" tx="forgotpasswordScreen.invalidError" />
          : <Text style={HEADER} preset="button" tx="forgotpasswordScreen.title" />
        }
        <Text style={LABEL} preset="button" tx="forgotpasswordScreen.label" />

        <TextField
          onChangeText={text => onChangeText(text)}
          style={EMAIL}
          placeholder={"Enter Email"}
          value={email}
          returnKeyType={"done"}
          errorTx={isValidEmail ? undefined : "forgotpasswordScreen.enterEmail"}
          onSubmitEditing={onSubmit}
          keyboardType={"visible-password"}
          autoCorrect={false}
          autoCapitalize={"none"}
        />
        <Text style={DESC} preset="button" tx="forgotpasswordScreen.desc" />

        <MyButton
          style={CONTINUE}
          isLoading={authStore.isForgotLoading}
          tx="forgotpasswordScreen.submit"
          onPress={onSubmit}
        />
      </ScrollView>

    </Screen>

  )
})
