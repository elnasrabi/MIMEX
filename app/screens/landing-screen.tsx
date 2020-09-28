import { ParamListBase, useFocusEffect, useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useEffect, useState } from "react";
import { BackHandler, ImageStyle, Keyboard, View, ViewStyle } from "react-native";
import Orientation from "react-native-orientation-locker";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Icon, Screen } from "../components";
import { BottomButton } from "../components/bottom-button/bottom-button";
import { MyButton } from "../components/button/my-button";
import { MenuButton } from "../components/header/menu-button";
import { icons } from "../components/icon/icons";
import { SearchView } from "../components/search-view/search-view";
import { useStores } from "../models/root-store";
import { color } from "../theme";
import { isInternetAvailable, showAlert } from "../utils/utils";

const BOTTOM_VIEW: ViewStyle = { marginTop: 15, marginBottom: 60 };

export interface LandingScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const ROOT: ViewStyle = {
  justifyContent: "center",
  flex: 1,
};

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  flex: 1,
  paddingStart: 25,
  paddingEnd: 25,
};

const BOTTOM_LIST: ViewStyle = {
  position: "absolute",
  bottom: 60,
  left: 5,
  right: 200,
  flexDirection: "row",
  justifyContent: "space-between",
};

const BOTTOM_LIST2: ViewStyle = {
  position: "absolute",
  bottom: 60,
  left: 200,
  right: 5,
  flexDirection: "row",
  justifyContent: "space-between",
};
const CONTINUE: ViewStyle = {
  alignSelf: "center",
  flex: 1,
};

const New_Request_Button: ViewStyle = {
  alignSelf: "center",
  flex: 1,
  backgroundColor: "#8fbc8f",
};

const IMAGE_RED: ImageStyle = {
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  height: 70,
  borderRadius: 10,
};

const SEARCH_VIEW: ViewStyle = {
  // marginEnd: 55
};

const AFS_LOGO: ImageStyle = {
  alignSelf: "center",
};

const CONTAINER_AFS_LOGO: ImageStyle = {
  position: "absolute",
  top: 20,
  alignSelf: "center",
};

