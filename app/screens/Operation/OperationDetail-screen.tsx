import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useState } from "react";
import {
  FlatList,
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
import { ComOperationDetail } from "../../components/Operation/com-Operation-detail";
import { ComOperationCommodityList } from "../../components/Operation/com-OperationCommodity-list";
import { ComOperationPaymentMethodList } from "../../components/Operation/com-OperationPaymentMethod-list";
import { translate } from "../../i18n";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface OperationDetailProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const FLAT_LIST_CONTAINER: ViewStyle = { flex: 1 };
const OperationDetailView: ViewStyle = { flex: 3 };
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
const Upload_View: ViewStyle = { padding: 10, flexDirection: "row", alignContent: "space-between" };
const Operation_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
const OperationCommodity_VIEW: ViewStyle = {
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
export const OperationDetail: FunctionComponent<OperationDetailProps> = observer(props => {
  const {
    authStore,
    OperationStore,
    ImFormStore,
    ContractRequestStore,
    OperationTransferStore,
  } = useStores();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const Operation = OperationStore.OperationDetail;

  const UserType = authStore.userData[0].UserType;

  const gotoHome = () => {
    return props.navigation.navigate("Home");
  };

  function translateText(text): string {
    const i18nText = text && translate(text);
    return i18nText;
  }

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);
  const onSuccessPress = () => {
    OperationStore.goingFromHome(false);
    authStore.SetAllIssuesFalse();
    authStore.SetIsOperation(true);
    props.navigation.navigate("ReportIssue");
  };

  const RelatedImForm = code => {
    ImFormStore.refreshImFormList();
    ImFormStore.getImFormByOperationList(authStore.authorization, code);
    props.navigation.navigate("ImFormList");
  };

  const RelatedTransfers = code => {
    OperationTransferStore.refreshOperationTransferList();
    OperationTransferStore.getOperationTransferByOperation(authStore.authorization, code);
    props.navigation.navigate("OperationTransferList");
  };

  const UolpadDocument = code => {
    ContractRequestStore.SetDocumentCode(code);
    props.navigation.navigate("UploadDocument");
  };

  const onFailPress = () => {
    props.navigation.navigate("OperationSuccess", { isSuccess: false });
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
      <BackButton title={"OperationDetail.Operations"} onPress={goBack} />
      <View style={OperationDetailView}>
        <ScrollView style={Operation_VIEW}>
          {isTrader && (
            <View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => UolpadDocument(Operation.OperationCode)}>
                  <Text tx={"common.uploaddocument"} style={sub_title} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => RelatedImForm(Operation.OperationCode)}>
                  <Text tx={"common.imform"} style={sub_title} />
                </TouchableOpacity>
              </View>

              <View style={Upload_View}>
                <TouchableOpacity onPress={() => RelatedTransfers(Operation.OperationCode)}>
                  <Text tx={"common.operationtransfer"} style={sub_title} />
                </TouchableOpacity>
              </View>
              {/* Operation */}
              <ComOperationDetail data={Operation} navigation={props.navigation} view={"Trader"} />
            </View>
          )}
          {!isTrader && (
            <View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => RelatedImForm(Operation.OperationCode)}>
                  <Text tx={"common.imform"} style={sub_title} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => RelatedTransfers(Operation.OperationCode)}>
                  <Text tx={"common.operationtransfer"} style={sub_title} />
                </TouchableOpacity>
              </View>
              {/* Operation */}
              <ComOperationDetail data={Operation} navigation={props.navigation} view={"Bank"} />
            </View>
          )}
        </ScrollView>
      </View>
      <View style={SEPERATOR_LINE} />
      <ScrollView style={OperationCommodity_VIEW}>
        <Text
          extraText={":"}
          tx={"OperationDetail.commoditysubtitle"}
          style={sub_title}
          preset={"normal"}
        />
        <FlatList
          style={FLAT_LIST_CONTAINER}
          data={OperationStore.getCommodityListData}
          renderItem={({ item, index }) => <ComOperationCommodityList item={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      <View style={SEPERATOR_LINE} />
      <ScrollView style={OperationCommodity_VIEW}>
        <Text
          extraText={":"}
          tx={"OperationDetail.pmsubtitle"}
          style={sub_title}
          preset={"normal"}
        />
        <FlatList
          style={FLAT_LIST_CONTAINER}
          data={OperationStore.getPaymentMethodListData}
          renderItem={({ item, index }) => (
            <ComOperationPaymentMethodList item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>

      {authStore.IsTrader && (
        <View style={BOTTOM_VIEW}>
          <BottomButton
            leftImage={icons.blackButton2}
            leftText={"Operation.combanksupport"}
            //leftDisabled={!EditableMode}
            rightImage={icons.redButton2}
            onLeftPress={onSuccessPress}
            onRightPress={() => goBack()}
            rightText={"Operation.back"}
            // rightDisabled={!EditableMode}
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
});
