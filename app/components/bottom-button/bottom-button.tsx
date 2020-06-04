import * as React from "react"
import { TouchableOpacity, ImageBackground, TextStyle, View, ViewStyle, ActivityIndicator } from "react-native"
import { Text } from "../text/text"
import { color } from "../../theme"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
interface bottomButtonProps {
  bottomViewstyle?: object,
  leftButtonStyle?: object,
  rightButtonStyle?: object,
  isLoadingLeft?: boolean,
  isLoadingRight?: boolean,
  leftImage?: object,
  rightImage?: object,
  leftText?: string,
  rightText?: string,
  onLeftPress?: () => void
  onRightPress?: () => void
}

export function BottomButton(props: bottomButtonProps) {
  // grab the props
  const {
    bottomViewstyle,
    onLeftPress,
    onRightPress,
    leftButtonStyle,
    rightButtonStyle,
    isLoadingLeft,
    isLoadingRight,
    leftImage,
    rightImage,
    leftText,
    rightText,
  } = props

  const BOTTOM_VIEW: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
  const LEFT_BUTTON_STYLE: ViewStyle = {
    height: 55,
    width: 160,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    overflow: 'hidden'
  }
  const RIGHT_BUTTON_STYLE: ViewStyle = {
    height: 55,
    width: 130,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 10,
    overflow: "hidden"
  }
  const BUTTON_TEXT_STYLE: TextStyle = {
    color: color.palette.white
  }

  return (
    <View style={[BOTTOM_VIEW, bottomViewstyle]}>
      <TouchableOpacity onPress={onLeftPress} disabled={isLoadingLeft} >
        <ImageBackground source={leftImage} style={[LEFT_BUTTON_STYLE, leftButtonStyle]} >
          {isLoadingLeft ? <ActivityIndicator size="large" color={color.palette.white} /> : <Text style={BUTTON_TEXT_STYLE} tx={leftText} />}
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity disabled={isLoadingRight} onPress={onRightPress}>
        <ImageBackground source={rightImage} style={[RIGHT_BUTTON_STYLE, rightButtonStyle]}>
          <Text style={BUTTON_TEXT_STYLE} tx={rightText} />
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}
