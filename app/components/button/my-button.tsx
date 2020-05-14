import * as React from "react"
import { TouchableOpacity, ImageBackground, ImageStyle, TextStyle } from "react-native"
import { Text } from "../text/text"
import { ButtonProps } from "./button.props"
import { icons } from "../icon/icons"
import { color } from "../../theme"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function MyButton(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    buttonSource,
    style: styleOverride,
    myTextStyle,
    imageBackground,
    ...rest
  } = props

  const viewStyle = styleOverride
  const TEXT: TextStyle = {
    color: color.palette.white,
    alignSelf: "center",
    textAlign: "center"
  }
  const BACKGROUND_ICON: ImageStyle = {
    alignSelf: "center",
    justifyContent: 'center',
    height: 45,
    width: 150
  }
  const image = buttonSource || icons.redButton

  return (
    <TouchableOpacity
      style={viewStyle} {...rest}>
      <ImageBackground resizeMode={"contain"} style={[BACKGROUND_ICON, imageBackground]}
        source={image}>
        <Text style={[TEXT, myTextStyle]} tx={tx} />
      </ImageBackground>
    </TouchableOpacity>
  )
}
