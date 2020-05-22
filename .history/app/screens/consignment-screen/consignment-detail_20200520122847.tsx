import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Icon, Button } from "../../components"
import { color } from "../../theme"
import { BackButton } from "../../components/header/back-button"
import { callApi } from "../../utils/utils"
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { BottomButton } from "../../components/bottom-button/bottom-button"
import { icons } from "../../components/icon/icons"

export interface ConsignmentDetailProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const ROOT: ViewStyle = {
  flex: 1,
}

const DETAIL_CONTAINER: ViewStyle = {
  marginTop: 50,
  padding: 15,
  flexDirection: "row"
}

const CUSTOMER_CONTAINER: ViewStyle = {
  marginTop: 0,
  padding: 15,
  flexDirection: "row"
}
const DETAIL_VIEW: ViewStyle = { flexDirection: "row" }
const FIRE_BUTTON: ViewStyle = { alignSelf: "flex-start" }
const CONSIGNMENT_VIEW: ViewStyle = { flex: 1 }
const ITEMS_VIEW: ViewStyle = { flex: 0.5, marginStart: 10 }
const MAP_VIEW: ViewStyle = { height: 600, width: "100%" }
const CUSTOMER_VIEW: ViewStyle = {
  height: 50,
  backgroundColor: color.palette.toolbar,
  marginTop: 10,
  justifyContent: "center"
}
const ITEM_LABEL: TextStyle = { color: color.palette.red, marginEnd: 15 }
const TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "left",
  marginStart: 30,
}
export const ConsignmentDetail: FunctionComponent<ConsignmentDetailProps> = observer(props => {
  useEffect(() => {
  }, [])

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
  const onFirePress = () => {

  }
  const onPhonePress = () => {
    callApi("645456456456")
  }

  return (
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="scroll">
      <BackButton
        title={"consignmentDetail.consignment"}
        onPress={goBack} />
      {/* consignment */}
      <ScrollView style={{ flex: 1 }}>
        <View>
          <View style={DETAIL_CONTAINER}>
            <View style={CONSIGNMENT_VIEW}>
              <View style={DETAIL_VIEW}>
                <Text tx={"consignmentDetail.consignment"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
                <Text preset={"normal"} text={"ABC545"} />
              </View>
              <View style={DETAIL_VIEW}>
                <Text tx={"consignmentDetail.status"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
                <Text preset={"normal"} text={"Dispatched"} />
              </View>
              <Text tx={"consignmentDetail.address"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />

              <View style={DETAIL_VIEW}>
                <Text style={CONSIGNMENT_VIEW} text={"126454 Red Tree Street South Yarra 24"} preset={"normal"} />

                <View style={ITEMS_VIEW}>
                  <View style={DETAIL_VIEW}>
                    <Text tx={"consignmentDetail.items"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
                    <Text text={"12"} preset={"normal"} />
                  </View>
                  <View style={DETAIL_VIEW}>
                    <Text tx={"consignmentDetail.weight"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
                    <Text preset={"normal"} text={"24 KG"} />
                  </View>
                </View>
              </View>
            </View>
            <Button style={FIRE_BUTTON} preset="link" onPress={onFirePress}>
              <Icon icon={"fire"} />
            </Button>
          </View>

          {/* Customer */}
          <View style={CUSTOMER_VIEW}>
            <Text style={TITLE} tx={"consignmentDetail.customer"} />
          </View>

          <View style={CUSTOMER_CONTAINER}>
            <View style={CONSIGNMENT_VIEW}>
              <View style={DETAIL_VIEW}>
                <Text tx={"consignmentDetail.name"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
                <Text preset={"normal"}>{"Mark belo"}</Text>
              </View>
              <View style={DETAIL_VIEW}>
                <Text tx={"consignmentDetail.contact"} extraText={":"} style={ITEM_LABEL} preset={"normal"}>Items:</Text>
                <Text preset={"normal"}>{"856126555"}</Text>
              </View>
              <Text tx={"consignmentDetail.special"} extraText={":"} style={ITEM_LABEL} preset={"normal"}>Items:</Text>
              <Text text={"Line 1 \nLine 2"} preset={"normal"} />
            </View>
            <Button style={FIRE_BUTTON} preset="link" onPress={onPhonePress}>
              <Icon icon={"phone"} />
            </Button>
          </View>

          <MapView
            provider={PROVIDER_GOOGLE}
            style={MAP_VIEW}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
          </MapView>

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
