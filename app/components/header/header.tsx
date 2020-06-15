/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react";
import { View, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { HeaderProps } from "./header.props";
import { Button } from "../button/button";
import { Text } from "../text/text";
import { Icon } from "../icon/icon";
import { spacing, color } from "../../theme";
import { translate } from "../../i18n/";

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  justifyContent: "flex-start",
  height: 60,
};
const TITLE: TextStyle = { fontSize: 16, color: color.palette.darkText, marginStart: 15 };
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" };
const LEFT: ViewStyle = { width: 32 };
const RIGHT: ViewStyle = { width: 32 };
const SHADOW: ViewStyle = {
  backgroundColor: "#fff",
  height: 2,
  shadowColor: "#000",
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity: 0.4,
  shadowRadius: 3,
  elevation: 5,
};
const ICON: ImageStyle = { height: 32, width: 32, tintColor: color.palette.darkText };

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export const Header: React.FunctionComponent<HeaderProps> = props => {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
  } = props;
  const header = headerText || (headerTx && translate(headerTx)) || "";

  return (
    <View>
      <View style={ROOT}>
        {leftIcon ? (
          <Button preset="link" onPress={onLeftPress}>
            <Icon style={ICON} icon={leftIcon} />
          </Button>
        ) : (
          <View style={LEFT} />
        )}
        <View style={TITLE_MIDDLE}>
          <Text preset="header" style={TITLE} text={header} />
        </View>
        {rightIcon ? (
          <Button preset="link" onPress={onRightPress}>
            <Icon icon={rightIcon} />
          </Button>
        ) : (
          <View style={RIGHT} />
        )}
      </View>
      <View style={{ overflow: "hidden", paddingBottom: 5 }}>
        <View style={SHADOW} />
      </View>
    </View>
  );
};
