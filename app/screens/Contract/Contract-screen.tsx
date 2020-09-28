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
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
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

export interface ContractProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const ROOT: ViewStyle = {
  paddingBottom: 10,
};
const CONTINUE: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
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
const Contract_DETAIL: ViewStyle = {
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

export const Contract: FunctionComponent<ContractProps> = observer(props => {
  const isFocused = useIsFocused();
  const { authStore, ContractStore } = useStores();
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);
  const [, useToggleAll] = useState(false);
  const [Contract, updateContract] = useState([]);
  const [filterListData, updateFilterListData] = useState([]);
  const [copyOfContract, updataCopyOfContract] = useState([]);
  const [selectedStatus, setStatus] = useState("");
  const [statusData, updateStatusData] = useState([]);
  const [searchValue, onSearchValue] = useState("16");
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
        ContractStore.refreshContractList();
        ContractStore.ContractSearch(authStore.authorization, searchValue);

        if (!(ContractStore.ContractList.length === 0)) {
          props.navigation.navigate("ContractList");
        }

        // console.log(aa);
      }
    }
  };

  useEffect(() => {
    ContractStore.refreshContractList();
    updateContract(ContractStore.ContractListData);
    setStatus("SELECT FILTER");
    callContractAPI();
  }, [isFocused]);

  const callContractAPI = async () => {
    const isConnected = await isInternetAvailable();
    if (isFocused && isConnected) {
      getListApi();
    }
  };

  useEffect(() => {
    const newArr = [...Contract];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = false;
    }
    useToggleAll(false);
    filterList();
  }, [selectedStatus]);

  const filterData = async status => {
    updateFilterListData(copyOfContract);
    if (status) {
      const ApprovedArray = filterListData.filter(value => {
        //let dateCondition = value.CreationDate[0].slice(0, 10) === todayDate;
        if (status != "SecondApproval") {
          return value.FlowStatusNameContract[0] == status; //&& dateCondition;
        } else {
          let currentStatus = value.FlowStatusNameContract[0];
          return currentStatus === status; //&& currentStatusDate == todayDate;
        }
      });
      updateContract(ApprovedArray);
    }
  };

  const filterList = async () => {
    switch (selectedStatus) {
      case "ALL":
        return updateContract(copyOfContract);
      case "SELECT FILTER":
        return updateContract(copyOfContract);
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
      ContractsByDate: {
        FromDate: sixMonthBeforeDate,
        ToDate: currentDate,
      },
    };

    await ContractStore.getContractList(authStore.authorization, getList);

    if (ContractStore.responseSuccess) {
      let i = 0;
      const arr = ContractStore.ContractListData;

      let statusDataArr = [
        { label: "ALL", value: "ALL" },
        { label: "Aprroved", value: "SecondApproval" },
      ];
      let tempArr = [];
      for (i = 0; i < arr.length; i++) {
        Object.assign(arr[i], { check: false });
        let statusIsPresent = _.indexOf(tempArr, arr[i].FlowStatusNameContract[0], 0);
        if (statusIsPresent == -1 && arr[i].FlowStatusNameContract[0] != "SecondApproval") {
          tempArr.push(arr[i].FlowStatusNameContract[0]);
        }
      }
      for (let i = 0; i < tempArr.length; i++) {
        statusDataArr.push({ label: `${tempArr[i]}`, value: `${tempArr[i]}` });
      }
      updateStatusData(statusDataArr);
      updateContract(arr);
      updataCopyOfContract(arr);
      updateFilterListData(arr);
    }
  };

  const updateCheckBox = index => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newArr = [...Contract];
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
    updateContract(newArr);
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
    Contract.forEach(element => {
      if (element.check) {
        tempList.push(element);
      }
    });
    return tempList;
  };


  const onSuccessPress = () => {
    ContractStore.goingFromHome(false);
    const selectedList = getSelectedList();

    if (selectedList.length <= 1) {
      for (const item of selectedList) {
        ContractStore.ContractSearch(authStore.authorization, item.ContractCode[0]);

        ContractStore.refreshCommodityList();
        ContractStore.refreshPaymentMethodList();
        ContractStore.getContractCommodityList(authStore.authorization, item.ContractCode[0]);
        ContractStore.getContractPaymentMethodList(authStore.authorization, item.ContractCode[0]);

        const ContractDetail = item;

        const ContractCommDetail = ContractStore.ContractCommodityDetail;
        const ContractPMDetail = ContractStore.ContractPaymentMethodDetail;

        ContractStore.setContractDetail(ContractDetail);
        ContractStore.setContractCommodityDetail(ContractCommDetail);
        ContractStore.setContractPaymentMethodDetail(ContractPMDetail);
        props.navigation.navigate("ContractDetail");

        // props.navigation.navigate("ContractList");
      }
    } else {
      showAlert("Contract.duplicate");
    }
  };

  const onFailPress = () => {
    ContractStore.goingFromHome(true);
    props.navigation.navigate("Home");
  };

  const hasListData = (): boolean => {
    const selectedList = getSelectedList();
    return selectedList.length > 0;
  };

  const renderItem = ({ item, index }) => {
    const FlowStatusNameContract = item.FlowStatusNameContract[0];
    const ContractCode = item.ContractCode[0];
    const FullName = item.FullName[0];
    const ImporterName = item.ImporterName[0];
    const BankNameAR = item.BankNameAR[0];
    let currentStatusDate = item.CreationTime[0].substring(0, 10);
    return (
      <View key={index} style={MAIN_CONTAINER}>
        <View style={CHECKBOX_VIEW}>
          <Checkbox
            tx="Contract.empty"
            outlineStyle={[CHECKBOX, { marginLeft: 5 }]}
            value={item.check}
            onToggle={() => {
              updateCheckBox(index);
            }}
            disabled={ContractStore.isLoading ? true : false}
          />
        </View>

        <View style={SUB_CONTAINER}>
          <View style={Contract_DETAIL}>
            {!authStore.IsTrader && (
              <View style={CONTINUE}>
                <Text style={textStyle} tx="common.FullName" />
                <Text style={DISPATCH_STYLE} text={FullName ? FullName : " "} />
              </View>
            )}
          </View>
          <View style={Contract_DETAIL}>
            <View style={CONTINUE}>
              <Text style={textStyle} tx="ContractDetail.ContractCode" />
              <Text style={DISPATCH_STYLE} text={ContractCode ? ContractCode : " "} />
            </View>
            <View style={[CONTINUE, { alignItems: "flex-end" }]}>
              <Text style={textStyle} tx="ContractDetail.status" />
              <Text
                style={DISPATCH_STYLE}
                text={FlowStatusNameContract ? FlowStatusNameContract : " "}
              />
            </View>
          </View>
          <View style={ADDRESS_VIEW}>
            <Text style={textStyle} tx="ContractDetail.ImporterName" />
            <Text style={DISPATCH_STYLE} text={ImporterName ? ImporterName : " "} />
            <Text style={textStyle} tx="ContractDetail.BankNameAR" />
            <Text style={DISPATCH_STYLE} text={BankNameAR ? BankNameAR : " "} />
          </View>
          <View style={[ADDRESS_VIEW, { flexDirection: "row", justifyContent: "space-between" }]}>
            <Text style={textStyle} tx="ContractDetail.creationdate" />
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
      {ContractStore.isLoading && (
        <ActivityIndicator size="large" style={ACTIVITY_INDICATOR} color={color.palette.black} />
      )}
      <MenuButton title={"Contract.header"} onPress={handleDrawer} />
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
            placeHolder={"Contract.filter"}
            placeHolderValue={"SELECT FILTER"}
            disabled={ContractStore.isLoading}
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
            data={Contract}
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
        leftText={"Contract.detail"}
        rightText={"Contract.home"}
        leftDisabled={!hasListData()}
        rightDisabled={!hasListData()}
        onLeftPress={onSuccessPress}
        onRightPress={onFailPress}
      />
    </Screen>
  );
});
