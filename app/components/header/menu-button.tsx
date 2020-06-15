/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react";
import { ImageStyle, ViewStyle, View, TextStyle, TouchableOpacity } from "react-native";
import { Icon } from "../icon/icon";
import { color } from "../../theme";
import { IconProps } from "../icon/icon.props";
import { Text } from "../text/text";

const ICON: ImageStyle = { height: 24, width: 24, tintColor: color.palette.black };

const MENU_BUTTON: ViewStyle = {
  padding: 12,
  position: "absolute",
  top: 0,
  right: 0,
  paddingEnd: 15,
  justifyContent: "flex-end",
  flexDirection: "row",
};

const MAIN_VIEW: ViewStyle = {
  width: "100%",
  position: "absolute",
  top: 0,
  height: 50,
  justifyContent: "center",
};

const TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "left",
  marginStart: 15,
};

export const MenuButton: React.FunctionComponent<IconProps> = props => {
  const { onPress, hasBackground = true, title } = props;

  return (
    <View
      style={[
        MAIN_VIEW,
        { backgroundColor: hasBackground ? color.palette.toolbar : "", zIndex: 2 },
      ]}
    >
      {title && <Text style={TITLE} tx={title} />}
      <TouchableOpacity style={MENU_BUTTON} onPress={onPress}>
        <Icon style={ICON} icon={"menuBar"} />
      </TouchableOpacity>
    </View>
  );
};
