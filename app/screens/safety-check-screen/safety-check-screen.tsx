import React, { FunctionComponent, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Platform, FlatList } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import { MenuButton } from "../../components/header/menu-button";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { icons } from "../../components/icon/icons";
import { isIphoneX } from "react-native-iphone-x-helper";
import { SearchView } from "../../components/search-view/search-view";

export interface SafetyCheckProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

export const SafetyCheck: FunctionComponent<SafetyCheckProps> = observer((props) => {
  const ROOT: ViewStyle = {
    paddingBottom: 10
  }
  const BOTTOM_BUTTON_STYLE: ViewStyle = {
    justifyContent: 'flex-end',
    flex: 1
  }
  const FLATLIST_STYLE: ViewStyle = {
    width: "90%",
    marginLeft: '4%',
    marginTop: 20,
    height: "30%"
  }
  const MAIN_VIEW: ViewStyle = {
    marginTop: Platform.OS == 'android' ? 40 : isIphoneX() ? 10 : 33
  }
  const SEARCH_VIEW_STYLE: ViewStyle = {
    marginTop: "10%"
  }
  const SEARCH_INPUT_STYLE: ViewStyle = {
    width: '50%',
    marginVertical: 20,
    alignSelf: "center"
  }
  const BUTTON_VIEW_STYLE: ViewStyle = {
    height: 50
  }
  const RENDER_CONTAINER: ViewStyle = {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: 'space-between'
  }
  const RENDER_DATE_VIEW: ViewStyle = {
    flex: 0.4
  }
  const RENDER_LINK_VIEW: ViewStyle = {
    flex: 0.7,
    alignItems: 'flex-end',
    paddingRight: 5
  }
  const RESULT_TEXT_STYLE: TextStyle = {
    color: color.palette.darkText,
    fontSize: 22,
    alignSelf: "center",
    marginTop: 35
  }
  const RENDER_TEXT_STYLE: TextStyle = {
    fontSize: 15
  }

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])
  const [resultlist, updateResultList] = useState([{ id: '1', date: '12-Nov-2020', link: 'Vehicle Safety Check' }, { id: '2', date: '12-Nov-2020', link: 'Vehicle Safety Check' }, { id: '3', date: '12-Nov-2020', link: 'Vehicle Safety Check' }, { id: '4', date: '12-Nov-2020', link: 'Vehicle Safety Check' }, { id: '5', date: '12-Nov-2020', link: 'Vehicle Safety Check' }, { id: '6', date: '12-Nov-2020', link: 'Vehicle Safety Check' }, { id: '7', date: '12-Nov-2020', link: 'Vehicle Safety Check' }, { id: '8', date: '12-Nov-2020', link: 'Vehicle Safety Check' }, { id: '9', date: '12-Nov-2020', link: 'Vehicle Safety Check' }])

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={RENDER_CONTAINER} >
        <View style={RENDER_DATE_VIEW}>
          <Text style={[RENDER_TEXT_STYLE, { color: color.palette.darkText }]} >{item.date}</Text>
        </View>
        <View style={RENDER_LINK_VIEW}>
          <Text style={[RENDER_TEXT_STYLE, { color: color.palette.link }]} >{item.link}</Text>
        </View>
      </View>
    )
  }

  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      <MenuButton
        title={"safetyCheckScreen.header"}
        onPress={handleDrawer} />
      <View style={MAIN_VIEW}>
        <SearchView
          containerStyle={SEARCH_VIEW_STYLE}
          searchInputViewStyle={SEARCH_INPUT_STYLE}
          cameraIcon={false}
          buttonStyle={BUTTON_VIEW_STYLE} />

        <Text style={RESULT_TEXT_STYLE} tx={"safetyCheckScreen.results"} />

        <FlatList
          style={FLATLIST_STYLE}
          data={resultlist}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
        />
      </View>
      <View style={BOTTOM_BUTTON_STYLE}>
        <BottomButton
          leftImage={icons.blackButton2}
          rightImage={icons.redButton}
          leftText={"common.save"}
          rightText={"common.cancel"} />
      </View>
    </Screen>
  )
})
