import * as React from "react"
import { View, TextInput, TextStyle, ViewStyle, Alert } from "react-native"
import { color, spacing, typography } from "../../theme"
import { translate } from "../../i18n"
import { Text } from "../text/text"
import { TextFieldProps } from "./text-field.props"
import { mergeAll, flatten } from "ramda"

// the base styling for the container
const CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center"
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  flex: 1,
  fontFamily: typography.secondary,
  color: color.text,
  minHeight: 40,
  fontSize: 16,
  paddingStart: 10,
  paddingEnd: 10,
  height: 40,
  backgroundColor: color.palette.light,
  borderColor: color.palette.lighterGrey,
  borderWidth: 1,
  borderRadius: 4,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

const LABEL: TextStyle = {
  color: color.palette.white,
  fontSize: 16,
  fontFamily: typography.primary,
  flex: 0.6
}

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]))
}

/**
 * A component which has a label and an input together.
 */
export const TextField: React.FunctionComponent<TextFieldProps> = props => {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    labelStyle: labelStyleOverride,
    forwardedRef,
    errorTx,
    mainStyle,
    ...rest
  } = props
  let containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset] }
  containerStyle = enhance(containerStyle, styleOverride)

  let inputStyle: TextStyle = INPUT
  const errorStyle: ViewStyle = { marginTop: 15 }
  const errorLabel: TextStyle = { textAlign: "right" }
  inputStyle = enhance(inputStyle, inputStyleOverride)

  let labelStyle: TextStyle = LABEL
  labelStyle = enhance(labelStyle, labelStyleOverride)

  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder
  return (
    <View style={[errorStyle, mainStyle]}>
      <View style={containerStyle}>
        {(label || labelTx) && <Text style={labelStyle} preset="fieldLabel" tx={labelTx} text={label} />}
        <TextInput
          autoCorrect={false}
          autoCompleteType={"off"}
          spellCheck={false}
          placeholder={actualPlaceholder}
          placeholderTextColor={color.palette.lighterGrey}
          underlineColorAndroid={color.transparent}
          {...rest}
          style={inputStyle}
          ref={forwardedRef}
        />
      </View>
      {/* <View style={BASE_LINE} /> */}
      {errorTx && <Text style={errorLabel} preset={"error"} tx={errorTx} />}
    </View>
  )
}
