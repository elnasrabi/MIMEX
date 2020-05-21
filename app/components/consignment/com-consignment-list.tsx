import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, FlatList, TouchableOpacity, ImageStyle, Alert, Platform } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Icon } from "../../components"
import { color } from "../../theme"

export interface ComConsignmentListProps {
    navigation?: NativeStackNavigationProp<ParamListBase>,
    item: any,
    onPress: any,
    index: any
}

const FLAT_LIST: ViewStyle = { padding: 10, borderColor: color.palette.darkText, borderWidth: 2, margin: 10, borderRadius: 5 }
const FLAT_LIST_VIEW: ViewStyle = { flexDirection: "row" }
const ID: ViewStyle = { flex: 1 }
const FROM_TO_VIEW: ViewStyle = { flexDirection: "row" }
const ITEM_LABEL: TextStyle = { color: color.palette.red, marginEnd: 25 }
const FROM_TO_LABEL: TextStyle = { marginEnd: 15, color: color.palette.red, flex: 1 }
const FROM_TO_VALUE: TextStyle = { marginEnd: 15, flex: 1 }
const WEIGHT_VIEW: ViewStyle = { flexDirection: "row", flex: 1 }
const VOLUME_VIEW: ViewStyle = { flexDirection: "row", flex: 1, marginStart: 10, justifyContent: "flex-end" }
const WEIGHT_LABEL: TextStyle = { marginEnd: 10, color: color.palette.red }
const STATUS: TextStyle = { color: color.palette.red, }

export const ComConsignmentList: FunctionComponent<ComConsignmentListProps> = observer(props => {
  
  const { item, onPress = {}, index } = props
  return (
    <TouchableOpacity onPress={onPress}>
      <View key={index} style={FLAT_LIST}>
        <View style={FLAT_LIST_VIEW}>
          <Text style={ID} preset={"normal"}>{item.id}</Text>
          <Text extraText={":"} tx={"consignmentList.items"} style={ITEM_LABEL} preset={"normal"} />
          <Text preset={"normal"}>{item.items}</Text>
        </View>

        <View style={FROM_TO_VIEW}>
          <Text extraText={":"} tx={"consignmentList.from"} style={FROM_TO_LABEL} preset={"normal"}>From:</Text>
          <Text extraText={":"} tx={"consignmentList.to"} style={FROM_TO_LABEL} preset={"normal"}>To:</Text>
        </View>

        <View style={FROM_TO_VIEW}>
          <Text style={FROM_TO_VALUE} preset={"normal"}>{item.to}</Text>
          <Text style={FROM_TO_VALUE} preset={"normal"}>{item.from}</Text>
        </View>

        <View style={FROM_TO_VIEW}>
          <View style={WEIGHT_VIEW}>
            <Text extraText={":"} tx={"consignmentList.wgt"} style={WEIGHT_LABEL} preset={"normal"}>Wgt:</Text>
            <Text preset={"normal"}>{item.weight}</Text>
          </View>

          <View style={VOLUME_VIEW}>
            <Text extraText={":"} tx={"consignmentList.vol"} style={WEIGHT_LABEL} preset={"normal"}>Vol:</Text>
            <Text preset={"normal"}>{item.volume}</Text>
          </View>
        </View>

        <Text style={STATUS} preset={"normal"}>{item.status}</Text>

      </View>
    </TouchableOpacity>
  )
})
