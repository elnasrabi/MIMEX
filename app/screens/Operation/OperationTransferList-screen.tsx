import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { FlatList, Platform, TouchableOpacity, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { BackButton } from "../../components/header/back-button";
import { ComOperationTransferList } from "../../components/Operation/com-OperationTransfer-list";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface OperationTransferListProps {
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

export const OperationTransferList: FunctionComponent<OperationTransferListProps> = observer(
  props => {
    const { authStore, OperationTransferStore } = useStores();

    let flatdata = OperationTransferStore.OperationTransferList;

    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

    const goToDetailScreen = detail => {
      OperationTransferStore.refreshCommodityList();
      OperationTransferStore.refreshPaymentMethodList();

      const OperationTransferDetail = detail;

      const OperationTransferCommDetail = OperationTransferStore.OperationTransferCommodityDetail;
      const OperationTransferPMDetail = OperationTransferStore.OperationTransferPaymentMethodDetail;

      OperationTransferStore.setOperationTransferDetail(OperationTransferDetail);
      OperationTransferStore.setOperationTransferCommodityDetail(OperationTransferCommDetail);
      OperationTransferStore.setOperationTransferPaymentMethodDetail(OperationTransferPMDetail);

      props.navigation.navigate("OperationTransferDetail");
    };
    return (
      <Screen
        statusBarColor={color.palette.white}
        statusBar={"dark-content"}
        wall={"whiteWall"}
        style={ROOT}
        preset="fixed"
      >
        <BackButton title={"OperationTransferList.OperationTransfer"} onPress={goBack} />

        <FlatList
          style={FLAT_LIST_CONTAINER}
          data={OperationTransferStore.OperationTransferList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                goToDetailScreen(item);
              }}
            >
              <ComOperationTransferList item={item} index={index} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Screen>
    );
  },
);
