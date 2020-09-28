import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Text } from "..";
import { color } from "../../theme";
import { currencyFormatUSD } from "../../utils/utils";

export interface ComClaimDetailProps {
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
const Claim_VIEW: TextStyle = { flex: 1, color: color.palette.link };
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
export const ComClaimDetail: FunctionComponent<ComClaimDetailProps> = observer(props => {
  const ClaimStatus = props.data.ClaimStatus[0];

  if (ClaimStatus === "PAID") {
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
                tx={"ClaimDetail.FormCode"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[FormNo_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.FormCode}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.ClaimCode"}
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
                tx={"ClaimDetail.Claimcommodity"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.CommodityNameAR[0]}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.claimstatus"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text style={[TEXT_VALUE, { flex: 1 }]} preset={"normal"} text={ClaimStatus} />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.PaymentMethodNameAR"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.PaymentMethodNameAR}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.duedate"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.DueDate[0].substring(0, 10)}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.BankNameAR"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.BankNameAR}
              />
            </View>

            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.BranchNameAR"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.BranchNameAR}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.amountusd"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={currencyFormatUSD(parseFloat(props.data.AmountUSD))}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.amountremain"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={currencyFormatUSD(parseFloat(props.data.ClaimRemaining))}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.PaymentPercent"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.PaymentPercent}
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
                tx={"ClaimDetail.FormCode"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[FormNo_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.FormCode[0]}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.ClaimCode"}
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
                tx={"ClaimDetail.customername"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.FullNameEnglish}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.Claimcommodity"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.CommodityNameAR}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.claimstatus"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text style={[TEXT_VALUE, { flex: 1 }]} preset={"normal"} text={ClaimStatus} />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.duedate"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.DueDate[0].substring(0, 10)}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.BankNameAR"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.BankNameAR}
              />
            </View>

            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.BankNameAR"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.BranchNameAR}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.amountusd"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={currencyFormatUSD(parseFloat(props.data.AmountUSD))}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.amountremain"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={currencyFormatUSD(parseFloat(props.data.ClaimRemaining))}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.PaymentPercent"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.PaymentPercent}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.PaymentMethodNameAR"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.PaymentMethodNameAR}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ClaimDetail.Measurement"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.Measurement}
              />
            </View>
          </View>
        </ScrollView>
      );
    }
  };
  return <View>{renderView()}</View>;
});
