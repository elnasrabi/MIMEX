import React, { FunctionComponent, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button, TextField } from "../../components"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Header } from "./../../components"
import { HeaderMenu } from "../../components/header/header-menu"

export interface VehicleSettingProps {
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

const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
  color: "#666666"
}

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
    <Screen style={ROOT} preset="fixed">
      <HeaderMenu
        headerTx="vehicleSetting.header"
        rightIcon="menuBar"
        onRightPress={handleDrawer}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <ScrollView>
        {renderRow("Vehicle ID:", "8545154")}
        {renderRow("Vehicle Name", "Red Van South East")}
        {renderRow("Vehicle Type", "2 Tan Truck")}
        {renderRow("Registration", "XXXX 8845")}
        {renderRow("WeightCapacity", "1800 KG")}
        {renderRow("VolumeCapacity", "1.00 cbm")}
        {renderRow("JobCapacity", "12")}
        {renderRow("SpecialFeatures", "Add On Services")}
      </ScrollView>
    </Screen>
  )
})
