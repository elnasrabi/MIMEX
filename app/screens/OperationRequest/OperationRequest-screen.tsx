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

export interface OperationRequestProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const ROOT: ViewStyle = {
  paddingBottom: 10,
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
const CONTINUE: ViewStyle = {
  flex: 1,
};
const NewOperationStyle: ViewStyle = {
  padding: 10,
  paddingBottom: 10,
};
const OperationRequest_DETAIL: ViewStyle = {
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

export const OperationRequest: FunctionComponent<OperationRequestProps> = observer(props => {
  const isFocused = useIsFocused();
  const { authStore, OperationRequestStore } = useStores();
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);
  const [toggleAll, useToggleAll] = useState(false);
  const [OperationRequest, updateOperationRequest] = useState([]);
  const [filterListData, updateFilterListData] = useState([]);
  const [copyOfOperationRequest, updataCopyOfOperationRequest] = useState([]);
  const [selectedStatus, setStatus] = useState("");
  const [statusData, updateStatusData] = useState([]);
  const [searchValue, onSearchValue] = useState("27");
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
        OperationRequestStore.refreshOperationRequestList();
        OperationRequestStore.OperationSearch(authStore.authorization, searchValue);

        if (!(OperationRequestStore.OperationRequestList.length === 0)) {
          props.navigation.navigate("OperationRequestList");
        }

        // console.log(aa);
      }
    }
  };

  useEffect(() => {
    OperationRequestStore.refreshOperationRequestList();
    updateOperationRequest(OperationRequestStore.OperationRequestListData);
    setStatus("SELECT FILTER");
    callOperationRequestAPI();
  }, [isFocused]);

  const callOperationRequestAPI = async () => {
    const isConnected = await isInternetAvailable();
    if (isFocused && isConnected) {
      getListApi();
    }
  };

  useEffect(() => {
    const newArr = [...OperationRequest];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = false;
    }
    useToggleAll(false);
    filterList();
  }, [selectedStatus]);

  const filterData = async status => {
    let todayDate = moment(new Date()).format("YYYY-MM-DD");
    updateFilterListData(copyOfOperationRequest);
    if (status) {
      const ApprovedArray = filterListData.filter(value => {
        //let dateCondition = value.CreationDate[0].slice(0, 10) === todayDate;
        if (status != "SecondApproval") {
          return value.FlowStatusNameIMOperation[0] == status; //&& dateCondition;
        } else {
          let currentStatus = value.FlowStatusNameIMOperation[0];
          let currentStatusDate = value.CreationDate[0];
          return currentStatus === status; //&& currentStatusDate == todayDate;
        }
      });
      updateOperationRequest(ApprovedArray);
    }
  };

  const filterList = async () => {
    switch (selectedStatus) {
      case "ALL":
        return updateOperationRequest(copyOfOperationRequest);
      case "SELECT FILTER":
        return updateOperationRequest(copyOfOperationRequest);
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
      OperationRequestsByDate: {
        FromDate: sixMonthBeforeDate,
        ToDate: currentDate,
      },
    };

    await OperationRequestStore.getOperationRequestList(authStore.authorization, getListRequest);

    if (OperationRequestStore.responseSuccess) {
      let i = 0;
      const arr = OperationRequestStore.OperationRequestListData;

      let statusDataArr = [
        { label: "ALL", value: "ALL" },
        { label: "Aprroved", value: "SecondApproval" },
      ];
      let tempArr = [];
      for (i = 0; i < arr.length; i++) {
        Object.assign(arr[i], { check: false });
        let statusIsPresent = _.indexOf(tempArr, arr[i].FlowStatusNameIMOperation[0], 0);
        if (statusIsPresent == -1 && arr[i].FlowStatusNameIMOperation[0] != "SecondApproval") {
          tempArr.push(arr[i].FlowStatusNameIMOperation[0]);
        }
      }
      for (let i = 0; i < tempArr.length; i++) {
        statusDataArr.push({ label: `${tempArr[i]}`, value: `${tempArr[i]}` });
      }
      updateStatusData(statusDataArr);
      updateOperationRequest(arr);
      updataCopyOfOperationRequest(arr);
      updateFilterListData(arr);
    }
  };

  const updateCheckBox = index => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newArr = [...OperationRequest];
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
    updateOperationRequest(newArr);
  };

  const updateAllCheckBox = isSelect => {
    const newArr = [...OperationRequest];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = isSelect;
    }
    updateOperationRequest(newArr);
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
    OperationRequest.forEach(element => {
      if (element.check) {
        tempList.push(element);
      }
    });
    return tempList;
  };

  const isDuplicateRecord = (item): boolean => {
    const OperationRequestCode = item.OperationRequestCode[0];
    const selectedList = getSelectedList();
    let isDuplicate;
    for (const item of selectedList) {
      const OperationRequestCode1 = item.OperationRequestCode[0];
      if (OperationRequestCode1 === item.OperationRequestCode[0]) {
        isDuplicate = true;
      } else {
        return false;
      }
    }
    // const isDuplicate = selectedList.some(element => address === element.deliveryAddress[0].address[0])
    return isDuplicate;
  };

  const initNavigation = (): boolean => {
    let OperationRequestCode = "";
    let goAhead = false;
    const selectedList = getSelectedList();
    for (const item of selectedList) {
      if (isDuplicateRecord(item)) {
        goAhead = true;
        OperationRequestCode = OperationRequestCode + ", " + item.OperationRequestCode[0];
      } else {
        showAlert("OperationRequest.duplicate");
        goAhead = false;
        return goAhead;
      }
    }
    if (goAhead) {
      const OperationRequestDetail = selectedList[0];
      OperationRequestDetail.OperationRequestCode[0] = OperationRequestCode.substring(1);
      OperationRequestStore.setOperationDetail(OperationRequestDetail);
    }
    return goAhead;
  };

  const onSuccessPress = () => {
    OperationRequestStore.goingFromHome(false);
    const selectedList = getSelectedList();

    if (selectedList.length <= 1) {
      for (const item of selectedList) {
        OperationRequestStore.OperationSearch(
          authStore.authorization,
          item.OperationRequestCode[0],
        );
        OperationRequestStore.refreshCommodityList();
        OperationRequestStore.refreshPaymentMethodList();
        OperationRequestStore.getOperationRequestCommodityList(
          authStore.authorization,
          item.OperationRequestCode[0],
        );
        OperationRequestStore.getOperationRequestPaymentMethodList(
          authStore.authorization,
          item.OperationRequestCode[0],
        );

        const OperationRequestDetail = item;

        const OperationRequestCommDetail = OperationRequestStore.OperationRequestCommodityDetail;
        const OperationRequestPMDetail = OperationRequestStore.OperationRequestPaymentMethodDetail;

        OperationRequestStore.setOperationDetail(OperationRequestDetail);
        OperationRequestStore.setOperationRequestCommodityDetail(OperationRequestCommDetail);
        OperationRequestStore.setOperationRequestPaymentMethodDetail(OperationRequestPMDetail);

        props.navigation.navigate("OperationRequestDetail");

        // props.navigation.navigate("OperationRequestList");
      }
    } else {
      showAlert("OperationRequest.duplicate");
    }
  };

  const onFailPress = () => {
    OperationRequestStore.goingFromHome(true);
    props.navigation.navigate("Home");
  };

  const NewOperation = () => {
    // OperationRequestStore.goingFromHome(true);
    props.navigation.navigate("NewOperationRequest");
  };

  const hasListData = (): boolean => {
    const selectedList = getSelectedList();
    return selectedList.length > 0;
  };

  const renderItem = ({ item, index }) => {
    const FlowStatusNameIMOperation = item.FlowStatusNameIMOperation[0];
    const OperationRequestCode = item.OperationRequestCode[0];
    const ExporterName = item.ExporterName[0];
    const BankNameAR = item.BankNameAR[0];
    const FullName = item.FullName[0];

    let currentStatusDate = item.CreationTime[0].substring(0, 10);
    return (
      <View key={index} style={MAIN_CONTAINER}>
        <View style={CHECKBOX_VIEW}>
          <Checkbox
            tx="OperationRequest.empty"
            outlineStyle={[CHECKBOX, { marginLeft: 5 }]}
            value={item.check}
            onToggle={() => {
              updateCheckBox(index);
            }}
            disabled={OperationRequestStore.isLoading ? true : false}
          />
        </View>

        <View style={SUB_CONTAINER}>
          <View style={OperationRequest_DETAIL}>
            {!authStore.IsTrader && (
              <View style={CONTINUE}>
                <Text style={textStyle} tx="common.FullName" />
                <Text style={DISPATCH_STYLE} text={FullName ? FullName : " "} />
              </View>
            )}
          </View>
          <View style={OperationRequest_DETAIL}>
            <View style={CONTINUE}>
              <Text style={textStyle} tx="OperationRequestDetail.RequestCode" />
              <Text
                style={DISPATCH_STYLE}
                text={OperationRequestCode ? OperationRequestCode : " "}
              />
            </View>
            <View style={[CONTINUE, { alignItems: "flex-end" }]}>
              <Text style={textStyle} tx="OperationRequestDetail.requeststatus" />
              <Text
                style={DISPATCH_STYLE}
                text={FlowStatusNameIMOperation ? FlowStatusNameIMOperation : " "}
              />
            </View>
          </View>
          <View style={ADDRESS_VIEW}>
            <Text style={textStyle} tx="OperationRequestDetail.ExporterName" />
            <Text style={DISPATCH_STYLE} text={ExporterName ? ExporterName : " "} />
            <Text style={textStyle} tx="OperationRequestDetail.BankNameAR" />
            <Text style={DISPATCH_STYLE} text={BankNameAR ? BankNameAR : " "} />
          </View>
          <View style={[ADDRESS_VIEW, { flexDirection: "row", justifyContent: "space-between" }]}>
            <Text style={textStyle} tx="OperationRequestDetail.creationdate" />
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
      {OperationRequestStore.isLoading && (
        <ActivityIndicator size="large" style={ACTIVITY_INDICATOR} color={color.palette.black} />
      )}
      <MenuButton title={"OperationRequest.header"} onPress={handleDrawer} />
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
            placeHolder={"OperationRequest.filter"}
            placeHolderValue={"SELECT FILTER"}
            disabled={OperationRequestStore.isLoading}
            dropDownData={statusData}
            onValueChange={value => setStatus(value)}
            selectedValue={selectedStatus}
          />
        </View>
      </View>
      <View style={NewOperationStyle}>
        <TouchableOpacity onPress={() => NewOperation()}>
          <Text tx={"OperationRequest.newoperation"} style={DISPATCH_STYLE} />
        </TouchableOpacity>
      </View>
      <View style={SEPERATOR_LINE} />
      <ScrollView>
        <FlatList
          data={OperationRequest}
          style={FLATLIST_STYLE}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
        />
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        leftText={"OperationRequest.detail"}
        rightText={"OperationRequest.home"}
        leftDisabled={!hasListData()}
        rightDisabled={!hasListData()}
        onLeftPress={onSuccessPress}
        onRightPress={onFailPress}
      />
    </Screen>
  );
});
