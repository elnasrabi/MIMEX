import React, { FunctionComponent, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Platform, ImageBackground, Image } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, TextField, Button } from "../../components"
import { color, typography } from "../../theme"
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { isIphoneX } from "react-native-iphone-x-helper";
import { BackButton } from "../../components/header/back-button";
import RNPickerSelect from 'react-native-picker-select'
import { DropdownPicker } from "../../components/dropdown-picker/Dropdown-picker";

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
const VALUE: TextStyle = {
  color: color.palette.link,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary
}
const INPUT_STYLE_IOS: TextStyle = {
  color: color.palette.black,
  fontSize: 16,
  fontWeight: "600",
  paddingLeft: 5,
  fontFamily: typography.secondary
}
const INPUT_STYLE_ANDROID: TextStyle = {
  color: color.palette.black,
  fontSize: 16,
  fontWeight: "bold",
  paddingLeft: 5,
  fontFamily: typography.secondary
}

export const GetARate: FunctionComponent<GetARateProps> = observer((props) => {

  const dropDownData = [
    { label: 'item 1', value: 'item 1' },
    { label: 'item 2', value: 'item 2' },
    { label: 'item 3', value: 'item 3' },
  ]
  const [pickUpAddress, updatePckUpAddress] = useState('')
  const [postCode, updatePostCode] = useState('')
  const [town, updateTown] = useState('')
  const [unitOfMeasure, updateUnitOfMeasure] = useState('')
  const [quantity, updateQuantity] = useState('')
  const [totalWeight, updateTotalWeight] = useState('')
  const [length, updateLength] = useState('')
  const [width, updateWidth] = useState('')
  const [height, updateHeight] = useState('')
  const [volume, updateVolume] = useState('')
  const currentRef: any[] = []

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
            inputStyle={VALUE}
            value={value} />
        </View>
      </View>
    )
  }

  const renderUnitRow = (key, label, value, onUpdate) => {
    return (
      <View style={RENDER_CONTAINER}>
        <View style={[RENDER_CONTAINER_TEXT, FLEX]}>
          <Text style={[FONTFAMILY, { color: color.palette.textGray }]} tx={label} />
        </View>
        <View style={FLEX}>
          {label == 'getARateScreen.unitOfMeasure' ?
            <DropdownPicker
              dropDownData={dropDownData}
              selectedValue={value}
              onValueChange={(value) => onUpdate(value)}
            />
            :
            <TextField
              key={key}
              autoCorrect={false}
              forwardedRef={(input) => {
                currentRef.push(input)
              }}
              onSubmitEditing={() => {
                if (currentRef[key + 1]) {
                  currentRef[key + 1].focus()
                } else {
                  // Click on save button
                }
              }}
              autoCapitalize={"none"}
              mainStyle={{}}
              inputStyle={VALUE}
              value={value}
              blurOnSubmit={label == "getARateScreen.volume" ? true : false}
              onChangeText={(text) => onUpdate(text)}
              returnKeyType={'next'}
            />
          }
        </View>
      </View>
    )
  }

  const gotoRateListScreen = () => {
    return props.navigation.navigate('GetARateList')
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
          <DropdownPicker
            dropDownData={dropDownData}
            selectedValue={pickUpAddress}
            onValueChange={(value) => updatePckUpAddress(value)}
          />
          <View style={UPPER_VIEW_INNER_CONTAINER}>
            <Text style={[FONTFAMILY]} tx={'getARateScreen.deliveryAddress'} />
            {renderRow("getARateScreen.postCode", postCode, updatePostCode)}
            <View style={BUTTON_VIEW_STYLE}>
              <Button style={BUTTON_STYLE}>
                <ImageBackground source={icons.blueButton} style={IMAGE_BACKGROUND_STYLE}>
                  <Text tx={'getARateScreen.getTowns'} style={{ color: color.palette.white }} />
                </ImageBackground>
              </Button>
            </View>
            {renderRow("getARateScreen.town", town, updateTown)}
          </View>
        </View>
        <View style={{}}>
          <Text style={[FONTFAMILY]} tx={'getARateScreen.details'} />
          {renderUnitRow(0, "getARateScreen.unitOfMeasure", unitOfMeasure, updateUnitOfMeasure)}
          {renderUnitRow(0, "getARateScreen.quantity", quantity, updateQuantity)}
          {renderUnitRow(1, "getARateScreen.totalWeight", totalWeight, updateTotalWeight)}
          {renderUnitRow(2, "getARateScreen.length", length, updateLength)}
          {renderUnitRow(3, "getARateScreen.width", width, updateWidth)}
          {renderUnitRow(4, "getARateScreen.height", height, updateHeight)}
          {renderUnitRow(5, "getARateScreen.volume", volume, updateVolume)}
        </View>
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        onLeftPress={() => gotoRateListScreen()}
        leftText={"getARateScreen.submit"}
        rightText={"common.cancel"} />
    </Screen >
  )
})