import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, TextStyle, View, ImageStyle } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Text, Icon, Button } from "../../components";
import { color } from "../../theme";
import { callApi } from "../../utils/utils";
import { MyButton } from "../button/my-button";
import { icons } from "../icon/icons";

export interface ComConsignmentDetailProps {
  navigation?: NativeStackNavigationProp<ParamListBase>;
  view?: viewTypes;
  data?: any;
  isFailView?: boolean;
}

const viewType = {
  consignment: "consignment",
  customer: "customer",
  specialAction: "specialAction",
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
const CONSIGNMENT_VIEW: TextStyle = { flex: 1, color: color.palette.link };
const ITEMS_VIEW: ViewStyle = { justifyContent: "flex-end", marginLeft: 5 };
const SPECIAL_ACTION: ImageStyle = { height: 100, width: 100 };
const ITEM_LABEL: TextStyle = { color: color.palette.darkText, marginEnd: 10 };
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
let isDelivered = false;
export const ComConsignmentDetail: FunctionComponent<ComConsignmentDetailProps> = observer(
  props => {
    const consignmentStatus = props.data.currentFreightState[0];
    if (consignmentStatus === "Delivered") {
      isDelivered = true;
    } else {
      isDelivered = false;
    }
    const onFirePress = () => {
      props.navigation.navigate("pdfViewer");
    };
    const onActionPress = () => {
      props.navigation.navigate("consignmentSpecial");
    };
    const onPhonePress = () => {
      callApi("645456456456");
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
      if (props.view === viewType.consignment) {
        return (
          <View style={DETAIL_CONTAINER}>
            <View style={CONSIGNMENT_VIEW}>
              <View style={DETAIL_VIEW}>
                <Text
                  tx={"common.consignment"}
                  extraText={":"}
                  style={ITEM_LABEL}
                  preset={"normal"}
                />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={props.data.consignmentNumber}
                />
              </View>
              <View style={DETAIL_VIEW}>
                <Text tx={"common.status"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
                <Text
                  style={[TEXT_VALUE, { flex: 1 }]}
                  preset={"normal"}
                  text={consignmentStatus}
                />
              </View>
              <Text tx={"common.address"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />

              <View style={DETAIL_VIEW}>
                <Text
                  style={CONSIGNMENT_VIEW}
                  text={renderAddress(props.data.deliveryAddress[0].address[0])}
                  preset={"normal"}
                />
                <View style={ITEMS_VIEW}>
                  <View style={DETAIL_VIEW}>
                    <Text
                      tx={"common.items"}
                      extraText={":"}
                      style={ITEM_LABEL}
                      preset={"normal"}
                    />
                    <Text
                      style={[TEXT_VALUE, { flex: 1 }]}
                      text={props.data.consignmentItems[0].totalLineItemLabels[0]}
                      preset={"normal"}
                    />
                  </View>
                  <View style={DETAIL_VIEW}>
                    <Text
                      tx={"common.weight"}
                      extraText={":"}
                      style={ITEM_LABEL}
                      preset={"normal"}
                    />
                    <Text style={TEXT_VALUE} preset={"normal"} text={props.data.totalWeight} />
                  </View>
                </View>
              </View>
            </View>
            <View style={FIRE_BUTTON}>
              <Button preset="link" onPress={onFirePress}>
                <Icon icon={"fire"} />
              </Button>
            </View>
          </View>
        </View >
{/* <Button style={FIRE_BUTTON} preset="link" onPress={onFirePress}>
          <Icon icon={"fire"} />
        </Button> */}
      </View >)
    } else if (props.view === viewType.customer) {
  return (<View>
    <View style={CUSTOMER_VIEW}>
      <Text style={TITLE} tx={"common.customer"} />
    </View>
    <View style={CUSTOMER_CONTAINER}>
      <View style={CONSIGNMENT_VIEW}>
        <View style={DETAIL_VIEW}>
          <Text tx={"common.name"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
          <Text style={[TEXT_VALUE, { flex: 1 }]} preset={"normal"}>{"Mark belo"}</Text>
        </View>
        <View style={CUSTOMER_CONTAINER}>
          <View style={CONSIGNMENT_VIEW}>
            <View style={DETAIL_VIEW}>
              <Text tx={"common.name"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
              <Text style={[TEXT_VALUE, { flex: 1 }]} preset={"normal"}>
                {"Mark belo"}
              </Text>
            </View>
            <View style={DETAIL_VIEW}>
              <Text tx={"common.contact"} extraText={":"} style={ITEM_LABEL} preset={"normal"}>
                Items:
                  </Text>
              <Text style={[TEXT_VALUE, { flex: 1 }]} preset={"normal"}>
                {"856126555"}
              </Text>
            </View>
            <Text tx={"common.special"} extraText={":"} style={ITEM_LABEL} preset={"normal"}>
              Items:
                </Text>
            <Text
              style={[TEXT_VALUE, { flex: 1 }]}
              text={"Line 1 \nLine 2"}
              preset={"normal"}
            />
          </View>
          <Button style={CALL_BUTTON} preset="link" onPress={onPhonePress}>
            <Icon icon={"phone"} />
          </Button>
        </View>
      </View>
        );
      } else if (props.view === viewType.specialAction) {
        return (
          <View style={DETAIL_CONTAINER}>
        <View style={CONSIGNMENT_VIEW}>
          <View style={DETAIL_VIEW}>
            <Text
              tx={"common.consignment"}
              extraText={":"}
              style={ITEM_LABEL}
              preset={"normal"}
            />
            <Text
              style={[TEXT_VALUE, { flex: 1 }]}
              preset={"normal"}
              text={props.data.consignmentNumber}
            />
          </View>
          <View style={DETAIL_VIEW}>
            <Text tx={"common.status"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />
            <Text
              style={[TEXT_VALUE, { flex: 1 }]}
              preset={"normal"}
              text={consignmentStatus}
            />
          </View>
          <Text tx={"common.address"} extraText={":"} style={ITEM_LABEL} preset={"normal"} />

          <View style={[DETAIL_VIEW, { marginEnd: 15 }]}>
            <Text
              style={CONSIGNMENT_VIEW}
              text={renderAddress(props.data.deliveryAddress[0].address[0])}
              preset={"normal"}
            />
          </View>
        </View>
        <View style={SPECIAL_ACTION_BUTTON}>
          {props.isFailView ? null : (
            <MyButton
              isDisable={isDelivered}
              buttonSource={icons.blueButton}
              imageBackground={SPECIAL_ACTION}
              // isLoading={authStore.isLoginLoading}
              tx="common.specialAction"
              onPress={onActionPress}
            />
          )}
        </View>
      </View>
        );
      } else {
        return true;
      }
    };
    return <View>{renderView()}</View>;
  },
);
