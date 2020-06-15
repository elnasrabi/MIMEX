import { ImageStyle, ViewStyle } from "react-native";
import { IconTypes } from "./icons";

export interface IconProps {
  /**
   * Style overrides for the icon image
   */
  style?: ImageStyle;

  /**
   * Style overrides for the icon container
   */

  containerStyle?: ViewStyle;

  hasBackground?: boolean;
  /**
   * The name of the icon
   */

  icon?: IconTypes;

  title?: string;

  onPress?(): void;
}
