import React, { FunctionComponent, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ImageStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button, TextField, Icon } from "../../components"
import { color, spacing, typography } from "../../theme"
import { BackButton } from "../../components/header/back-button"
import { MyButton } from "../../components/button/my-button"

export interface ForgotpasswordScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  paddingStart: 25,
  paddingEnd: 25
}
const ROOT: ViewStyle = {
  justifyContent: "center",
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
  marginTop: 60
}

const LABEL: TextStyle = {
  ...TEXT,
  color: color.palette.white,
  fontSize: 20,
  marginTop: 60,
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
  bottom: 10
}

const EMAIL: TextStyle = {
  marginTop: 10,
  fontSize: 14
}

const BACK_BUTTON: ImageStyle = {
  tintColor: color.palette.white
}

const AFS_LOGO: ImageStyle = { height: 120, width: 240, alignSelf: "center" }

const CONTAINER_AFS_LOGO: ImageStyle = { position: "absolute", top: 70, alignSelf: "center" }

export const ForgotpasswordScreen: FunctionComponent<ForgotpasswordScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
  const onUpdate = () => {
    // authStore.update()
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <BackButton
        style={BACK_BUTTON}
        hasBackground={false}
        onPress={goBack} />

      <View style={CONTAINER}>

        <Icon containerStyle={CONTAINER_AFS_LOGO} style={AFS_LOGO} icon={"afsLogo"} />

        <Text style={HEADER} preset="button" tx="forgotpasswordScreen.title" />
        <Text style={LABEL} preset="button" tx="forgotpasswordScreen.label" />

        <TextField style={EMAIL} placeholder={"Enter Email"} />
        <Text style={DESC} preset="button" tx="forgotpasswordScreen.desc" />

        <MyButton
          style={CONTINUE}
          tx="forgotpasswordScreen.submit"
          onPress={onUpdate}
        />
      </View>

    </Screen>

  )
})
