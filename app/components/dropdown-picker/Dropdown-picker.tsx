import * as React from "react"
import { TextStyle, View, ViewStyle, Platform, Image } from "react-native"
import { color } from "../../theme"
import { typography } from "../../theme";
import RNPickerSelect from 'react-native-picker-select'
import { icons } from "../icon/icons";
import { translateText } from "../../utils/utils";

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
interface dropdownPickerProps {
  dropDownData: any[], selectedValue: any, onValueChange: (value: any) => void,
  inputStyleIOS?: TextStyle,
  inputStyleAndroid?: TextStyle,
  placeHolder?: string
}

export function DropdownPicker(props: dropdownPickerProps) {
  // grab the props
  const {
    dropDownData,
    selectedValue,
    onValueChange,
    inputStyleAndroid,
    inputStyleIOS,
    placeHolder
  } = props

  const VALUE_CONTAINER_REGISTRATION: ViewStyle = {
    flex: 1,
    borderColor: color.palette.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: color.palette.white,
    height: 40,
    justifyContent: 'center'
  }
  const INPUT_STYLE_IOS: TextStyle = {
    color: color.palette.link,
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 5,
    fontFamily: typography.secondary
  }
  const INPUT_STYLE_ANDROID: TextStyle = {
    color: color.palette.link,
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 5,
    fontFamily: typography.secondary
  }

  return (
    <View style={VALUE_CONTAINER_REGISTRATION}>
      <RNPickerSelect
        style={{
          placeholder: {
            fontSize: 15,
          },
          inputIOS: inputStyleIOS ? inputStyleIOS : INPUT_STYLE_IOS,
          inputAndroid: inputStyleAndroid ? inputStyleAndroid : INPUT_STYLE_ANDROID
        }}
        placeholder={{ label: translateText(placeHolder), value: '' }}
        value={selectedValue}
        onValueChange={onValueChange}
        Icon={() =>
          <View style={{ height: 35, paddingStart: 5, marginTop: Platform.OS == "android" ? 7 : -8, justifyContent: "center", paddingRight: 4 }}>
            <Image style={{ width: 15, height: 18, tintColor: color.palette.darkText }} source={icons.downArrow} />
          </View>
        }
        items={dropDownData}
      />
    </View>
  )
}
