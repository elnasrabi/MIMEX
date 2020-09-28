import { ParamListBase, useIsFocused } from "@react-navigation/native";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import moment from "moment";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageStyle,
  Keyboard,
  Platform,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
// imports from components, themes and modals
import { Checkbox, Screen, Text, TextField } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { DropdownPicker } from "../../components/dropdown-picker/Dropdown-picker";
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color, typography } from "../../theme";
import { isInternetAvailable, showAlert } from "../../utils/utils";

export interface ExFormProps {
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
const SELECTALL_CHECKBOX: ViewStyle = {
  marginTop: 20,
  padding: 10,
  //marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 15 : 38,
  flexDirection: "row",
};
const Add_Request_Image: ImageStyle = {
  alignSelf: "center",
};
const FLATLIST_View: ViewStyle = {
  margin: 10,
};
const Search_View: ViewStyle = {
  margin: 10,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 15 : 38,
  justifyContent: "space-evenly",
  //padding:10,
  marginRight: 10,
  flexDirection: "row",
};
const ExForm_DETAIL: ViewStyle = {
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

const ADDRESS_VIEW: ViewStyle = {
  flex: 1,
  marginVertical: 5,
};
const DISPATCH_STYLE: TextStyle = {
  color: color.palette.link,
  fontFamily: typography.secondary,
};
const textStyle: TextStyle = {
  color: color.palette.black,
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

export const ExForm: FunctionComponent<ExFormProps> = observer(props => {
  const isFocused = useIsFocused();
  const { authStore, ExFormStore } = useStores();
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);
  const [toggleAll, useToggleAll] = useState(false);
  const [ExForm, updateExForm] = useState([]);
  const [filterListData, updateFilterListData] = useState([]);
  const [copyOfExForm, updataCopyOfExForm] = useState([]);
  const [selectedStatus, setStatus] = useState("");
  const [statusData, updateStatusData] = useState([]);
  const [searchValue, onSearchValue] = useState("13");
  const [isValidSearch, onValidSearch] = useState(true);
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

        ExFormStore.ExFormSearch(authStore.authorization, searchValue);

        if (!(ExFormStore.ExFormList.length === 0)) {
          props.navigation.navigate("ExFormList");
        }

        // console.log(aa);
      }
    }
  };

  useEffect(() => {
    ExFormStore.refreshList();
    updateExForm(ExFormStore.getExListData);
    setStatus("SELECT FILTER");
    callExFormAPI();
  }, [isFocused]);

  const callExFormAPI = async () => {
    const isConnected = await isInternetAvailable();
    if (isFocused && isConnected) {
      getListApi();
    }
  };

