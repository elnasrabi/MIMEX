import * as React from "react";
import { TextStyle, View, ViewStyle, Platform, Image, ImageStyle } from "react-native";
import { color, typography } from "../../theme";

import RNPickerSelect from "react-native-picker-select";
import { icons } from "../icon/icons";
import { translateText } from "../../utils/utils";
import { Text } from "../text/text";

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
interface dropdownPickerProps {
  dropDownData: any[], selectedValue: any, onValueChange: (value: any) => void,
  inputStyleIOS?: TextStyle,
  inputStyleAndroid?: TextStyle,
  disabled?: boolean,
  placeHolder?: string,
  placeHolderValue?: string,
  errorTx?: string
}

export function DropdownPicker(props: dropdownPickerProps) {
  // grab the props
  const {
    dropDownData,
    selectedValue,
    onValueChange,
    inputStyleAndroid,
    inputStyleIOS,
    placeHolder,
    errorTx,
    placeHolderValue,
    ...rest
  } = props;

  const VALUE_CONTAINER_REGISTRATION: ViewStyle = {
    flex: 1,
    borderColor: color.palette.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: color.palette.white,
    height: 40,
    justifyContent: "center",
  };
  const ICON_CONTAINER: ViewStyle = {
    height: 35,
    paddingStart: 5,
    marginTop: Platform.OS == "android" ? 7 : -8,
    justifyContent: "center",
    paddingRight: 4,
  };
  const ICON: ImageStyle = {
    width: 15,
    height: 18,
    tintColor: color.palette.darkText,
  };
  const INPUT_STYLE_IOS: TextStyle = {
    color: color.palette.link,
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 5,
    fontFamily: typography.secondary,
    paddingRight: 30
  };
  const INPUT_STYLE_ANDROID: TextStyle = {
    color: color.palette.link,
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingBottom: 7,
    paddingRight: 30,
    fontFamily: typography.secondary,
  };
  const errorLabel: TextStyle = {
    textAlign: "right",
  };

  return (
    <>
      <View style={VALUE_CONTAINER_REGISTRATION}>
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          disabled={props.disabled}
          style={{
            placeholder: {
              fontSize: 15,
            },
            inputIOS: inputStyleIOS || INPUT_STYLE_IOS,
            inputAndroid: inputStyleAndroid || INPUT_STYLE_ANDROID,
          }}
          placeholder={{ label: translateText(placeHolder), value: placeHolderValue ? placeHolderValue : '' }}
          value={selectedValue}
          onValueChange={onValueChange}
          Icon={() => (
            <View
              style={{
                height: 35,
                paddingHorizontal: 5,
                justifyContent: "center",
                marginTop: Platform.OS == 'android' ? 3 : -8
              }}
            >
              <Image
                style={{ width: 15, height: 18, tintColor: color.palette.darkText }}
                source={icons.downArrow}
              />
            </View>
          )}
          items={dropDownData}
          {...rest}
        />
      </View>
      {errorTx && <Text style={errorLabel} preset={"error"} tx={errorTx} />}
    </>
  );
}
