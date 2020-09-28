import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Text } from "..";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface ComOperationTransferListProps {
  navigation?: NativeStackNavigationProp<ParamListBase>;
  item: any;

  index: any;
}

const FLAT_LIST: ViewStyle = {
  padding: 10,
  borderColor: color.palette.darkText,
  borderWidth: 2,
  margin: 10,
  borderRadius: 5,
  backgroundColor: color.palette.listBG,
};
const FLAT_LIST_VIEW: ViewStyle = { flexDirection: "row" };
const Code: ViewStyle = { flex: 1 };
const Code_Value: TextStyle = { flex: 1, color: color.palette.red };
const Amount_Curr_VIEW: ViewStyle = { flexDirection: "row" };
const Amount_Curr_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };
const Amount_Curr_VALUE: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.link };
const Bank_Branch_VIEW: ViewStyle = { flexDirection: "row" };
const Bank_Branch_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };
const Bank_Branch_VALUE: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.link };
const ITEM_LABEL: TextStyle = { color: color.palette.darkText, marginEnd: 25 };
const Form_Status_View: ViewStyle = { flexDirection: "row", flex: 1 };
const Form_Status_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };
const Form_Status_VALUE: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.red };
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

export const ComOperationTransferList: FunctionComponent<ComOperationTransferListProps> = observer(
  props => {
    const { item, index } = props;
    const { authStore } = useStores();
    const OperationTransfers = item;
    return (
      <View key={index} style={FLAT_LIST}>
        {!authStore.IsTrader && (
          <View style={FLAT_LIST_VIEW}>
            <Text style={ITEM_LABEL} tx="common.FullName" />
            <Text
              style={TEXT_VALUE}
              text={OperationTransfers.FullName ? OperationTransfers.FullName : " "}
            />
          </View>
        )}
        <View style={FLAT_LIST_VIEW}>
          <Text
            extraText={":"}
            tx={"OperationTransferList.TransferCode"}
            style={ITEM_LABEL}
            preset={"normal"}
          />
          <Text style={Code_Value} preset={"normal"}>
            {OperationTransfers.TransferCode}
          </Text>
        </View>

        <View style={Amount_Curr_VIEW}>
          <Text
            extraText={":"}
            tx={"OperationTransferList.TransferAmount"}
            style={Amount_Curr_LABEL}
            preset={"normal"}
          />
          <Text
            extraText={":"}
            tx={"OperationTransferList.CurrencyShortName"}
            style={Amount_Curr_LABEL}
            preset={"normal"}
          />
        </View>

        <View style={Amount_Curr_VIEW}>
          <Text style={Amount_Curr_VALUE} preset={"normal"}>
            {OperationTransfers.TransferAmount}
          </Text>
          <Text style={Amount_Curr_VALUE} preset={"normal"}>
            {OperationTransfers.CurrencyShortName}
          </Text>
        </View>

        <View style={Bank_Branch_VIEW}>
          <Text
            extraText={":"}
            tx={"OperationTransferList.TransferRemaining"}
            style={Bank_Branch_LABEL}
            preset={"normal"}
          />
          <Text
            extraText={":"}
            tx={"OperationTransferList.CorrespondentName"}
            style={Bank_Branch_LABEL}
            preset={"normal"}
          />
        </View>

        <View style={Bank_Branch_VIEW}>
          <Text style={Bank_Branch_VALUE} preset={"normal"}>
            {OperationTransfers.TransferRemaining}
          </Text>
          <Text style={Amount_Curr_VALUE} preset={"normal"}>
            {OperationTransfers.CorrespondentName}
          </Text>
        </View>

        {/* <View style={FROM_TO_VIEW}>
        <View style={WEIGHT_VIEW}>
          <Text extraText={":"} tx={"OperationTransferList.wgt"} style={WEIGHT_LABEL} preset={"normal"} />
          <Text style={TEXT_VALUE} preset={"normal"}>
            {cons.totalWeight}
          </Text>
        </View>

        <View style={VOLUME_VIEW}>
          <Text extraText={":"} tx={"OperationTransferList.vol"} style={WEIGHT_LABEL} preset={"normal"} />
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
