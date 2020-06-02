import React, { FunctionComponent, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Platform, ScrollView, TextStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { isIphoneX } from "react-native-iphone-x-helper";
import RadioButton from "react-native-radio-button";

// imports from components ,themes and modals
import { Screen, Text, Checkbox, TextField } from "../../components";
import { color, typography } from "../../theme";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { icons } from "../../components/icon/icons";
import { BackButton } from "../../components/header/back-button";
export interface SafetyCheckDetailProps {
  navigation: NativeStackNavigationProp<ParamListBase>
};
const ROOT: ViewStyle = {
  paddingBottom: 10
};
const MAIN_VIEW: ViewStyle = {
  marginLeft: 10, marginBottom: 10,
  marginTop: Platform.OS == 'android' ? 60 : isIphoneX() ? 10 : 33,
};
const SEPERATOR_LINE: ViewStyle = {
  height: 5,
  backgroundColor: color.palette.black,
  width: '95%',
  borderRadius: 5,
  marginVertical: 15
};
const CHECKBOX_STYLE: ViewStyle = {
  height: 25,
  width: 25,
  borderColor: color.palette.black
};
const ROW_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
  marginTop: 5
};
const LABEL_STYLE: ViewStyle = {
  flex: 0.7,
  alignItems: "flex-start"
};
const DATE_STYLE: ViewStyle = {
  flex: 1
};
const LABEL_TEXT: TextStyle = {
  paddingLeft: '20%',
};
const DATE_TEXT: TextStyle = {
  color: color.palette.textGray
};
const RADIO_BUTTON_VIEW: TextStyle = {
  paddingLeft: 5
};
const COMMON_TEXT: TextStyle = {
  marginTop: 15
};
const TEXT_FIELD_INPUT: TextStyle = {
  height: 100,
  color: color.palette.link,
  textAlignVertical: 'top'
};
const FONT_STYLE: TextStyle = {
  fontFamily: typography.secondary
};
const TEXTFIELD_MAIN: ViewStyle = {
  width: '98%'
};
const RADIO_CONTAINER: ViewStyle = {
  marginTop: 20
};
const RADIO_BUTTON_MAINVIEW: ViewStyle = {
  marginTop: 5,
  marginLeft: 5,
  flexDirection: 'row'
};
const RADIO_BUTTON_SUBVIEW: ViewStyle = {
  flexDirection: 'row',
  alignItems: "center"
};

export const SafetyCheckDetail: FunctionComponent<SafetyCheckDetailProps> = observer((props) => {

  const [checkdetails, updateCheckDetails] = useState([
    { isCheck: false, text: "safetyCheckDetailScreen.leaks" },
    { isCheck: false, text: "safetyCheckDetailScreen.pressure" },
    { isCheck: false, text: "safetyCheckDetailScreen.lights" },
    { isCheck: false, text: "safetyCheckDetailScreen.mirrors" },
    { isCheck: false, text: "safetyCheckDetailScreen.alarms" },
    { isCheck: false, text: "safetyCheckDetailScreen.brakes" }
  ]);
  const [radio, updateRadio] = useState([
    { isSelect: false }, { isSelect: false }
  ]);
  const [radio1, updateRadio1] = useState([
    { isSelect: false }, { isSelect: false }
  ]);
  const [radio2, updateRadio2] = useState([
    { isSelect: false }, { isSelect: false }
  ]);
  const [comment, updateComment] = useState('');

  const renderRow = (label, value, extratext = true) => {
    return (
      <View style={ROW_CONTAINER}>
        <View style={LABEL_STYLE}>
          <Text extraText={extratext ? ":" : ''} style={[LABEL_TEXT, FONT_STYLE]} tx={label} />
        </View>
        <View style={DATE_STYLE}>
          <Text style={[DATE_TEXT, FONT_STYLE]} text={value} />
        </View>
      </View>
    )
  }

  const updateCheckBox = (index) => {
    let newArray = [...checkdetails]
    newArray[index].isCheck = !newArray[index].isCheck
    updateCheckDetails(newArray);
  }

  const renderCheckBoxlist = (item, index) => {
    return (
      <View key={index}>
        <Checkbox outlineStyle={CHECKBOX_STYLE} style={FONT_STYLE} tx={item.text} value={item.isCheck} onToggle={() => updateCheckBox(index)} />
      </View>
    )
  }

  const renderRadioButton = (question, data, updateData) => {
    return (
      <View style={RADIO_CONTAINER}>
        <Text style={FONT_STYLE} tx={question} />
        <View style={RADIO_BUTTON_MAINVIEW} >
          <View style={RADIO_BUTTON_SUBVIEW} >
            <RadioButton
              animation={'bounceIn'}
              innerColor={color.palette.orange}
              outerColor={color.palette.black}
              isSelected={data[0].isSelect}
              onPress={() => { updateData([{ isSelect: true }, { isSelect: false }]) }}
            />
            <Text style={[RADIO_BUTTON_VIEW, FONT_STYLE]} tx={"safetyCheckDetailScreen.yes"} />
          </View>
          <View style={[RADIO_BUTTON_SUBVIEW, { marginLeft: 10 }]} >
            <RadioButton
              animation={'bounceIn'}
              innerColor={color.palette.orange}
              outerColor={color.palette.black}
              isSelected={data[1].isSelect}
              onPress={() => { updateData([{ isSelect: false }, { isSelect: true }]) }}
            />
            <Text tx={"safetyCheckDetailScreen.no"} style={[RADIO_BUTTON_VIEW, FONT_STYLE]} />
          </View>
        </View>
      </View>
    )
  }

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const gotoSafetyCheckList = () => {
    return props.navigation.navigate('SafetyCheck');
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
        <Text tx={"safetyCheckDetailScreen.comments"} style={[COMMON_TEXT, FONT_STYLE]} extraText={":"} />
        <TextField
          mainStyle={TEXTFIELD_MAIN}
          inputStyle={[TEXT_FIELD_INPUT, FONT_STYLE]}
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
