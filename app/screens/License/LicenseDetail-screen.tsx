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
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { ComLicenseDetail } from "../../components/License/com-License-detail";
import { ComLicenseCommodityList } from "../../components/License/com-LicenseCommodity-list";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface LicenseDetailProps {
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
const License_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
const LicenseCommodity_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 20 : isIphoneX() ? 5 : 11,
};
const Upload_View: ViewStyle = { padding: 10, flexDirection: "row", alignContent: "space-between" };
const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 };
export const LicenseDetail: FunctionComponent<LicenseDetailProps> = observer(props => {
  const { authStore, LicenseStore, ExFormStore, ContractRequestStore } = useStores();
  const [] = useState({
    latitude: 0,
    longitude: 0,
  });
  const License = LicenseStore.LicenseDetail;

  const UserType = authStore.userData[0].UserType;

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const onSuccessPress = () => {
    LicenseStore.goingFromHome(false);
    authStore.SetAllIssuesFalse();
    authStore.SetIsLicense(true);
    props.navigation.navigate("ReportIssue");
  };

  const RelatedExForm = code => {
    ExFormStore.refreshExFormList();
    ExFormStore.getExFormsByContract(authStore.authorization, code);
    props.navigation.navigate("ExFormList");
  };

  const UolpadDocument = code => {
    ContractRequestStore.SetDocumentCode(code);
    props.navigation.navigate("UploadDocument");
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
      <BackButton title={"LicenseDetail.licenses"} onPress={goBack} />
      <ScrollView style={License_VIEW}>
        {isTrader && (
          <View>
            <View style={Upload_View}>
              <TouchableOpacity onPress={() => UolpadDocument(License.LicenseCode)}>
                <Text tx={"common.uploaddocument"} style={sub_title} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => RelatedExForm(License.LicenseCode)}>
                <Text tx={"common.exform"} style={sub_title} />
              </TouchableOpacity>
            </View>
            {/* License */}
            <ComLicenseDetail data={License} navigation={props.navigation} view={"Trader"} />
          </View>
        )}
        {!isTrader && (
          <View>
            <View style={Upload_View}>
              <TouchableOpacity onPress={() => RelatedExForm(License.LicenseCode)}>
                <Text tx={"common.exform"} style={sub_title} />
              </TouchableOpacity>
            </View>
            <ComLicenseDetail data={License} navigation={props.navigation} view={"Bank"} />
          </View>
        )}
      </ScrollView>
      <View style={SEPERATOR_LINE} />
      <ScrollView style={LicenseCommodity_VIEW}>
        <Text
          extraText={":"}
          tx={"LicenseDetail.commoditysubtitle"}
          style={sub_title}
          preset={"normal"}
        />
        <FlatList
          style={FLAT_LIST_CONTAINER}
          data={LicenseStore.getCommodityListData}
          renderItem={({ item, index }) => <ComLicenseCommodityList item={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>

      {authStore.IsTrader && (
        <View style={BOTTOM_VIEW}>
          <BottomButton
            leftImage={icons.blackButton2}
            leftText={"License.combanksupport"}
            // leftDisabled={!EditableMode}
            rightImage={icons.redButton2}
            onLeftPress={onSuccessPress}
            onRightPress={() => goBack()}
            rightText={"License.back"}
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
