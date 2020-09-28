import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Text } from "../../components";
import { color } from "../../theme";
import { currencyFormat } from "../../utils/utils";

export interface ComExFormDetailProps {
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
const ExForm_VIEW: TextStyle = { flex: 1, color: color.palette.link };
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
export const ComExFormDetail: FunctionComponent<ComExFormDetailProps> = observer(props => {
  const ExFormStatus = props.data.FlowStatusNameEX;
  if (ExFormStatus === "Imported") {
    IsFinsished = true;
  } else {
    IsFinsished = false;
  }

  const renderView = () => {
    if (props.view === viewType.Trader) {
      return (
        <View style={DETAIL_CONTAINER}>
          <View style={ExForm_VIEW}>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ExFormDetail.FormCode"}
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
                tx={"ExFormDetail.contractno"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.Contract}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ExFormDetail.formstatus"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text style={[TEXT_VALUE, { flex: 1 }]} preset={"normal"} text={ExFormStatus} />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ExFormDetail.creationdate"}
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
                tx={"ExFormDetail.BankNameAR"}
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
                tx={"ExFormDetail.BankNameAR"}
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
                tx={"ExFormDetail.country"}
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
                tx={"ExFormDetail.firstapproval"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                text={props.data.FirstApprovalName}
                preset={"normal"}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ExFormDetail.secondapproval"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                text={props.data.SecondApprovalName}
                preset={"normal"}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ExFormDetail.amount"}
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
                tx={"ExFormDetail.CurrencyShortName"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text style={TEXT_VALUE} preset={"normal"} text={props.data.CurrencyShortName} />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View style={DETAIL_CONTAINER}>
            <View style={ExForm_VIEW}>
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
                  tx={"ExFormDetail.contractno"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.Contract}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ExFormDetail.taxno"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.TaxNumber}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ExFormDetail.FormCode"}
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
                  tx={"ExFormDetail.creationdate"}
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
                  tx={"ExFormDetail.customername"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[FormNo_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.FullNameAr}
                />
              </View>
              <View style={DETAIL_VIEW}></View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ExFormDetail.cbosid"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.CBOSID}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ExFormDetail.formstatus"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text style={[TEXT_VALUE, { flex: 1 }]} preset={"normal"} text={ExFormStatus} />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ExFormDetail.BankNameAR"}
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
                  tx={"ExFormDetail.BranchNameAR"}
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
                  tx={"ExFormDetail.country"}
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
                  tx={"ExFormDetail.importername"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.CustomerName}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ExFormDetail.loadport"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.ArrivalPort}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ExFormDetail.customunit"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.Custom_Unit_Name_AR}
                />
              </View>

              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ExFormDetail.dataenterer"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  text={props.data.DataEntereerName}
                  preset={"normal"}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ExFormDetail.firstapproval"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  text={props.data.FirstApprovalName}
                  preset={"normal"}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ExFormDetail.secondapproval"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  text={props.data.SecondApprovalName}
                  preset={"normal"}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ExFormDetail.amount"}
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
                  tx={"ExFormDetail.CurrencyShortName"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text style={TEXT_VALUE} preset={"normal"} text={props.data.CurrencyShortName} />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ExFormDetail.bankserial"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text style={TEXT_VALUE} preset={"normal"} text={props.data.BankSerial} />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ExFormDetail.note"}
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
          </View>
        </ScrollView>
      );
    }
  };
  return <View>{renderView()}</View>;
});
