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
import { ComClaimSettlementDetail } from "../../components/Forms/com-ClaimSettlement-detail";
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface ClaimSettlementDetailProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const ROOT: ViewStyle = {
  paddingBottom: 10,
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

const ClaimSettlement_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};


const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 };
export const ClaimSettlementDetail: FunctionComponent<ClaimSettlementDetailProps> = observer(
  props => {
    const {
      authStore,
      ClaimSettlementStore,
      ContractRequestStore,
      PaymentStore,
      ClaimStore,
      ExFormStore,
    } = useStores();

    const ClaimSettlement = ClaimSettlementStore.ClaimSettlementDetail;

    const UserType = authStore.userData[0].UserType;

  

    const UolpadDocument = code => {
      ContractRequestStore.SetDocumentCode(code);
      ContractRequestStore.SetDocumentType(6);
      props.navigation.navigate("UploadDocument");
    };

    const RelatedPayment = code => {
      PaymentStore.PaymentSearch(authStore.authorization, code);

      if (!(PaymentStore.PaymentList.length === 0)) {
        props.navigation.navigate("PaymentList");
      }
    };

    const RelatedClaim = code => {
      ClaimStore.setClaimCode(code);

      ClaimStore.getClaimByClaimCode(authStore.authorization, code);

      if (!(ClaimStore.ClaimList.length === 0)) {
        props.navigation.navigate("ClaimList");
      }
    };

    const RelatedExForm = code => {
      //ExFormStore.refreshExFormList();
      ExFormStore.ExFormSearch(authStore.authorization, code);
      props.navigation.navigate("ExFormList");
    };

    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

    const onSuccessPress = () => {
      ClaimSettlementStore.goingFromHome(false);
      authStore.SetAllIssuesFalse();
      authStore.SetIsClaimSettlement(true);
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
        <BackButton title={"ClaimSettlementDetail.ClaimSettlements"} onPress={goBack} />
        <ScrollView style={ClaimSettlement_VIEW}>
          {isTrader && (
            <View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => UolpadDocument(ClaimSettlement.FormCode)}>
                  <Text tx={"common.uploaddocument"} style={sub_title} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => RelatedPayment(ClaimSettlement.PaymentCode)}>
                  <Text tx={"common.payment"} style={sub_title} />
                </TouchableOpacity>
              </View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => RelatedExForm(ClaimSettlement.FormCode)}>
                  <Text tx={"common.exform"} style={sub_title} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => RelatedClaim(ClaimSettlement.ClaimCode)}>
                  <Text tx={"common.relatedclaim"} style={sub_title} />
                </TouchableOpacity>
              </View>
              <ComClaimSettlementDetail
                data={ClaimSettlement}
                navigation={props.navigation}
                view={"Trader"}
              />
            </View>
          )}
          {!isTrader && (
            <View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => RelatedPayment(ClaimSettlement.PaymentCode)}>
                  <Text tx={"common.payment"} style={sub_title} />
                </TouchableOpacity>
              </View>
              {/* ClaimSettlement */}
              <ComClaimSettlementDetail
                data={ClaimSettlement}
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
              leftText={"ClaimSettlement.combanksupport"}
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
  },
);
