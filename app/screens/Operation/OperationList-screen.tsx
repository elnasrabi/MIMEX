import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { FlatList, Platform, TouchableOpacity, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { BackButton } from "../../components/header/back-button";
import { ComOperationList } from "../../components/Operation/com-Operation-list";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface OperationListProps {
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

export const OperationList: FunctionComponent<OperationListProps> = observer(props => {
  const { authStore, OperationStore } = useStores();

  let flatdata = OperationStore.OperationList;

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const goToDetailScreen = detail => {
    OperationStore.refreshCommodityList();
    OperationStore.refreshPaymentMethodList();
    OperationStore.getOperationCommodityList(authStore.authorization, detail.OperationCode[0]);
    OperationStore.getOperationPaymentMethodList(authStore.authorization, detail.OperationCode[0]);

    const OperationDetail = detail;

    const OperationCommDetail = OperationStore.OperationCommodityDetail;
    const OperationPMDetail = OperationStore.OperationPaymentMethodDetail;

    OperationStore.setOperationDetail(OperationDetail);
    OperationStore.setOperationCommodityDetail(OperationCommDetail);
    OperationStore.setOperationPaymentMethodDetail(OperationPMDetail);

    props.navigation.navigate("OperationDetail");
  };
  return (
    <Screen
      statusBarColor={color.palette.white}
      statusBar={"dark-content"}
      wall={"whiteWall"}
      style={ROOT}
      preset="fixed"
    >
      <BackButton title={"OperationList.Operation"} onPress={goBack} />

      <FlatList
        style={FLAT_LIST_CONTAINER}
        data={OperationStore.OperationList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              goToDetailScreen(item);
            }}
          >
            <ComOperationList item={item} index={index} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Screen>
  );
});
