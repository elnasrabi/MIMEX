import React, { FunctionComponent, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Platform, Image } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text } from "../../components"
import { color, typography } from "../../theme"
import { MenuButton } from "../../components/header/menu-button";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { icons } from "../../components/icon/icons";
import { isIphoneX } from "react-native-iphone-x-helper";
import RNPickerSelect from 'react-native-picker-select'

export interface VehicleSettingProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = { paddingBottom: 10 }
const VALUE_CONTAINER: ViewStyle = { flex: 1 }
const VALUE_CONTAINER_REGISTRATION: ViewStyle = {
  flex: 1,
  borderColor: color.palette.darkText,
  borderWidth: 2,
  borderRadius: 4,
  height: 25,
  justifyContent: 'center'
}

const LABEL: TextStyle = {
  color: color.palette.black,
  alignSelf: "center",
  flex: 1,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary
}

const VALUE: TextStyle = {
  color: color.palette.link,
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "right",
  fontFamily: typography.secondary
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

  const renderRow = (label, value) => {
    return (
      <View style={ROW}>
        <Text style={LABEL} tx={label} />
        <View style={VALUE_CONTAINER}>
          <Text style={VALUE} text={value} />
        </View>
      </View>
    )
  }
  const dropDownData = [
    { label: 'XXXX 8845', value: 'XXXX 8845' },
    { label: 'XXXX 8846', value: 'XXXX 8846' },
    { label: 'XXXX 8847', value: 'XXXX 8847' },
  ]
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])
  const [selectedValue, setSelectedValue] = useState("java")
  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      <MenuButton
        title={"vehicleSetting.header"}
        onPress={handleDrawer} />

      <ScrollView style={SCROLLVIEW_STYLE}>
        <View style={ROW}>
          <Text style={LABEL} tx={"vehicleSetting.registration"} />
          <View style={VALUE_CONTAINER_REGISTRATION}>
            <RNPickerSelect
              style={{
                inputIOS: {
                  color: color.palette.link,
                  fontSize: 16,
                  fontWeight: "600",
                  paddingLeft: 5,
                  fontFamily: typography.secondary
                },
                inputAndroid: {
                  color: color.palette.link,
                  fontSize: 16,
                  fontWeight: "900",
                  paddingLeft: 5,
                  fontFamily: typography.secondary
                }
              }}
              placeholder={{ label: "Registration-ID", value: '' }}
              value={selectedValue}
              onValueChange={(value) => setSelectedValue(value)}
              Icon={() =>
                <View style={{ height: 12, paddingStart: 5, marginTop: Platform.OS == "android" ? 20 : 5, paddingRight: 4 }}>
                  <Image resizeMode={'contain'} style={{ width: 15, height: 12, tintColor: color.palette.black }} source={icons.downArrow} />
                </View>
              }
              items={dropDownData}
            />
          </View>
        </View>
        {renderRow("vehicleSetting.vehicleName", "Red Van South East")}
        {renderRow("vehicleSetting.vehicleType", "2 Tan Truck")}
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
    </Screen >
  )
})
