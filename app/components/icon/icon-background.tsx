import * as React from "react";
import { View, Image, ImageStyle, ImageBackground } from "react-native";
import { IconProps } from "./icon.props";
import { icons } from "./icons";

const ROOT: ImageStyle = {
  resizeMode: "contain",
};

export function BackgroundIcon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props;
  const style: ImageStyle = { ...ROOT, ...styleOverride };

  return (
    <View style={containerStyle}>
      <ImageBackground style={style} source={icons[icon]} />
    </View>
  );
}
