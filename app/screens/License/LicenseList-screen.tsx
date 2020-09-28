import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { FlatList, Platform, TouchableOpacity, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { BackButton } from "../../components/header/back-button";
import { ComLicenseList } from "../../components/License/com-License-list";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface LicenseListProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const ROOT: ViewStyle = {
  justifyContent: "center",
  flex: 1,
};

const FLAT_LIST_CONTAINER: ViewStyle = {
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
//const FLAT_LIST_CONTAINER: ViewStyle = { marginTop: Platform.OS == 'android' ? 20 : isIphoneX() ? 5 : 33 }

export const LicenseList: FunctionComponent<LicenseListProps> = observer(props => {
  const { authStore, LicenseStore } = useStores();

  let flatdata = LicenseStore.LicenseList;

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const goToDetailScreen = detail => {
    LicenseStore.refreshCommodityList();

    LicenseStore.getLicenseCommodityList(authStore.authorization, detail.LicenseCode[0]);

    const LicenseDetail = detail;

    const LicenseCommDetail = LicenseStore.LicenseCommodityDetail;

    LicenseStore.setLicenseDetail(LicenseDetail);
    LicenseStore.setLicenseCommodityDetail(LicenseCommDetail);

    props.navigation.navigate("LicenseDetail");
  };
  return (
    <Screen
      statusBarColor={color.palette.white}
      statusBar={"dark-content"}
      wall={"whiteWall"}
      style={ROOT}
      preset="fixed"
    >
      <BackButton title={"LicenseList.License"} onPress={goBack} />

      <FlatList
        style={FLAT_LIST_CONTAINER}
        data={LicenseStore.LicenseList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              goToDetailScreen(item);
            }}
          >
            <ComLicenseList item={item} index={index} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Screen>
  );
});
