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

export interface MaturitySettlementProps {
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
const FLATLIST_View: ViewStyle = {
  margin: 10,
};

const MaturitySettlement_DETAIL: ViewStyle = {
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

export const MaturitySettlement: FunctionComponent<MaturitySettlementProps> = observer(props => {
  const isFocused = useIsFocused();
  const { authStore, MaturitySettlementStore } = useStores();
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);
  const [toggleAll, useToggleAll] = useState(false);
  const [MaturitySettlement, updateMaturitySettlement] = useState([]);
  const [filterListData, updateFilterListData] = useState([]);
  const [copyOfMaturitySettlement, updataCopyOfMaturitySettlement] = useState([]);
  const [selectedStatus, setStatus] = useState("");
  const [statusData, updateStatusData] = useState([]);
  const [searchValue, onSearchValue] = useState(MaturitySettlementStore.MaturitySettlementCode[0]);
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

        MaturitySettlementStore.MaturitySettlementSearch(authStore.authorization, searchValue);

        if (!(MaturitySettlementStore.MaturitySettlementList.length === 0)) {
          props.navigation.navigate("MaturitySettlementList");
        }

        // console.log(aa);
      }
    }
  };

  useEffect(() => {
    MaturitySettlementStore.refreshList();
    updateMaturitySettlement(MaturitySettlementStore.MaturitySettlementList);
    setStatus("SELECT FILTER");
    callMaturitySettlementAPI();
  }, [isFocused]);

  const callMaturitySettlementAPI = async () => {
    const isConnected = await isInternetAvailable();
    if (isFocused && isConnected) {
      getListApi();
    }
  };

  useEffect(() => {
    const newArr = [...MaturitySettlement];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = false;
    }
    useToggleAll(false);
    filterList();
  }, [selectedStatus]);

  const filterData = async status => {
    let todayDate = moment(new Date()).format("YYYY-MM-DD");
    updateFilterListData(copyOfMaturitySettlement);
    if (status) {
      const ApprovedArray = filterListData.filter(value => {
        //let dateCondition = value.CreationDate[0].slice(0, 10) === todayDate;
        if (status != "PAID") {
          return value.FlowStatusNameIM[0] == status; //&& dateCondition;
        } else {
          let currentStatus = value.FlowStatusNameIM[0];
          let currentStatusDate = value.DueDate[0];
          return currentStatus === status; //&& currentStatusDate == todayDate;
        }
      });
      updateMaturitySettlement(ApprovedArray);
    }
  };

  const filterList = async () => {
    switch (selectedStatus) {
      case "ALL":
        return updateMaturitySettlement(copyOfMaturitySettlement);
      case "SELECT FILTER":
        return updateMaturitySettlement(copyOfMaturitySettlement);
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
      MaturitySettlementsByDate: {
        FromDate: sixMonthBeforeDate,
        ToDate: currentDate,
      },
    };

    await MaturitySettlementStore.getMaturitySettlementList(
      authStore.authorization,
      getListRequest,
    );

    if (MaturitySettlementStore.responseSuccess) {
      let i = 0;
      const arr = MaturitySettlementStore.MaturitySettlementList;

      let statusDataArr = [];
      let tempArr = [];
      for (i = 0; i < arr.length; i++) {
        Object.assign(arr[i], { check: false });
        let statusIsPresent = _.indexOf(tempArr, arr[i].FlowStatusNameIM[0], 0);
        if (statusIsPresent == -1 && arr[i].FlowStatusNameIM[0] != "PAID") {
          tempArr.push(arr[i].FlowStatusNameIM[0]);
        }
      }
      for (let i = 0; i < tempArr.length; i++) {
        statusDataArr.push({ label: `${tempArr[i]}`, value: `${tempArr[i]}` });
      }
      updateStatusData(statusDataArr);
      updateMaturitySettlement(arr);
      updataCopyOfMaturitySettlement(arr);
      updateFilterListData(arr);
    }
  };

  const updateCheckBox = index => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newArr = [...MaturitySettlement];
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
    updateMaturitySettlement(newArr);
  };

  const updateAllCheckBox = isSelect => {
    const newArr = [...MaturitySettlement];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = isSelect;
    }
    updateMaturitySettlement(newArr);
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
    MaturitySettlement.forEach(element => {
      if (element.check) {
        tempList.push(element);
      }
    });
    return tempList;
  };

  const isDuplicateRecord = (item): boolean => {
    const FormCode = item.FormCode[0];
    const MaturitySettlementCode = item.MaturitySettlementCode[0];
    const selectedList = getSelectedList();
    let isDuplicate;
    for (const item of selectedList) {
      const MaturitySettlementCode1 = item.MaturitySettlementCode[0];
      if (MaturitySettlementCode1 === item.MaturitySettlementCode[0]) {
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
        showAlert("MaturitySettlement.duplicate");
        goAhead = false;
        return goAhead;
      }
    }
    if (goAhead) {
      const MaturitySettlementDetail = selectedList[0];
      MaturitySettlementDetail.FormCode[0] = FormCode.substring(1);
      MaturitySettlementStore.setMaturitySettlementDetail(MaturitySettlementDetail);
    }
    return goAhead;
  };

  const onSuccessPress = () => {
    MaturitySettlementStore.goingFromHome(false);
    const selectedList = getSelectedList();

    if (selectedList.length <= 1) {
      for (const item of selectedList) {
        MaturitySettlementStore.MaturitySettlementSearch(
          authStore.authorization,
          item.MaturitySettlementCode[0],
        );
        const MaturitySettlementDetail = item;

        MaturitySettlementStore.setMaturitySettlementDetail(MaturitySettlementDetail);

        props.navigation.navigate("MaturitySettlementDetail");
        // props.navigation.navigate("MaturitySettlementList");
      }
    } else {
      showAlert("MaturitySettlement.duplicate");
    }
  };

  const onFailPress = () => {
    MaturitySettlementStore.goingFromHome(true);
    props.navigation.navigate("Home");
  };

  const hasListData = (): boolean => {
    const selectedList = getSelectedList();
    return selectedList.length > 0;
  };

  const renderItem = ({ item, index }) => {
    const FlowStatusNameIM = item.FlowStatusNameIM[0];
    const MaturitySettlementTypeDesc = item.MaturitySettlementTypeDesc[0];
    const MaturitySettlementCode = item.MaturitySettlementCode[0];
    const AmountUSD = item.AmountUSD[0];
    let FormCode = item.FormCode[0];

    return (
      <View key={index} style={MAIN_CONTAINER}>
        <View style={CHECKBOX_VIEW}>
          <Checkbox
            tx="MaturitySettlement.empty"
            outlineStyle={[CHECKBOX, { marginLeft: 5 }]}
            value={item.check}
            onToggle={() => {
              updateCheckBox(index);
            }}
            disabled={MaturitySettlementStore.isLoading ? true : false}
          />
        </View>
        <View style={SUB_CONTAINER}>
          <View style={MaturitySettlement_DETAIL}>
            <View style={CONTINUE}>
              <Text style={textStyle} tx="MaturitySettlementDetail.MaturitySettlementCode" />
              <Text
                style={DISPATCH_STYLE}
                text={MaturitySettlementCode ? MaturitySettlementCode : " "}
              />
            </View>
            <View style={[CONTINUE, { alignItems: "flex-end" }]}>
              <Text style={textStyle} tx="MaturitySettlementDetail.FlowStatusNameIM" />
              <Text style={DISPATCH_STYLE} text={FlowStatusNameIM ? FlowStatusNameIM : " "} />
            </View>
          </View>
          <View style={ADDRESS_VIEW}>
            <Text style={textStyle} tx="MaturitySettlementDetail.AmountUSD" />
            <Text style={DISPATCH_STYLE} text={AmountUSD ? AmountUSD : " "} />
            <Text style={textStyle} tx="MaturitySettlementDetail.MaturitySettlementType" />
            <Text
              style={DISPATCH_STYLE}
              text={MaturitySettlementTypeDesc ? MaturitySettlementTypeDesc : " "}
            />
          </View>
          <View style={[ADDRESS_VIEW, { flexDirection: "row", justifyContent: "space-between" }]}>
            <Text style={textStyle} tx="MaturitySettlementDetail.FormCode" />
            <Text style={DISPATCH_STYLE} text={FormCode} />
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
      {MaturitySettlementStore.isLoading && (
        <ActivityIndicator size="large" style={ACTIVITY_INDICATOR} color={color.palette.black} />
      )}
      <MenuButton title={"MaturitySettlement.header"} onPress={handleDrawer} />
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
            placeHolder={"MaturitySettlement.filter"}
            placeHolderValue={"SELECT FILTER"}
            disabled={MaturitySettlementStore.isLoading}
            dropDownData={statusData}
            onValueChange={value => setStatus(value)}
            selectedValue={selectedStatus}
          />
        </View>
      </View>
      <View style={SEPERATOR_LINE} />
      <ScrollView>
        <FlatList
          data={MaturitySettlement}
          style={FLATLIST_STYLE}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
        />
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        leftText={"MaturitySettlement.detail"}
        rightText={"MaturitySettlement.home"}
        leftDisabled={!hasListData()}
        rightDisabled={!hasListData()}
        onLeftPress={onSuccessPress}
        onRightPress={onFailPress}
      />
    </Screen>
  );
});
