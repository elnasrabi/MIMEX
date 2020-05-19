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
import { useStores } from "../models/root-store"

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

const BOTTOM_LIST: ViewStyle = {
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

const IMAGE_RED: ImageStyle = {
  alignSelf: "center",
  padding: 20,
  flex: 1,
  width: "100%",
  height: "100%"
}

const SEARCH_VIEW: ViewStyle = {

}

const AFS_LOGO: ImageStyle = {
  height: 120,
  width: 240,
  alignSelf: "center"
}

const CONTAINER_AFS_LOGO: ImageStyle = {
  position: "absolute",
  top: 50,
  alignSelf: "center"
}

const dataList = ["landingScreen.myList", "landingScreen.safetyCheck", "landingScreen.getRate"]

export const LandingScreen: FunctionComponent<LandingScreenProps> = observer(props => {
  const { homeStore } = useStores()

  useEffect(() => {
    if (homeStore.barCodeData.data) {
      Alert.alert(JSON.stringify(homeStore.barCodeData.data))
      homeStore.onCodeScanned({})
    }
  }, [homeStore.barCodeData])

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])

  const onCameraPress = () => {
    props.navigation.navigate("qrScanner")
  }

  return (
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
      <MenuButton
        hasBackground={false}
        onPress={handleDrawer} />

      {/* AFS LOGO */}
      <Icon containerStyle={CONTAINER_AFS_LOGO} style={AFS_LOGO} icon={"afsLightLogo"} />

      <View style={CONTAINER}>

        {/* Search View */}
        <SearchView
          containerStyle={SEARCH_VIEW}
          onCameraPress={onCameraPress} />

        {/* Bottom Option */}
        <View style={BOTTOM_LIST}>
          {dataList.map((data, index) => {
            return (
              <MyButton
                buttonSource={icons.redButton2}
                key={index}
                imageBackground={IMAGE_RED}
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
