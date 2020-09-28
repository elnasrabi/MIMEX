import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Text } from "..";
import { color } from "../../theme";
import { callApi, currencyFormat } from "../../utils/utils";
export interface ComContractRequestDetailProps {
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
const ContractRequest_VIEW: TextStyle = { flex: 1, color: color.palette.link };
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
export const ComContractRequestDetail: FunctionComponent<ComContractRequestDetailProps> = observer(
  props => {
    const ContractRequestStatus = props.data.FlowStatusNameContract;
    if (ContractRequestStatus === "Imported") {
      IsFinsished = true;
    } else {
      IsFinsished = false;
    }
    const onFirePress = () => {
      props.navigation.navigate("pdfViewer");
    };
    const onActionPress = () => {
      props.navigation.navigate("ContractRequestSpecial");
    };
    const onPhonePress = () => {
      callApi("common.supportphone");
    };
    const renderAddress = (data): string => {
      const address =
        data.line1 +
        ", " +
        data.line2 +
        ", " +
        data.town +
        ", " +
        data.state +
        ", " +
        data.country +
        " - " +
        data.postcode;
      return address;
    };
    const renderView = () => {
      if (props.view === viewType.Trader) {
        return (
          <ScrollView>
            <View style={DETAIL_CONTAINER}>
              <View style={ContractRequest_VIEW}>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.RequestCode"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[FormNo_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.ContractRequestCode}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.importername"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.ImporterName}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.importeraddress"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.ImporterAddress}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.expirationdate"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.ExpirationDate}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.requeststatus"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={ContractRequestStatus}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.creationdate"}
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
                    tx={"ContractRequestDetail.BankNameAR"}
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
                    tx={"ContractRequestDetail.BranchNameAR"}
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
                    tx={"ContractRequestDetail.country"}
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
                    tx={"ContractRequestDetail.customunit"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    text={props.data.Custom_Unit_Name_AR}
                    preset={"normal"}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.amount"}
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
                    tx={"ContractRequestDetail.CurrencyShortName"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text style={TEXT_VALUE} preset={"normal"} text={props.data.CurrencyShortName} />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.note"}
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
              <View style={ContractRequest_VIEW}>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.RequestCode"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[FormNo_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.ContractRequestCode}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.importername"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.ImporterName}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.importeraddress"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.ImporterAddress}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.expirationdate"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={props.data.ExpirationDate}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.requeststatus"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    preset={"normal"}
                    text={ContractRequestStatus}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.creationdate"}
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
                    tx={"ContractRequestDetail.BankNameAR"}
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
                    tx={"ContractRequestDetail.BankNameAR"}
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
                    tx={"ContractRequestDetail.country"}
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
                    tx={"ContractRequestDetail.customunit"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text
                    style={[TEXT_VALUE, { flex: 1 }]}
                    text={props.data.Custom_Unit_Name_AR}
                    preset={"normal"}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.amount"}
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
                    tx={"ContractRequestDetail.CurrencyShortName"}
                    extraText={":"}
                    style={ITEM_LABEL}
                    preset={"normal"}
                  />
                  <Text style={TEXT_VALUE} preset={"normal"} text={props.data.CurrencyShortName} />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text
                    tx={"ContractRequestDetail.note"}
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
