import React, { FunctionComponent, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, TouchableOpacity, Platform } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button, TextField } from "../../components"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { HeaderMenu } from "../../components/header/header-menu"
import { MenuButton } from "../../components/header/menu-button";
import { MyButton } from "../../components/button/my-button";

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
const BOLD: TextStyle = { fontWeight: "bold" }

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

const VALUE_CONTAINER: ViewStyle = {
  flex: 1, alignItems: "flex-end"
}

const ROW: ViewStyle = {
  flexDirection: "row",
  marginStart: 20,
  marginEnd: 20,
  marginTop: 20
}

const BUTTON_TEXT: TextStyle = {
  color: 'white', fontSize: 20, paddingVertical: 15
}
const BUTTON: ViewStyle = {
  alignItems: "center", justifyContent: "center", borderRadius: 10
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
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
      <MenuButton
        title={"userSetting.header"}
        onPress={handleDrawer} />

      <ScrollView style={{ marginBottom: 10, marginTop: Platform.OS == 'android' ? 40 : 0 }}>
        <View style={{ marginStart: 20, marginEnd: 20, marginTop: 20, }}>
          <Text extraText={":"} style={{ color: color.palette.red, flex: 1, fontSize: 16, fontWeight: "bold" }} tx={"userSetting.email"} />
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
          <Text style={TITLE} >{`Vehicle`}</Text>
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
      <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
        <TouchableOpacity style={[BUTTON, { backgroundColor: 'black', width: 160 }]}>
          <Text style={BUTTON_TEXT}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[BUTTON, { backgroundColor: 'red', width: 130 }]}>
          <Text style={BUTTON_TEXT}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Screen>

  )
})
