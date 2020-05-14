/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { ImageStyle, ViewStyle, View } from "react-native"
import { Button } from "../button/button"
import { Icon } from "../icon/icon"
import { color } from "../../theme"
import { IconProps } from "../icon/icon.props"

const ICON: ImageStyle = { height: 25, width: 25, tintColor: color.palette.black }

const MENU_BUTTON: ViewStyle = {
  padding: 15,
  position: "absolute",
  top: 0,
  right: 15
}

export const MenuButton: React.FunctionComponent<IconProps> = props => {
  const {
    onPress,
  } = props

  return (
    <View style={MENU_BUTTON}>
      <Button preset="link" onPress={onPress}>
        <Icon style={ICON} icon={"menuBar"} />
      </Button>
    </View>
  )
}
