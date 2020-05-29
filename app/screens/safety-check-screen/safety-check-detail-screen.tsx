import React, { FunctionComponent, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Platform, ScrollView, TextStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Checkbox, TextField } from "../../components"
import { color, typography } from "../../theme"
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
const rowContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
  marginTop: 5
}
const lableStyle: ViewStyle = {
  flex: 0.7,
  alignItems: "flex-start"
}
const dataStyle: ViewStyle = {
  flex: 1
}
const lableText: TextStyle = {
  paddingLeft: '20%',
}
const dataText: TextStyle = {
  color: color.palette.textGray
}
const radioButtonView: TextStyle = {
  paddingLeft: 5
}
const commentText: TextStyle = {
  marginTop: 15
}
const textFieldInput: TextStyle = {
  height: 100,
  color: color.palette.link,
  textAlignVertical: 'top'
}
const fontStyle: TextStyle = {
  fontFamily: typography.secondary
}
const textFieldMain: ViewStyle = {
  width: '98%'
}
const radioContainer: ViewStyle = {
  marginTop: 20
}
const radioButtonMainView: ViewStyle = {
  marginTop: 5,
  marginLeft: 5,
  flexDirection: 'row'
}
const radioButtonSubView: ViewStyle = {
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
  const [comment, updateComment] = useState('')

  const renderRow = (label, value, extratext = true) => {
    return (
      <View style={rowContainer}>
        <View style={lableStyle}>
          <Text extraText={extratext ? ":" : ''} style={[lableText, fontStyle]} tx={label} />
        </View>
        <View style={dataStyle}>
          <Text style={[dataText, fontStyle]} text={value} />
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
        <Checkbox outlineStyle={CHECKBOX_STYLE} style={fontStyle} tx={item.text} value={item.isCheck} onToggle={() => updateCheckBox(index)} />
      </View>
    )
  }

  const renderRadioButton = (question, data, updateData) => {
    return (
      <View style={radioContainer}>
        <Text style={fontStyle} tx={question} />
        <View style={radioButtonMainView} >
          <View style={radioButtonSubView} >
            <RadioButton
              animation={'bounceIn'}
              innerColor={color.palette.orange}
              outerColor={color.palette.black}
              isSelected={data[0].isSelect}
              onPress={() => { updateData([{ isSelect: true }, { isSelect: false }]) }}
            />
            <Text style={[radioButtonView, fontStyle]} tx={"safetyCheckDetailScreen.yes"} />
          </View>
          <View style={[radioButtonSubView, { marginLeft: 10 }]} >
            <RadioButton
              animation={'bounceIn'}
              innerColor={color.palette.orange}
              outerColor={color.palette.black}
              isSelected={data[1].isSelect}
              onPress={() => { updateData([{ isSelect: false }, { isSelect: true }]) }}
            />
            <Text tx={"safetyCheckDetailScreen.no"} style={[radioButtonView, fontStyle]} />
          </View>
        </View>
      </View>
    )
  }

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])

  const gotoSafetyCheckList = () => {
    return props.navigation.navigate('SafetyCheck')
  }

  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      <BackButton
        title={"safetyCheckDetailScreen.header"}
        onPress={goBack} />
      <ScrollView style={MAIN_VIEW}>
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
        <Text tx={"safetyCheckDetailScreen.comments"} style={[commentText, fontStyle]} extraText={":"} />
        <TextField
          mainStyle={textFieldMain}
          inputStyle={[textFieldInput, fontStyle]}
          style={{}}
          returnKeyType={"default"}
          multiline={true}
          value={comment}
          onChangeText={(value) => updateComment(value)}
          placeholderTx={""} />
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        onLeftPress={() => gotoSafetyCheckList()}
        onRightPress={() => gotoSafetyCheckList()}
        leftText={'common.save'}
        rightText={'common.cancel'}
      />
    </Screen>
  )
})
