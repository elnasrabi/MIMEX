import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, FlatList, TouchableOpacity, ImageStyle, Alert } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Icon } from "../components"
import { color } from "../theme"
import { MenuButton } from "../components/header/menu-button"
import { SearchView } from "../components/search-view/search-view"
import { MyButton } from "../components/button/my-button"
import { icons } from "../components/icon/icons"

export interface LandingScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const ROOT: ViewStyle = {
  justifyContent: "center",
  flex: 1,
}

const CONTAINER: ViewStyle = {
  justifyContent: 'center',
  flex: 1,
  paddingStart: 25,
  paddingEnd: 25
}

const FLAT_LIST: ViewStyle = {
  position: "absolute",
  bottom: 60,
  left: 20,
  right: 20,
  flexDirection: "row"
}
const CONTINUE: ViewStyle = {
  alignSelf: "center",
  flex: 1
}

const IMAGE_BACK: ImageStyle = {
  alignSelf: "center",
  height: 100,
  width: 120,
  padding: 20
}

const SEARCH_VIEW: ViewStyle = {

}

const AFS_LOGO: ImageStyle = { height: 120, width: 240, alignSelf: "center" }

const CONTAINER_AFS_LOGO: ImageStyle = { position: "absolute", top: 50, alignSelf: "center" }

const dataList = ["landingScreen.myList", "landingScreen.safetyCheck", "landingScreen.getRate"]

export const LandingScreen: FunctionComponent<LandingScreenProps> = observer((props) => {
  useEffect(() => {
    console.tron.log('LandingScreen')
  }, [])
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])
  const onSuccess = e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
    Alert.alert(JSON.stringify(e))
    console.warn(JSON.stringify(e))
  }

  const onCameraPress = () => {
    props.navigation.navigate("qrScanner", { onSuccess: onSuccess })
  }

  return (
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
      <MenuButton
        onPress={handleDrawer} />

      {/* AFS LOGO */}
      <Icon containerStyle={CONTAINER_AFS_LOGO} style={AFS_LOGO} icon={"afsLightLogo"} />

      <View style={CONTAINER}>

        {/* Search View */}
        <SearchView
          containerStyle={SEARCH_VIEW}
          onCameraPress={onCameraPress} />

        {/* Bottom Option */}
        <View style={FLAT_LIST}>
          {dataList.map((data, index) => {
            return (
              <MyButton
                buttonSource={icons.redButton2}
                key={index}
                imageBackground={IMAGE_BACK}
                style={CONTINUE}
                tx={data}
              // onPress={onLogin}
              />
            )
          })}
        </View>

      </View>
    </Screen>
  )
})
