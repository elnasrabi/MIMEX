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
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen, Text } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { ComContractRequestDetail } from "../../components/ContractRequest/com-ContractRequest-detail";
import { ComContractRequestCommodityList } from "../../components/ContractRequest/com-ContractRequestCommodity-list";
import { ComContractRequestPaymentMethodList } from "../../components/ContractRequest/com-ContractRequestPaymentMethod-list";
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { translate } from "../../i18n";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
import { showAlert } from "../../utils/utils";

export interface ContractRequestDetailProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const FLAT_LIST_CONTAINER: ViewStyle = { flex: 1 };
const ROOT: ViewStyle = {
  flex: 1,
};
const ContractDetailView: ViewStyle = { flex: 3 };
const sub_title: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.orangeDarker };
const SEPERATOR_LINE: ViewStyle = {
  height: 5,
  backgroundColor: color.palette.black,
  width: "95%",
  marginLeft: 10,
  borderRadius: 5,
};
const ContractRequest_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
const Upload_View: ViewStyle = {
  flexDirection: "row",
  padding: 10,
  justifyContent: "space-evenly",
};
const ContractRequestCommodity_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 20 : isIphoneX() ? 5 : 11,
};

const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 };
export const ContractRequestDetail: FunctionComponent<ContractRequestDetailProps> = observer(
  props => {
    const { authStore, ContractRequestStore } = useStores();

    const ContractRequest = ContractRequestStore.ContractRequestDetail;

    const UserType = authStore.userData[0].UserType;

    console.log("ContractRequest.IsTraderEditable[0]", ContractRequest.IsTraderEditable);
    let EditableMode = true;

    if (ContractRequest.IsTraderEditable[0] === "1") {
      EditableMode = true;
    } else if (ContractRequest.IsTraderEditable[0] === "0") {
      EditableMode = false;
    }

    const UolpadDocument = code => {
      console.log("Document Code", code);
      ContractRequestStore.SetDocumentCode(code);
      props.navigation.navigate("UploadDocument");
    };

    const DeleteRequest = () => {
      Alert.alert(
        translateText("OperationRequest.deleteconfirmtitle"),
        translateText("OperationRequest.deleteconfirmmessage"),
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
      ContractRequestStore.DeleteContractRequest(ContractRequest.ContractRequestCode);

      if (ContractRequestStore.isContractDeleted === false) {
        showAlert("ContractRequest.FailedMsg");
      } else if (ContractRequestStore.isContractDeleted === true) {
        showAlert("ContractRequest.DeletedMsg");
        return props.navigation.navigate("ContractRequest");
      }
    };

    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

    const onUpdate = () => {
      ContractRequestStore.goingFromHome(false);

      ContractRequestStore.setContractDetail(ContractRequest);
      props.navigation.navigate("UpdateContractRequest");
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
        <BackButton title={"ContractRequestDetail.contractrequests"} onPress={goBack} />

        <View style={ContractDetailView}>
          <ScrollView style={ContractRequest_VIEW}>
            {isTrader && (
              <View>
                <View style={Upload_View}>
                  <TouchableOpacity
                    onPress={() => UolpadDocument(ContractRequest.ContractRequestCode)}
                  >
                    <Text tx={"common.uploaddocument"} style={sub_title} />
                  </TouchableOpacity>
                </View>
                {/* ContractRequest */}
                <ComContractRequestDetail
                  data={ContractRequest}
                  navigation={props.navigation}
                  view={"Trader"}
                />
              </View>
            )}
            {!isTrader && (
              <View>
                {/* ContractRequest */}
                <ComContractRequestDetail
                  data={ContractRequest}
                  navigation={props.navigation}
                  view={"Bank"}
                />
              </View>
            )}
          </ScrollView>
        </View>
        <View style={SEPERATOR_LINE} />
        <ScrollView style={ContractRequestCommodity_VIEW}>
          <Text
            extraText={":"}
            tx={"ContractRequestDetail.commoditysubtitle"}
            style={sub_title}
            preset={"normal"}
          />
          <FlatList
            style={FLAT_LIST_CONTAINER}
            data={ContractRequestStore.getCommodityListData}
            renderItem={({ item, index }) => (
              <ComContractRequestCommodityList item={item} index={index} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <View style={SEPERATOR_LINE} />
        <ScrollView style={ContractRequestCommodity_VIEW}>
          <Text
            extraText={":"}
            tx={"ContractRequestDetail.pmsubtitle"}
            style={sub_title}
            preset={"normal"}
          />
          <FlatList
            style={FLAT_LIST_CONTAINER}
            data={ContractRequestStore.getPaymentMethodListData}
            renderItem={({ item, index }) => (
              <ComContractRequestPaymentMethodList item={item} index={index} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <View style={BOTTOM_VIEW}>
          <BottomButton
            leftImage={icons.blackButton2}
            leftText={"ContractRequest.update"}
            leftDisabled={!EditableMode}
            rightImage={icons.redButton2}
            onLeftPress={onUpdate}
            onRightPress={() => DeleteRequest()}
            rightText={"ContractRequest.delete"}
            rightDisabled={!EditableMode}
          />
        </View>
      </Screen>
    );
  },
);
