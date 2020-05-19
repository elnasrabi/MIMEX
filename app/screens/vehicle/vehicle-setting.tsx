import React, { FunctionComponent, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Platform } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button, TextField } from "../../components"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Header } from "./../../components"
import { HeaderMenu } from "../../components/header/header-menu"
import { MenuButton } from "../../components/header/menu-button";

export interface VehicleSettingProps {
  navigation: NativeStackNavigationProp<ParamListBase>
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
  fontWeight: "bold",
  textAlign: "right"
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

const BUTTON_TEXT: TextStyle = { color: 'white', fontSize: 20, paddingVertical: 15 }
const BUTTON: ViewStyle = { alignItems: "center", justifyContent: "center", borderRadius: 10 }

export const VehicleSetting: FunctionComponent<VehicleSettingProps> = observer((props) => {

  const renderRow = (label, value) => {
    return (
      <View style={ROW}>
        {/* <Text extraText={":"} style={LABEL} tx={label} /> */}
        <Text style={LABEL}>{label}</Text>
        <View style={VALUE_CONTAINER}>
          <Text style={VALUE} text={value} />
        </View>
      </View>
    )
  }

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])

  return (
    <Screen style={ROOT} wall={'whiteWall'} statusBar={"dark-content"} preset="fixed">
      <MenuButton
        title={"vehicleSetting.header"}
        onPress={handleDrawer} />

      <ScrollView style={{ marginBottom: 10, marginTop: Platform.OS == 'android' ? 40 : 0 }}>
        {renderRow("Vehicle ID:", "8545154")}
        {renderRow("Vehicle Name", "Red Van South East")}
        {renderRow("Vehicle Type", "2 Tan Truck")}
        {renderRow("Registration", "XXXX 8845")}
        {renderRow("WeightCapacity", "1800 KG")}
        {renderRow("VolumeCapacity", "1.00 cbm")}
        {renderRow("JobCapacity", "12")}
        {renderRow("SpecialFeatures", "Add On Services")}
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
