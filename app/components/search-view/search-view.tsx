/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { ImageStyle, ViewStyle, View, TouchableOpacity, ImageBackground, TextStyle } from "react-native"

import { color } from "../../theme"
import { SearchProps } from "./search-props"
import { Text } from "../text/text"
import { TextField } from "../text-field/text-field"
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons'
import { icons } from "../icon/icons"

const SEARCH_VIEW: ViewStyle = { flexDirection: "row", alignItems: "center" }

const SEARCH_INPUT: ViewStyle = {
  alignSelf: "center",
  flex: 1
}
const MENU_BUTTON: ViewStyle = {
}

const BACKGROUND_ICON: ImageStyle = {
  height: 70,
  width: 120,
  tintColor: color.palette.angry,
  alignSelf: "center",
  marginEnd: 55,
  justifyContent: 'center',
}

const CAMERA_ICON: ImageStyle = {
  alignSelf: "center",
  paddingStart: 15
}

const HEADER: TextStyle = {
  color: color.palette.darkText,
  alignSelf: "center",
  marginEnd: 55,
  fontSize: 18
}

const GO: TextStyle = {
  color: color.palette.white,
  alignSelf: "center",
  fontSize: 20
}

const INPUT_STYLE: TextStyle = { borderColor: color.palette.darkText, borderWidth: 1.5 }

export const SearchView: React.FunctionComponent<SearchProps> = props => {
  const {
    onCameraPress,
    onGoPress,
    containerStyle
  } = props

  return (
    <View style={[MENU_BUTTON, containerStyle]}>
      <Text preset="button" style={HEADER} tx={"searchView.search"} />
      <View style={SEARCH_VIEW}>
        <TextField inputStyle={INPUT_STYLE} style={SEARCH_INPUT} returnKeyType={"search"} placeholderTx={"searchView.searchHere"} />
        <TouchableOpacity onPress={onCameraPress} style={CAMERA_ICON}>
          <EvilIcons color={color.palette.darkText} name="camera" size={55} />
        </TouchableOpacity>
      </View>

      {/* GO */}
      <TouchableOpacity onPress={onGoPress}>
        <ImageBackground style={BACKGROUND_ICON}
          source={icons.blackButton}>
          <Text preset="button" style={GO} tx={"searchView.go"} />
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}
