import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { FlatList, Platform, TouchableOpacity, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { ComExFormList } from "../../components/Forms/com-ExForm-list";
import { BackButton } from "../../components/header/back-button";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface ExFormListProps {
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

export const ExFormList: FunctionComponent<ExFormListProps> = observer(props => {
  const { authStore, ExFormStore } = useStores();
  let flatdata = ExFormStore.ExFormList;

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const goToDetailScreen = detail => {
    ExFormStore.refreshCommodityList();
    ExFormStore.getExCommodityList(authStore.authorization, detail.FormCode[0]);
    const ExFormDetail = detail;
    const ExCommDetail = ExFormStore.ExFormCommodityDetail;
    ExFormStore.setExFormDetail(ExFormDetail);
    ExFormStore.setExFormCommodityDetail(ExCommDetail);
    props.navigation.navigate("ExFormDetail");
  };
  return (
    <Screen
      statusBarColor={color.palette.white}
      statusBar={"dark-content"}
      wall={"whiteWall"}
      style={ROOT}
      preset="fixed"
    >
      <BackButton title={"ExFormList.exforms"} onPress={goBack} />

      <FlatList
        style={FLAT_LIST_CONTAINER}
        data={ExFormStore.ExFormList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              goToDetailScreen(item);
            }}
          >
            <ComExFormList item={item} index={index} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Screen>
  );
});
