import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, FlatList, TouchableOpacity, ImageStyle, Alert } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Icon, Button } from "../../components"
import { color } from "../../theme"
import { MenuButton } from "../../components/header/menu-button"
import { BackButton } from "../../components/header/back-button"

export interface ConsignmentDetailProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const ROOT: ViewStyle = {
  flex: 1,
}

const DETAIL_CONTAINER: ViewStyle = { marginTop: 60, padding: 15, flexDirection: "row" }
const DETAIL_VIEW: ViewStyle = { flexDirection: "row" }
const CONSIGNMENT_VIEW: ViewStyle = { flex: 1 }
const ITEMS_VIEW: ViewStyle = { flex: 1 }
const ITEM_LABEL: TextStyle = { color: color.palette.red, marginEnd: 25 }

export const ConsignmentDetail: FunctionComponent<ConsignmentDetailProps> = observer(props => {
  useEffect(() => {
  }, [])

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
  const onFirePress = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])

  return (
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
      <BackButton
        title={"consignmentDetail.consignment"}
        onPress={goBack} />

      <View style={DETAIL_CONTAINER}>
        <View style={CONSIGNMENT_VIEW}>
          <View style={DETAIL_VIEW}>
            <Text tx={"consignmentDetail.consignment"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
            <Text preset={"normal"}>{"ABC545"}</Text>
          </View>
          <View style={DETAIL_VIEW}>
            <Text tx={"consignmentDetail.status"} extraText={":"} style={ITEM_LABEL} preset={"normal"}>Items:</Text>
            <Text preset={"normal"}>{"Dispatched"}</Text>
          </View>
          <Text tx={"consignmentDetail.address"} extraText={":"} style={ITEM_LABEL} preset={"normal"}>Items:</Text>

          <View style={DETAIL_VIEW}>
            <Text style={CONSIGNMENT_VIEW} preset={"normal"}>{"126454 Red Tree Street South Yarra 24"}</Text>

            <View style={ITEMS_VIEW}>
              <Text tx={"consignmentDetail.status"} extraText={":"} style={ITEM_LABEL} preset={"normal"}>Items:</Text>
              <Text preset={"normal"}>{"Dispatched"}</Text>
            </View>
          </View>
        </View>
        <Button style={{ alignSelf: "flex-start" }} preset="link" onPress={onFirePress}>
          <Icon icon={"fire"} />
        </Button>
      </View>

    </Screen>
  )
})
