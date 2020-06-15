/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react";
import { ImageStyle, ViewStyle } from "react-native";

import { color } from "../../theme";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Screen } from "../screen/screen";
import { BackButton } from "../header/back-button";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { useStores } from "../../models/root-store";
import { observer } from "mobx-react-lite";

const ROOT: ViewStyle = {
  justifyContent: "center",
  flex: 1,
};
export interface QRScannerScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
export const QRScanner: React.FunctionComponent<QRScannerScreenProps> = observer(props => {
  const { homeStore } = useStores();

  const goBack = React.useMemo(
    () => () => {
      props.navigation.goBack();
    },
    [props.navigation],
  );

  const onSuccess = e => {
    homeStore.onCodeScanned(e);
    props.navigation.goBack();
  };

  const BACK_BUTTON: ImageStyle = {
    tintColor: color.palette.black,
  };

  return (
    <Screen
      statusBarColor={color.palette.white}
      statusBar={"dark-content"}
      wall={"whiteWall"}
      style={ROOT}
      preset="fixed"
    >
      <BackButton style={BACK_BUTTON} onPress={goBack} />
      <QRCodeScanner onRead={onSuccess} topContent={null} bottomContent={null} />
    </Screen>
  );
});
