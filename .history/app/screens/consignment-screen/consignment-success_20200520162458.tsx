import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen } from "../../components"
import { color } from "../../theme"
import { BackButton } from "../../components/header/back-button"
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
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
const MAP_VIEW: ViewStyle = {
  height: 350,
  width: "95%",
  alignSelf: "center",
  marginBottom: 10,
  borderColor: color.palette.darkText,
  borderWidth: 2,
  borderRadius: 3
}
const MAPS: ViewStyle = {
  height: "100%",
  width: "100%",
  alignSelf: "center",
}
const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 }

export const ConsignmentSuccess: FunctionComponent<ConsignmentSuccessProps> = observer(props => {
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
          {/* <ComConsignmentDetail navigation={props.navigation} view={"specialAction"} /> */}


          <View style={BOTTOM_VIEW}>
            
          </View>
          <BottomButton
              leftImage={icons.blackButton2}
              rightImage={icons.redButton}
              leftText={"common.success"}
              rightText={"common.fail"} />
        </View>
      </ScrollView>

    </Screen>
  )
})
