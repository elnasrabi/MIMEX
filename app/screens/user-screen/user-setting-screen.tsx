import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Platform } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, TextField } from "../../components"
import { color, typography } from "../../theme"
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { isIphoneX } from "react-native-iphone-x-helper";

export interface UserSettingProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const TEXTINPUT_MAIN_VIEW: ViewStyle = {
  flex: 1, width: "100%"
}

const TITLE: ViewStyle = {
  flex: 1,
  marginTop: 15
}

const ROOT: ViewStyle = {
  paddingBottom: 10
}

const LABEL: TextStyle = {
  color: color.palette.black,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary
}

const VALUE: TextStyle = {
  color: color.palette.link,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary
}
const EMAIL_TEXT_STYLE: TextStyle = {
  color: color.palette.black,
  flex: 1,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary
}

const VALUE_CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: "flex-end"
}

const ROW: ViewStyle = {
  flexDirection: "row",
  marginStart: 20,
  marginEnd: 20,
  alignItems: 'center'
}
const SCROLLVIEW_STYLE: ViewStyle = {
  marginBottom: 10,
  marginTop: Platform.OS == 'android' ? 40 : isIphoneX() ? 0 : 23
}
const EMAIL_VIEW_STYLE: ViewStyle = {
  marginStart: 20,
  marginEnd: 20,
  marginTop: 20
}

export const UserSetting: FunctionComponent<UserSettingProps> = observer((props) => {

  const renderRow = (label, value, hasExtraText = false) => {
    return (
      <View style={ROW}>
        <View style={TITLE}>
          <Text extraText={hasExtraText ? ":" : ""} style={LABEL} tx={label} />
        </View>
        <View style={VALUE_CONTAINER}>
          <TextField
            autoCorrect={false}
            autoCapitalize={"none"}
            mainStyle={TEXTINPUT_MAIN_VIEW}
            inputStyle={VALUE}
            value={value} />
        </View>
      </View>
    )
  }

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])

  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      <MenuButton
        title={"userSetting.header"}
        onPress={handleDrawer} />

      <ScrollView style={SCROLLVIEW_STYLE}>
        <View style={EMAIL_VIEW_STYLE}>
          <Text extraText={":"} style={EMAIL_TEXT_STYLE} tx={"userSetting.email"} />
          <View >
            <TextField mainStyle={TEXTINPUT_MAIN_VIEW} inputStyle={VALUE} editable={false} value={"username@gmail.com"} />
          </View>
        </View>

        {renderRow("userSetting.mobile", "0411 111 111", true)}
        {renderRow("userSetting.city", "South Yarra", true)}
        {renderRow("userSetting.state", "VIC", true)}
        {renderRow("userSetting.licenceType", "Licence Type")}
        {renderRow("userSetting.licenceNumber", "Licence Number")}
        {renderRow("userSetting.expiry", "Expiry")}

      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        leftText={"common.save"}
        rightText={"common.cancel"} />
    </Screen>

  )
})
