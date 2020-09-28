import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { FlatList, Platform, TouchableOpacity, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { ComImFormList } from "../../components/Forms/com-ImForm-list";
import { BackButton } from "../../components/header/back-button";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface ImFormListProps {
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

export const IMFormList: FunctionComponent<ImFormListProps> = observer(props => {
  const { authStore, ImFormStore } = useStores();
  let flatdata = ImFormStore.IMFormList;

  // console.log(flatdata);
  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const goToDetailScreen = detail => {
    ImFormStore.refreshCommodityList();
    ImFormStore.getImCommodityList(authStore.authorization, detail.FormCode[0]);
    const ImFormDetail = detail;
    const ImCommDetail = ImFormStore.IMFormCommodityDetail;
    ImFormStore.setImFormDetail(ImFormDetail);
    ImFormStore.setImFormCommodityDetail(ImCommDetail);
    props.navigation.navigate("ImFormDetail");
  };
  return (
    <Screen
      statusBarColor={color.palette.white}
      statusBar={"dark-content"}
      wall={"whiteWall"}
      style={ROOT}
      preset="fixed"
    >
      <BackButton title={"ImFormList.imforms"} onPress={goBack} />

      <FlatList
        style={FLAT_LIST_CONTAINER}
        data={ImFormStore.IMFormList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              goToDetailScreen(item);
            }}
          >
            <ComImFormList item={item} index={index} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Screen>
  );
});
