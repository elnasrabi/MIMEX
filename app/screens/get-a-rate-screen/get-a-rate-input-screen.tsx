import React, { FunctionComponent, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Platform, ImageBackground } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, TextField, Button } from "../../components"
import { color, typography } from "../../theme"
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { isIphoneX } from "react-native-iphone-x-helper";

export interface GetARateProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const FONTFAMILY: TextStyle = {
  fontFamily: typography.secondary
}
const ROOT: ViewStyle = {
  paddingBottom: 10
}
const SCROLLVIEW_STYLE: ViewStyle = {
  marginBottom: 10,
  marginTop: Platform.OS == 'android' ? 50 : isIphoneX() ? 10 : 33
}
const SCROLL_CONTAINER_STYLE: ViewStyle = {
  marginLeft: 10,
  width: '96%'
}
const UPPER_VIEW_CONTAINER: ViewStyle = {
  width: '97%',
  paddingBottom: 20
}
const UPPER_VIEW_INNER_CONTAINER: ViewStyle = {
  marginTop: 20
}
const BUTTON_VIEW_STYLE: ViewStyle = {
  marginTop: 15,
  alignItems: 'flex-end',
  paddingRight: '6%'
}
const BUTTON_STYLE: ViewStyle = {
  backgroundColor: 'transparent'
}
const IMAGE_BACKGROUND_STYLE: ViewStyle = {
  justifyContent: 'center',
  borderRadius: 10,
  overflow: 'hidden',
  paddingHorizontal: 20,
  height: 40
}
const RENDER_CONTAINER_TEXTINPUT: ViewStyle = {
  width: "60%"
}
const FLEX: ViewStyle = {
  flex: 1
}
const RENDER_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between'
}
const RENDER_CONTAINER_TEXT: ViewStyle = {
  justifyContent: 'flex-end',
  paddingBottom: 10
}

export const GetARate: FunctionComponent<GetARateProps> = observer((props) => {

  const [mobile, updateMobile] = useState('0411 111 111')
  const [city, updateCity] = useState('South Yarra')
  const [state, updateState] = useState('VIC')
  const [licenceType, updateLicenceType] = useState('License Type')
  const [licenceNumber, updateLicenceNumber] = useState('License Number')
  const [expiry, updateExpiry] = useState('Expiry')

  const renderRow = (label, value, onUpdate) => {
    return (
      <View style={RENDER_CONTAINER}>
        <View style={RENDER_CONTAINER_TEXT}>
          <Text style={[FONTFAMILY, { color: color.palette.textGray }]} tx={label} />
        </View>
        <View style={RENDER_CONTAINER_TEXTINPUT}>
          <TextField
            autoCorrect={false}
            onChangeText={(text) => onUpdate(text)}
            autoCapitalize={"none"}
            mainStyle={{}}
            inputStyle={[FONTFAMILY]}
            value={'value'} />
        </View>
      </View>
    )
  }

  const renderUnitRow = (label, value, onUpdate) => {
    return (
      <View style={RENDER_CONTAINER}>
        <View style={[RENDER_CONTAINER_TEXT, FLEX]}>
          <Text style={[FONTFAMILY, { color: color.palette.textGray }]} tx={label} />
        </View>
        <View style={FLEX}>
          <TextField
            autoCorrect={false}
            onChangeText={(text) => onUpdate(text)}
            autoCapitalize={"none"}
            mainStyle={{}}
            inputStyle={[FONTFAMILY]}
            value={'value'} />
        </View>
      </View>
    )
  }

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])
  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      <MenuButton
        title={"getARateScreen.header"}
        onPress={handleDrawer} />

      <ScrollView contentContainerStyle={SCROLL_CONTAINER_STYLE} style={SCROLLVIEW_STYLE}>
        <View style={UPPER_VIEW_CONTAINER}>
          <Text style={[FONTFAMILY]} tx={'getARateScreen.pickUpAddress'} />
          <TextField
            autoCorrect={false}
            // onChangeText={(text) => onUpdate(text)}
            autoCapitalize={"none"}
            mainStyle={{}}
            inputStyle={[FONTFAMILY]}
            value={'value'} />
          <View style={UPPER_VIEW_INNER_CONTAINER}>
            <Text style={[FONTFAMILY]} tx={'getARateScreen.deliveryAddress'} />
            {renderRow("getARateScreen.postCode", city, updateCity)}
            <View style={BUTTON_VIEW_STYLE}>
              <Button style={BUTTON_STYLE}>
                <ImageBackground source={icons.blueButton} style={IMAGE_BACKGROUND_STYLE}>
                  <Text tx={'getARateScreen.getTowns'} style={{ color: color.palette.white }} />
                </ImageBackground>
              </Button>
            </View>
            {renderRow("getARateScreen.town", city, updateCity)}
          </View>
        </View>
        <View style={{}}>
          <Text style={[FONTFAMILY]} tx={'getARateScreen.details'} />
          {renderUnitRow("getARateScreen.unitOfMeasure", mobile, updateMobile)}
          {renderUnitRow("getARateScreen.quantity", mobile, updateMobile)}
          {renderUnitRow("getARateScreen.totalWeight", mobile, updateMobile)}
          {renderUnitRow("getARateScreen.length", mobile, updateMobile)}
          {renderUnitRow("getARateScreen.width", mobile, updateMobile)}
          {renderUnitRow("getARateScreen.height", mobile, updateMobile)}
          {renderUnitRow("getARateScreen.volume", mobile, updateMobile)}
        </View>
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        leftText={"getARateScreen.submit"}
        rightText={"common.cancel"} />
    </Screen >
  )
})