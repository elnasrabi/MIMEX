import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Platform } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import { MenuButton } from "../../components/header/menu-button";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { icons } from "../../components/icon/icons";
import { isIphoneX } from "react-native-iphone-x-helper";

export interface VehicleSettingProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = { paddingBottom: 10 }
const VALUE_CONTAINER: ViewStyle = { flex: 1 }

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

const ROW: ViewStyle = {
  flexDirection: "row",
  marginStart: 20,
  marginEnd: 20,
  marginTop: 20
}
const SCROLLVIEW_STYLE: ViewStyle = {
  marginBottom: 10,
  marginTop: Platform.OS == 'android' ? 40 : isIphoneX() ? 0 : 23
}

export const VehicleSetting: FunctionComponent<VehicleSettingProps> = observer((props) => {

  const renderRow = (label, value, extratext = false) => {
    return (
      <View style={ROW}>
        <Text extraText={extratext ? ":" : ''} style={LABEL} tx={label} />
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
        title={"vehicleSetting.header"}
        onPress={handleDrawer} />

      <ScrollView style={SCROLLVIEW_STYLE}>
        {renderRow("vehicleSetting.vehicleId", "8545154", true)}
        {renderRow("vehicleSetting.vehicleName", "Red Van South East")}
        {renderRow("vehicleSetting.vehicleType", "2 Tan Truck")}
        {renderRow("vehicleSetting.registration", "XXXX 8845")}
        {renderRow("vehicleSetting.weightCapacity", "1800 KG")}
        {renderRow("vehicleSetting.volumeCapacity", "1.00 cbm")}
        {renderRow("vehicleSetting.jobCapacity", "12")}
        {renderRow("vehicleSetting.specialFeatures", "Add On Services")}
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton}
        leftText={"common.save"}
        rightText={"common.cancel"} />
    </Screen>
  )
})
