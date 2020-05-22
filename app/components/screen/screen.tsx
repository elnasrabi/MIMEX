import * as React from "react"
import { ScrollView, StatusBar, View, ImageBackground, ViewStyle, ImageStyle, SafeAreaView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, presets } from "./screen.presets"
import { icons } from "../icon/icons"
import { color } from "../../theme"

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
    <SafeAreaView style={[preset.outer, backgroundStyle]}>
      <StatusBar backgroundColor={statusBarColor} barStyle={props.statusBar || "light-content"} />
      <ImageBackground style={IMAGE_BACKGROUND} source={icon}>
        <View style={[preset.inner, style, insetStyle]}>
          {props.children}
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeArea()
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }
  const statusBarColor = props.statusBarColor || color.palette.black
  const icon = icons[props.wall] || icons.wall
  return (
    <SafeAreaView style={[preset.outer, backgroundStyle]}>
      <StatusBar backgroundColor={statusBarColor} barStyle={props.statusBar || "light-content"} />
      <ImageBackground style={IMAGE_BACKGROUND} source={icon}>
        <View style={[preset.outer, insetStyle]}>
          <ScrollView
            keyboardShouldPersistTaps='handled'
            style={[preset.outer]}
            contentContainerStyle={[preset.outer, style]}
          >
            {props.children}
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
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
