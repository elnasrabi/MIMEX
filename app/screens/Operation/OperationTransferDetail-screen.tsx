import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useState } from "react";
import {
  Linking,
  Platform,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen, Text } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { ComOperationTransferDetail } from "../../components/Operation/com-OperationTransfer-detail";
import { translate } from "../../i18n";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface OperationTransferDetailProps {
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
const Upload_View: ViewStyle = {
  flexDirection: "row",
  padding: 10,
  justifyContent: "space-evenly",
};

const OperationTransfer_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
const OperationTransferCommodity_VIEW: ViewStyle = {
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
const MAPS: ViewStyle = {
  height: "100%",
  width: "100%",
  alignSelf: "center",
};
const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 };
export const OperationTransferDetail: FunctionComponent<OperationTransferDetailProps> = observer(
  props => {
    const { authStore, OperationTransferStore, OperationStore, ContractRequestStore } = useStores();
    const [currentLocation, setCurrentLocation] = useState({
      latitude: 0,
      longitude: 0,
    });
    const OperationTransfer = OperationTransferStore.OperationTransferDetail;

    const UserType = authStore.userData[0].UserType;

    const RelatedOperation = code => {
      // MaturityStore.RefreshMaturityList();

      OperationStore.OperationSearch(authStore.authorization, code);

      if (!(OperationStore.OperationList.length === 0)) {
        OperationStore.refreshCommodityList();
        OperationStore.refreshPaymentMethodList();
        OperationStore.getOperationCommodityList(authStore.authorization, code);
        OperationStore.getOperationPaymentMethodList(authStore.authorization, code);

        const OperationDetail = OperationStore.OperationList[0];

        const OperationCommDetail = OperationStore.OperationCommodityDetail;
        const OperationPMDetail = OperationStore.OperationPaymentMethodDetail;

        OperationStore.setOperationDetail(OperationDetail);
        OperationStore.setOperationCommodityDetail(OperationCommDetail);
        OperationStore.setOperationPaymentMethodDetail(OperationPMDetail);

        props.navigation.navigate("OperationDetail");
      }
    };

    const gotoHome = () => {
      return props.navigation.navigate("Home");
    };

    function translateText(text): string {
      const i18nText = text && translate(text);
      return i18nText;
    }

    const UploadDocument = code => {
      ContractRequestStore.SetDocumentCode(code);
      props.navigation.navigate("UploadDocument");
    };

    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

    const onSuccessPress = () => {
      OperationTransferStore.goingFromHome(false);
      authStore.SetAllIssuesFalse();
      authStore.SetIsOperationTransfer(true);
      props.navigation.navigate("ReportIssue");
    };

    const onFailPress = () => {
      props.navigation.navigate("OperationTransferSuccess", { isSuccess: false });
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
        <BackButton title={"OperationTransferDetail.Transfers"} onPress={goBack} />
        <ScrollView style={OperationTransfer_VIEW}>
          {isTrader && (
            <View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => UploadDocument(OperationTransfer.FormCode)}>
                  <Text tx={"common.uploaddocument"} style={sub_title} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => RelatedOperation(OperationTransfer.Operation)}>
                  <Text tx={"common.operation"} style={sub_title} />
                </TouchableOpacity>
              </View>
              <ComOperationTransferDetail
                data={OperationTransfer}
                navigation={props.navigation}
                view={"Trader"}
              />
            </View>
          )}
          {!isTrader && (
            <View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => RelatedOperation(OperationTransfer.Operation)}>
                  <Text tx={"common.operation"} style={sub_title} />
                </TouchableOpacity>
              </View>
              <ComOperationTransferDetail
                data={OperationTransfer}
                navigation={props.navigation}
                view={"Bank"}
              />
            </View>
          )}
        </ScrollView>
        <View style={SEPERATOR_LINE} />

        {authStore.IsTrader && (
          <View style={BOTTOM_VIEW}>
            <BottomButton
              leftImage={icons.blackButton2}
              leftText={"OperationTransfer.combanksupport"}
              //leftDisabled={!EditableMode}
              rightImage={icons.redButton2}
              onLeftPress={onSuccessPress}
              onRightPress={() => goBack()}
              rightText={"OperationTransfer.back"}
              //rightDisabled={!EditableMode}
            />
          </View>
        )}

        {authStore.isBank && (
          <View style={BOTTOM_VIEW}>
            {/* <BottomButton
          leftImage={icons.blackButton2}
          rightImage={icons.redButton2}
          leftText={"common.milestone"}
          rightText={"common.exception"}
          onLeftPress={onSuccessPress}
          onRightPress={onFailPress}
        /> */}
            <BottomButton
              leftImage={icons.blackButton2}
              leftText={"common.CBOS"}
              rightImage={icons.redButton2}
              onLeftPress={onSuccessPress}
              onRightPress={() => goBack()}
              rightText={"common.back"}
            />
          </View>
        )}
      </Screen>
    );
  },
);
