import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Text } from "..";
import { color } from "../../theme";
import { currencyFormatUSD } from "../../utils/utils";

export interface ComImFormCommodityListProps {
  navigation?: NativeStackNavigationProp<ParamListBase>;
  item: any;

  index: any;
}

const FLAT_LIST: ViewStyle = {
  padding: 5,
  borderColor: color.palette.darkText,
  borderWidth: 2,
  margin: 5,
  borderRadius: 5,
  backgroundColor: color.palette.listBG,
};
const FLAT_LIST_VIEW: ViewStyle = { flexDirection: "row" };
const Comm_Desc_VIEW: ViewStyle = { flexDirection: "row", flex: 1 };
const Qty_Curr_VIEW: ViewStyle = { flexDirection: "row" };
const Qty_Curr_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };
const Qty_Curr_VALUE: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.link };
const Name_VIEW: ViewStyle = { flexDirection: "row" };
const Name_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };
const Name_VALUE: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.red };
const ITEM_LABEL: TextStyle = { color: color.palette.darkText, marginEnd: 25 };
const Price_View: ViewStyle = { flexDirection: "row", flex: 1 };
const Price_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };
const Price_VALUE: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.link };
const UOM_View: ViewStyle = { flexDirection: "row", flex: 1 };
const UOM_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };
const UOM_VALUE: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.link };
const Invoice_View: ViewStyle = { flexDirection: "row", flex: 1 };
const Invoice_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };
const Invoice_VALUE: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.link };
const VOLUME_VIEW: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  marginStart: 10,
  justifyContent: "flex-end",
};
const WEIGHT_LABEL: TextStyle = { marginEnd: 10, color: color.palette.darkText };
const STATUS: TextStyle = { color: color.palette.link };
const TEXT_VIEW: ViewStyle = { flexDirection: "row" };
const TEXT_VALUE: TextStyle = { color: color.palette.link };
const TEXT_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };

export const ComImFormCommodityList: FunctionComponent<ComImFormCommodityListProps> = observer(
  props => {
    const { item, index } = props;
    const ImFormCommodity = item;
    return (
      <View key={index} style={FLAT_LIST}>
        <View style={FLAT_LIST_VIEW}>
          <Text extraText={":"} tx={"ImFormDetail.commname"} style={Name_LABEL} preset={"normal"} />
          <Text style={Name_VALUE} preset={"normal"}>
            {ImFormCommodity.CommodityNameAR}
          </Text>
        </View>
        <View style={Qty_Curr_VIEW}>
          <Text extraText={":"} tx={"ImFormDetail.Qty"} style={Qty_Curr_LABEL} preset={"normal"} />
          <Text
            extraText={":"}
            tx={"ImFormDetail.price"}
            style={Qty_Curr_LABEL}
            preset={"normal"}
          />
        </View>

        <View style={Qty_Curr_VIEW}>
          <Text style={Qty_Curr_VALUE} preset={"normal"}>
            {ImFormCommodity.Quantity}
          </Text>
          <Text style={Qty_Curr_VALUE} preset={"normal"}>
            {currencyFormatUSD(parseFloat(ImFormCommodity.UnitPrice))}
          </Text>
        </View>

        <View style={UOM_View}>
          <Text extraText={":"} tx={"ImFormDetail.uom"} style={UOM_LABEL} preset={"normal"} />
          <Text
            extraText={":"}
            tx={"ImFormDetail.invoice"}
            style={Invoice_LABEL}
            preset={"normal"}
          />
        </View>

        <View style={UOM_View}>
          <Text style={UOM_VALUE} preset={"normal"}>
            {ImFormCommodity.MeasurementUnitNameEN}
          </Text>
          <Text style={Invoice_VALUE} preset={"normal"}>
            {ImFormCommodity.FinalInvoiceNumber}
          </Text>
        </View>
        <View style={Comm_Desc_VIEW}>
          <Text extraText={":"} tx={"ImFormDetail.commdesc"} style={UOM_LABEL} preset={"normal"} />
        </View>
        <View style={Comm_Desc_VIEW}>
          <Text style={Invoice_VALUE} preset={"normal"}>
            {ImFormCommodity.Note}
          </Text>
        </View>

        {/* <View style={FROM_TO_VIEW}>
        <View style={WEIGHT_VIEW}>
          <Text extraText={":"} tx={"ImFormCommodityList.wgt"} style={WEIGHT_LABEL} preset={"normal"} />
          <Text style={TEXT_VALUE} preset={"normal"}>
            {cons.totalWeight}
          </Text>
        </View>

        <View style={VOLUME_VIEW}>
          <Text extraText={":"} tx={"ImFormCommodityList.vol"} style={WEIGHT_LABEL} preset={"normal"} />
          <Text style={TEXT_VALUE} preset={"normal"}>
            {cons.totalVolume}
          </Text>
        </View>
      </View>

      <Text style={STATUS} preset={"normal"}>
        {cons.currentFreightState[0]}
      </Text> */}
      </View>
    );
  },
);
