import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text } from "../../components"
import { color } from "../../theme"

export interface ComConsignmentListProps {
  navigation?: NativeStackNavigationProp<ParamListBase>,
  item: any,
  onPress: any,
  index: any
}

const FLAT_LIST: ViewStyle = { padding: 10, borderColor: color.palette.darkText, borderWidth: 2, margin: 10, borderRadius: 5, backgroundColor: color.palette.listBG }
const FLAT_LIST_VIEW: ViewStyle = { flexDirection: "row" }
const ID: ViewStyle = { flex: 1 }
const FROM_TO_VIEW: ViewStyle = { flexDirection: "row" }
const ITEM_LABEL: TextStyle = { color: color.palette.darkText, marginEnd: 25 }
const FROM_TO_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 }
const FROM_TO_VALUE: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.link }
const WEIGHT_VIEW: ViewStyle = { flexDirection: "row", flex: 1 }
const VOLUME_VIEW: ViewStyle = { flexDirection: "row", flex: 1, marginStart: 10, justifyContent: "flex-end" }
const WEIGHT_LABEL: TextStyle = { marginEnd: 10, color: color.palette.darkText }
const STATUS: TextStyle = { color: color.palette.link, }
const TEXT_VALUE: TextStyle = { color: color.palette.link, }

export const ComConsignmentList: FunctionComponent<ComConsignmentListProps> = observer(props => {
  const { item, index } = props
  const cons = item.consignmentMatchingConsignment[0]
  return (
    <View key={index} style={FLAT_LIST}>
      <View style={FLAT_LIST_VIEW}>
        <Text style={ID} preset={"normal"}>{cons.consignmentId}</Text>
        <Text extraText={":"} tx={"consignmentList.items"} style={ITEM_LABEL} preset={"normal"} />
        <Text style={TEXT_VALUE} preset={"normal"}>{cons.consignmentItems[0].totalLineItemLabels}</Text>
      </View>

      <View style={FROM_TO_VIEW}>
        <Text extraText={":"} tx={"consignmentList.from"} style={FROM_TO_LABEL} preset={"normal"} />
        <Text extraText={":"} tx={"consignmentList.to"} style={FROM_TO_LABEL} preset={"normal"} />
      </View>

      <View style={FROM_TO_VIEW}>
        <Text style={FROM_TO_VALUE} preset={"normal"}>{cons.pickupAddress[0].address[0].town}</Text>
        <Text style={FROM_TO_VALUE} preset={"normal"}>{cons.deliveryAddress[0].address[0].town}</Text>
      </View>

      <View style={FROM_TO_VIEW}>
        <View style={WEIGHT_VIEW}>
          <Text extraText={":"} tx={"consignmentList.wgt"} style={WEIGHT_LABEL} preset={"normal"} />
          <Text style={TEXT_VALUE} preset={"normal"}>{cons.totalWeight}</Text>
        </View>

        <View style={VOLUME_VIEW}>
          <Text extraText={":"} tx={"consignmentList.vol"} style={WEIGHT_LABEL} preset={"normal"} />
          <Text style={TEXT_VALUE} preset={"normal"}>{cons.totalVolume}</Text>
        </View>
      </View>

      <Text style={STATUS} preset={"normal"}>{cons.freightStateHistory[0].status}</Text>

    </View>
  )
})
