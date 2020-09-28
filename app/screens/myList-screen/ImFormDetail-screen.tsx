/* eslint-disable @typescript-eslint/no-use-before-define */
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
import { ComImFormDetail } from "../../components/Forms/com-ImForm-detail";
import { ComImFormCommodityList } from "../../components/Forms/com-ImFormCommodity-list";
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface ImFormDetailProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const FLAT_LIST_CONTAINER: ViewStyle = { flex: 1 };
const ROOT: ViewStyle = {
  flex: 1,
};
const SEPERATOR_LINE: ViewStyle = {
  height: 5,
  backgroundColor: color.palette.black,
  width: "95%",
  marginLeft: 10,
  borderRadius: 5,
};
const ImFormDetailView: ViewStyle = { flex: 1.5 };
const Upload_View: ViewStyle = {
  flexDirection: "row",
  padding: 10,
  justifyContent: "space-evenly",
};
const sub_title: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.orangeDarker };
const ImForm_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
const ImFormCommodity_VIEW: ViewStyle = {
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
export const ImFormDetail: FunctionComponent<ImFormDetailProps> = observer(props => {
  const {
    authStore,
    ImFormStore,
    ContractRequestStore,
    MaturityStore,
    MaturitySettlementStore,
    OperationStore,
  } = useStores();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const ImForm = ImFormStore.IMFormDetail;
  const ImFormCommodity = ImFormStore.IMFormCommodityDetail;

  // useEffect(() => {
  //   ImFormStore.onLocationEnableCanceled(false);
  //   getMyCurrentLocation();
  //   AppState.addEventListener("change", state => {
  //     if (state === "active" && !ImFormStore.locationEnableCanceled) {
  //       ImFormStore.onLocationEnableCanceled(true);
  //       getMyCurrentLocation();
  //     }
  //   });
  // }, []);

  const gotoHome = () => {
    // formikRef.current.resetForm();
    // setDate(new Date());
    return props.navigation.navigate("Home");
  };
  const UploadDocument = code => {
    ContractRequestStore.SetDocumentCode(code);
    props.navigation.navigate("UploadDocument");
  };

  const RelatedMaturity = code => {
    // MaturityStore.RefreshMaturityList();
    MaturityStore.setMaturityCode(code);

    MaturityStore.getMaturityByForm(authStore.authorization, code);

    if (!(MaturityStore.MaturityList.length === 0)) {
      props.navigation.navigate("MaturityList");
    }
  };

  const RelatedMaturitySettlement = code => {
    // MaturityStore.RefreshMaturityList();
    MaturitySettlementStore.setMaturitySettlementCode(code);
    // MaturitySettlementStore.refreshList()
    MaturitySettlementStore.getMaturitySettlementByForm(authStore.authorization, code);

    if (!(MaturitySettlementStore.MaturitySettlementList.length === 0)) {
      console.log(MaturitySettlementStore.MaturitySettlementList);
      props.navigation.navigate("MaturitySettlementList");
    }
  };

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
  // const getMyCurrentLocation = () => {
  //   getCurrentLocation(ImFormStore.onLocationEnableCanceled).then(location => {
  //     if (location) {
  //       ImFormStore.getCurrentLocation(location.latitude, location.longitude);
  //       setCurrentLocation({ latitude: location.latitude, longitude: location.longitude });
  //     }
  //   });
  // };

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const onSuccessPress = () => {
    ImFormStore.goingFromHome(false);
    authStore.SetIsIm(true);
    props.navigation.navigate("ReportIssue");
  };
  const onFailPress = () => {
    props.navigation.navigate("ImFormSuccess", { isSuccess: false });
  };

  const canOpenUrl = async url => {
    const supported = await Linking.canOpenURL(url);
    return supported ? "Open" : undefined;
  };

  const UserType = authStore.userData[0].UserType;
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
      <BackButton title={"ImFormDetail.imforms"} onPress={goBack} />
      <View style={ImFormDetailView}>
        <ScrollView style={ImForm_VIEW}>
          {isTrader && (
            <View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => UploadDocument(ImForm.FormCode)}>
                  <Text tx={"common.uploaddocument"} style={sub_title} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => RelatedMaturity(ImForm.FormCode)}>
                  <Text tx={"common.maturity"} style={sub_title} />
                </TouchableOpacity>
              </View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => RelatedMaturitySettlement(ImForm.FormCode)}>
                  <Text tx={"common.maturitysettlement"} style={sub_title} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => RelatedOperation(ImForm.Operation)}>
                  <Text tx={"common.operation"} style={sub_title} />
                </TouchableOpacity>
              </View>
              {/* ExForm */}
              <ComImFormDetail data={ImForm} navigation={props.navigation} view={"Trader"} />
            </View>
          )}
          {!isTrader && (
            <View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => RelatedMaturity(ImForm.FormCode)}>
                  <Text tx={"common.maturity"} style={sub_title} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => RelatedMaturitySettlement(ImForm.FormCode)}>
                  <Text tx={"common.maturitysettlement"} style={sub_title} />
                </TouchableOpacity>
              </View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => RelatedOperation(ImForm.Operation)}>
                  <Text tx={"common.operation"} style={sub_title} />
                </TouchableOpacity>
              </View>
              {/* ExForm */}
              <ComImFormDetail data={ImForm} navigation={props.navigation} view={"Bank"} />
            </View>
          )}
        </ScrollView>
      </View>
      <View style={SEPERATOR_LINE} />
      <ScrollView style={ImFormCommodity_VIEW}>
        <FlatList
          style={FLAT_LIST_CONTAINER}
          data={ImFormStore.getCommodityListData}
          renderItem={({ item, index }) => <ComImFormCommodityList item={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      {authStore.IsTrader && (
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
            leftText={"ImForm.combanksupport"}
            rightImage={icons.redButton2}
            onLeftPress={onSuccessPress}
            onRightPress={() => goBack()}
            rightText={"common.back"}
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
