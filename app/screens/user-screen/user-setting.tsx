import React, { FunctionComponent, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button, TextField } from "../../components"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { HeaderMenu } from "../../components/header/header-menu"

export interface UserSettingProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const HEADER: TextStyle = {
  color: color.palette.black,
  alignSelf: "center"
}
const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  paddingBottom: 10
}
const BOLD: TextStyle = { fontWeight: "bold" }

const LABEL: TextStyle = {
  color: color.palette.black,
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
  flex: 1
}

const ROW: ViewStyle = {
  flexDirection: "row",
  marginStart: 20,
  marginEnd: 20,
  marginTop: 20
}

const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
  color: "#666666"
}

export const UserSetting: FunctionComponent<UserSettingProps> = observer((props) => {

  const renderRow = (label, value) => {
    return (<View style={ROW}>
      <Text extraText={":"} style={LABEL} tx={label} />
      <View style={VALUE_CONTAINER}>
        <Text style={VALUE} text={value} />
      </View>
    </View>)
  }

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])

  return (
    <Screen style={ROOT} preset="fixed">
      <HeaderMenu
        headerTx="userSetting.header"
        rightIcon="menuBar"
        onRightPress={handleDrawer}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <Screen style={ROOT} preset="scroll">
        {renderRow("userSetting.email", "username@gmail.com")}
        {renderRow("userSetting.mobile", "0411 111 111")}
        {renderRow("userSetting.city", "South Yarra")}
        {renderRow("userSetting.state", "VIC")}
        {renderRow("userSetting.licenceType", "Licence Type")}
        {renderRow("userSetting.licenceNumber", "Licence Number")}
        {renderRow("userSetting.expiry", "Expiry")}
        {renderRow("userSetting.vehicleId", "8545154")}
        {renderRow("userSetting.vehicleName", "Red Van South East")}
        {renderRow("userSetting.vehicleType", "2 Tan Truck")}
        {renderRow("userSetting.registration", "XXXX 8845")}
        {renderRow("userSetting.weightCapacity", "1800 KG")}
        {renderRow("userSetting.volumeCapacity", "1.00 cbm")}
        {renderRow("userSetting.jobCapacity", "12")}
        {renderRow("userSetting.specialFeatures", "Add On Services")}
      </Screen>
    </Screen>

  )
})
