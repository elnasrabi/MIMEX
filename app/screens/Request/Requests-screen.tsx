import { ParamListBase, useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Image, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Orientation from "react-native-orientation-locker";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen, Text } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color, typography } from "../../theme";
import { showAlert } from "../../utils/utils";

const BOTTOM_VIEW: ViewStyle = { marginBottom: 10, marginTop: 60 };

export interface LandingScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const ROOT: ViewStyle = {
  flex: 1,
};

const CONTAINER: ViewStyle = {
  flex: 1,
  paddingStart: 15,
  paddingEnd: 15,
};

const Headr_View: ViewStyle = {
  marginBottom: 15,
  marginTop: 25,
  flex: 1,
};
const SEPERATOR_LINE: ViewStyle = {
  height: 5,
  backgroundColor: color.palette.black,
  width: "95%",
  marginLeft: 10,
  borderRadius: 5,
};

const Header: TextStyle = {
  color: color.palette.black,
  flex: 1,
  fontSize: 16,
  marginTop: 20,
  fontWeight: "bold",
  fontFamily: typography.primary,
};

const Operation_CONTAINER: ViewStyle = {
  justifyContent: "space-between",
  flex: 1,
  paddingStart: 25,
  paddingEnd: 25,
  flexDirection: "row",
  //backgroundColor:"#7fffd4"
};

const Contract_CONTAINER: ViewStyle = {
  justifyContent: "space-evenly",
  flex: 5,
  paddingStart: 10,
  paddingEnd: 10,
  flexDirection: "row",
  //backgroundColor:"#ffa07a"
};

const License_CONTAINER: ViewStyle = {
  justifyContent: "space-between",
  flex: 1,
  paddingStart: 25,
  paddingEnd: 25,
  flexDirection: "row",
  //backgroundColor:"#afeeee"
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
  flex: 1,
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

const Add_Request_Image: ImageStyle = {
  alignSelf: "center",
};

const CONTAINER_AFS_LOGO: ImageStyle = {
  position: "absolute",
  top: 60,
  alignSelf: "center",
};

// const dataList = ["landingScreen.myList", "landingScreen.safetyCheck", "landingScreen.getRate"]
// const dataList = ["landingScreen.myList", "landingScreen.getRate"]
const dataList = ["landingScreen.ImForm"];
const dataList2 = ["landingScreen.ExForm"];
let isConnected = true;
export const MyRequests: FunctionComponent<LandingScreenProps> = observer(props => {
  const { ImFormStore, homeStore, authStore } = useStores();
  const [searchValue, onSearchValue] = useState("1307201600024");
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

  const OnViewLicense = async () => {
    try {
      props.navigation.navigate("LicenseRequest");
    } catch (error) {
      showAlert("Requests.error");
    }
  };

  const OnViewContract = async () => {
    try {
      props.navigation.navigate("ContractRequest");
    } catch (error) {
      showAlert("Requests.error");
    }
  };

  const OnViewOperation = async () => {
    try {
      authStore.SetIsIm(true);

      props.navigation.navigate("OperationRequest");
    } catch (error) {
      showAlert("Requests.error");
    }
  };

  const OnViewImForm = async () => {
    try {
      authStore.SetIsIm(true);

      props.navigation.navigate("ImForm");
    } catch (error) {
      showAlert("Requests.error");
    }
  };

  const OnViewExForm = async () => {
    try {
      authStore.SetIsIm(false);

      props.navigation.navigate("ExForm");
    } catch (error) {
      showAlert("Requests.error");
    }
  };

  const OnViewClaim = async () => {
    try {
      props.navigation.navigate("Claim");
    } catch (error) {
      showAlert("Requests.error");
    }
  };

  const OnViewIssue = async () => {
    try {
      authStore.SetIsIm(true);

      props.navigation.navigate("Issue");
    } catch (error) {
      showAlert("Requests.error");
    }
  };

  const onNewContractRequest = async () => {
    try {
      props.navigation.navigate("NewContractRequest");
    } catch (error) {
      showAlert("Requests.error");
    }
  };

  const onNewLicenseRequest = async () => {
    try {
      props.navigation.navigate("NewLicenseRequest");
    } catch (error) {
      showAlert("Requests.error");
    }
  };

  const onNewOperationRequest = async () => {
    try {
      props.navigation.navigate("NewOperationRequest");
    } catch (error) {
      showAlert("Requests.error");
    }
  };

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);

  return (
    <ScrollView>
      <Screen
        style={ROOT}
        statusBar={"dark-content"}
        statusBarColor={color.palette.white}
        sync={ImFormStore.sync}
        wall={"whiteWall"}
        preset="scroll"
      >
        <MenuButton hasBackground={false} onPress={handleDrawer} />
        <View style={CONTAINER}>
          <View style={Headr_View}>
            <Text style={Header} tx={"Requests.contracttask"} />
          </View>
          <View style={Contract_CONTAINER}>
            <TouchableOpacity onPress={onNewContractRequest}>
              <Image style={Add_Request_Image} source={icons.addrequest} />
            </TouchableOpacity>
            <TouchableOpacity onPress={OnViewContract}>
              <Image style={Add_Request_Image} source={icons.viewrequest} />
            </TouchableOpacity>
          </View>

          <View style={SEPERATOR_LINE} />

          <View style={Headr_View}>
            <Text style={Header} tx={"Requests.licensetask"} />
          </View>
          <View style={Contract_CONTAINER}>
            <TouchableOpacity onPress={onNewLicenseRequest}>
              <Image style={Add_Request_Image} source={icons.addrequest} />
            </TouchableOpacity>
            <TouchableOpacity onPress={OnViewLicense}>
              <Image style={Add_Request_Image} source={icons.viewrequest} />
            </TouchableOpacity>
          </View>
          <View style={SEPERATOR_LINE} />

          <View style={Headr_View}>
            <Text style={Header} tx={"Requests.operationtask"} />
          </View>
          <View style={Contract_CONTAINER}>
            <TouchableOpacity onPress={onNewOperationRequest}>
              <Image style={Add_Request_Image} source={icons.addrequest} />
            </TouchableOpacity>
            <TouchableOpacity onPress={OnViewOperation}>
              <Image style={Add_Request_Image} source={icons.viewrequest} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={BOTTOM_VIEW}>
          <BottomButton
            hideLeftButton={true}
            rightImage={icons.redButton2}
            onRightPress={() => goBack()}
            rightText={"common.back"}
          />
        </View>
      </Screen>
    </ScrollView>
  );
});
