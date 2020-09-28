import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Text } from "..";
import { color } from "../../theme";
import { currencyFormat, currencyFormatUSD } from "../../utils/utils";

export interface ComClaimSettlementDetailProps {
  navigation?: NativeStackNavigationProp<ParamListBase>;
  view?: viewTypes;
  data?: any;
  isFailView?: boolean;
}

const viewType = {
  Trader: "Trader",
  Bank: "Bank",
  CBOS: "CBOS",
};

type viewTypes = keyof typeof viewType;

const DETAIL_CONTAINER: ViewStyle = {
  padding: 15,
  flexDirection: "row",
};

const CUSTOMER_CONTAINER: ViewStyle = {
  marginTop: 2,
  padding: 15,
  flex: 1,
};

const Bank_CONTAINER: ViewStyle = {
  marginTop: 2,
  padding: 15,
  flex: 1,
};
const DETAIL_VIEW: ViewStyle = { flexDirection: "row" };
const FIRE_BUTTON: ViewStyle = {
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginTop: 15,
};
const CALL_BUTTON: ViewStyle = { alignSelf: "flex-start", marginTop: 25 };
const SPECIAL_ACTION_BUTTON: ViewStyle = {
  marginLeft: 5,
  justifyContent: "center",
  alignItems: "flex-end",
};
const ClaimSettlement_VIEW: TextStyle = { flex: 1, color: color.palette.link };
const ITEMS_VIEW: ViewStyle = { justifyContent: "flex-end", marginLeft: 5 };
const SPECIAL_ACTION: ImageStyle = { height: 100, width: 100 };
const ITEM_LABEL: TextStyle = { color: color.palette.darkText, marginEnd: 10 };
const FormNo_LABEL: TextStyle = { color: color.palette.red, marginEnd: 10 };
const CUSTOMER_VIEW: ViewStyle = {
  height: 50,
  backgroundColor: color.palette.toolbar,
  marginTop: 10,
  justifyContent: "center",
};
const TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "left",
  marginStart: 30,
};
const TEXT_VALUE: TextStyle = { color: color.palette.link };
const FormNo_VALUE: TextStyle = { color: color.palette.red };
let IsFinsished = false;
export const ComClaimSettlementDetail: FunctionComponent<ComClaimSettlementDetailProps> = observer(
  props => {
    const FlowStatusNameEX = props.data.FlowStatusNameEX[0];

    if (FlowStatusNameEX === "PAID") {
      IsFinsished = true;
    } else {
      IsFinsished = false;
    }

    const renderView = () => {
      if (props.view === viewType.Trader) {
        return (
          <ScrollView>
            <View style={CUSTOMER_CONTAINER}>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.ClaimSettlementCode"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[FormNo_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.ClaimSettlementCode}
                />
              </View>

              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.ClaimCode"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.ClaimCode}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.FlowStatusNameEX"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text style={[TEXT_VALUE, { flex: 1 }]} preset={"normal"} text={FlowStatusNameEX} />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.DeductionUSD"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={currencyFormatUSD(parseFloat(props.data.DeductionUSD))}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.CreationDate"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.CreationDate[0].substring(0, 10)}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.PaymentCode"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.PaymentCode}
                />
              </View>

              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.FormCode"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.FormCode}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.Deduction"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={currencyFormat(parseFloat(props.data.Deduction))}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.RejectionNotes"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.RejectionNotes}
                />
              </View>
            </View>
          </ScrollView>
        );
      } else {
        return (
          <ScrollView>
            <View style={CUSTOMER_CONTAINER}>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.ClaimSettlementCode"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[FormNo_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.ClaimSettlementCode}
                />
              </View>

              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.ClaimCode"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.ClaimCode}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text tx={"common.FullName"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.FullName}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.FlowStatusNameEX"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text style={[TEXT_VALUE, { flex: 1 }]} preset={"normal"} text={FlowStatusNameEX} />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.DeductionUSD"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={currencyFormatUSD(parseFloat(props.data.DeductionUSD))}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.CreationDate"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.CreationDate[0].substring(0, 10)}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.PaymentCode"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.PaymentCode}
                />
              </View>

              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.FormCode"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.FormCode}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.Deduction"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={currencyFormat(parseFloat(props.data.Deduction))}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ClaimSettlementDetail.RejectionNotes"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.RejectionNotes}
                />
              </View>
            </View>
          </ScrollView>
        );
      }
    };
    return <View>{renderView()}</View>;
  },
);
