import * as React from "react"
import { View, Image, ImageStyle } from "react-native"
import { IconProps } from "./icon.props"
import { icons } from "./icons"

const ROOT: ImageStyle = {
  // resizeMode: "contain",
}
const CONTAINER: ImageStyle = {
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props
  const style: ImageStyle = { ...ROOT, ...styleOverride }

  return (
    <View style={[containerStyle, CONTAINER]}>
      <Image resizeMode={"contain"} style={style} source={icons[icon]} />
    </View>
  )
}
