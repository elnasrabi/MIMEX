import { ParamListBase, useIsFocused } from "@react-navigation/native";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import moment from "moment";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  ScrollView,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
// imports from components, themes and modals
import { Checkbox, Screen, Text } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { DropdownPicker } from "../../components/dropdown-picker/Dropdown-picker";
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color, typography } from "../../theme";
import { isInternetAvailable, showAlert } from "../../utils/utils";

export interface IssueProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const ROOT: ViewStyle = {
  paddingBottom: 10,
};
const CONTINUE: ViewStyle = {
  flex: 1,
};
const FLATLIST_STYLE: ViewStyle = {
  marginVertical: 10,
};
const MAIN_CONTAINER: ViewStyle = {
  flexDirection: "row",
  marginBottom: 10,
};
const Issue_DETAIL: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  marginVertical: 5,
};
const CHECKBOX_VIEW: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 5,
};
const SUB_CONTAINER: ViewStyle = {
  flex: 1,
  marginRight: 2,
  borderWidth: 1,
  padding: 3,
  backgroundColor: color.palette.listBG,
};
const CHECKBOX: ViewStyle = {
  height: 25,
  width: 25,
  borderColor: color.palette.black,
};
const SEPERATOR_LINE: ViewStyle = {
  height: 5,
  backgroundColor: color.palette.black,
  width: "95%",
  marginLeft: 10,
  borderRadius: 5,
};
const SELECTALL_CHECKBOX: ViewStyle = {
  margin: 10,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 15 : 38,
  flexDirection: "row",
};
const ADDRESS_VIEW: ViewStyle = {
  flex: 1,
  marginVertical: 5,
  flexDirection: "row",
  justifyContent: "space-between",
};
const DISPATCH_STYLE: TextStyle = {
  color: color.palette.link,
  fontFamily: typography.secondary,
};
const textStyle: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.secondary,
};
const ItemtextStyle: TextStyle = {
  color: color.palette.link,
  fontFamily: typography.secondary,
};
const LIST_EMPTY_TEXT: TextStyle = {
  alignSelf: "center",
  color: color.palette.darkText,
  fontFamily: typography.secondary,
  fontWeight: "bold",
  fontSize: 20,
};
const ACTIVITY_INDICATOR: ViewStyle = {
  position: "absolute",
  top: "50%",
  alignSelf: "center",
};

