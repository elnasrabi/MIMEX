import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Text } from "..";
import { color } from "../../theme";
import { currencyFormat } from "../../utils/utils";

export interface ComOperationRequestDetailProps {
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
  flex: 1,
};

const CUSTOMER_CONTAINER: ViewStyle = {
  marginTop: 0,
  padding: 15,
  flexDirection: "row",
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
const OperationRequest_VIEW: TextStyle = { flex: 1, color: color.palette.link };
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
export const ComOperationRequestDetail: FunctionComponent<ComOperationRequestDetailProps> = observer(
  props => {
    const OperationRequestStatus = props.data.FlowStatusNameIMOperation;
    if (OperationRequestStatus === "Imported") {
      IsFinsished = true;
    } else {
      IsFinsished = false;
    }

    const renderView = () => {
      if (props.view === viewType.Trader) {
        return (
          <ScrollView>
            <View style={DETAIL_CONTAINER}>
              <View style={OperationRequest_VIEW}>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.RequestCode"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[FormNo_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.OperationRequestCode}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.Exportername"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.ExporterName}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.ExporterCountry"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.CountryNameAR}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.creationdate"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.CreationTime[0].substring(0, 10)}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.requeststatus"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={OperationRequestStatus}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.ImporterRegister"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.ImportersRegister}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.BankNameAR"}
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
                    tx={"OperationRequestDetail.BranchNameAR"}
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
                    tx={"OperationRequestDetail.DocArrivalDate"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.DocArrivalDate[0].substring(0, 10)}
                  />
                </View>

                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.ImportPurposeName"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    text={props.data.ImportPurposeName}
                    preset={"normal"}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.amount"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={TEXT_VALUE}
                    preset={"normal"}
                    text={currencyFormat(parseFloat(props.data.TotalValue))}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.CurrencyShortName"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text style={TEXT_VALUE} preset={"normal"} text={props.data.CurrencyShortName} />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.note"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    text={props.data.Notes}
                    preset={"normal"}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        );
      } else {
        return (
          <ScrollView>
            <View style={DETAIL_CONTAINER}>
              <View style={OperationRequest_VIEW}>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"common.FullName"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.FullName}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.RequestCode"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[FormNo_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.OperationRequestCode}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.Exportername"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.ExporterName}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.ExporterCountry"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.CountryNameAR}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.creationdate"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.CreationTime[0].substring(0, 10)}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.requeststatus"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={OperationRequestStatus}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.ImporterRegister"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.ImportersRegister}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.BankNameAR"}
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
                    tx={"OperationRequestDetail.BranchNameAR"}
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
                    tx={"OperationRequestDetail.DocArrivalDate"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.DocArrivalDate[0].substring(0, 10)}
                  />
                </View>

                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.ImportPurposeName"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    text={props.data.ImportPurposeName}
                    preset={"normal"}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.amount"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={TEXT_VALUE}
                    preset={"normal"}
                    text={currencyFormat(parseFloat(props.data.TotalValue))}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.CurrencyShortName"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text style={TEXT_VALUE} preset={"normal"} text={props.data.CurrencyShortName} />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"OperationRequestDetail.note"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    text={props.data.Notes}
                    preset={"normal"}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        );
      }
    };
    return <View>{renderView()}</View>;
  },
);
