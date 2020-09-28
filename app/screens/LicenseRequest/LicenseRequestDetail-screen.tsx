import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useState } from "react";
import { Alert, FlatList, Platform, ScrollView, TextStyle, View, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen, Text } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { ComLicenseRequestDetail } from "../../components/LicenseRequest/com-LicenseRequest-detail";
import { ComLicenseRequestCommodityList } from "../../components/LicenseRequest/com-LicenseRequestCommodity-list";
import { translate } from "../../i18n";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
import { showAlert } from "../../utils/utils";

export interface LicenseRequestDetailProps {
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
const LicenseRequest_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
const LicenseRequestCommodity_VIEW: ViewStyle = {
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
export const LicenseRequestDetail: FunctionComponent<LicenseRequestDetailProps> = observer(
  props => {
    const { authStore, LicenseRequestStore } = useStores();
    const [currentLocation, setCurrentLocation] = useState({
      latitude: 0,
      longitude: 0,
    });
    const LicenseRequest = LicenseRequestStore.LicenseRequestDetail;
    const LicenseRequestCommodity = LicenseRequestStore.LicenseRequestCommodityDetail;

    const UserType = authStore.userData[0].UserType;

    
    let EditableMode = true;

    if (LicenseRequest.IsTraderEditable[0] === "1") {
      EditableMode = true;
    } else if (LicenseRequest.IsTraderEditable[0] === "0") {
      EditableMode = false;
    }

    const gotoHome = () => {
      return props.navigation.navigate("Home");
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
      LicenseRequestStore.DeleteLicenseRequest(LicenseRequest.LicenseRequestCode);

      if (LicenseRequestStore.isLicenseDeleted === false) {
        showAlert("LicenseRequest.FailedMsg");
      } else if (LicenseRequestStore.isLicenseDeleted === true) {
        showAlert("LicenseRequest.DeletedMsg");
        return props.navigation.navigate("LicenseRequest");
      }
    };

    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

    const onUpdate = () => {
      LicenseRequestStore.goingFromHome(false);

      LicenseRequestStore.setLicenseDetail(LicenseRequest);
      props.navigation.navigate("UpdateLicenseRequest");
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
        <BackButton title={"LicenseRequestDetail.licenserequests"} onPress={goBack} />
        <View style={ContractDetailView}>
          <ScrollView style={LicenseRequest_VIEW}>
            {isTrader && (
              <View>
                {/* LicenseRequest */}
                <ComLicenseRequestDetail
                  data={LicenseRequest}
                  navigation={props.navigation}
                  view={"Trader"}
                />
              </View>
            )}
            {!isTrader && (
              <View>
                {/* LicenseRequest */}
                <ComLicenseRequestDetail
                  data={LicenseRequest}
                  navigation={props.navigation}
                  view={"Bank"}
                />
              </View>
            )}
          </ScrollView>
        </View>
        <View style={SEPERATOR_LINE} />
        <ScrollView style={LicenseRequestCommodity_VIEW}>
          <Text
            extraText={":"}
            tx={"LicenseRequestDetail.commoditysubtitle"}
            style={sub_title}
            preset={"normal"}
          />
          <FlatList
            style={FLAT_LIST_CONTAINER}
            data={LicenseRequestStore.getCommodityListData}
            renderItem={({ item, index }) => (
              <ComLicenseRequestCommodityList item={item} index={index} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>

        <View style={BOTTOM_VIEW}>
          <BottomButton
            leftImage={icons.blackButton2}
            leftText={"LicenseRequest.update"}
            leftDisabled={!EditableMode}
            rightImage={icons.redButton2}
            onLeftPress={onUpdate}
            onRightPress={() => DeleteRequest()}
            rightText={"LicenseRequest.delete"}
            rightDisabled={!EditableMode}
          />
        </View>
      </Screen>
    );
  },
);