  useEffect(() => {
    const newArr = [...ExForm];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = false;
    }
    useToggleAll(false);
    filterList();
  }, [selectedStatus]);

  const filterData = async status => {
    let todayDate = moment(new Date()).format("YYYY-MM-DD");
    updateFilterListData(copyOfExForm);
    if (status) {
      const ApprovedArray = filterListData.filter(value => {
        //let dateCondition = value.CreationDate[0].slice(0, 10) === todayDate;
        if (status != "SecondApproval") {
          return value.FlowStatusNameEX[0] == status; //&& dateCondition;
        } else {
          let currentStatus = value.FlowStatusNameEX[0];
          let currentStatusDate = value.CreationDate[0];
          return currentStatus === status; //&& currentStatusDate == todayDate;
        }
      });
      updateExForm(ApprovedArray);
    }
  };

  const filterList = async () => {
    switch (selectedStatus) {
      case "ALL":
        return updateExForm(copyOfExForm);
      case "SELECT FILTER":
        return updateExForm(copyOfExForm);
      default:
        return filterData(selectedStatus);
    }
  };

  const getListApi = async () => {
    const currentDate = moment(new Date()).format("YYYY-MM-DD");
    const sixMonthBeforeDate = moment(new Date())
      .subtract(3, "years")
      .format("YYYY-MM-DD");
    const getListRequest = {
      ExFormsByDate: {
        FromDate: sixMonthBeforeDate,
        ToDate: currentDate,
      },
    };

    await ExFormStore.getExList(authStore.authorization, getListRequest);

    if (ExFormStore.responseSuccess) {
      let i = 0;
      const arr = ExFormStore.getExListData;

      let statusDataArr = [
        { label: "ALL", value: "ALL" },
        { label: "Aprroved", value: "SecondApproval" },
      ];
      let tempArr = [];
      for (i = 0; i < arr.length; i++) {
        Object.assign(arr[i], { check: false });
        let statusIsPresent = _.indexOf(tempArr, arr[i].FlowStatusNameEX[0], 0);
        if (statusIsPresent == -1 && arr[i].FlowStatusNameEX[0] != "SecondApproval") {
          tempArr.push(arr[i].FlowStatusNameEX[0]);
        }
      }
      for (let i = 0; i < tempArr.length; i++) {
        statusDataArr.push({ label: `${tempArr[i]}`, value: `${tempArr[i]}` });
      }
      updateStatusData(statusDataArr);
      updateExForm(arr);
      updataCopyOfExForm(arr);
      updateFilterListData(arr);
    }
  };

  const updateCheckBox = index => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newArr = [...ExForm];
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
    updateExForm(newArr);
  };

  const updateAllCheckBox = isSelect => {
    const newArr = [...ExForm];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = isSelect;
    }
    updateExForm(newArr);
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
    ExForm.forEach(element => {
      if (element.check) {
        tempList.push(element);
      }
    });
    return tempList;
  };

  const isDuplicateRecord = (item): boolean => {
    const FormCode = item.FormCode[0];
    const selectedList = getSelectedList();
    let isDuplicate;
    for (const item of selectedList) {
      const FormCode1 = item.FormCode[0];
      if (FormCode1 === item.FormCode[0]) {
        isDuplicate = true;
      } else {
        return false;
      }
    }
    // const isDuplicate = selectedList.some(element => address === element.deliveryAddress[0].address[0])
    return isDuplicate;
  };

  const initNavigation = (): boolean => {
    let FormCode = "";
    let goAhead = false;
    const selectedList = getSelectedList();
    for (const item of selectedList) {
      if (isDuplicateRecord(item)) {
        goAhead = true;
        FormCode = FormCode + ", " + item.FormCode[0];
      } else {
        showAlert("ExForm.duplicate");
        goAhead = false;
        return goAhead;
      }
    }
    if (goAhead) {
      const ExFormDetail = selectedList[0];
      ExFormDetail.FormCode[0] = FormCode.substring(1);
      ExFormStore.setExFormDetail(ExFormDetail);
    }
    return goAhead;
  };

  const onSuccessPress = () => {
    ExFormStore.goingFromHome(false);
    const selectedList = getSelectedList();

    if (selectedList.length <= 1) {
      for (const item of selectedList) {
        ExFormStore.ExFormSearch(authStore.authorization, item.FormCode[0]);

        ExFormStore.refreshCommodityList();
        ExFormStore.getExCommodityList(authStore.authorization, item.FormCode[0]);
        const ExFormDetail = item;
        const ExCommDetail = ExFormStore.ExFormCommodityDetail;
        ExFormStore.setExFormDetail(ExFormDetail);
        ExFormStore.setExFormCommodityDetail(ExCommDetail);
        props.navigation.navigate("ExFormDetail");
        // props.navigation.navigate("ExFormList");
      }
    } else {
      showAlert("ExForm.duplicate");
    }
  };

  const onFailPress = () => {
    ExFormStore.goingFromHome(true);
    props.navigation.navigate("Home");
  };

  const hasListData = (): boolean => {
    const selectedList = getSelectedList();
    return selectedList.length > 0;
  };

  const renderItem = ({ item, index }) => {
    const FlowStatusNameEX = item.FlowStatusNameEX[0];
    const FormCode = item.FormCode[0];
    const Custom_Unit_Name_AR = item.Custom_Unit_Name_AR[0];
    const BankNameAR = item.BankNameAR[0];
    let currentStatusDate = item.CreationDate[0].substring(0, 10);
    const FullName = item.FullName[0];
    return (
      <View key={index} style={MAIN_CONTAINER}>
        <View style={CHECKBOX_VIEW}>
          <Checkbox
            tx="ExForm.empty"
            outlineStyle={[CHECKBOX, { marginLeft: 5 }]}
            value={item.check}
            onToggle={() => {
              updateCheckBox(index);
            }}
            disabled={ExFormStore.isLoading ? true : false}
          />
        </View>
        <View style={SUB_CONTAINER}>
          <View style={ExForm_DETAIL}>
            {!authStore.IsTrader && (
              <View style={CONTINUE}>
                <Text style={textStyle} tx="common.FullName" />
                <Text style={DISPATCH_STYLE} text={FullName ? FullName : " "} />
              </View>
            )}
          </View>
          <View style={ExForm_DETAIL}>
            <View style={CONTINUE}>
              <Text style={textStyle} tx="ExFormDetail.FormCode" />
              <Text style={DISPATCH_STYLE} text={FormCode ? FormCode : " "} />
            </View>
            <View style={[CONTINUE, { alignItems: "flex-end" }]}>
              <Text style={textStyle} tx="ExFormDetail.formstatus" />
              <Text style={DISPATCH_STYLE} text={FlowStatusNameEX ? FlowStatusNameEX : " "} />
            </View>
          </View>
          <View style={ADDRESS_VIEW}>
            <Text style={textStyle} tx="ExFormDetail.LoadingPortNameAr" />
            <Text style={DISPATCH_STYLE} text={Custom_Unit_Name_AR ? Custom_Unit_Name_AR : " "} />
            <Text style={textStyle} tx="ExFormDetail.BankNameAR" />
            <Text style={DISPATCH_STYLE} text={BankNameAR ? BankNameAR : " "} />
          </View>
          <View style={[ADDRESS_VIEW, { flexDirection: "row", justifyContent: "space-between" }]}>
            <Text style={textStyle} tx="ExFormDetail.creationdate" />
            <Text style={DISPATCH_STYLE} text={currentStatusDate} />
          </View>
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
      {ExFormStore.isLoading && (
        <ActivityIndicator size="large" style={ACTIVITY_INDICATOR} color={color.palette.black} />
      )}
      <MenuButton title={"ExForm.header"} onPress={handleDrawer} />
      <View style={Search_View}>
        <View>
          <TouchableOpacity onPress={onGoPress}>
            <Image style={Add_Request_Image} source={icons.viewsmallrequest} />
          </TouchableOpacity>
        </View>
        <View style={[CONTINUE, { height: 40 }]}>
          <TextField
            placeholderTx={"common.search"}
            errorTx={isValidSearch ? undefined : "common.enterSearch"}
            onChangeText={text => onSearchText(text)}
            value={searchValue}
          />
        </View>
      </View>
      <View style={SELECTALL_CHECKBOX}>
        <View style={[CONTINUE, { height: 40 }]}>
          <DropdownPicker
            placeHolder={"ExForm.filter"}
            placeHolderValue={"SELECT FILTER"}
            disabled={ExFormStore.isLoading}
            dropDownData={statusData}
            onValueChange={value => setStatus(value)}
            selectedValue={selectedStatus}
          />
        </View>
      </View>
      <View style={SEPERATOR_LINE} />
      <ScrollView>
        <FlatList
          data={ExForm}
          style={FLATLIST_STYLE}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
        />
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        leftText={"ExForm.detail"}
        rightText={"ExForm.home"}
        leftDisabled={!hasListData()}
        rightDisabled={!hasListData()}
        onLeftPress={onSuccessPress}
        onRightPress={onFailPress}
      />
    </Screen>
  );
});
