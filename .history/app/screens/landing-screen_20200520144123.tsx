import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, FlatList, TouchableOpacity, ImageStyle, Alert, ImageBackground } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Icon } from "../components"
import { color } from "../theme"
import { MenuButton } from "../components/header/menu-button"
import { SearchView } from "../components/search-view/search-view"
import { MyButton } from "../components/button/my-button"
import { icons } from "../components/icon/icons"
import { useStores } from "../models/root-store"
import { ADMINISTRATION, CARRIER } from "../utils/utils"

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
  bottom: 30,
  alignSelf: "center"
}
const CONTINUE: ViewStyle = {
  margin: 5
}

const IMAGE_RED: ImageStyle = {
  alignSelf: "center",
  padding: 20
}

const SEARCH_VIEW: ViewStyle = {

}

const AFS_LOGO: ImageStyle = {
  height: 140,
  width: 240,
  alignSelf: "center"
}

const CONTAINER_AFS_LOGO: ImageStyle = {
  marginTop: 60
}
const BACKGROUND_ICON: ImageStyle = {
  alignSelf: "center",
  justifyContent: 'center',
  height: 80,
  width: "100%"
}

const TEXT: TextStyle = {
  color: color.palette.white,
  alignSelf: "center",
  textAlign: "center",
  width: 100
}

const adminList = ["landingScreen.addToList", "landingScreen.safetyCheck", "landingScreen.getRate", "landingScreen.help"]
const carrierList = ["landingScreen.myList", "landingScreen.safetyCheck", "landingScreen.help"]
const customerList = ["landingScreen.getRate", "landingScreen.help"]
let USER_TYPE = ""
export const LandingScreen: FunctionComponent<LandingScreenProps> = observer(props => {
  const { homeStore, authStore } = useStores()
  USER_TYPE = authStore.userData[0].userTypeName[0]
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

  const getOptionList = (): any => {
    if (USER_TYPE === ADMINISTRATION) {
      return adminList
    } else if (USER_TYPE === CARRIER) {
      return carrierList
    } else {
      return customerList
    }
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
          <FlatList
            data={getOptionList()}
            numColumns={3}
            renderItem={({ index, item }) => (
              <TouchableOpacity
                style={CONTINUE}
                key={index}>
                <ImageBackground resizeMode={"contain"} style={BACKGROUND_ICON}
                  source={icons.redButton2}>
                  <Text style={TEXT} tx={item} />
                </ImageBackground>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </Screen>
  )
})
