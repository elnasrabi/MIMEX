/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { ImageStyle, ViewStyle, View } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Icon } from "../icon/icon"
import { color } from "../../theme"
import { IconProps } from "../icon/icon.props"

const ICON: ImageStyle = { height: 32, width: 32, tintColor: color.palette.white }

const BACK_BUTTON: ViewStyle = {
  padding: 15,
  position: "absolute",
  top: 0,
  right: 0,
  left: 0,
}

export const BackButton: React.FunctionComponent<IconProps> = props => {
  const {
    onPress,
    style
  } = props

  return (
    <View style={BACK_BUTTON}>
      <Button preset="link" onPress={onPress}>
        <Icon style={{ ...ICON, ...style }} icon={"back"} />
      </Button>
    </View>
  )
}
