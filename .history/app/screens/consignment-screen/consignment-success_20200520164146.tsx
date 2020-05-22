import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Picker } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import { BackButton } from "../../components/header/back-button"
import { BottomButton } from "../../components/bottom-button/bottom-button"
import { icons } from "../../components/icon/icons"
import { ComConsignmentDetail } from "../../components/consignment/com-consigment-detail"

export interface ConsignmentSuccessProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const ROOT: ViewStyle = {
  flex: 1,
}

const CONSIGNMENT_VIEW: ViewStyle = { flex: 1 }
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
          <View style={{ height: 40, width: 180, borderColor: color.palette.darkText, borderWidth: 2, borderRadius: 4 }}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
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
