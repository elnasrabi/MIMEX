import React, { FunctionComponent, useState } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, TextStyle, View, ScrollView, Platform } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { isIphoneX } from "react-native-iphone-x-helper";

// import component, themes and modals
import { Screen, Text } from "../../components";
import { color, typography } from "../../theme";
import { MenuButton } from "../../components/header/menu-button";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { icons } from "../../components/icon/icons";
import { DropdownPicker } from "../../components/dropdown-picker/Dropdown-picker";

export interface VehicleSettingProps {
  navigation: NativeStackNavigationProp<ParamListBase>
};
const ROOT: ViewStyle = { paddingBottom: 10 };
const VALUE_CONTAINER: ViewStyle = { flex: 1 };
const LABEL: TextStyle = {
  color: color.palette.black,
  alignSelf: "center",
  flex: 1,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary
};
const VALUE: TextStyle = {
  color: color.palette.link,
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "right",
  fontFamily: typography.secondary
};
const ROW: ViewStyle = {
  flexDirection: "row",
  marginStart: 20,
  marginEnd: 20,
  marginTop: 20
};
const SCROLLVIEW_STYLE: ViewStyle = {
  marginBottom: 10,
  marginTop: Platform.OS == 'android' ? 40 : isIphoneX() ? 0 : 23
};

export const VehicleSetting: FunctionComponent<VehicleSettingProps> = observer((props) => {
  const dropDownData = [
    { label: 'XXXX 8845', value: 'XXXX 8845' },
    { label: 'XXXX 8846', value: 'XXXX 8846' },
    { label: 'XXXX 8847', value: 'XXXX 8847' },
  ];
  const [selectedValue, setSelectedValue] = useState("java");

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

  const gotoHome = () => {
    return props.navigation.navigate('Home');
  }

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation]);
  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      <MenuButton
        title={"vehicleSetting.header"}
        onPress={handleDrawer} />
      <ScrollView style={SCROLLVIEW_STYLE}>
        <View style={ROW}>
          <Text style={LABEL} tx={"vehicleSetting.registration"} />
          <DropdownPicker
            dropDownData={dropDownData}
            selectedValue={selectedValue}
            placeHolder={"common.registrationId"}
            onValueChange={(value) => setSelectedValue(value)}
          />
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
        rightImage={icons.redButton2}
        onRightPress={() => gotoHome()}
        leftText={"common.save"}
        rightText={"common.cancel"} />
    </Screen >
  )
})
