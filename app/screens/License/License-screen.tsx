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
  View,
  ViewStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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

export interface LicenseProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const ROOT: ViewStyle = {
  paddingBottom: 10,
};
const Add__Image: ImageStyle = {
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
const CONTINUE: ViewStyle = {
  flex: 1,
};
const NewLicenseStyle: ViewStyle = {
  padding: 10,
  paddingBottom: 10,
};
const FLATLIST_STYLE: ViewStyle = {
  marginVertical: 10,
};
const MAIN_CONTAINER: ViewStyle = {
  flexDirection: "row",
  marginBottom: 10,
};
const License_DETAIL: ViewStyle = {
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
  marginTop: 20,
  padding: 10,
  //marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 15 : 38,
  flexDirection: "row",
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

export const License: FunctionComponent<LicenseProps> = observer(props => {
  const isFocused = useIsFocused();
  const { authStore, LicenseStore } = useStores();
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);
  const [toggleAll, useToggleAll] = useState(false);
  const [License, updateLicense] = useState([]);
  const [filterListData, updateFilterListData] = useState([]);
  const [copyOfLicense, updataCopyOfLicense] = useState([]);
  const [selectedStatus, setStatus] = useState("");
  const [statusData, updateStatusData] = useState([]);
  const [searchValue, onSearchValue] = useState("17");
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
        LicenseStore.refreshLicenseList();
        LicenseStore.LicenseSearch(authStore.authorization, searchValue);

        if (!(LicenseStore.LicenseList.length === 0)) {
          props.navigation.navigate("LicenseList");
        }

        // console.log(aa);
      }
    }
  };

  useEffect(() => {
    LicenseStore.refreshLicenseList();
    updateLicense(LicenseStore.LicenseListData);
    setStatus("SELECT FILTER");
    callLicenseAPI();
  }, [isFocused]);

  const callLicenseAPI = async () => {
    const isConnected = await isInternetAvailable();
    if (isFocused && isConnected) {
      getListApi();
    }
  };

  useEffect(() => {
    const newArr = [...License];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = false;
    }
    useToggleAll(false);
    filterList();
  }, [selectedStatus]);

  const filterData = async status => {
    let todayDate = moment(new Date()).format("YYYY-MM-DD");
    updateFilterListData(copyOfLicense);
    if (status) {
      const ApprovedArray = filterListData.filter(value => {
        //let dateCondition = value.CreationDate[0].slice(0, 10) === todayDate;
        if (status != "SecondApproval") {
          return value.FlowStatusNameLicense[0] == status; //&& dateCondition;
        } else {
          let currentStatus = value.FlowStatusNameLicense[0];
          let currentStatusDate = value.CreationDate[0];
          return currentStatus === status; //&& currentStatusDate == todayDate;
        }
      });
      updateLicense(ApprovedArray);
    }
  };

  const filterList = async () => {
    switch (selectedStatus) {
      case "ALL":
        return updateLicense(copyOfLicense);
      case "SELECT FILTER":
        return updateLicense(copyOfLicense);
      default:
        return filterData(selectedStatus);
    }
  };

  const getListApi = async () => {
    const currentDate = moment(new Date()).format("YYYY-MM-DD");
    const sixMonthBeforeDate = moment(new Date())
      .subtract(3, "years")
      .format("YYYY-MM-DD");
    const getList = {
      LicensesByDate: {
        FromDate: sixMonthBeforeDate,
        ToDate: currentDate,
      },
    };

    await LicenseStore.getLicenseList(authStore.authorization, getList);

    if (LicenseStore.responseSuccess) {
      let i = 0;
      const arr = LicenseStore.LicenseListData;

      let statusDataArr = [
        { label: "ALL", value: "ALL" },
        { label: "Aprroved", value: "SecondApproval" },
      ];
      let tempArr = [];
      for (i = 0; i < arr.length; i++) {
        Object.assign(arr[i], { check: false });
        let statusIsPresent = _.indexOf(tempArr, arr[i].FlowStatusNameLicense[0], 0);
        if (statusIsPresent == -1 && arr[i].FlowStatusNameLicense[0] != "SecondApproval") {
          tempArr.push(arr[i].FlowStatusNameLicense[0]);
        }
      }
      for (let i = 0; i < tempArr.length; i++) {
        statusDataArr.push({ label: `${tempArr[i]}`, value: `${tempArr[i]}` });
      }
      updateStatusData(statusDataArr);
      updateLicense(arr);
      updataCopyOfLicense(arr);
      updateFilterListData(arr);
    }
  };

  const updateCheckBox = index => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newArr = [...License];
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
    updateLicense(newArr);
  };

  const updateAllCheckBox = isSelect => {
    const newArr = [...License];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = isSelect;
    }
    updateLicense(newArr);
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
    License.forEach(element => {
      if (element.check) {
        tempList.push(element);
      }
    });
    return tempList;
  };

  const isDuplicateRecord = (item): boolean => {
    const LicenseCode = item.LicenseCode[0];
    const selectedList = getSelectedList();
    let isDuplicate;
    for (const item of selectedList) {
      const LicenseCode1 = item.LicenseCode[0];
      if (LicenseCode1 === item.LicenseCode[0]) {
        isDuplicate = true;
      } else {
        return false;
      }
    }
    // const isDuplicate = selectedList.some(element => address === element.deliveryAddress[0].address[0])
    return isDuplicate;
  };

  const initNavigation = (): boolean => {
    let LicenseCode = "";
    let goAhead = false;
    const selectedList = getSelectedList();
    for (const item of selectedList) {
      if (isDuplicateRecord(item)) {
        goAhead = true;
        LicenseCode = LicenseCode + ", " + item.LicenseCode[0];
      } else {
        showAlert("License.duplicate");
        goAhead = false;
        return goAhead;
      }
    }
    if (goAhead) {
      const LicenseDetail = selectedList[0];
      LicenseDetail.LicenseCode[0] = LicenseCode.substring(1);
      LicenseStore.setLicenseDetail(LicenseDetail);
    }
    return goAhead;
  };

  const onSuccessPress = () => {
    LicenseStore.goingFromHome(false);
    const selectedList = getSelectedList();

    if (selectedList.length <= 1) {
      for (const item of selectedList) {
        LicenseStore.LicenseSearch(authStore.authorization, item.LicenseCode[0]);

        LicenseStore.refreshCommodityList();

        LicenseStore.getLicenseCommodityList(authStore.authorization, item.LicenseCode[0]);

        const LicenseDetail = item;

        const LicenseCommDetail = LicenseStore.LicenseCommodityDetail;

        LicenseStore.setLicenseDetail(LicenseDetail);
        LicenseStore.setLicenseCommodityDetail(LicenseCommDetail);

        props.navigation.navigate("LicenseDetail");

        // props.navigation.navigate("LicenseList");
      }
    } else {
      showAlert("License.duplicate");
    }
  };

  const onFailPress = () => {
    LicenseStore.goingFromHome(true);
    props.navigation.navigate("Home");
  };

  const NewLicense = () => {
    // LicenseStore.goingFromHome(true);
    props.navigation.navigate("NewLicense");
  };

  const hasListData = (): boolean => {
    const selectedList = getSelectedList();
    return selectedList.length > 0;
  };

  const renderItem = ({ item, index }) => {
    const FlowStatusNameLicense = item.FlowStatusNameLicense[0];
    const LicenseCode = item.LicenseCode[0];
    const FullName = item.FullName[0];
    const LicensePurposeNameAr = item.LicensePurposeNameAr[0];
    const BankNameAR = item.BankNameAR[0];
    let currentStatusDate = item.CreationTime[0].substring(0, 10);
    return (
      <View key={index} style={MAIN_CONTAINER}>
        <View style={CHECKBOX_VIEW}>
          <Checkbox
            tx="License.empty"
            outlineStyle={[CHECKBOX, { marginLeft: 5 }]}
            value={item.check}
            onToggle={() => {
              updateCheckBox(index);
            }}
            disabled={LicenseStore.isLoading ? true : false}
          />
        </View>

        <View style={SUB_CONTAINER}>
          <View style={License_DETAIL}>
            {!authStore.IsTrader && (
              <View style={CONTINUE}>
                <Text style={textStyle} tx="common.FullName" />
                <Text style={DISPATCH_STYLE} text={FullName ? FullName : " "} />
              </View>
            )}
          </View>
          <View style={License_DETAIL}>
            <View style={CONTINUE}>
              <Text style={textStyle} tx="LicenseDetail.LicenseCode" />
              <Text style={DISPATCH_STYLE} text={LicenseCode ? LicenseCode : " "} />
            </View>
            <View style={[CONTINUE, { alignItems: "flex-end" }]}>
              <Text style={textStyle} tx="LicenseDetail.status" />
              <Text
                style={DISPATCH_STYLE}
                text={FlowStatusNameLicense ? FlowStatusNameLicense : " "}
              />
            </View>
          </View>
          <View style={ADDRESS_VIEW}>
            <Text style={textStyle} tx="LicenseDetail.Purpose" />
            <Text style={DISPATCH_STYLE} text={LicensePurposeNameAr ? LicensePurposeNameAr : " "} />
            <Text style={textStyle} tx="LicenseDetail.BankNameAR" />
            <Text style={DISPATCH_STYLE} text={BankNameAR ? BankNameAR : " "} />
          </View>
          <View style={[ADDRESS_VIEW, { flexDirection: "row", justifyContent: "space-between" }]}>
            <Text style={textStyle} tx="LicenseDetail.creationdate" />
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
      {LicenseStore.isLoading && (
        <ActivityIndicator size="large" style={ACTIVITY_INDICATOR} color={color.palette.black} />
      )}
      <MenuButton title={"License.header"} onPress={handleDrawer} />
      <MenuButton title={"License.header"} onPress={handleDrawer} />
      <View style={Search_View}>
        <View>
          <TouchableOpacity onPress={onGoPress}>
            <Image style={Add__Image} source={icons.viewsmallrequest} />
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
            placeHolder={"License.filter"}
            placeHolderValue={"SELECT FILTER"}
            disabled={LicenseStore.isLoading}
            dropDownData={statusData}
            onValueChange={value => setStatus(value)}
            selectedValue={selectedStatus}
          />
        </View>
      </View>
      <View style={SEPERATOR_LINE} />
      <ScrollView>
        <View style={FLATLIST_View}>
          <FlatList
            data={License}
            style={FLATLIST_STYLE}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            ListEmptyComponent={renderEmptyComponent}
          />
        </View>
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        leftText={"License.detail"}
        rightText={"License.home"}
        leftDisabled={!hasListData()}
        rightDisabled={!hasListData()}
        onLeftPress={onSuccessPress}
        onRightPress={onFailPress}
      />
    </Screen>
  );
});
