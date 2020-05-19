import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Platform } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { BottomButton } from "../../components/bottom-button/bottom-button";

export interface UserSettingProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const MAIN_VIEW: ViewStyle = {
  width: "100%",
  height: 50,
  backgroundColor: color.palette.toolbar,
  marginTop: 10,
  justifyContent: "center"
}

const TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "left",
  marginStart: 15
}

const ROOT: ViewStyle = {
  paddingBottom: 10
}

const LABEL: TextStyle = {
  color: color.palette.red,
  alignSelf: "center",
  flex: 1,
  fontSize: 16,
  fontWeight: "bold"
}

const VALUE: TextStyle = {
  color: color.palette.black,
  fontSize: 16,
  fontWeight: "bold"
}
const EMAIL_TEXT_STYLE: TextStyle = {
  color: color.palette.red,
  flex: 1,
  fontSize: 16,
  fontWeight: "bold"
}

const VALUE_CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: "flex-end"
}

const ROW: ViewStyle = {
  flexDirection: "row",
  marginStart: 20,
  marginEnd: 20,
  marginTop: 20
}
const SCROLLVIEW_STYLE: ViewStyle = {
  marginBottom: 10,
  marginTop: Platform.OS == 'android' ? 40 : 0
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
        <Text extraText={hasExtraText ? ":" : ""} style={LABEL} tx={label} />
        <View style={VALUE_CONTAINER}>
          <Text style={VALUE} text={value} />
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
          <View style={{ marginTop: 10 }}>
            <Text style={VALUE} text={"username@gmail.com"} />
          </View>
        </View>

        {renderRow("userSetting.mobile", "0411 111 111", true)}
        {renderRow("userSetting.city", "South Yarra", true)}
        {renderRow("userSetting.state", "VIC", true)}
        {renderRow("userSetting.licenceType", "Licence Type")}
        {renderRow("userSetting.licenceNumber", "Licence Number")}
        {renderRow("userSetting.expiry", "Expiry")}

        <View style={MAIN_VIEW}>
          <Text style={TITLE} tx="userSetting.vehicle" />
        </View>

        {renderRow("userSetting.vehicleId", "8545154", true)}
        {renderRow("userSetting.vehicleName", "Red Van South East")}
        {renderRow("userSetting.vehicleType", "2 Tan Truck")}
        {renderRow("userSetting.registration", "XXXX 8845")}
        {renderRow("userSetting.weightCapacity", "1800 KG")}
        {renderRow("userSetting.volumeCapacity", "1.00 cbm")}
        {renderRow("userSetting.jobCapacity", "12")}
        {renderRow("userSetting.specialFeatures", "Add On Services")}
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton}
        leftText={"common.save"}
        rightText={"common.cancel"} />
    </Screen>

  )
})
