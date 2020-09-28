import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Text } from "../../components";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
import { currencyFormat } from "../../utils/utils";

export interface ComExFormListProps {
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
const FormNo: ViewStyle = { flex: 1 };
const FormNo_Value: TextStyle = { flex: 1, color: color.palette.red };
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

export const ComExFormList: FunctionComponent<ComExFormListProps> = observer(props => {
  const { item, index } = props;
  const { authStore } = useStores();
  const ExForms = item;
  return (
    <View key={index} style={FLAT_LIST}>
      {!authStore.IsTrader && (
        <View style={FLAT_LIST_VIEW}>
          <Text style={ITEM_LABEL} tx="common.FullName" />
          <Text style={TEXT_VALUE} text={ExForms.FullName ? ExForms.FullName : " "} />
        </View>
      )}

      <View style={FLAT_LIST_VIEW}>
        <Text extraText={":"} tx={"ExFormList.FormCode"} style={ITEM_LABEL} preset={"normal"} />
        <Text style={FormNo_Value} preset={"normal"}>
          {ExForms.FormCode}
        </Text>
      </View>

      <View style={Amount_Curr_VIEW}>
        <Text
          extraText={":"}
          tx={"ExFormList.amount"}
          style={Amount_Curr_LABEL}
          preset={"normal"}
        />
        <Text
          extraText={":"}
          tx={"ExFormList.CurrencyShortName"}
          style={Amount_Curr_LABEL}
          preset={"normal"}
        />
      </View>

      <View style={Amount_Curr_VIEW}>
        <Text style={Amount_Curr_VALUE} preset={"normal"}>
          {currencyFormat(parseFloat(ExForms.TotalValue))}
        </Text>
        <Text style={Amount_Curr_VALUE} preset={"normal"}>
          {ExForms.CurrencyShortName}
        </Text>
      </View>

      <View style={Bank_Branch_VIEW}>
        <Text
          extraText={":"}
          tx={"ExFormList.BankNameAR"}
          style={Bank_Branch_LABEL}
          preset={"normal"}
        />
        <Text
          extraText={":"}
          tx={"ExFormList.BranchNameAR"}
          style={Bank_Branch_LABEL}
          preset={"normal"}
        />
      </View>

      <View style={Bank_Branch_VIEW}>
        <Text style={Bank_Branch_VALUE} preset={"normal"}>
          {ExForms.BankNameAR}
        </Text>
        <Text style={Amount_Curr_VALUE} preset={"normal"}>
          {ExForms.BranchNameAR}
        </Text>
      </View>

      <View style={Form_Status_View}>
        <Text
          extraText={":"}
          tx={"ExFormList.formstatus"}
          style={Form_Status_LABEL}
          preset={"normal"}
        />
        <Text style={Form_Status_VALUE} preset={"normal"}>
          {ExForms.FlowStatusNameEX}
        </Text>
      </View>

      {/* <View style={FROM_TO_VIEW}>
        <View style={WEIGHT_VIEW}>
          <Text extraText={":"} tx={"ExFormList.wgt"} style={WEIGHT_LABEL} preset={"normal"} />
          <Text style={TEXT_VALUE} preset={"normal"}>
            {cons.totalWeight}
          </Text>
        </View>

        <View style={VOLUME_VIEW}>
          <Text extraText={":"} tx={"ExFormList.vol"} style={WEIGHT_LABEL} preset={"normal"} />
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
});
