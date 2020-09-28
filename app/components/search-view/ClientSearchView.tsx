
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react";
import {
  ImageStyle,
  ViewStyle,
  View,
  TouchableOpacity,
  ImageBackground,
  TextStyle,
  ActivityIndicator,
  Platform,
} from "react-native";

import { color } from "../../theme";
import { SearchProps } from "./search-props";
import { Text } from "../text/text";
import { TextField } from "../text-field/text-field";
import EvilIcons from "react-native-vector-icons/dist/EvilIcons";
import { icons } from "../icon/icons";
import { useStores } from "../../models/root-store";
import { observer } from "mobx-react-lite";
import { ImFormModel } from "../../models/my-list-store/ImForm-Store";

const SEARCH_VIEW: ViewStyle = { flexDirection: "row" };
const ERROR_TEXT: TextStyle = {};

const SEARCH_INPUT: ViewStyle = {};

const MENU_BUTTON: ViewStyle = {
  marginTop: 20,
};
const GO_BUTTON: ViewStyle = {
  marginTop: 20,
  width: 120,
  justifyContent: "center",
  alignSelf: "center",
};

const BACKGROUND_ICON: ImageStyle = {
  height: 70,
  width: 120,
  tintColor: color.palette.angry,
  alignSelf: "center",
  justifyContent: "center",
};

const CAMERA_ICON: ImageStyle = {
  paddingStart: 15,
  marginTop: 15,
};

const HEADER: TextStyle = {
  color: color.palette.darkText,
  alignSelf: "center",
  fontSize: 22,
};

const GO: TextStyle = {
  color: color.palette.white,
  alignSelf: "center",
  fontSize: 20,
};

const INPUT_STYLE: TextStyle = { borderColor: color.palette.darkText, borderWidth: 1.5 };
const MAIN_STYLE: ViewStyle = { flex: 1 };

export const ClientSearchView: React.FunctionComponent<SearchProps> = observer(props => {
  const { authStore } = useStores();
  const {
    onGoPress,
    searchInputViewStyle,
    containerStyle,
    searchTextStyle,
    buttonStyle,
    onChangeText,
    value,
    isValidSearch = true,
  } = props;
  return (
    <View style={[MENU_BUTTON, containerStyle]}>
      <Text preset="button" style={[HEADER, searchTextStyle]} tx={"ClientSearchView.search"} />
      <View style={[SEARCH_VIEW, searchInputViewStyle]}>
        <TextField
          autoCorrect={false}
          autoCapitalize={"characters"}
          mainStyle={MAIN_STYLE}
          onSubmitEditing={onGoPress}
          onChangeText={onChangeText}
          inputStyle={INPUT_STYLE}
          style={SEARCH_INPUT}
          returnKeyType={"search"}
          placeholderTx={"ClientSearchView.searchHere"}
          value={value}
        />
      </View>
      {isValidSearch ? null : (
        <Text preset="error" style={ERROR_TEXT} tx={"ClientSearchView.searchValue"} />
      )}
      <TouchableOpacity style={GO_BUTTON} onPress={onGoPress}>
        <ImageBackground style={[BACKGROUND_ICON, buttonStyle]} source={icons.blackButton}>
          {authStore.isSearchButtonLoading? (
            <ActivityIndicator size="large" color={color.palette.white} />
          ) : (
            <Text preset="button" style={GO} tx={"ClientSearchView.go"} />
          )}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
});
