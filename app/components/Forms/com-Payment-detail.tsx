import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Text } from "..";
import { color } from "../../theme";
import { currencyFormat, currencyFormatUSD } from "../../utils/utils";

export interface ComPaymentDetailProps {
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
const Payment_VIEW: TextStyle = { flex: 1, color: color.palette.link };
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
export const ComPaymentDetail: FunctionComponent<ComPaymentDetailProps> = observer(props => {
  const FlowStatusNamePayment = props.data.FlowStatusNamePayment[0];

  if (FlowStatusNamePayment === "PAID") {
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
                tx={"PaymentDetail.PaymentCode"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[FormNo_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.PaymentCode}
              />
            </View>

            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.Amount"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={currencyFormat(parseFloat(props.data.Amount))}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.CurrencyShortName"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.CurrencyShortName}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.AmountUSD"}
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
                tx={"PaymentDetail.Discounts"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={currencyFormat(parseFloat(props.data.Discounts))}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.BankNameAR"}
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
                tx={"PaymentDetail.BranchNameAR"}
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
                tx={"PaymentDetail.PaymentDate"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.PaymentDate[0].substring(0, 10)}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.CorrespondentName"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.CorrespondentName}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.CorrespondentAccount"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.CorrespondentAccount}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.Note"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text style={[TEXT_VALUE, { flex: 1 }]} preset={"normal"} text={props.data.Notes} />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.PaymentRemaining"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={currencyFormatUSD(parseFloat(props.data.PaymentRemaining))}
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
              <Text tx={"common.FullName"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.FullName}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.PaymentCode"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[FormNo_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.PaymentCode}
              />
            </View>

            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.Amount"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={currencyFormat(parseFloat(props.data.Amount))}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.CurrencyShortName"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.CurrencyShortName}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.AmountUSD"}
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
                tx={"PaymentDetail.Discounts"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={currencyFormat(parseFloat(props.data.Discounts))}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.BankNameAR"}
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
                tx={"PaymentDetail.BranchNameAR"}
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
                tx={"PaymentDetail.PaymentDate"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.PaymentDate[0].substring(0, 10)}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.CorrespondentName"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.CorrespondentName}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.CorrespondentAccount"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.CorrespondentAccount}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.Note"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text style={[TEXT_VALUE, { flex: 1 }]} preset={"normal"} text={props.data.Notes} />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"PaymentDetail.PaymentRemaining"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={currencyFormatUSD(parseFloat(props.data.PaymentRemaining))}
              />
            </View>
          </View>
        </ScrollView>
      );
    }
  };
  return <View>{renderView()}</View>;
});
