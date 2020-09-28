import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  Platform,
  ScrollView,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen, Text } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { ComOperationRequestDetail } from "../../components/OperationRequest/com-OperationRequest-detail";
import { ComOperationRequestCommodityList } from "../../components/OperationRequest/com-OperationRequestCommodity-list";
import { ComOperationRequestPaymentMethodList } from "../../components/OperationRequest/com-OperationRequestPaymentMethod-list";
import { translate } from "../../i18n";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
import { showAlert } from "../../utils/utils";

export interface OperationRequestDetailProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const FLAT_LIST_CONTAINER: ViewStyle = { flex: 1 };
const ROOT: ViewStyle = {
  flex: 1,
};
const sub_title: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.orangeDarker };
const SEPERATOR_LINE: ViewStyle = {
  height: 5,
  backgroundColor: color.palette.black,
  width: "95%",
  marginLeft: 10,
  borderRadius: 5,
};
const OperationRequest_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
const OperationRequestCommodity_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 20 : isIphoneX() ? 5 : 11,
};
const MAP_VIEW: ViewStyle = {
  height: 350,
  width: "95%",
  alignSelf: "center",
  marginBottom: 10,
  borderColor: color.palette.darkText,
  borderWidth: 2,
  borderRadius: 3,
};
const ContractDetailView: ViewStyle = { flex: 3 };
const MAPS: ViewStyle = {
  height: "100%",
  width: "100%",
  alignSelf: "center",
};
const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 };
export const OperationRequestDetail: FunctionComponent<OperationRequestDetailProps> = observer(
  props => {
    const { authStore, OperationRequestStore } = useStores();
    const [currentLocation, setCurrentLocation] = useState({
      latitude: 0,
      longitude: 0,
    });
    const OperationRequest = OperationRequestStore.OperationDetail;

    const UserType = authStore.userData[0].UserType;

    console.log("OperationRequest.IsTraderEditable[0]", OperationRequest.IsTraderEditable[0]);
    let EditableMode = true;

    if (OperationRequest.IsTraderEditable[0] === "1") {
      EditableMode = true;
    } else if (OperationRequest.IsTraderEditable[0] === "0") {
      EditableMode = false;
    }

    const gotoHome = () => {
      return props.navigation.navigate("Home");
    };

    const DeleteRequest = () => {
      Alert.alert(
        translateText("ContractRequest.deleteconfirmtitle"),
        translateText("ContractRequest.deleteconfirmmessage"),
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          { text: "OK", onPress: () => GoDelete() },
        ],
        { cancelable: false },
      );
    };

    function translateText(text): string {
      const i18nText = text && translate(text);
      return i18nText;
    }

    const GoDelete = () => {
      OperationRequestStore.DeleteOperationRequest(OperationRequest.OperationRequestCode);

      if (OperationRequestStore.isOperationDeleted === false) {
        showAlert("OperationRequest.FailedMsg");
      } else if (OperationRequestStore.isOperationDeleted === true) {
        showAlert("OperationRequest.DeletedMsg");
        return props.navigation.navigate("OperationRequest");
      }
    };

    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

    const onUpdate = () => {
      OperationRequestStore.goingFromHome(false);

      OperationRequestStore.setOperationDetail(OperationRequest);
      props.navigation.navigate("UpdateOperationRequest");
    };
    const onFailPress = () => {
      props.navigation.navigate("OperationRequestSuccess", { isSuccess: false });
    };

    const canOpenUrl = async url => {
      const supported = await Linking.canOpenURL(url);
      return supported ? "Open" : undefined;
    };

    let isTrader = true;
    if (UserType == "Trader") {
      isTrader = true;
    } else if (UserType == "Bank") {
      isTrader = false;
    }

    return (
      <Screen
        statusBarColor={color.palette.white}
        statusBar={"dark-content"}
        wall={"whiteWall"}
        style={ROOT}
        preset="fixed"
      >
        <BackButton title={"OperationRequestDetail.Operationrequests"} onPress={goBack} />
        <View style={ContractDetailView}>
          <ScrollView style={OperationRequest_VIEW}>
            {isTrader && (
              <View>
                {/* OperationRequest */}
                <ComOperationRequestDetail
                  data={OperationRequest}
                  navigation={props.navigation}
                  view={"Trader"}
                />
              </View>
            )}
            {!isTrader && (
              <View>
                {/* OperationRequest */}
                <ComOperationRequestDetail
                  data={OperationRequest}
                  navigation={props.navigation}
                  view={"Bank"}
                />
              </View>
            )}
          </ScrollView>
        </View>
        <View style={SEPERATOR_LINE} />
        <ScrollView style={OperationRequestCommodity_VIEW}>
          <Text
            extraText={":"}
            tx={"OperationRequestDetail.commoditysubtitle"}
            style={sub_title}
            preset={"normal"}
          />
          <FlatList
            style={FLAT_LIST_CONTAINER}
            data={OperationRequestStore.getCommodityListData}
            renderItem={({ item, index }) => (
              <ComOperationRequestCommodityList item={item} index={index} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <View style={SEPERATOR_LINE} />
        <ScrollView style={OperationRequestCommodity_VIEW}>
          <Text
            extraText={":"}
            tx={"OperationRequestDetail.pmsubtitle"}
            style={sub_title}
            preset={"normal"}
          />
          <FlatList
            style={FLAT_LIST_CONTAINER}
            data={OperationRequestStore.getPaymentMethodListData}
            renderItem={({ item, index }) => (
              <ComOperationRequestPaymentMethodList item={item} index={index} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <View style={BOTTOM_VIEW}>
          <BottomButton
            leftImage={icons.blackButton2}
            leftText={"OperationRequest.update"}
            leftDisabled={!EditableMode}
            rightImage={icons.redButton2}
            onLeftPress={onUpdate}
            onRightPress={() => DeleteRequest()}
            rightText={"OperationRequest.delete"}
            rightDisabled={!EditableMode}
          />
        </View>
      </Screen>
    );
  },
);
