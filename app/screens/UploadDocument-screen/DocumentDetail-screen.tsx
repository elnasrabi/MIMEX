/* eslint-disable @typescript-eslint/no-use-before-define */
import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useState } from "react";
import { Linking, Platform, TextStyle, View, ViewStyle } from "react-native";
//import { ComDocumentDetail } from "../../components/Forms/com-Document-detail";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface DocumentDetailProps {
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

const Document_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
const DocumentCommodity_VIEW: ViewStyle = {
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
export const DocumentDetail: FunctionComponent<DocumentDetailProps> = observer(props => {
  const { authStore, DocumentStore, ContractRequestStore, ClaimSettlementStore } = useStores();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const Document = DocumentStore.DocumentDetail;

  const UserType = authStore.userData[0].UserType;

  // useEffect(() => {
  //   DocumentStore.onLocationEnableCanceled(false);
  //   getMyCurrentLocation();
  //   AppState.addEventListener("change", state => {
  //     if (state === "active" && !DocumentStore.locationEnableCanceled) {
  //       DocumentStore.onLocationEnableCanceled(true);
  //       getMyCurrentLocation();
  //     }
  //   });
  // }, []);

  const gotoHome = () => {
    // formikRef.current.resetForm();
    // setDate(new Date());
    return props.navigation.navigate("Home");
  };

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const onSuccessPress = () => {
    DocumentStore.goingFromHome(false);
    authStore.SetAllIssuesFalse();
    props.navigation.navigate("ReportIssue");
  };
  const onFailPress = () => {
    props.navigation.navigate("DocumentSuccess", { isSuccess: false });
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
      <BackButton title={"DocumentDetail.Documents"} onPress={goBack} />
      {/*<ScrollView style={Document_VIEW}>
       {isTrader && <View>
 
         <ComDocumentDetail
            data={Document}
            navigation={props.navigation}
            view={"Trader"}
          />
       </View>     } 
       {!isTrader && <View>
          {/* Document
         <ComDocumentDetail
            data={Document}
            navigation={props.navigation}
            view={"Bank"}
          />
       </View>     }  
        
      </ScrollView>*/}
      <View style={SEPERATOR_LINE} />
      {/* <ScrollView style={DocumentCommodity_VIEW}>
      <FlatList
        style={FLAT_LIST_CONTAINER}
        data={DocumentStore.getCommodityListData}
        renderItem={({ item, index }) =>
         
            <ComDocumentCommodityList item={item} index={index} />
       
        }
        keyExtractor={(item, index) => index.toString()}
      />
        </ScrollView> */}
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
          leftText={"Document.combanksupport"}
          rightImage={icons.redButton2}
          onLeftPress={onSuccessPress}
          onRightPress={() => goBack()}
          rightText={"common.back"}
        />
      </View>
    </Screen>
  );
});
