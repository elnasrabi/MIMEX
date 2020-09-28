import { ParamListBase, useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ImageStyle, Keyboard, View, ViewStyle } from "react-native";
import Orientation from "react-native-orientation-locker";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { MenuButton } from "../../components/header/menu-button";
import { ClientSearchView } from "../../components/search-view/ClientSearchView";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
import { isInternetAvailable } from "../../utils/utils";

const BOTTOM_VIEW: ViewStyle = { marginTop: 15, marginBottom: 60 };

export interface SearchClientStatusProps {
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

const ImageCONTAINER: ViewStyle = {
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
  marginLeft: 40,
  marginRight: 40,
  flex: 1,
};

const CONTAINER_AFS_LOGO: ImageStyle = {
  flex: 1,
  top: 20,

  marginLeft: 40,
  marginRight: 40,
};

// const dataList = ["SearchClientStatus.myList", "SearchClientStatus.safetyCheck", "SearchClientStatus.getRate"]
// const dataList = ["SearchClientStatus.myList", "SearchClientStatus.getRate"]

let isConnected = true;
export const SearchClientStatus: FunctionComponent<SearchClientStatusProps> = observer(props => {
  const { homeStore, authStore } = useStores();
  const [searchValue, onSearchValue] = useState("234488248237");
  // const [searchValue, onSearchValue] = useState("")
  const [isValidSearch, onValidSearch] = useState(true);
  const [isGoPressed, setIsOnGoPress] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  });

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);

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
        setIsOnGoPress(true);

        Keyboard.dismiss();
        //authStore.refreshClientStatus();
        authStore.GetClientStatus(authStore.authorization, searchValue);

        if (authStore.hasStatusData === true && authStore.ClientStatusDetails) {
          authStore.SetCBOSID(searchValue);
          props.navigation.navigate("ClientStatus");
        }

        // console.log(aa);
      }
    }
  };

  return (
    <Screen
      style={ROOT}
      statusBar={"dark-content"}
      statusBarColor={color.palette.white}
      wall={"whiteWall"}
      preset="scroll"
    >
      <MenuButton hasBackground={false} onPress={handleDrawer} />

      <View style={CONTAINER}>
        <ClientSearchView
          searchTextStyle={SEARCH_VIEW}
          value={searchValue}
          isValidSearch={isValidSearch}
          onGoPress={onGoPress}
          onChangeText={onSearchText}
          isLoading={authStore.isSearchButtonLoading}
          buttonStyle={SEARCH_VIEW}
        />
      </View>
    </Screen>
  );
});
