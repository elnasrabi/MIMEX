import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { FlatList, Platform, TouchableOpacity, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { ComClaimSettlementList } from "../../components/Forms/com-ClaimSettlement-list";
import { BackButton } from "../../components/header/back-button";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface ClaimSettlementListProps {
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

export const ClaimSettlementList: FunctionComponent<ClaimSettlementListProps> = observer(props => {
  const { ClaimSettlementStore } = useStores();

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const goToDetailScreen = detail => {
    const ClaimSettlementDetail = detail;
    const ImCommDetail = ClaimSettlementStore.ClaimSettlementCommodityDetail;
    ClaimSettlementStore.setClaimSettlementDetail(ClaimSettlementDetail);
    ClaimSettlementStore.setClaimSettlementCommodityDetail(ImCommDetail);
    props.navigation.navigate("ClaimSettlementDetail");
  };
  return (
    <Screen
      statusBarColor={color.palette.white}
      statusBar={"dark-content"}
      wall={"whiteWall"}
      style={ROOT}
      preset="fixed"
    >
      <BackButton title={"ClaimSettlementList.ClaimSettlements"} onPress={goBack} />

      <FlatList
        style={FLAT_LIST_CONTAINER}
        data={ClaimSettlementStore.ClaimSettlementList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              goToDetailScreen(item);
            }}
          >
            <ComClaimSettlementList item={item} index={index} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Screen>
  );
});
