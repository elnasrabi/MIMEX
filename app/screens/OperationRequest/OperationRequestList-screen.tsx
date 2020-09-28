import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { FlatList, Platform, TouchableOpacity, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { BackButton } from "../../components/header/back-button";
import { ComOperationRequestList } from "../../components/OperationRequest/com-OperationRequest-list";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface OperationRequestListProps {
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

export const OperationRequestList: FunctionComponent<OperationRequestListProps> = observer(
  props => {
    const { authStore, OperationRequestStore } = useStores();

    let flatdata = OperationRequestStore.OperationRequestList;

    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

    const goToDetailScreen = detail => {
      OperationRequestStore.refreshCommodityList();
      OperationRequestStore.refreshPaymentMethodList();
      OperationRequestStore.getOperationRequestCommodityList(
        authStore.authorization,
        detail.OperationRequestCode[0],
      );
      OperationRequestStore.getOperationRequestPaymentMethodList(
        authStore.authorization,
        detail.OperationRequestCode[0],
      );

      const OperationRequestDetail = detail;

      const OperationRequestCommDetail = OperationRequestStore.OperationRequestCommodityDetail;
      const OperationRequestPMDetail = OperationRequestStore.OperationRequestPaymentMethodDetail;

      OperationRequestStore.setOperationDetail(OperationRequestDetail);
      OperationRequestStore.setOperationRequestCommodityDetail(OperationRequestCommDetail);
      OperationRequestStore.setOperationRequestPaymentMethodDetail(OperationRequestPMDetail);

      props.navigation.navigate("OperationRequestDetail");
    };
    return (
      <Screen
        statusBarColor={color.palette.white}
        statusBar={"dark-content"}
        wall={"whiteWall"}
        style={ROOT}
        preset="fixed"
      >
        <BackButton title={"OperationRequestList.Operationrequest"} onPress={goBack} />

        <FlatList
          style={FLAT_LIST_CONTAINER}
          data={OperationRequestStore.OperationRequestList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                goToDetailScreen(item);
              }}
            >
              <ComOperationRequestList item={item} index={index} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Screen>
    );
  },
);