export const Issue: FunctionComponent<IssueProps> = observer(props => {
  const isFocused = useIsFocused();
  const { authStore, IssueStore } = useStores();
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);
  const [toggleAll, useToggleAll] = useState(false);
  const [Issue, updateIssue] = useState([]);
  const [filterListData, updateFilterListData] = useState([]);
  const [copyOfIssue, updataCopyOfIssue] = useState([]);
  const [selectedStatus, setStatus] = useState("");
  const [statusData, updateStatusData] = useState([]);

  useEffect(() => {
    IssueStore.refreshList();
    updateIssue(IssueStore.getListData);
    setStatus("SELECT FILTER");
    callIssueAPI();
  }, [isFocused]);

  const callIssueAPI = async () => {
    const isConnected = await isInternetAvailable();
    if (isFocused && isConnected) {
      getListApi();
    }
  };

  useEffect(() => {
    const newArr = [...Issue];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = false;
    }
    useToggleAll(false);
    filterList();
  }, [selectedStatus]);

  const filterData = async status => {
    let todayDate = moment(new Date()).format("YYYY-MM-DD");
    updateFilterListData(copyOfIssue);
    if (status) {
      const ApprovedArray = filterListData.filter(value => {
        //let dateCondition = value.CreationDate[0].slice(0, 10) === todayDate;
        if (status != "SecondApproval") {
          return value.IssueStatus[0] == status; //&& dateCondition;
        } else {
          let currentStatus = value.IssueStatus[0];

          return currentStatus === status; //&& currentStatusDate == todayDate;
        }
      });
      updateIssue(ApprovedArray);
    }
  };

  const filterList = async () => {
    switch (selectedStatus) {
      case "ALL":
        return updateIssue(copyOfIssue);
      case "SELECT FILTER":
        return updateIssue(copyOfIssue);
      default:
        return filterData(selectedStatus);
    }
  };

  const getListApi = async () => {
    await IssueStore.getIssueList(authStore.userData[0].LoginName, authStore.userData[0].Password);

    if (IssueStore.responseSuccess) {
      let i = 0;
      const arr = IssueStore.getListData;

      let statusDataArr = [
        { label: "ALL", value: "ALL" },
        { label: "Resolved", value: "Resolved" },
      ];
      let tempArr = [];
      for (i = 0; i < arr.length; i++) {
        Object.assign(arr[i], { check: false });
        let statusIsPresent = _.indexOf(tempArr, arr[i].IssueStatus[0], 0);
        if (statusIsPresent == -1 && arr[i].IssueStatus[0] != "Resolved") {
          tempArr.push(arr[i].IssueStatus[0]);
        }
      }
      for (let i = 0; i < tempArr.length; i++) {
        statusDataArr.push({ label: `${tempArr[i]}`, value: `${tempArr[i]}` });
      }
      updateStatusData(statusDataArr);
      updateIssue(arr);
      updataCopyOfIssue(arr);
      updateFilterListData(arr);
    }
  };

  const updateCheckBox = index => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newArr = [...Issue];
    let i = 0;
    let j;
    newArr[index].check = !newArr[index].check;
    for (j = 0; j < newArr.length; j++) {
      if (newArr[j].check) {
        i++;
      }
    }
    if (i == newArr.length) {
      useToggleAll(true);
    } else useToggleAll(false);
    updateIssue(newArr);
  };

  const updateAllCheckBox = isSelect => {
    const newArr = [...Issue];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = isSelect;
    }
    updateIssue(newArr);
    useToggleAll(!toggleAll);
  };

  const renderEmptyComponent = () => {
    return (
      <View>
        <Text style={LIST_EMPTY_TEXT} text={"No Data Found"} />
      </View>
    );
  };

  const getSelectedList = (): any[] => {
    const tempList = [];
    Issue.forEach(element => {
      if (element.check) {
        tempList.push(element);
      }
    });
    return tempList;
  };

  const isDuplicateRecord = (item): boolean => {
    const formno = item.FormCode[0];
    const selectedList = getSelectedList();
    let isDuplicate;
    for (const item of selectedList) {
      const formno1 = item.FormCode[0];
      if (formno1 === item.FormCode[0]) {
        isDuplicate = true;
      } else {
        return false;
      }
    }
    // const isDuplicate = selectedList.some(element => address === element.deliveryAddress[0].address[0])
    return isDuplicate;
  };

  const initNavigation = (): boolean => {
    let FormNo = "";
    let goAhead = false;
    const selectedList = getSelectedList();
    for (const item of selectedList) {
      if (isDuplicateRecord(item)) {
        goAhead = true;
        FormNo = FormNo + ", " + item.FormCode[0];
      } else {
        showAlert("Issue.duplicate");
        goAhead = false;
        return goAhead;
      }
    }
    if (goAhead) {
      const IssueDetail = selectedList[0];
      IssueDetail.FormCode[0] = FormNo.substring(1);
      IssueStore.setIssueDetail(IssueDetail);
    }
    return goAhead;
  };

  const onSuccessPress = () => {
    IssueStore.goingFromHome(false);
    const selectedList = getSelectedList();

    if (selectedList.length <= 1) {
      for (const item of selectedList) {
        IssueStore.IssueSearch(
          item.Id[0],
          authStore.userData[0].LoginName,
          authStore.userData[0].Password,
        );
        props.navigation.navigate("IssueList");
      }
    } else {
      showAlert("Issue.duplicate");
    }
  };

  const onFailPress = () => {
    IssueStore.goingFromHome(true);
    props.navigation.navigate("Home");
  };

  const hasListData = (): boolean => {
    const selectedList = getSelectedList();
    return selectedList.length > 0;
  };

  const renderItem = ({ item, index }) => {
    const IssueStatus = item.IssueStatus[0];
    const FormNo = item.FormNo[0];
    const ObjectName = item.ObjectName[0];
    const IssueID = item.Id[0];
    const IssueDate = item.IssueDate[0]; //.substring(0,10);
    const FullName = item.FullName[0];

    return (
      <View key={index} style={MAIN_CONTAINER}>
        <View style={CHECKBOX_VIEW}>
          <Checkbox
            tx="Issue.empty"
            outlineStyle={[CHECKBOX, { marginLeft: 5 }]}
            value={item.check}
            onToggle={() => {
              updateCheckBox(index);
            }}
            disabled={IssueStore.isLoading ? true : false}
          />
        </View>
        <View style={SUB_CONTAINER}>
          <View style={Issue_DETAIL}>
            {!authStore.IsTrader && (
              <View style={CONTINUE}>
                <Text style={textStyle} tx="IssueList.by" />
                <Text style={DISPATCH_STYLE} text={FullName ? FullName : " "} />
              </View>
            )}
          </View>
          <View style={Issue_DETAIL}>
            <View style={CONTINUE}>
              <Text style={textStyle} tx="Issue.code" />
              <Text style={ItemtextStyle} text={FormNo ? FormNo : " "} />
            </View>
            <View style={[CONTINUE, { alignItems: "flex-end" }]}>
              <Text style={textStyle} tx="Issue.issuestatus" />
              <Text style={DISPATCH_STYLE} text={IssueStatus ? IssueStatus : " "} />
            </View>
          </View>

          <View style={Issue_DETAIL}>
            <Text style={textStyle} tx="Issue.issueno" />
            <Text style={ItemtextStyle} text={IssueID ? IssueID : " "} />
            <Text style={textStyle} tx="Issue.ObjectName" />
            <Text style={ItemtextStyle} text={ObjectName ? ObjectName : " "} />
          </View>

          <View style={ADDRESS_VIEW}>
            <Text style={textStyle} tx="Issue.lastupdate" />
            <Text style={ItemtextStyle} text={IssueDate ? IssueDate : " "} />
          </View>
          <View
            style={[ADDRESS_VIEW, { flexDirection: "row", justifyContent: "space-between" }]}
          ></View>
        </View>
      </View>
    );
  };

  return (
    <Screen
      style={ROOT}
      statusBar={"dark-content"}
      statusBarColor={color.palette.white}
      wall={"whiteWall"}
      preset="fixed"
    >
      {IssueStore.isLoading && (
        <ActivityIndicator size="large" style={ACTIVITY_INDICATOR} color={color.palette.black} />
      )}
      <MenuButton title={"Issue.header"} onPress={handleDrawer} />
      <View style={SELECTALL_CHECKBOX}>
        <View>
          <Checkbox
            tx="Issue.empty"
            outlineStyle={CHECKBOX}
            value={toggleAll}
            onToggle={() => updateAllCheckBox(!toggleAll)}
            disabled={IssueStore.isLoading}
          />
        </View>
        <View style={[CONTINUE, { height: 40 }]}>
          <DropdownPicker
            placeHolder={"Issue.filter"}
            placeHolderValue={"SELECT FILTER"}
            disabled={IssueStore.isLoading}
            dropDownData={statusData}
            onValueChange={value => setStatus(value)}
            selectedValue={selectedStatus}
          />
        </View>
      </View>
      <View style={SEPERATOR_LINE} />
      <ScrollView>
        <FlatList
          data={Issue}
          style={FLATLIST_STYLE}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
        />
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        leftText={"Issue.detail"}
        rightText={"Issue.home"}
        leftDisabled={!hasListData()}
        rightDisabled={!hasListData()}
        onLeftPress={onSuccessPress}
        onRightPress={onFailPress}
      />
    </Screen>
  );
});
