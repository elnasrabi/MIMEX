import React, { FunctionComponent, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Platform, FlatList, View, Text, TextStyle, Dimensions, Image, TouchableOpacity, ImageStyle, Linking } from "react-native"
import { ParamListBase, useIsFocused } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen } from "../../components"
import { color, typography } from "../../theme"
import { icons } from "../../components/icon/icons";
import { MenuButton } from "../../components/header/menu-button";
import { isIphoneX } from "react-native-iphone-x-helper";
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
import { callApi } from "../../utils/utils";

export interface HelpScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  // backgroundColor: 'black',
  justifyContent: "center"
}

const FLATLIST_STYLE: ViewStyle = {
  marginHorizontal: 10,
  marginTop: Platform.OS == 'android' ? 60 : isIphoneX() ? 15 : 40
}
const ITEM_CONTAINER: ViewStyle = {
  marginBottom: 10
}
const QUESTION_TEXT: TextStyle = {
  color: color.palette.black,
  fontSize: 22,
  fontFamily: typography.secondary
}
const ANSWER_TEXT: TextStyle = {
  color: color.palette.lightGrey,
  fontSize: 22,
  fontFamily: typography.secondary
}
const HEADER_STYLE: ViewStyle = {
  paddingHorizontal: 10,
  paddingBottom: 30,
  backgroundColor: color.palette.white,
  borderColor: color.palette.black,
  borderWidth: 1,
  borderRadius: 4,
  flexDirection: 'row'
}
const EMAIL_LOGO: ImageStyle = {
  height: 150,
  width: '100%'
}
const CALL_LOGO: ImageStyle = {
  height: 110,
  marginTop: 20,
  width: '100%'
}
const LOGO_TEXT: TextStyle = {
  color: color.palette.red,
  alignSelf: 'center',
  fontFamily: typography.secondary
}

export const HelpScreen: FunctionComponent<HelpScreenProps> = observer((props) => {
  // const isFocusedOrientation = useIsFocused()
  const flatListdata = [
    { question: 'How do you xxx?', answer: 'The quick brown fox jumps over a lazy dog' },
    { question: 'How do you xxx?', answer: 'The quick brown fox jumps over a lazy dog' },
    { question: 'How do you xxx?', answer: 'The quick brown fox jumps over a lazy dog' }
  ]
  // const [fullScreen, setFullScreen] = useState(false)
  const renderItem = (item, index) => {
    return (
      <View style={ITEM_CONTAINER} key={index}>
        <View>
          <Text style={QUESTION_TEXT}>{item.question}</Text>
        </View>
        <View>
          <Text style={ANSWER_TEXT}>{item.answer}</Text>
          <Text style={ANSWER_TEXT}>{item.answer}</Text>
          <Text style={ANSWER_TEXT}>{item.answer}</Text>
        </View>
      </View>
    )
  }
  // const onEnterFullScreen = () => {
  //   return setFullScreen(true)
  // }
  // const onExitFullScreen = () => {
  //   return setFullScreen(false)
  // }
  // const renderHeader = () => {
  //   return (
  //     <View style={[FLATLIST_STYLE, fullScreen ? { height: Dimensions.get("screen").width - 100 } : { height: 250 }]}>
  //       <VideoPlayer
  //         pause={isFocusedOrientation ? false : true}
  //         source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" }}   // Can be a URL or a local file.
  //         // source={icons.demoVideo}   // Can be a URL or a local file.
  //         style={[fullScreen ? { backgroundColor: 'black', width: '100%' } : { height: 200, backgroundColor: 'black' }]}
  //         videoStyle={{ width: '100%' }}
  //         onEnterFullscreen={() => onEnterFullScreen()}
  //         onExitFullscreen={() => onExitFullScreen()}
  //         disableBack={true}
  //         fullscreen={Platform.OS == 'android' ? fullScreen : false}
  //         toggleResizeModeOnFullscreen={false}
  //         resizeMode={'contain'}
  //       />
  //     </View>
  //   )
  // }

  // useEffect(() => {
  //   if (isFocusedOrientation && fullScreen) {
  //     Orientation.unlockAllOrientations()
  //   }
  //   else {
  //     Orientation.lockToPortrait()
  //   }
  // }, [fullScreen])

  const renderFlatlistHeader = () => {
    return (
      <View style={HEADER_STYLE} >
        <TouchableOpacity style={{ flex: 1 }}
          onPress={() => Linking.openURL('mailto:support@moveit.com')}
        >
          <Image source={icons.emailLogo} resizeMode="contain" style={EMAIL_LOGO} />
          <Text style={LOGO_TEXT} >{`support@moveit.com`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, }}
          onPress={() => callApi('+611234123123')}>
          <Image source={icons.callLogo} resizeMode="contain" style={CALL_LOGO} />
          <Text style={[LOGO_TEXT, { marginTop: 20 }]} >{`+61 1234 123 123`}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])
  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed" >
      <MenuButton
        title={"helpScreen.header"}
        onPress={handleDrawer} />

      <FlatList
        ListHeaderComponent={renderFlatlistHeader}
        ListHeaderComponentStyle={ITEM_CONTAINER}
        data={flatListdata}
        renderItem={({ item, index }) => renderItem(item, index)}
        style={FLATLIST_STYLE}
        keyExtractor={(item, index) => index.toString()}
      />
    </Screen>
  )

  // Video component
  // return (
  //   <Screen style={fullScreen ? ROOT : {}} statusBar={fullScreen ? 'light-content' : 'dark-content'} statusBarColor={fullScreen ? color.palette.black : color.palette.white} wall={'whiteWall'} preset="fixed" backgroundColor={fullScreen ? "black" : ""}>
  //     {fullScreen ? null : (<MenuButton
  //       title={"helpScreen.header"}
  //       onPress={handleDrawer} />
  //     )}
  //     {renderHeader()}
  //     {fullScreen ? null :
  //       <FlatList
  //         data={flatListdata}
  //         renderItem={({ item, index }) => renderItem(item, index)}
  //         style={{ margin: 10, marginBottom: 0 }}
  //         keyExtractor={(item, index) => index.toString()}
  //       />}
  //   </Screen>
  // )
})
