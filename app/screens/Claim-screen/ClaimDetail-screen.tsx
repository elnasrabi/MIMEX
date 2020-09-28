/* eslint-disable @typescript-eslint/no-use-before-define */
import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import {
  Platform,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen, Text } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { ComClaimDetail } from "../../components/Forms/com-Claim-detail";
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
import { showAlert } from "../../utils/utils";

export interface ClaimDetailProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

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
const sub_title: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.orangeDarker };
const Upload_View: ViewStyle = {
  flexDirection: "row",
  padding: 10,
  justifyContent: "space-evenly",
};

const Claim_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};

const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 };
export const ClaimDetail: FunctionComponent<ClaimDetailProps> = observer(props => {
  const {
    authStore,
    ClaimStore,
    ContractRequestStore,
    ClaimSettlementStore,
    ExFormStore,
  } = useStores();

  const Claim = ClaimStore.ClaimDetail;

  const UserType = authStore.userData[0].UserType;

  // useEffect(() => {
  //   ClaimStore.onLocationEnableCanceled(false);
  //   getMyCurrentLocation();
  //   AppState.addEventListener("change", state => {
  //     if (state === "active" && !ClaimStore.locationEnableCanceled) {
  //       ClaimStore.onLocationEnableCanceled(true);
  //       getMyCurrentLocation();
  //     }
  //   });
  // }, []);

  const UolpadDocument = code => {
    ContractRequestStore.SetDocumentCode(code);
    ContractRequestStore.SetDocumentType(6);
    props.navigation.navigate("UploadDocument");
  };

  const RelatedClaimSettlement = code => {
    ClaimStore.setClaimCode(code);

    ClaimSettlementStore.getClaimSettlementByClaim(authStore.authorization, code);

    if (!(ClaimSettlementStore.ClaimSettlementList.length === 0)) {
      props.navigation.navigate("ClaimSettlementList");
    }
  };

  const RelatedExForm = code => {
    try {
      ExFormStore.GetDetails(authStore.authorization, code[0]);

      // ExFormStore.refreshCommodityList();
      ExFormStore.getExCommodityList(authStore.authorization, code);
      const ExFormDetail = ExFormStore.DetailSearch[0];
      const ExCommDetail = ExFormStore.ExFormCommodityDetail;
      ExFormStore.setExFormDetail(ExFormDetail);
      ExFormStore.setExFormCommodityDetail(ExCommDetail);
      props.navigation.navigate("ExFormDetail");
    } catch (error) {
      showAlert("common.noData");
    }
  };

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const onSuccessPress = () => {
    ClaimStore.goingFromHome(false);
    authStore.SetAllIssuesFalse();
    authStore.SetIsClaim(true);
    props.navigation.navigate("ReportIssue");
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
      <BackButton title={"ClaimDetail.Claims"} onPress={goBack} />
      <ScrollView style={Claim_VIEW}>
        {isTrader && (
          <View>
            <View style={Upload_View}>
              <TouchableOpacity onPress={() => UolpadDocument(Claim.ClaimCode)}>
                <Text tx={"common.uploaddocument"} style={sub_title} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => RelatedClaimSettlement(Claim.ClaimCode)}>
                <Text tx={"common.claimsettlement"} style={sub_title} />
              </TouchableOpacity>
            </View>
            <View style={Upload_View}>
              <TouchableOpacity onPress={() => RelatedExForm(Claim.FormCode)}>
                <Text tx={"common.exform"} style={sub_title} />
              </TouchableOpacity>
            </View>

            <ComClaimDetail data={Claim} navigation={props.navigation} view={"Trader"} />
          </View>
        )}
        {!isTrader && (
          <View>
            <View style={Upload_View}>
              <TouchableOpacity onPress={() => RelatedExForm(Claim.FormCode)}>
                <Text tx={"common.exform"} style={sub_title} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => RelatedClaimSettlement(Claim.ClaimCode)}>
                <Text tx={"common.claimsettlement"} style={sub_title} />
              </TouchableOpacity>
            </View>
            {/* Claim */}
            <ComClaimDetail data={Claim} navigation={props.navigation} view={"Bank"} />
          </View>
        )}
      </ScrollView>
      <View style={SEPERATOR_LINE} />

      {authStore.IsTrader && (
        <View style={BOTTOM_VIEW}>
          <BottomButton
            leftImage={icons.blackButton2}
            leftText={"Claim.combanksupport"}
            rightImage={icons.redButton2}
            onLeftPress={onSuccessPress}
            onRightPress={() => goBack()}
            rightText={"common.back"}
          />
        </View>
      )}

      {authStore.isBank && (
        <View style={BOTTOM_VIEW}>
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
