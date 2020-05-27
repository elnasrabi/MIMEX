import React, { FunctionComponent, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Platform, FlatList, View, Text, TextStyle, Alert, ActivityIndicator } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen } from "../../components"
import { color, typography } from "../../theme"
import { MenuButton } from "../../components/header/menu-button";
import { isIphoneX } from "react-native-iphone-x-helper";
import Video from 'react-native-video';
import { icons } from "../../components/icon/icons";

export interface HelpScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  paddingBottom: 10
}

const FLATLIST_STYLE: ViewStyle = {
  margin: 10,
  marginTop: Platform.OS == 'android' ? 60 : isIphoneX() ? 10 : 33
}
const RENDER_ITEM_CONTAINER: ViewStyle = {
  marginTop: 10
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

  const flatListdata = [
    { question: 'How do you xxx?', answer: 'The quick brown fox jumps over a lazy dog' },
    { question: 'How do you xxx?', answer: 'The quick brown fox jumps over a lazy dog' },
    { question: 'How do you xxx?', answer: 'The quick brown fox jumps over a lazy dog' }
  ]
  let videoRef: any
  const [retry, setRetry] = useState(true)
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
  const renderHeader = () => {
    return (
      <Video
        source={{ uri: "http://commondatastorage.goojgleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" }}   // Can be a URL or a local file.
        // source={icons.demoVideo}   // Can be a URL or a local file.
        onBuffer={() => <ActivityIndicator size="small" color="white" style={{ zIndex: 5 }} />}                // Callback when remote video is buffering
        onError={(error) => console.tron.log(error)}               // Callback when video cannot be loaded
        style={{ height: 200, backgroundColor: 'black' }}
        onLoadStart={(el) => console.tron.log('onLOadStart', el)}
        onLoadEnd={() => console.tron.log('onLOadend')}
        onLoad={(el) => console.tron.log('onLOad', el)}
        repeat={true}
      />
    )
  }
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])
  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      <MenuButton
        title={"helpScreen.header"}
        onPress={handleDrawer} />

      <FlatList
        data={flatListdata}
        renderItem={({ item, index }) => renderItem(item, index)}
        style={FLATLIST_STYLE}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => renderHeader()}
      />
    </Screen>

  )
})
