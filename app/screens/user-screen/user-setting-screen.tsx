import React, { FunctionComponent, useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Platform, TouchableOpacity } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, TextField } from "../../components"
import { color, typography } from "../../theme"
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { isIphoneX } from "react-native-iphone-x-helper";
import moment from 'moment'
import DateTimePickerModal from "react-native-modal-datetime-picker";

export interface UserSettingProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const TEXTINPUT_MAIN_VIEW: ViewStyle = {
  flex: 1, width: "100%"
}

const TITLE: ViewStyle = {
  flex: 1,
  marginTop: 15
}

const ROOT: ViewStyle = {
  paddingBottom: 10
}

const LABEL: TextStyle = {
  color: color.palette.black,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary
}

const VALUE: TextStyle = {
  color: color.palette.link,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary
}
const EMAIL_TEXT_STYLE: TextStyle = {
  color: color.palette.black,
  flex: 1,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary
}

const VALUE_CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: "flex-end"
}

const ROW: ViewStyle = {
  flexDirection: "row",
  marginStart: 20,
  marginEnd: 20,
  alignItems: 'center'
}
const SCROLLVIEW_STYLE: ViewStyle = {
  marginBottom: 10,
  marginTop: Platform.OS == 'android' ? 40 : isIphoneX() ? 0 : 23
}
const EMAIL_VIEW_STYLE: ViewStyle = {
  marginStart: 20,
  marginEnd: 20,
  marginTop: 20
}

export const UserSetting: FunctionComponent<UserSettingProps> = observer((props) => {

  const [mobile, updateMobile] = useState('0411 111 111')
  const [city, updateCity] = useState('South Yarra')
  const [state, updateState] = useState('VIC')
  const [licenceType, updateLicenceType] = useState('License Type')
  const [licenceNumber, updateLicenceNumber] = useState('License Number')
  const [expiry, updateExpiry] = useState('')
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false);
  const currentRef: any[] = []

  const renderRow = (key, label, value, onUpdate, hasExtraText = false) => {
    return (
      <View style={ROW}>
        <View style={TITLE}>
          <Text extraText={hasExtraText ? ":" : ""} style={LABEL} tx={label} />
        </View>
        {label == 'userSetting.expiry' ?
          <TouchableOpacity style={VALUE_CONTAINER} onPress={() => setShow(true)}>
            <View style={{ width: "100%" }} pointerEvents='none'>
              <TextField
                autoCorrect={false}
                editable={false}
                onChangeText={(text) => onUpdate(text)}
                autoCapitalize={"none"}
                mainStyle={TEXTINPUT_MAIN_VIEW}
                inputStyle={VALUE}
                value={moment(date).format('DD-MMM-YYYY').toString()} />
            </View>
            <DateTimePickerModal
              isVisible={show}
              onConfirm={handleConfirm}
              value={new Date()}
              mode="date"
              onCancel={hideDatePicker}
            />
          </TouchableOpacity>
          :
          <View style={VALUE_CONTAINER}>
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
              mainStyle={TEXTINPUT_MAIN_VIEW}
              inputStyle={VALUE}
              value={value}
              blurOnSubmit={label == 'userSetting.licenceNumber' ? true : false}
              onChangeText={(text) => onUpdate(text)}
              returnKeyType={'next'}
            />
          </View>
        }
      </View>
    )
  }

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date) => {
    setShow(Platform.OS === 'ios');
    setDate(date)
    hideDatePicker();
  };

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])
  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      <MenuButton
        title={"userSetting.header"}
        onPress={handleDrawer} />
      <ScrollView style={SCROLLVIEW_STYLE}>
        <View style={EMAIL_VIEW_STYLE}>
          <Text extraText={":"} style={EMAIL_TEXT_STYLE} tx={"userSetting.email"} />
          <View >
            <TextField mainStyle={TEXTINPUT_MAIN_VIEW} inputStyle={VALUE} editable={false} value={"username@gmail.com"} />
          </View>
        </View>

        {renderRow(0, "userSetting.mobile", mobile, updateMobile, true)}
        {renderRow(1, "userSetting.city", city, updateCity, true)}
        {renderRow(2, "userSetting.state", state, updateState, true)}
        {renderRow(3, "userSetting.licenceType", licenceType, updateLicenceType)}
        {renderRow(4, "userSetting.licenceNumber", licenceNumber, updateLicenceNumber)}
        {renderRow(5, "userSetting.expiry", expiry, updateExpiry)}

      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        leftText={"common.save"}
        rightText={"common.cancel"} />
    </Screen>

  )
})
