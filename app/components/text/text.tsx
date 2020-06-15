import * as React from "react";
import { Text as ReactNativeText } from "react-native";
import { presets } from "./text.presets";
import { TextProps } from "./text.props";
import { translate } from "../../i18n";
import { mergeAll, flatten } from "ramda";

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    preset = "default",
    tx,
    txOptions,
    text,
    children,
    style: styleOverride,
    extraText = "",
    ...rest
  } = props;

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions);
  let content = i18nText || text || children;
  content = content + extraText;
  const style = mergeAll(flatten([presets[preset] || presets.default, styleOverride]));

  return (
    <ReactNativeText {...rest} style={style}>
      {content}
    </ReactNativeText>
  );
}
