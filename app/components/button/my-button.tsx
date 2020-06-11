import * as React from "react"
import { TouchableOpacity, ImageBackground, ImageStyle, TextStyle, ActivityIndicator, ViewStyle, View } from "react-native"
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
    tx,
    buttonSource,
    style: styleOverride,
    myTextStyle,
    imageBackground,
    isDisable,
    isLoading = false,
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
    width: 150,
    flexDirection: "row"
  }
  const LEFT_BUTTON_STYLE_DISABLE: ViewStyle = {
    alignSelf: "center",
    justifyContent: 'center',
    borderRadius: 10,
    height: 90,
    width: 90,
    flexDirection: "row",
    backgroundColor: color.palette.textGray
  }
  const image = buttonSource || icons.redButton

  return (
    <TouchableOpacity
      disabled={isDisable}
      style={viewStyle} {...rest}>

      {isDisable
        ? <View style={LEFT_BUTTON_STYLE_DISABLE}>
          <Text style={[TEXT, myTextStyle]} tx={tx} />
        </View>
        : <ImageBackground style={[BACKGROUND_ICON, imageBackground]}
          source={image}>
          {isLoading ? <ActivityIndicator size="small" color={color.palette.white} />
            : <Text style={[TEXT, myTextStyle]} tx={tx} />
          }
        </ImageBackground>
      }

    </TouchableOpacity>
  )
}
