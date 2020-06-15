import { ImageStyle, ViewStyle } from "react-native";

export interface QRProps {
  /**
   * Style overrides for the icon image
   */
  style?: ImageStyle;

  /**
   * Style overrides for the icon container
   */

  containerStyle?: ViewStyle;

  /**
   * The name of the icon
   */

  onSuccess?(): void;

  onGoPress?(): void;
}