// const dataList = ["landingScreen.myList", "landingScreen.safetyCheck", "landingScreen.getRate"]
// const dataList = ["landingScreen.myList", "landingScreen.getRate"]
const dataList = ["landingScreen.ImForm"];
const dataList2 = ["landingScreen.ExForm"];
let isConnected = true;
export const LandingScreen: FunctionComponent<LandingScreenProps> = observer(props => {
  const {
    ExFormStore,
    ImFormStore,
    homeStore,
    authStore,
    ContractStore,
    OperationStore,
    PaymentStore,
    MaturityStore,
    MaturitySettlementStore,
    OperationTransferStore,
    LicenseStore,
  } = useStores();
  const [searchValue, onSearchValue] = useState("1420180000027");
  // const [searchValue, onSearchValue] = useState("")
  const [isValidSearch, onValidSearch] = useState(true);
  const [isGoPressed, setIsOnGoPress] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    onValidSearch(true);
  }, [isFocused]);

  useEffect(() => {
    Orientation.lockToPortrait();
  });

  useEffect(() => {
    ImFormStore.setImFormFalse();
    ImFormStore.stopSyncing();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  }, []);

  useEffect(() => {
    if (isGoPressed && authStore.isIm && ImFormStore.isEmptyList) {
      showAlert("", "common.noData");
    } else if (isGoPressed && authStore.isIm && !ImFormStore.isEmptyList) {
      ImFormStore.goingFromHome(true);

      props.navigation.navigate("ImFormList");
    }
  }, [ImFormStore.IMFormList]);

  useEffect(() => {
    if (isGoPressed && authStore.isEx && ExFormStore.isEmptyList) {
      showAlert("", "common.noData");
    } else if (isGoPressed && authStore.isEx && !ExFormStore.isEmptyList) {
      ImFormStore.goingFromHome(true);
      authStore.SetIsIm(false);
      props.navigation.navigate("ExFormList");
    }
  }, [ExFormStore.ExFormList]);

  useEffect(() => {
    if (isGoPressed && authStore.isContract && ContractStore.isEmptyList) {
      showAlert("", "common.noData");
    } else if (isGoPressed && authStore.isContract && !ContractStore.isEmptyList) {
      ContractStore.goingFromHome(true);

      props.navigation.navigate("ContractList");
    }
  }, [ExFormStore.ExFormList]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, []),
  );

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);

  const onCameraPress = () => {
    props.navigation.navigate("qrScanner");
  };
  const onSearchText = text => {
    onSearchValue(text);
    text ? onValidSearch(true) : onValidSearch(false);
  };
  const onGoPress = async () => {
    if (!searchValue) {
      onValidSearch(false);
    } else {
      const isConnected = await isInternetAvailable();
      if (isConnected) {
        Keyboard.dismiss();
        let formtype = searchValue.substring(0, 2);
        console.log(formtype);

        if (formtype === "22") {
          authStore.SetIsIm(true);
          ImFormStore.refreshImFormList();
          ImFormStore.IMFormSearch(authStore.authorization, searchValue);
          if (!ImFormStore.isEmptyList) {
            ImFormStore.goingFromHome(true);

            props.navigation.navigate("ImFormList");
          } else {
            showAlert("", "common.noData");
          }
        } else if (formtype === "13") {
          authStore.SetIsEx(true);
          ExFormStore.refreshExFormList();
          ExFormStore.ExFormSearch(authStore.authorization, searchValue);
          if (!ExFormStore.isEmptyList) {
            ExFormStore.goingFromHome(true);

            props.navigation.navigate("ExFormList");
          } else {
            showAlert("", "common.noData");
          }
        } else if (formtype === "12") {
          authStore.SetIsLicense(true);
          LicenseStore.refreshLicenseList();
          LicenseStore.LicenseSearch(authStore.authorization, searchValue);
          if (LicenseStore.LicenseList) {
            LicenseStore.goingFromHome(true);

            props.navigation.navigate("LicenseList");
          } else {
            showAlert("", "common.noData");
          }
        } else if (formtype === "14") {
          authStore.SetIsPayment(true);
          PaymentStore.refreshPaymentList();
          PaymentStore.PaymentSearch(authStore.authorization, searchValue);
          if (PaymentStore.PaymentList) {
            PaymentStore.goingFromHome(true);

            props.navigation.navigate("PaymentList");
          } else {
            showAlert("", "common.noData");
          }
        } else if (formtype === "11") {
          authStore.SetIsContract(true);
          ContractStore.refreshContract();
          ContractStore.ContractSearch(authStore.authorization, searchValue);
          if (ContractStore.ContractList) {
            ContractStore.goingFromHome(true);

            props.navigation.navigate("ContractList");
          } else {
            showAlert("", "common.noData");
          }
        } else if (formtype === "21") {
          authStore.SetIsOperation(true);

          authStore.SetIsContract(true);
          OperationStore.refreshOperationList();
          OperationStore.OperationSearch(authStore.authorization, searchValue);
          if (OperationStore.OperationList) {
            OperationStore.goingFromHome(true);

            props.navigation.navigate("OperationList");
          } else {
            showAlert("", "common.noData");
          }
        } else if (formtype === "23") {
          authStore.SetIsOperationTransfer(true);

          OperationTransferStore.refreshOperationTransfer();
          OperationTransferStore.OperationTransferSearch(authStore.authorization, searchValue);
          if (OperationTransferStore.OperationTransferList) {
            OperationTransferStore.goingFromHome(true);

            props.navigation.navigate("OperationTransferList");
          } else {
            showAlert("", "common.noData");
          }
        } else if (formtype === "24") {
          authStore.SetIsMaturity(true);
          MaturityStore.RefreshMaturityList();
          MaturityStore.MaturitySearch(authStore.authorization, searchValue);
          if (MaturityStore.MaturityList) {
            MaturityStore.goingFromHome(true);

            props.navigation.navigate("MaturityList");
          } else {
            showAlert("", "common.noData");
          }
        } else if (formtype === "25") {
          authStore.SetIsMaturitySettlement(true);

          authStore.SetIsMaturitySettlement(true);
          MaturitySettlementStore.refreshList();
          MaturitySettlementStore.MaturitySettlementSearch(authStore.authorization, searchValue);
          if (MaturitySettlementStore.MaturitySettlementList) {
            MaturitySettlementStore.goingFromHome(true);

            props.navigation.navigate("MaturitySettlementList");
          } else {
            showAlert("", "common.noData");
          }
        }
        // console.log(aa);
      }
    }
  };
  const OnNewRequest = async () => {
    props.navigation.navigate("MyRequests");
  };

  const onButtonPress = (item, index) => {
    switch (item) {
      case "landingScreen.ImForm":
        authStore.SetIsIm(true);
        return props.navigation.navigate("MyImRequests");
      case "landingScreen.ExForm":
        authStore.SetIsIm(false);
        return props.navigation.navigate("MyExRequests");
      // case "landingScreen.getRate":
      //   return gotoGetARate();
      default:
        return true;
    }
  };
  return (
    <Screen
      style={ROOT}
      statusBar={"dark-content"}
      statusBarColor={color.palette.white}
      sync={ImFormStore.sync}
      wall={"whiteWall"}
      preset="scroll"
    >
      <MenuButton hasBackground={false} onPress={handleDrawer} />

      {/* AFS LOGO */}
      <Icon containerStyle={CONTAINER_AFS_LOGO} style={AFS_LOGO} icon={"imexLogo"} />

      <View style={CONTAINER}>
        {/* Search View */}
        <SearchView
          searchTextStyle={SEARCH_VIEW}
          onCameraPress={onCameraPress}
          value={searchValue}
          isValidSearch={isValidSearch}
          onGoPress={onGoPress}
          onChangeText={onSearchText}
          isLoading={ImFormStore.isButtonLoading}
          buttonStyle={SEARCH_VIEW}
        />

        {/* Bottom Option */}
        <View style={BOTTOM_LIST}>
          {dataList.map((data, index) => {
            return (
              <MyButton
                buttonSource={icons.redButton2}
                key={index}
                imageBackground={IMAGE_RED}
                style={CONTINUE}
                tx={data}
                onPress={() => onButtonPress(data, index)}
              />
            );
          })}
        </View>
        <View style={BOTTOM_LIST2}>
          {dataList2.map((data, index) => {
            return (
              <MyButton
                buttonSource={icons.blackButton2}
                key={index}
                imageBackground={IMAGE_RED}
                style={CONTINUE}
                tx={data}
                onPress={() => onButtonPress(data, index)}
              />
            );
          })}
        </View>
      </View>

      {authStore.IsTrader && (
        <View style={BOTTOM_VIEW}>
          {/* <MyButton
                buttonSource={icons.blackButton2}
                imageBackground={IMAGE_RED}
                style={CONTINUE}
                tx={"Requests.newrequest"}
                onPress={() => OnNewRequest()}
              /> */}

          <BottomButton
            hideLeftButton={true}
            rightImage={icons.addrequest}
            onRightPress={() => OnNewRequest()}
            rightText={"Requests.newrequest"}
          />
        </View>
      )}
    </Screen>
  );
});
