import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { FlatList, Platform, TouchableOpacity, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { ComMaturitySettlementList } from "../../components/Forms/com-MaturitySettlement-list";
import { BackButton } from "../../components/header/back-button";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface MaturitySettlementListProps {
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

export const MaturitySettlementList: FunctionComponent<MaturitySettlementListProps> = observer(
  props => {
    const { authStore, MaturitySettlementStore } = useStores();
    let flatdata = MaturitySettlementStore.MaturitySettlementList;

    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

    const goToDetailScreen = detail => {
      const MaturitySettlementDetail = detail;

      MaturitySettlementStore.setMaturitySettlementDetail(MaturitySettlementDetail);

      props.navigation.navigate("MaturitySettlementDetail");
    };
    return (
      <Screen
        statusBarColor={color.palette.white}
        statusBar={"dark-content"}
        wall={"whiteWall"}
        style={ROOT}
        preset="fixed"
      >
        <BackButton title={"MaturitySettlementList.MaturitySettlements"} onPress={goBack} />

        <FlatList
          style={FLAT_LIST_CONTAINER}
          data={MaturitySettlementStore.MaturitySettlementList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                goToDetailScreen(item);
              }}
            >
              <ComMaturitySettlementList item={item} index={index} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Screen>
    );
  },
);
