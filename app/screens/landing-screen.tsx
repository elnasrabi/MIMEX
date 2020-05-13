import React, { FunctionComponent, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, FlatList, TouchableOpacity } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, TextField } from "../components"
import { useStores } from "../models/root-store"
import { color } from "../theme"
import { HeaderMenu } from "../components/header/header-menu"
import { TextFieldSimple } from "../components/text-field/text-field-simple"
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons'

export interface LandingScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1
}

const CONTAINER: ViewStyle = {
  flex: 1,
  padding: 20
}

const SEARCH_HERE: ViewStyle = {
  borderColor: color.palette.gray,
  height: 45,
  borderWidth: 1,
  marginTop: 25,
  borderRadius: 5,
  paddingStart: 15,
  paddingEnd: 30,
  flexDirection: "row"
}

const SEARCH_INPUT: ViewStyle = {
  alignSelf: "center",
  flex: 1
}

const SEARCH_ICON: ViewStyle = {
  alignSelf: "center"
}

const CAMERA_ICON: ViewStyle = {
  alignSelf: "center",
  marginTop: 20
}
const BOLD: TextStyle = { fontWeight: "bold" }

const HEADER: TextStyle = {
  color: color.palette.black,
  alignSelf: "center"
}

const LIST_ITEM: TextStyle = {
  color: color.palette.black,
  alignSelf: "center"
}

const GRID_VIEW: ViewStyle = {
  justifyContent: "center",
  flex: 1,
  backgroundColor: color.palette.lightGrey,
  height: 80,
  width: 60
}

const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
  color: "#666666"
}

const dataList = ["MyList", "History", "Rate Calc", "Add to Manifest", "Vehicle Check", "Help"]

export const LandingScreen: FunctionComponent<LandingScreenProps> = observer((props) => {
  useEffect(() => {
    console.tron.log('LandingScreen')
  }, [])
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])

  return (
    <Screen style={ROOT} preset="fixed">
      <HeaderMenu
        headerTx="landingScreen.header"
        rightIcon="menuBar"
        onRightPress={handleDrawer}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <Screen style={CONTAINER} preset="scroll">
        <Text preset="header" style={HEADER} tx={"landingScreen.search"} />
        <View style={SEARCH_HERE}>
          <EvilIcons style={SEARCH_ICON} color={color.palette.darkText} name="search" size={28} />
          <TextFieldSimple style={SEARCH_INPUT} returnKeyType={"search"} placeholderTx={"landingScreen.searchHere"} />
        </View>

        <TouchableOpacity>
          <EvilIcons style={CAMERA_ICON} color={color.palette.darkText} name="camera" size={200} />
        </TouchableOpacity>


        <FlatList
          data={dataList}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={GRID_VIEW}>
              <Text preset="bold" style={LIST_ITEM} text={item} />
            </TouchableOpacity>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />

      </Screen>
    </Screen>
  )
})
