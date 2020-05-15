import * as React from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View, ImageBackground, ViewStyle, ImageStyle, SafeAreaView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { icons } from "../icon/icons"
import { color } from "../../theme"

const isIos = Platform.OS === "ios"
const IMAGE_BACKGROUND: ImageStyle = { height: "100%", width: "100%" }
function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeArea()
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insetStyle: ViewStyle = { paddingTop: props.unsafe ? 0 : insets.top }
  const icon = icons[props.wall] || icons.wall
  const statusBarColor = props.statusBarColor || color.palette.black

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <SafeAreaView style={[preset.outer, backgroundStyle]}>
        <StatusBar backgroundColor={statusBarColor} barStyle={props.statusBar || "light-content"} />
        <ImageBackground style={IMAGE_BACKGROUND} source={icon}>
          <View style={[preset.inner, style, insetStyle]}>
            {props.children}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeArea()
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }
  const statusBarColor = props.statusBarColor || color.palette.black
  const wall = props.wall || icons.wall
  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <SafeAreaView style={[preset.outer, backgroundStyle]}>
        <StatusBar backgroundColor={statusBarColor} barStyle={props.statusBar || "light-content"} />
        <ImageBackground style={IMAGE_BACKGROUND} source={wall}>
          <View style={[preset.outer, backgroundStyle, insetStyle]}>
            <ScrollView
              style={[preset.outer, backgroundStyle]}
              contentContainerStyle={[preset.outer, style]}
            >
              {props.children}
            </ScrollView>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
