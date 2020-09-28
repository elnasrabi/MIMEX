import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { FlatList, Platform, TouchableOpacity, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { ComPaymentList } from "../../components/Forms/com-Payment-list";
import { BackButton } from "../../components/header/back-button";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface PaymentListProps {
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

export const PaymentList: FunctionComponent<PaymentListProps> = observer(props => {
  const { authStore, PaymentStore } = useStores();
  let flatdata = PaymentStore.PaymentList;

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const goToDetailScreen = detail => {
    const PaymentDetail = detail;

    PaymentStore.setPaymentDetail(PaymentDetail);
    props.navigation.navigate("PaymentDetail");
  };
  return (
    <Screen
      statusBarColor={color.palette.white}
      statusBar={"dark-content"}
      wall={"whiteWall"}
      style={ROOT}
      preset="fixed"
    >
      <BackButton title={"PaymentList.Payments"} onPress={goBack} />

      <FlatList
        style={FLAT_LIST_CONTAINER}
        data={PaymentStore.PaymentList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              goToDetailScreen(item);
            }}
          >
            <ComPaymentList item={item} index={index} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Screen>
  );
});
