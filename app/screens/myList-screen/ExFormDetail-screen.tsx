/* eslint-disable @typescript-eslint/no-use-before-define */
import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useState } from "react";
import {
  FlatList,
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
import { ComExFormDetail } from "../../components/Forms/com-ExForm-detail";
import { ComExFormCommodityList } from "../../components/Forms/com-ExFormCommodity-list";
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
export interface ExFormDetailProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const FLAT_LIST_CONTAINER: ViewStyle = { flex: 1 };
const ROOT: ViewStyle = {
  flex: 1,
};
const ContractDetailView: ViewStyle = { flex: 2 };
const sub_title: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.orangeDarker };
const Upload_View: ViewStyle = {
  flexDirection: "row",
  padding: 10,
  justifyContent: "space-evenly",
};
const SEPERATOR_LINE: ViewStyle = {
  height: 5,
  backgroundColor: color.palette.black,
  width: "95%",
  marginLeft: 10,
  borderRadius: 5,
};
const ExForm_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
const ExFormCommodity_VIEW: ViewStyle = {
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
export const ExFormDetail: FunctionComponent<ExFormDetailProps> = observer(props => {
  const {
    authStore,
    ExFormStore,
    ContractRequestStore,
    ClaimStore,
    ContractStore,
    ClaimSettlementStore,
  } = useStores();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const ExForm = ExFormStore.ExFormDetail;
  const ExFormCommodity = ExFormStore.ExFormCommodityDetail;

  const UserType = authStore.userData[0].UserType;

  // useEffect(() => {
  //   ExFormStore.onLocationEnableCanceled(false);
  //   getMyCurrentLocation();
  //   AppState.addEventListener("change", state => {
  //     if (state === "active" && !ExFormStore.locationEnableCanceled) {
  //       ExFormStore.onLocationEnableCanceled(true);
  //       getMyCurrentLocation();
  //     }
  //   });
  // }, []);

  const gotoHome = () => {
    // formikRef.current.resetForm();
    // setDate(new Date());
    return props.navigation.navigate("Home");
  };

  // const getMyCurrentLocation = () => {
  //   getCurrentLocation(ExFormStore.onLocationEnableCanceled).then(location => {
  //     if (location) {
  //       ExFormStore.getCurrentLocation(location.latitude, location.longitude);
  //       setCurrentLocation({ latitude: location.latitude, longitude: location.longitude });
  //     }
  //   });
  // };

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const onSuccessPress = () => {
    ExFormStore.goingFromHome(false);
    authStore.SetAllIssuesFalse();
    authStore.SetIsEx(true);
    props.navigation.navigate("ReportIssue");
  };

  const UploadDocument = code => {
    ContractRequestStore.SetDocumentCode(code);
    props.navigation.navigate("UploadDocument");
  };

  const RelatedClaim = code => {
    ClaimStore.setClaimCode(code);

    ClaimStore.ClaimSearch(authStore.authorization, code);

    if (!(ClaimStore.ClaimList.length === 0)) {
      props.navigation.navigate("ClaimList");
    }
  };

  const RelatedClaimSettlement = code => {
    ClaimSettlementStore.setClaimSettlementCode(code);
    //ClaimSettlementStore.refreshClaimSettlementList();
    ClaimSettlementStore.getClaimSettlementByForm(authStore.authorization, code);

    if (!(ClaimSettlementStore.ClaimSettlementList.length === 0)) {
      props.navigation.navigate("ClaimSettlementList");
    }
  };

  const RelatedContract = code => {
    // MaturityStore.RefreshMaturityList();

    ContractStore.ContractSearch(authStore.authorization, code);

    if (!(ContractStore.ContractList.length === 0)) {
      ContractStore.refreshCommodityList();
      ContractStore.refreshPaymentMethodList();
      ContractStore.getContractCommodityList(authStore.authorization, code);
      ContractStore.getContractPaymentMethodList(authStore.authorization, code);

      const ContractDetail = ContractStore.ContractList[0];

      const ContractCommDetail = ContractStore.ContractCommodityDetail;
      const ContractPMDetail = ContractStore.ContractPaymentMethodDetail;

      ContractStore.setContractDetail(ContractDetail);
      ContractStore.setContractCommodityDetail(ContractCommDetail);
      ContractStore.setContractPaymentMethodDetail(ContractPMDetail);

      props.navigation.navigate("ContractDetail");
    }
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
      <BackButton title={"ExFormDetail.exforms"} onPress={goBack} />
      <View style={ContractDetailView}>
        <ScrollView style={ExForm_VIEW}>
          {isTrader && (
            <View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => UploadDocument(ExForm.FormCode)}>
                  <Text tx={"common.uploaddocument"} style={sub_title} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => RelatedClaim(ExForm.FormCode)}>
                  <Text tx={"common.relatedclaim"} style={sub_title} />
                </TouchableOpacity>
              </View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => RelatedContract(ExForm.Contract)}>
                  <Text tx={"common.contract"} style={sub_title} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => RelatedClaimSettlement(ExForm.FormCode)}>
                  <Text tx={"common.claimsettlement"} style={sub_title} />
                </TouchableOpacity>
              </View>
              <ComExFormDetail data={ExForm} navigation={props.navigation} view={"Trader"} />
            </View>
          )}
          {!isTrader && (
            <View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => RelatedContract(ExForm.Contract)}>
                  <Text tx={"common.contract"} style={sub_title} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => RelatedClaim(ExForm.FormCode)}>
                  <Text tx={"common.relatedclaim"} style={sub_title} />
                </TouchableOpacity>
              </View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => RelatedClaimSettlement(ExForm.FormCode)}>
                  <Text tx={"common.claimsettlement"} style={sub_title} />
                </TouchableOpacity>
              </View>
              {/* ExForm */}
              <ComExFormDetail data={ExForm} navigation={props.navigation} view={"Bank"} />
            </View>
          )}
        </ScrollView>
      </View>
      <View style={SEPERATOR_LINE} />
      <ScrollView style={ExFormCommodity_VIEW}>
        <FlatList
          style={FLAT_LIST_CONTAINER}
          data={ExFormStore.getCommodityListData}
          renderItem={({ item, index }) => <ComExFormCommodityList item={item} index={index} />}
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
            leftText={"ExForm.combanksupport"}
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
