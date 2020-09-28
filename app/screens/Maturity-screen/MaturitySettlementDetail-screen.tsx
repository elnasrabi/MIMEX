/* eslint-disable @typescript-eslint/no-use-before-define */
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
import { ComMaturitySettlementDetail } from "../../components/Forms/com-MaturitySettlement-detail";
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface MaturitySettlementDetailProps {
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
const sub_title: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.orangeDarker };
const Upload_View: ViewStyle = {
  flexDirection: "row",
  padding: 10,
  justifyContent: "space-evenly",
};

const MaturitySettlement_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
const MaturitySettlementCommodity_VIEW: ViewStyle = {
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
export const MaturitySettlementDetail: FunctionComponent<MaturitySettlementDetailProps> = observer(
  props => {
    const {
      authStore,
      MaturitySettlementStore,
      ContractRequestStore,
      ImFormStore,
      MaturityStore,
    } = useStores();
    const [currentLocation, setCurrentLocation] = useState({
      latitude: 0,
      longitude: 0,
    });
    const MaturitySettlement = MaturitySettlementStore.MaturitySettlementDetail;

    const UserType = authStore.userData[0].UserType;

    // useEffect(() => {
    //   MaturitySettlementStore.onLocationEnableCanceled(false);
    //   getMyCurrentLocation();
    //   AppState.addEventListener("change", state => {
    //     if (state === "active" && !MaturitySettlementStore.locationEnableCanceled) {
    //       MaturitySettlementStore.onLocationEnableCanceled(true);
    //       getMyCurrentLocation();
    //     }
    //   });
    // }, []);

    const gotoHome = () => {
      // formikRef.current.resetForm();
      // setDate(new Date());
      return props.navigation.navigate("Home");
    };

    const UolpadDocument = code => {
      ContractRequestStore.SetDocumentCode(code);
      ContractRequestStore.SetDocumentType(6);
      props.navigation.navigate("UploadDocument");
    };

    const RelatedImForm = code => {
      ImFormStore.refreshImFormList();
      ImFormStore.IMFormSearch(authStore.authorization, code);
      props.navigation.navigate("ImFormList");
    };

    const RelatedMaturity = code => {
      MaturityStore.RefreshMaturityList();
      MaturityStore.setMaturityCode(code);

      MaturityStore.MaturitySearch(authStore.authorization, code);

      if (!(MaturityStore.MaturityList.length === 0)) {
        props.navigation.navigate("MaturityList");
      }
    };

    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

    const onSuccessPress = () => {
      MaturitySettlementStore.goingFromHome(false);
      authStore.SetAllIssuesFalse();
      authStore.SetIsMaturitySettlement(true);
      props.navigation.navigate("ReportIssue");
    };
    const onFailPress = () => {
      props.navigation.navigate("MaturitySettlementSuccess", { isSuccess: false });
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
        <BackButton title={"MaturitySettlementDetail.MaturitySettlements"} onPress={goBack} />
        <ScrollView style={MaturitySettlement_VIEW}>
          {isTrader && (
            <View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => UolpadDocument(MaturitySettlement.FormCode)}>
                  <Text tx={"common.uploaddocument"} style={sub_title} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => RelatedImForm(MaturitySettlement.FormCode)}>
                  <Text tx={"common.imform"} style={sub_title} />
                </TouchableOpacity>
              </View>
              <View style={Upload_View}>
                <TouchableOpacity onPress={() => RelatedMaturity(MaturitySettlement.MaturityCode)}>
                  <Text tx={"common.maturity"} style={sub_title} />
                </TouchableOpacity>
              </View>
              <ComMaturitySettlementDetail
                data={MaturitySettlement}
                navigation={props.navigation}
                view={"Trader"}
              />
            </View>
          )}
          {!isTrader && (
            <View>
              {/* MaturitySettlement */}
              <ComMaturitySettlementDetail
                data={MaturitySettlement}
                navigation={props.navigation}
                view={"Bank"}
              />
            </View>
          )}
        </ScrollView>
        <View style={SEPERATOR_LINE} />
        {/* <ScrollView style={MaturitySettlementCommodity_VIEW}>
      <FlatList
        style={FLAT_LIST_CONTAINER}
        data={MaturitySettlementStore.getCommodityListData}
        renderItem={({ item, index }) =>
         
            <ComMaturitySettlementCommodityList item={item} index={index} />
       
        }
        keyExtractor={(item, index) => index.toString()}
      />
        </ScrollView> */}

        {authStore.IsTrader && (
          <View style={BOTTOM_VIEW}>
            <BottomButton
              leftImage={icons.blackButton2}
              leftText={"MaturitySettlement.combanksupport"}
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
  },
);
