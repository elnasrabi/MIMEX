import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, FlatList, TouchableOpacity, Platform } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { color } from "../../theme";
import { isIphoneX } from "react-native-iphone-x-helper";
import { ComContractRequestList } from "../../components/ContractRequest/com-ContractRequest-list";
import { useStores } from "../../models/root-store";
import { BackButton } from "../../components/header/back-button";

export interface ContractRequestListProps {
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

export const ContractRequestList: FunctionComponent<ContractRequestListProps> = observer(props => {
  const { authStore, ContractRequestStore } = useStores();

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const goToDetailScreen = detail => {
    ContractRequestStore.refreshCommodityList();
    ContractRequestStore.refreshPaymentMethodList();
    ContractRequestStore.getContractRequestCommodityList(
      authStore.authorization,
      detail.ContractRequestCode[0],
    );
    ContractRequestStore.getContractRequestPaymentMethodList(
      authStore.authorization,
      detail.ContractRequestCode[0],
    );

    const ContractRequestDetail = detail;

    const ContractRequestCommDetail = ContractRequestStore.ContractRequestCommodityDetail;
    const ContractRequestPMDetail = ContractRequestStore.ContractRequestPaymentMethodDetail;

    ContractRequestStore.setContractDetail(ContractRequestDetail);
    ContractRequestStore.setContractRequestCommodityDetail(ContractRequestCommDetail);
    ContractRequestStore.setContractRequestPaymentMethodDetail(ContractRequestPMDetail);

    props.navigation.navigate("ContractRequestDetail");
  };
  return (
    <Screen
      statusBarColor={color.palette.white}
      statusBar={"dark-content"}
      wall={"whiteWall"}
      style={ROOT}
      preset="fixed"
    >
      <BackButton title={"ContractRequestList.contractrequest"} onPress={goBack} />

      <FlatList
        style={FLAT_LIST_CONTAINER}
        data={ContractRequestStore.ContractRequestList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              goToDetailScreen(item);
            }}
          >
            <ComContractRequestList item={item} index={index} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Screen>
  );
});
