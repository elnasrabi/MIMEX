import React, { FunctionComponent, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Platform, ScrollView, TextStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Checkbox, TextField } from "../../components"
import { color } from "../../theme"
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { icons } from "../../components/icon/icons";
import { isIphoneX } from "react-native-iphone-x-helper";
import { BackButton } from "../../components/header/back-button";
import RadioButton from "react-native-radio-button";
export interface SafetyCheckDetailProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  paddingBottom: 10
}
const MAIN_VIEW: ViewStyle = {
  marginLeft: 10, marginBottom: 10,
  marginTop: Platform.OS == 'android' ? 60 : isIphoneX() ? 10 : 33,
}
const SEPERATOR_LINE: ViewStyle = {
  height: 5,
  backgroundColor: color.palette.black,
  width: '95%',
  borderRadius: 5,
  marginVertical: 15
}
const CHECKBOX_STYLE: ViewStyle = {
  height: 25,
  width: 25,
  borderColor: color.palette.black
}
const RENDER_ROW_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
  marginTop: 5
}
const RENDER_ROW_TEXT_VIEW: ViewStyle = {
  flex: 0.7,
  alignItems: "flex-start"
}
const RENDER_ROW_DATA_VIEW: ViewStyle = {
  flex: 1
}
const RENDER_ROW_TEXT_STYLE: TextStyle = {
  paddingLeft: '20%'
}
const RENDER_RADIO_BUTTON_TEXT_VIEW: TextStyle = {
  paddingLeft: 5
}
const COMMENT_TEXT_STYLE: TextStyle = {
  marginTop: 15
}
const TEXTFIELD_INPUT_STYLE: TextStyle = {
  height: 100
}
const TEXTFIELD_MAIN_STYLE: ViewStyle = {
  width: '98%'
}
const RENDER_RADIO_CONTAINER: ViewStyle = {
  marginTop: 20
}
const RENDER_RADIO_BUTTON_MAIN_VIEW: ViewStyle = {
  marginTop: 5,
  marginLeft: 5,
  flexDirection: 'row'
}
const RENDER_RADIO_BUTTON_VIEW: ViewStyle = {
  flexDirection: 'row',
  alignItems: "center"
}

export const SafetyCheckDetail: FunctionComponent<SafetyCheckDetailProps> = observer((props) => {

  const [checkdetails, updateCheckDetails] = useState([
    { isCheck: false, text: "safetyCheckDetailScreen.leaks" },
    { isCheck: false, text: "safetyCheckDetailScreen.pressure" },
    { isCheck: false, text: "safetyCheckDetailScreen.lights" },
    { isCheck: false, text: "safetyCheckDetailScreen.mirrors" },
    { isCheck: false, text: "safetyCheckDetailScreen.alarms" },
    { isCheck: false, text: "safetyCheckDetailScreen.brakes" }
  ])
  const [radio, updateRadio] = useState([
    { isSelect: false }, { isSelect: false }
  ]);
  const [radio1, updateRadio1] = useState([
    { isSelect: false }, { isSelect: false }
  ]);
  const [radio2, updateRadio2] = useState([
    { isSelect: false }, { isSelect: false }
  ]);

  const renderRow = (label, value, extratext = true) => {
    return (
      <View style={RENDER_ROW_CONTAINER}>
        <View style={RENDER_ROW_TEXT_VIEW}>
          <Text extraText={extratext ? ":" : ''} style={RENDER_ROW_TEXT_STYLE} tx={label} />
        </View>
        <View style={RENDER_ROW_DATA_VIEW}>
          <Text style={{}} text={value} />
        </View>
      </View>
    )
  }

  const updateCheckBox = (index) => {
    let newArray = [...checkdetails]
    newArray[index].isCheck = !newArray[index].isCheck
    updateCheckDetails(newArray)
  }

  const renderCheckBoxlist = (item, index) => {
    return (
      <View key={index}>
        <Checkbox outlineStyle={CHECKBOX_STYLE} tx={item.text} value={item.isCheck} onToggle={() => updateCheckBox(index)} />
      </View>
    )
  }

  const renderRadioButton = (question, data, updateData) => {
    return (
      <View style={RENDER_RADIO_CONTAINER}>
        <Text tx={question} />
        <View style={RENDER_RADIO_BUTTON_MAIN_VIEW} >
          <View style={RENDER_RADIO_BUTTON_VIEW} >
            <RadioButton
              animation={'bounceIn'}
              isSelected={data[0].isSelect}
              onPress={() => { updateData([{ isSelect: true }, { isSelect: false }]) }}
            />
            <Text style={RENDER_RADIO_BUTTON_TEXT_VIEW} tx={"safetyCheckDetailScreen.yes"} />
          </View>
          <View style={[RENDER_RADIO_BUTTON_VIEW, { marginLeft: 10 }]} >
            <RadioButton
              animation={'bounceIn'}
              isSelected={data[1].isSelect}
              onPress={() => { updateData([{ isSelect: false }, { isSelect: true }]) }}
            />
            <Text tx={"safetyCheckDetailScreen.no"} style={RENDER_RADIO_BUTTON_TEXT_VIEW} />
          </View>
        </View>
      </View>
    )
  }

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])

  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      <BackButton
        title={"safetyCheckDetailScreen.header"}
        onPress={goBack} />
      <ScrollView style={MAIN_VIEW} >
        {renderRow("safetyCheckDetailScreen.driver", "Neel Patanwadia")}
        {renderRow("safetyCheckDetailScreen.vehicle", "Red Van 2")}
        {renderRow("safetyCheckDetailScreen.date", "12-NOV-2020")}
        <View style={SEPERATOR_LINE} />
        {
          // CheckBox list data
          checkdetails.map((item, index) => renderCheckBoxlist(item, index))
        }
        {renderRadioButton("safetyCheckDetailScreen.healthquestion", radio, updateRadio)}
        {renderRadioButton("safetyCheckDetailScreen.shiftquestion", radio1, updateRadio1)}
        {renderRadioButton("safetyCheckDetailScreen.alcoholquestion", radio2, updateRadio2)}
        <Text tx={"safetyCheckDetailScreen.comments"} style={COMMENT_TEXT_STYLE} extraText={":"} />
        <TextField
          mainStyle={TEXTFIELD_MAIN_STYLE}
          inputStyle={TEXTFIELD_INPUT_STYLE}
          style={{}}
          returnKeyType={"search"}
          multiline={true}
          placeholderTx={""} />
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton}
        leftText={'common.save'}
        rightText={'common.cancel'}
      />
    </Screen>
  )
})
