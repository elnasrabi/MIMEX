import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { Alert, FlatList, Platform, View, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { ComIssueList } from "../../components/Forms/com-Issue-list";
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { translate } from "../../i18n";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
import { showAlert } from "../../utils/utils";
export interface IssueListProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const ROOT: ViewStyle = {
  justifyContent: "center",
  flex: 1,
};
const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 };

const FLAT_LIST_CONTAINER: ViewStyle = {
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
//const FLAT_LIST_CONTAINER: ViewStyle = { marginTop: Platform.OS == 'android' ? 20 : isIphoneX() ? 5 : 33 }

export const IssueList: FunctionComponent<IssueListProps> = observer(props => {
  const { authStore, IssueStore } = useStores();
  IssueStore.IssueList;

  const Issue = IssueStore.IssueListData;

  const UserType = authStore.userData[0].UserType;

  let EditableMode = true;
 
  try {
    
    if (IssueStore.IssueListData[0].IsTraderEditable[0] === "1") {
      EditableMode = true;
    } else if (IssueStore.IssueListData[0].IsTraderEditable[0] === "0") {
      EditableMode = false;
    }
  } catch (error) {
    
    EditableMode = false;
  }

 

  const DeleteRequest = () => {
    Alert.alert(
      translateText("IssueList.deleteconfirmtitle"),
      translateText("IssueList.deleteconfirmmessage"),
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => GoDelete() },
      ],
      { cancelable: false },
    );
  };

  const GoDelete = () => {
    IssueStore.DeleteIssue(IssueStore.IssueListData[0].Id[0]);

    if (IssueStore.isIssueDeleted === false) {
      showAlert("IssueList.FailedMsg");
    } else if (IssueStore.isIssueDeleted === true) {
      showAlert("IssueList.DeletedMsg");
      return props.navigation.navigate("Issue");
    }
  };

  function translateText(text): string {
    const i18nText = text && translate(text);
    return i18nText;
  }

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  //   const goToDetailScreen = (detail) => {

  //     IssueStore.refreshCommodityList();
  //    IssueStore.getImCommodityList(authStore.authorization,detail.FormCode[0])
  //     const IssueDetail = detail
  //     const ImCommDetail = IssueStore.IssueCommodityDetail
  //     IssueStore.setIssueDetail(IssueDetail)
  //     IssueStore.setIssueCommodityDetail(ImCommDetail)
  //     props.navigation.navigate("IssueDetail")
  //   }
  return (
    <Screen
      statusBarColor={color.palette.white}
      statusBar={"dark-content"}
      wall={"whiteWall"}
      style={ROOT}
      preset="fixed"
    >
      <BackButton title={"IssueList.home"} onPress={goBack} />

      <FlatList
        style={FLAT_LIST_CONTAINER}
        data={IssueStore.IssueListData}
        renderItem={({ item, index }) => (
          //   <TouchableOpacity onPress={() => {
          //     goToDetailScreen(item)
          //   }}>
          //     <ComIssueList item={item} index={index} />
          //   </TouchableOpacity>
          <ComIssueList item={item} index={index} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={BOTTOM_VIEW}>
        <BottomButton
          leftImage={icons.redButton2}
          leftText={"IssueList.delete"}
          leftDisabled={!EditableMode}
          rightImage={icons.blackButton2}
          onLeftPress={() => DeleteRequest()}
          onRightPress={() => goBack()}
          rightText={"IssueList.back"}
          //rightDisabled={!EditableMode}
        />
      </View>
    </Screen>
  );
});
