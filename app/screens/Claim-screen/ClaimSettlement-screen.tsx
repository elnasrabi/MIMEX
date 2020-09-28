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
  ViewStyle
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

export interface ClaimSettlementProps {
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
const Search_View: ViewStyle = {
  margin: 10,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 15 : 38,
  justifyContent: "space-evenly",
  //padding:10,
  marginRight: 10,
  flexDirection: "row",
};
const Add_Request_Image: ImageStyle = {
  alignSelf: "center",
};

const ClaimSettlement_DETAIL: ViewStyle = {
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

export const ClaimSettlement: FunctionComponent<ClaimSettlementProps> = observer(props => {
  const isFocused = useIsFocused();
  const { authStore, ClaimSettlementStore } = useStores();
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);
  const [, useToggleAll] = useState(false);
  const [ClaimSettlement, updateClaimSettlement] = useState([]);
  const [filterListData, updateFilterListData] = useState([]);
  const [copyOfClaimSettlement, updataCopyOfClaimSettlement] = useState([]);
  const [selectedStatus, setStatus] = useState("");
  const [statusData, updateStatusData] = useState([]);
  const [searchValue, onSearchValue] = useState(ClaimSettlementStore.ClaimSettlementCode[0]);
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

        ClaimSettlementStore.ClaimSettlementSearch(authStore.authorization, searchValue);

        if (!(ClaimSettlementStore.ClaimSettlementList.length === 0)) {
          props.navigation.navigate("ClaimSettlementList");
        }

        // console.log(aa);
      }
    }
  };

  useEffect(() => {
    ClaimSettlementStore.refreshList();
    updateClaimSettlement(ClaimSettlementStore.getClaimSettlementListData);
    setStatus("SELECT FILTER");
    callClaimSettlementAPI();
  }, [isFocused]);

  const callClaimSettlementAPI = async () => {
    const isConnected = await isInternetAvailable();
    if (isFocused && isConnected) {
      getListApi();
    }
  };

  useEffect(() => {
    const newArr = [...ClaimSettlement];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = false;
    }
    useToggleAll(false);
    filterList();
  }, [selectedStatus]);

  const filterData = async status => {
    updateFilterListData(copyOfClaimSettlement);
    if (status) {
      const ApprovedArray = filterListData.filter(value => {
        //let dateCondition = value.CreationDate[0].slice(0, 10) === todayDate;
        if (status != "PAID") {
          return value.FlowStatusNameEX[0] == status; //&& dateCondition;
        } else {
          let currentStatus = value.FlowStatusNameEX[0];

          return currentStatus === status; //&& currentStatusDate == todayDate;
        }
      });
      updateClaimSettlement(ApprovedArray);
    }
  };

  const filterList = async () => {
    switch (selectedStatus) {
      case "ALL":
        return updateClaimSettlement(copyOfClaimSettlement);
      case "SELECT FILTER":
        return updateClaimSettlement(copyOfClaimSettlement);
      default:
        return filterData(selectedStatus);
    }
  };

  const getListApi = async () => {
    const currentDate = moment(new Date()).format("YYYY-MM-DD");
    const sixMonthBeforeDate = moment(new Date())
      .subtract(70, "months")
      .format("YYYY-MM-DD");
    const getListRequest = {
      ClaimSettlementsByDate: {
        FromDate: sixMonthBeforeDate,
        ToDate: currentDate,
      },
    };

    await ClaimSettlementStore.getClaimSettlementList(authStore.authorization, getListRequest);

    if (ClaimSettlementStore.responseSuccess) {
      let i = 0;
      const arr = ClaimSettlementStore.getClaimSettlementListData;

      let statusDataArr = [];
      let tempArr = [];
      for (i = 0; i < arr.length; i++) {
        Object.assign(arr[i], { check: false });
        let statusIsPresent = _.indexOf(tempArr, arr[i].FlowStatusNameEX[0], 0);
        if (statusIsPresent == -1 && arr[i].FlowStatusNameEX[0] != "PAID") {
          tempArr.push(arr[i].FlowStatusNameEX[0]);
        }
      }
      for (let i = 0; i < tempArr.length; i++) {
        statusDataArr.push({ label: `${tempArr[i]}`, value: `${tempArr[i]}` });
      }
      updateStatusData(statusDataArr);
      updateClaimSettlement(arr);
      updataCopyOfClaimSettlement(arr);
      updateFilterListData(arr);
    }
  };

  const updateCheckBox = index => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newArr = [...ClaimSettlement];
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
    updateClaimSettlement(newArr);
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
    ClaimSettlement.forEach(element => {
      if (element.check) {
        tempList.push(element);
      }
    });
    return tempList;
  };


  const onSuccessPress = () => {
    ClaimSettlementStore.goingFromHome(false);
    const selectedList = getSelectedList();

    if (selectedList.length <= 1) {
      for (const item of selectedList) {
        ClaimSettlementStore.ClaimSettlementSearch(
          authStore.authorization,
          item.ClaimSettlementCode[0],
        );
        const ClaimSettlementDetail = item;
        const ImCommDetail = ClaimSettlementStore.ClaimSettlementCommodityDetail;
        ClaimSettlementStore.setClaimSettlementDetail(ClaimSettlementDetail);
        ClaimSettlementStore.setClaimSettlementCommodityDetail(ImCommDetail);
        props.navigation.navigate("ClaimSettlementDetail");
        // props.navigation.navigate("ClaimSettlementList");
      }
    } else {
      showAlert("ClaimSettlement.duplicate");
    }
  };

  const onFailPress = () => {
    ClaimSettlementStore.goingFromHome(true);
    props.navigation.navigate("Home");
  };

  const hasListData = (): boolean => {
    const selectedList = getSelectedList();
    return selectedList.length > 0;
  };

  const renderItem = ({ item, index }) => {
    const FlowStatusNameEX = item.FlowStatusNameEX[0];
    const FullName = item.FullName[0];
    const FormCode = item.FormCode[0];
    const ClaimSettlementCode = item.ClaimSettlementCode[0];
    const DeductionUSD = item.DeductionUSD[0];
    let PaymentCode = item.PaymentCode[0];
    return (
      <View key={index} style={MAIN_CONTAINER}>
        <View style={CHECKBOX_VIEW}>
          <Checkbox
            tx="ClaimSettlement.empty"
            outlineStyle={[CHECKBOX, { marginLeft: 5 }]}
            value={item.check}
            onToggle={() => {
              updateCheckBox(index);
            }}
            disabled={ClaimSettlementStore.isLoading ? true : false}
          />
        </View>
        <View style={SUB_CONTAINER}>
          <View style={ClaimSettlement_DETAIL}>
            {!authStore.IsTrader && (
              <View style={CONTINUE}>
                <Text style={textStyle} tx="common.FullName" />
                <Text style={DISPATCH_STYLE} text={FullName ? FullName : " "} />
              </View>
            )}
          </View>
          <View style={ClaimSettlement_DETAIL}>
            <View style={CONTINUE}>
              <Text style={textStyle} tx="ClaimSettlementDetail.ClaimSettlementCode" />
              <Text style={DISPATCH_STYLE} text={ClaimSettlementCode ? ClaimSettlementCode : " "} />
            </View>
            <View style={[CONTINUE, { alignItems: "flex-end" }]}>
              <Text style={textStyle} tx="ClaimSettlementDetail.FlowStatusNameEX" />
              <Text style={DISPATCH_STYLE} text={FlowStatusNameEX ? FlowStatusNameEX : " "} />
            </View>
          </View>
          <View style={ADDRESS_VIEW}>
            <Text style={textStyle} tx="ClaimSettlementDetail.DeductionUSD" />
            <Text style={DISPATCH_STYLE} text={DeductionUSD ? DeductionUSD : " "} />
            <Text style={textStyle} tx="ClaimSettlementDetail.FormCode" />
            <Text style={DISPATCH_STYLE} text={FormCode ? FormCode : " "} />
          </View>
          <View style={[ADDRESS_VIEW, { flexDirection: "row", justifyContent: "space-between" }]}>
            <Text style={textStyle} tx="ClaimSettlementDetail.PaymentCode" />
            <Text style={DISPATCH_STYLE} text={PaymentCode} />
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
      {ClaimSettlementStore.isLoading && (
        <ActivityIndicator size="large" style={ACTIVITY_INDICATOR} color={color.palette.black} />
      )}
      <MenuButton title={"ClaimSettlement.header"} onPress={handleDrawer} />
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
            placeHolder={"ClaimSettlement.filter"}
            placeHolderValue={"SELECT FILTER"}
            disabled={ClaimSettlementStore.isLoading}
            dropDownData={statusData}
            onValueChange={value => setStatus(value)}
            selectedValue={selectedStatus}
          />
        </View>
      </View>
      <View style={SEPERATOR_LINE} />
      <ScrollView>
        <FlatList
          data={ClaimSettlement}
          style={FLATLIST_STYLE}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
        />
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        leftText={"ClaimSettlement.detail"}
        rightText={"ClaimSettlement.home"}
        leftDisabled={!hasListData()}
        rightDisabled={!hasListData()}
        onLeftPress={onSuccessPress}
        onRightPress={onFailPress}
      />
    </Screen>
  );
});
