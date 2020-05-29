import React, { FunctionComponent, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Platform, ImageBackground, KeyboardTypeOptions } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, TextField, Button } from "../../components"
import { color, typography } from "../../theme"
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { isIphoneX } from "react-native-iphone-x-helper";
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
const scrollViewStyle: ViewStyle = {
  marginBottom: 10,
  marginTop: Platform.OS == 'android' ? 50 : isIphoneX() ? 10 : 33
}
const scrollContainer: ViewStyle = {
  marginLeft: 10,
  width: '96%'
}
const upperContainer: ViewStyle = {
  width: '97%',
  paddingBottom: 20
}
const upperContainerSubView: ViewStyle = {
  marginTop: 20
}
const BUTTON_VIEW: ViewStyle = {
  marginTop: 15,
  alignItems: 'flex-end',
  paddingRight: '6%'
}
const BUTTON_STYLE: ViewStyle = {
  backgroundColor: 'transparent'
}
const IMAGE_BACKGROUND: ViewStyle = {
  justifyContent: 'center',
  borderRadius: 10,
  overflow: 'hidden',
  paddingHorizontal: 20,
  height: 40
}
const textFielfView: ViewStyle = {
  width: "60%"
}
const FLEX: ViewStyle = {
  flex: 1
}
const containerView: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between'
}
const containerText: ViewStyle = {
  justifyContent: 'flex-end',
  paddingBottom: 10
}
const VALUE: TextStyle = {
  color: color.palette.link,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary
}
const SEPERATOR_LINE: ViewStyle = {
  height: 2,
  backgroundColor: color.palette.black,
  width: '100%',
  marginBottom: 10,
  borderRadius: 5
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

  const renderRow = (label, value, onUpdate, keyboardType: KeyboardTypeOptions = 'default') => {
    return (
      <View style={containerView}>
        <View style={containerText}>
          <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={label} />
        </View>
        <View style={textFielfView}>
          <TextField
            autoCorrect={false}
            onChangeText={(text) => onUpdate(text)}
            autoCapitalize={"none"}
            mainStyle={{}}
            keyboardType={keyboardType}
            inputStyle={VALUE}
            value={value} />
        </View>
      </View>
    )
  }

  const renderUnitRow = (key, label, value, onUpdate, keyboardType: KeyboardTypeOptions = 'default') => {
    return (
      <View style={containerView}>
        <View style={[containerText, FLEX]}>
          <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={label} />
        </View>
        <View style={FLEX}>
          {label == 'getARateScreen.unitOfMeasure' ?
            <DropdownPicker
              dropDownData={dropDownData}
              selectedValue={value}
              placeHolder={"common.registrationId"}
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
              keyboardType={keyboardType}
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
  const gotoHomeScreen = () => {
    return props.navigation.navigate('Home')
  }

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])

  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      <MenuButton
        title={"getARateScreen.header"}
        onPress={handleDrawer} />

      <ScrollView contentContainerStyle={scrollContainer} style={scrollViewStyle}>
        <View style={upperContainer}>
          <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={'getARateScreen.pickUpAddress'} />
          <View style={SEPERATOR_LINE} />
          <DropdownPicker
            dropDownData={dropDownData}
            placeHolder={"common.registrationId"}
            selectedValue={pickUpAddress}
            onValueChange={(value) => updatePckUpAddress(value)}
          />
          <View style={upperContainerSubView}>
            <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={'getARateScreen.deliveryAddress'} />
            <View style={SEPERATOR_LINE} />
            {renderRow("getARateScreen.postCode", postCode, updatePostCode, 'decimal-pad')}
            <View style={BUTTON_VIEW}>
              <Button style={BUTTON_STYLE}>
                <ImageBackground source={icons.blueButton} style={IMAGE_BACKGROUND}>
                  <Text tx={'getARateScreen.getTowns'} style={{ color: color.palette.white }} />
                </ImageBackground>
              </Button>
            </View>
            {renderRow("getARateScreen.town", town, updateTown)}
          </View>
        </View>
        <View style={{}}>
          <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={'getARateScreen.details'} />
          <View style={[SEPERATOR_LINE, { width: '97%' }]} />
          {renderUnitRow(0, "getARateScreen.unitOfMeasure", unitOfMeasure, updateUnitOfMeasure)}
          {renderUnitRow(0, "getARateScreen.quantity", quantity, updateQuantity, 'decimal-pad')}
          {renderUnitRow(1, "getARateScreen.totalWeight", totalWeight, updateTotalWeight, 'decimal-pad')}
          {renderUnitRow(2, "getARateScreen.length", length, updateLength, 'decimal-pad')}
          {renderUnitRow(3, "getARateScreen.width", width, updateWidth, 'decimal-pad')}
          {renderUnitRow(4, "getARateScreen.height", height, updateHeight, 'decimal-pad')}
          {renderUnitRow(5, "getARateScreen.volume", volume, updateVolume, 'decimal-pad')}
        </View>
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        onLeftPress={() => gotoRateListScreen()}
        onRightPress={() => gotoHomeScreen()}
        leftText={"getARateScreen.submit"}
        rightText={"common.cancel"} />
    </Screen >
  )
})