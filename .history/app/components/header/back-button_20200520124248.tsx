/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { ImageStyle, ViewStyle, View, TextStyle } from "react-native"
import { Button } from "../button/button"
import { Icon } from "../icon/icon"
import { color } from "../../theme"
import { IconProps } from "../icon/icon.props"
import { Text } from "../text/text"

const ICON: ImageStyle = { height: 32, width: 32, tintColor: color.palette.black }

const MENU_BUTTON: ViewStyle = {
  position: "absolute",
  left: 15,
  paddingEnd: 15,
  justifyContent: "flex-end"
}

const MAIN_VIEW: ViewStyle = {
  width: "100%",
  justifyContent: "center"
}

const TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "left",
  marginStart: 60,
}

export const BackButton: React.FunctionComponent<IconProps> = props => {
  const {
    onPress,
    style,
    title,
    hasBackground = true
  } = props

  return (
    <View style={[MAIN_VIEW, { backgroundColor: hasBackground ? color.palette.toolbar : "" }]}>
      {title && <Text style={TITLE} tx={title} />}
      <View style={MENU_BUTTON}>
        <Button preset="link" onPress={onPress}>
          <Icon style={{ ...ICON, ...style }} icon={"back"} />
        </Button>
      </View>
    </View>
  )
}
