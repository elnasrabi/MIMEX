import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, TextStyle, View, Platform, FlatList } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { isIphoneX } from "react-native-iphone-x-helper";

// components modal and themes
import { Screen, Text } from "../../components";
import { color, typography } from "../../theme";
import { icons } from "../../components/icon/icons";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { BackButton } from "../../components/header/back-button";
import { useStores } from "../../models/root-store";
export interface GetARateListProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const FONTFAMILY: TextStyle = {
  fontFamily: typography.secondary,
};
const ROOT: ViewStyle = {
  paddingBottom: 10,
};
const FLATLIST_STYLE: ViewStyle = {
  margin: 10,
  paddingRight: 8,
  marginRight: 3,
  marginTop: Platform.OS == "android" ? 50 : isIphoneX() ? 0 : 23,
};
const SUB_RATE_ROW_VIEW: ViewStyle = {
  flex: 1,
};
const SUB_ROW_VALUE: ViewStyle = {
  flex: 0.7,
};
const SUB_ROW_LABEL: ViewStyle = {
  flex: 0.3,
};
const SUB_ROW_CONTAINER: ViewStyle = {
  flexDirection: "row",
  marginTop: 10,
};
const MAIN_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.listBG,
  borderWidth: 1,
  padding: 5,
  paddingTop: 10,
  borderRadius: 5,
  marginTop: 15,
};
const SUB_CONTAINER: ViewStyle = {
  marginBottom: 20,
};

export const GetARateList: FunctionComponent<GetARateListProps> = observer(props => {
  const { getARateStore } = useStores();
  const flatListData = getARateStore.geteARateList;
  const renderSubRow = (tx, value) => {
    return (
      <View style={SUB_ROW_CONTAINER}>
        <View style={SUB_ROW_LABEL}>
          <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={tx} />
        </View>
        <View style={SUB_ROW_VALUE}>
          <Text style={[FONTFAMILY, { color: color.palette.link }]}>{value}</Text>
        </View>
      </View>
    );
  };

  const renderSubRateRow = (tx, value) => {
    return (
      <View style={SUB_ROW_CONTAINER}>
        <View style={SUB_RATE_ROW_VIEW}>
          <Text tx={tx} style={[FONTFAMILY, { color: color.palette.black }]} />
        </View>
        <View style={SUB_RATE_ROW_VIEW}>
          <Text style={[FONTFAMILY, { color: color.palette.link }]}>{value ? value : "-"}</Text>
        </View>
      </View>
    );
  };

  const renderItem = (item, index) => {
    const consignmentRate = item.consignmentRateTime[0];
    return (
      <View key={index} style={MAIN_CONTAINER}>
        <View style={SUB_CONTAINER}>
          <Text style={[FONTFAMILY]}>{item.journey[0]}</Text>
        </View>
        {renderSubRow("getARateListScreen.carrier", consignmentRate.carrier[0])}
        {renderSubRow("getARateListScreen.service", consignmentRate.service[0])}
        {renderSubRateRow(
          "getARateListScreen.rateIncSurc",
          `$ ${parseInt(consignmentRate.rate[0]).toFixed(2)}`,
        )}
        {renderSubRateRow("getARateListScreen.surcharge", consignmentRate.surcharge)}
        {renderSubRateRow("getARateListScreen.brokerRate", consignmentRate.brokerRate)}
        {renderSubRateRow(
          "getARateListScreen.deliveryDate",
          consignmentRate.deliveryDate[0].slice(0, 10),
        )}
        {renderSubRateRow("getARateListScreen.transitDays", consignmentRate.transitDays[0])}
      </View>
    );
  };

  const goToGetARate = () => {
    return props.navigation.navigate("GetARate");
  };

  const goBack = React.useMemo(
    () => () => {
      getARateStore.updatePreventrefersh(true);
      props.navigation.goBack();
    },
    [props.navigation],
  );

  return (
    <Screen
      style={ROOT}
      statusBar={"dark-content"}
      statusBarColor={color.palette.white}
      wall={"whiteWall"}
      preset="fixed"
    >
      <BackButton title={"getARateListScreen.header"} onPress={goBack} />
      <FlatList
        data={flatListData}
        renderItem={({ item, index }) => renderItem(item, index)}
        style={FLATLIST_STYLE}
        keyExtractor={(item, index) => index.toString()}
      />
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        onLeftPress={() => goToGetARate()}
        onRightPress={goBack}
        leftText={"getARateListScreen.new"}
        rightText={"common.cancel"}
      />
    </Screen>
  );
});
