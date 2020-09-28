import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Text } from "../../components";
import { color } from "../../theme";
import { callApi, currencyFormat } from "../../utils/utils";

export interface ComImFormDetailProps {
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
const ImForm_VIEW: TextStyle = { flex: 1, color: color.palette.link };
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
export const ComImFormDetail: FunctionComponent<ComImFormDetailProps> = observer(props => {
  const ImFormStatus = props.data.FlowStatusNameIM;
  if (ImFormStatus === "Imported") {
    IsFinsished = true;
  } else {
    IsFinsished = false;
  }
  const onFirePress = () => {
    props.navigation.navigate("pdfViewer");
  };
  const onActionPress = () => {
    props.navigation.navigate("ImFormSpecial");
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
        <View style={DETAIL_CONTAINER}>
          <View style={ImForm_VIEW}>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ImFormDetail.FormCode"}
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
                tx={"ImFormDetail.operationno"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text
                style={[TEXT_VALUE, { flex: 1 }]}
                preset={"normal"}
                text={props.data.Operation}
              />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ImFormDetail.formstatus"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text style={[TEXT_VALUE, { flex: 1 }]} preset={"normal"} text={ImFormStatus} />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ImFormDetail.creationdate"}
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
                tx={"ImFormDetail.BankNameAR"}
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
                tx={"ImFormDetail.BranchNameAR"}
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
                tx={"ImFormDetail.country"}
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
                tx={"ImFormDetail.customername"}
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
                tx={"ImFormDetail.billofloading"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text style={TEXT_VALUE} preset={"normal"} text={props.data.BillOfLading} />
            </View>
            <View style={DETAIL_VIEW}>
              <Text
                tx={"ImFormDetail.amount"}
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
                tx={"ImFormDetail.CurrencyShortName"}
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
            <View style={ImForm_VIEW}>
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
                  tx={"ImFormDetail.operationno"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.Operation}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ImFormDetail.taxno"}
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
                  tx={"ImFormDetail.FormCode"}
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
                  tx={"ImFormDetail.formstatus"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text style={[TEXT_VALUE, { flex: 1 }]} preset={"normal"} text={ImFormStatus} />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ImFormDetail.creationdate"}
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
                  tx={"ImFormDetail.customername"}
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
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ImFormDetail.cbosid"}
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
                  tx={"ImFormDetail.BankNameAR"}
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
                  tx={"ImFormDetail.BranchNameAR"}
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
                  tx={"ImFormDetail.country"}
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
                  tx={"ImFormDetail.exportername"}
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
                  tx={"ImFormDetail.LoadingPortNameAr"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.LoadingPortNameAr}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ImFormDetail.loadport"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.LoadingPort}
                />
              </View>

              {/* <View style={DETAIL_VIEW}>
                    <Text
                      tx={"ImFormDetail.dataenterer"}
                      extraText={":"}
                      style={ITEM_LABEL}
                      preset={"normal"}
                    />
                    <Text
                      style={[TEXT_VALUE, { flex: 1 }]}
                      text={props.data.DataEntereer}
                      preset={"normal"}
                    />
                    </View>
                    <View style={DETAIL_VIEW}>
                    <Text
                      tx={"ImFormDetail.firstapproval"}
                      extraText={":"}
                      style={ITEM_LABEL}
                      preset={"normal"}
                    />
                    <Text
                      style={[TEXT_VALUE, { flex: 1 }]}
                      text={props.data.FirstApproval}
                      preset={"normal"}
                    />
                  </View>
                  <View style={DETAIL_VIEW}>
                    <Text
                      tx={"ImFormDetail.secondapproval"}
                      extraText={":"}
                      style={ITEM_LABEL}
                      preset={"normal"}
                    />
                    <Text
                      style={[TEXT_VALUE, { flex: 1 }]}
                      text={props.data.SecondApproval}
                      preset={"normal"}
                    />
                  </View> */}
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ImFormDetail.amount"}
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
                  tx={"ImFormDetail.CurrencyShortName"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text style={TEXT_VALUE} preset={"normal"} text={props.data.CurrencyShortName} />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ImFormDetail.billofloading"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text style={TEXT_VALUE} preset={"normal"} text={props.data.BillOfLading} />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ImFormDetail.carriertype"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text style={TEXT_VALUE} preset={"normal"} text={props.data.CarrierTypeNameAr} />
              </View>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"ImFormDetail.note"}
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
