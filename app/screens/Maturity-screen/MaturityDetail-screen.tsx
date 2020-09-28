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
import { ComMaturityDetail } from "../../components/Forms/com-Maturity-detail";
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface MaturityDetailProps {
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

const Maturity_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
const MaturityCommodity_VIEW: ViewStyle = {
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
export const MaturityDetail: FunctionComponent<MaturityDetailProps> = observer(props => {
  const {
    authStore,
    MaturityStore,
    ContractRequestStore,
    MaturitySettlementStore,
    ImFormStore,
  } = useStores();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const Maturity = MaturityStore.MaturityDetail;

  const UserType = authStore.userData[0].UserType;

  // useEffect(() => {
  //   MaturityStore.onLocationEnableCanceled(false);
  //   getMyCurrentLocation();
  //   AppState.addEventListener("change", state => {
  //     if (state === "active" && !MaturityStore.locationEnableCanceled) {
  //       MaturityStore.onLocationEnableCanceled(true);
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

  const RelatedMaturitySettlement = code => {
    // MaturityStore.RefreshMaturityList();
    //MaturitySettlementStore.setMaturitySettlementCode(code);

    //MaturitySettlementStore.refreshList()

    MaturitySettlementStore.getMaturitySettlementByMaturity(authStore.authorization, code);

    if (!(MaturitySettlementStore.MaturitySettlementList.length === 0)) {
      props.navigation.navigate("MaturitySettlementList");
    }
  };

  const RelatedImForm = code => {
    ImFormStore.refreshImFormList();
    ImFormStore.IMFormSearch(authStore.authorization, code);
    props.navigation.navigate("ImFormList");
  };

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const onSuccessPress = () => {
    MaturityStore.goingFromHome(false);
    authStore.SetAllIssuesFalse();
    authStore.SetIsMaturity(true);
    props.navigation.navigate("ReportIssue");
  };
  const onFailPress = () => {
    props.navigation.navigate("MaturitySuccess", { isSuccess: false });
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
      <BackButton title={"MaturityDetail.Maturity"} onPress={goBack} />
      <ScrollView style={Maturity_VIEW}>
        {isTrader && (
          <View>
            <View style={Upload_View}>
              <TouchableOpacity onPress={() => RelatedImForm(Maturity.FormCode)}>
                <Text tx={"common.imform"} style={sub_title} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => RelatedMaturitySettlement(Maturity.MaturityCode)}>
                <Text tx={"common.maturitysettlement"} style={sub_title} />
              </TouchableOpacity>
            </View>
            <View style={Upload_View}>
              <TouchableOpacity onPress={() => UolpadDocument(Maturity.FormCode)}>
                <Text tx={"common.uploaddocument"} style={sub_title} />
              </TouchableOpacity>
            </View>
            <ComMaturityDetail data={Maturity} navigation={props.navigation} view={"Trader"} />
          </View>
        )}
        {!isTrader && (
          <View>
            <View style={Upload_View}>
              <TouchableOpacity onPress={() => RelatedImForm(Maturity.FormCode)}>
                <Text tx={"common.imform"} style={sub_title} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => RelatedMaturitySettlement(Maturity.MaturityCode)}>
                <Text tx={"common.maturitysettlement"} style={sub_title} />
              </TouchableOpacity>
            </View>
            <ComMaturityDetail data={Maturity} navigation={props.navigation} view={"Bank"} />
          </View>
        )}
      </ScrollView>
      <View style={SEPERATOR_LINE} />
      {/* <ScrollView style={MaturityCommodity_VIEW}>
      <FlatList
        style={FLAT_LIST_CONTAINER}
        data={MaturityStore.getCommodityListData}
        renderItem={({ item, index }) =>
         
            <ComMaturityCommodityList item={item} index={index} />
       
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
