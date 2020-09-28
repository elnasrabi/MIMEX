import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { FlatList, Platform, TouchableOpacity, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { BackButton } from "../../components/header/back-button";
import { ComLicenseRequestList } from "../../components/LicenseRequest/com-LicenseRequest-list";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface LicenseRequestListProps {
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

export const LicenseRequestList: FunctionComponent<LicenseRequestListProps> = observer(props => {
  const { authStore, LicenseRequestStore } = useStores();

  let flatdata = LicenseRequestStore.LicenseRequestList;

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const goToDetailScreen = detail => {
    LicenseRequestStore.refreshCommodityList();

    LicenseRequestStore.getLicenseRequestCommodityList(
      authStore.authorization,
      detail.LicenseRequestCode[0],
    );

    const LicenseRequestDetail = detail;

    const LicenseRequestCommDetail = LicenseRequestStore.LicenseRequestCommodityDetail;

    LicenseRequestStore.setLicenseDetail(LicenseRequestDetail);
    LicenseRequestStore.setLicenseRequestCommodityDetail(LicenseRequestCommDetail);

    props.navigation.navigate("LicenseRequestDetail");
  };
  return (
    <Screen
      statusBarColor={color.palette.white}
      statusBar={"dark-content"}
      wall={"whiteWall"}
      style={ROOT}
      preset="fixed"
    >
      <BackButton title={"LicenseRequestList.Licenserequest"} onPress={goBack} />

      <FlatList
        style={FLAT_LIST_CONTAINER}
        data={LicenseRequestStore.LicenseRequestList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              goToDetailScreen(item);
            }}
          >
            <ComLicenseRequestList item={item} index={index} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Screen>
  );
});
