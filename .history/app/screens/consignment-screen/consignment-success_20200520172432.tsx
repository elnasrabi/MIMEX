import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Picker, ImageStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, TextField } from "../../components"
import { color, typography } from "../../theme"
import { BackButton } from "../../components/header/back-button"
import { BottomButton } from "../../components/bottom-button/bottom-button"
import { icons } from "../../components/icon/icons"
import { ComConsignmentDetail } from "../../components/consignment/com-consigment-detail"
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons'

export interface ConsignmentSuccessProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const ROOT: ViewStyle = {
  flex: 1,
}

const CONSIGNMENT_VIEW: ViewStyle = { flex: 1 }
const CAMERA_ICON: ImageStyle = { marginTop: 5 }
const STATUS_VIEW: ViewStyle = {
  height: 50,
  backgroundColor: color.palette.toolbar,
  marginTop: 10,
  justifyContent: "center"
}
const STATUS_TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "left",
  marginStart: 30,
}
const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 }
const STATUS_CONTAINER: ViewStyle = {
  padding: 15
}
const PICKER_CONTAINER: ViewStyle = {
  flexDirection: "row"
}
const PICKER_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  height: 40,
  width: 180,
  borderColor: color.palette.darkText,
  borderWidth: 3,
  borderRadius: 4
}
const DATE_TEXT: TextStyle = { flex: 1, textAlign: "right", fontSize: 16 }
export const ConsignmentSuccess: FunctionComponent<ConsignmentSuccessProps> = observer(props => {
  const [selectedValue, setSelectedValue] = useState("java")
  useEffect(() => {
  }, [])

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
  return (
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
      <BackButton
        title={"consignmentSuccess.consignment"}
        onPress={goBack} />
      <ScrollView style={CONSIGNMENT_VIEW}>
        <View>
          {/* Special Action */}
          <ComConsignmentDetail navigation={props.navigation} view={"specialAction"} />

          <View style={STATUS_VIEW}>
            <Text style={STATUS_TITLE} tx={"common.status"} />
          </View>

          {/* Status */}
          <View style={STATUS_CONTAINER}>
            <View style={PICKER_CONTAINER}>
              <View style={PICKER_VIEW}>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
              </View>

              <Text preset={"normal"} style={DATE_TEXT} text={"11 March 2020\n11:15 am"} />
            </View>

            <EvilIcons style={CAMERA_ICON} color={color.palette.darkText} name="camera" size={60} />
            <TextField
              labelTx={"consignmentSuccess.sign"}
              placeholder={"Enter Password"}
              inputStyle={{ borderColor: color.palette.darkText, borderWidth: 2 }}
              labelStyle={{ color: color.palette.red, fontFamily: typography.secondary, fontSize: 18 }}
            // errorTx={isValidPassword ? undefined : "loginScreen.errorPassword"}
            // onChangeText={text => onChangeText(INPUT_PASSWORD, text)}
            // value={password}
            />
          </View>
          <View style={BOTTOM_VIEW}>
            <BottomButton
              leftImage={icons.blackButton2}
              rightImage={icons.redButton}
              leftText={"common.success"}
              rightText={"common.fail"} />
          </View>
        </View>
      </ScrollView>

    </Screen>
  )
})
