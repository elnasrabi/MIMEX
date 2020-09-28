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
import { ComContractDetail } from "../../components/Contract/com-Contract-detail";
import { ComContractCommodityList } from "../../components/Contract/com-ContractCommodity-list";
import { ComContractPaymentMethodList } from "../../components/Contract/com-ContractPaymentMethod-list";
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { translate } from "../../i18n";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface ContractDetailProps {
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
const ContractDetailView: ViewStyle = { flex: 3 };
const Contract_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
const Upload_View: ViewStyle = { padding: 10, flexDirection: "row", alignContent: "space-between" };
const ContractCommodity_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 20 : isIphoneX() ? 5 : 11,
};

const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 };
export const ContractDetail: FunctionComponent<ContractDetailProps> = observer(props => {
  const { authStore, ContractStore, ExFormStore, ContractRequestStore } = useStores();

  const Contract = ContractStore.ContractDetail;

  const UserType = authStore.userData[0].UserType;

  const UolpadDocument = code => {
    ContractRequestStore.SetDocumentCode(code);
    props.navigation.navigate("UploadDocument");
  };

  const RelatedExForm = code => {
    //ExFormStore.refreshExFormList();
    ExFormStore.getExFormsByContract(authStore.authorization, code);
    props.navigation.navigate("ExFormList");
  };

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const onSuccessPress = () => {
    ContractStore.goingFromHome(false);
    authStore.SetAllIssuesFalse();
    authStore.SetIsContract(true);
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
      <BackButton title={"ContractDetail.contracts"} onPress={goBack} />

      <View style={ContractDetailView}>
        <ScrollView style={Contract_VIEW}>
          {isTrader && (
            <View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => UolpadDocument(Contract.ContractCode)}>
                  <Text tx={"common.uploaddocument"} style={sub_title} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => RelatedExForm(Contract.ContractCode)}>
                  <Text tx={"common.exform"} style={sub_title} />
                </TouchableOpacity>
              </View>

              {/* Contract */}
              <ComContractDetail data={Contract} navigation={props.navigation} view={"Trader"} />
            </View>
          )}
          {!isTrader && (
            <View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => RelatedExForm(Contract.ContractCode)}>
                  <Text tx={"common.exform"} style={sub_title} />
                </TouchableOpacity>
              </View>
              {/* Contract */}
              <ComContractDetail data={Contract} navigation={props.navigation} view={"Bank"} />
            </View>
          )}
        </ScrollView>
      </View>
      <View style={SEPERATOR_LINE} />
      <ScrollView style={ContractCommodity_VIEW}>
        <Text
          extraText={":"}
          tx={"ContractDetail.commoditysubtitle"}
          style={sub_title}
          preset={"normal"}
        />
        <FlatList
          style={FLAT_LIST_CONTAINER}
          data={ContractStore.getCommodityListData}
          renderItem={({ item, index }) => <ComContractCommodityList item={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      <View style={SEPERATOR_LINE} />
      <ScrollView style={ContractCommodity_VIEW}>
        <Text
          extraText={":"}
          tx={"ContractDetail.pmsubtitle"}
          style={sub_title}
          preset={"normal"}
        />
        <FlatList
          style={FLAT_LIST_CONTAINER}
          data={ContractStore.getPaymentMethodListData}
          renderItem={({ item, index }) => (
            <ComContractPaymentMethodList item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>

      {authStore.IsTrader && (
        <View style={BOTTOM_VIEW}>
          <BottomButton
            leftImage={icons.blackButton2}
            leftText={"Contract.combanksupport"}
            //leftDisabled={!EditableMode}
            rightImage={icons.redButton2}
            onLeftPress={onSuccessPress}
            onRightPress={() => goBack()}
            rightText={"Contract.back"}
            // rightDisabled={!EditableMode}
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
