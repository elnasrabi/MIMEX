import React, { FunctionComponent, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Platform, FlatList, View, Text, TextStyle, Dimensions } from "react-native"
import { ParamListBase, useIsFocused } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen } from "../../components"
import { color, typography } from "../../theme"
import { MenuButton } from "../../components/header/menu-button";
import { isIphoneX } from "react-native-iphone-x-helper";
import Video from 'react-native-video';
import { icons } from "../../components/icon/icons";
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';

export interface HelpScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {}

const FLATLIST_STYLE: ViewStyle = {
  marginHorizontal: 10,
  marginTop: Platform.OS == 'android' ? 60 : isIphoneX() ? 10 : 33
}
const RENDER_ITEM_CONTAINER: ViewStyle = {
  marginBottom: 10
}
const QUESTION_TEXT_STYLE: TextStyle = {
  color: color.palette.black,
  fontSize: 22,
  fontFamily: typography.secondary
}
const ANSWER_TEXT_STYLE: TextStyle = {
  color: color.palette.lightGrey,
  fontSize: 22,
  fontFamily: typography.secondary
}


export const HelpScreen: FunctionComponent<HelpScreenProps> = observer((props) => {
  const isFocusedOrientation = useIsFocused()
  const flatListdata = [
    { question: 'How do you xxx?', answer: 'The quick brown fox jumps over a lazy dog' },
    { question: 'How do you xxx?', answer: 'The quick brown fox jumps over a lazy dog' },
    { question: 'How do you xxx?', answer: 'The quick brown fox jumps over a lazy dog' }
  ]
  const [fullScreen, setFullScreen] = useState(false)
  const [pause, setPause] = useState(false)
  const renderItem = (item, index) => {
    return (
      <View style={RENDER_ITEM_CONTAINER} key={index}>
        <View>
          <Text style={QUESTION_TEXT_STYLE}>{item.question}</Text>
        </View>
        <View>
          <Text style={ANSWER_TEXT_STYLE}>{item.answer}</Text>
          <Text style={ANSWER_TEXT_STYLE}>{item.answer}</Text>
          <Text style={ANSWER_TEXT_STYLE}>{item.answer}</Text>
        </View>
      </View>
    )
  }

  const onEnterFullScreen = () => {
    return setFullScreen(true)
  }
  const onExitFullScreen = () => {
    return setFullScreen(false)
  }
  let VideoRef: any
  const renderHeader = () => {
    return (
      <View style={[FLATLIST_STYLE, fullScreen ? { height: Dimensions.get("screen").width - 100 } : { height: 250 }]}>
        <VideoPlayer
          ref={(ref) => VideoRef = ref}
          pause={pause}
          // source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" }}   // Can be a URL or a local file.
          source={icons.demoVideo}   // Can be a URL or a local file.
          style={[fullScreen ? { backgroundColor: 'black', width: '100%' } : { height: 200, backgroundColor: 'black' }]}
          videoStyle={{ width: '100%' }}
          onEnterFullscreen={() => onEnterFullScreen()}
          onExitFullscreen={() => onExitFullScreen()}
          disableBack={true}
          fullscreen={Platform.OS == 'android' ? fullScreen : false}
          toggleResizeModeOnFullscreen={false}
          resizeMode={'contain'}
        />
      </View>
    )
  }

  useEffect(() => {
    if (isFocusedOrientation && fullScreen) {
      Orientation.unlockAllOrientations()
    }
    else {
      Orientation.lockToPortrait()
    }
  }, [fullScreen])

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])
  return (
    <Screen style={[ROOT, fullScreen ? { backgroundColor: 'black', justifyContent: "center" } : {}]} statusBar={fullScreen ? 'light-content' : 'dark-content'} statusBarColor={fullScreen ? color.palette.black : color.palette.white} wall={'whiteWall'} preset="fixed" backgroundColor={fullScreen ? "black" : ""}>
      {fullScreen ? null : (<MenuButton
        title={"helpScreen.header"}
        onPress={handleDrawer} />
      )}
      {renderHeader()}
      {fullScreen ? null :
        <FlatList
          data={flatListdata}
          renderItem={({ item, index }) => renderItem(item, index)}
          style={{ margin: 10, marginBottom: 0 }}
          keyExtractor={(item, index) => index.toString()}
        // ListHeaderComponent={() => renderHeader()}
        />}
    </Screen>

  )
})
