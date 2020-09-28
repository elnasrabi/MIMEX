import { ParamListBase, useIsFocused } from "@react-navigation/native";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import moment from "moment";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ImageStyle, Keyboard, Platform, ScrollView, TextStyle, View, ViewStyle } from "react-native";
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


export interface OperationProps {
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
  padding:10,
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
  justifyContent:"space-evenly",
  //padding:10,
  marginRight:10,
  flexDirection: "row",
};
const CONTINUE: ViewStyle = {
  flex: 1,
};
const NewOperationStyle: ViewStyle = {
  padding:10,
  paddingBottom:10,
};
const Operation_DETAIL: ViewStyle = {
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

export const Operation: FunctionComponent<OperationProps> = observer(props => {
  const isFocused = useIsFocused();
  const {authStore, OperationStore } = useStores();
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);
  const [toggleAll, useToggleAll] = useState(false);
  const [Operation, updateOperation] = useState([]);
  const [filterListData, updateFilterListData] = useState([]);
  const [copyOfOperation, updataCopyOfOperation] = useState([]);
  const [selectedStatus, setStatus] = useState('');
  const [statusData, updateStatusData] = useState([])
  const [searchValue, onSearchValue] = useState("2124201802139")
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
        OperationStore.refreshOperationList();
        OperationStore.OperationSearch(authStore.authorization, searchValue);

        if (!(OperationStore.OperationList.length === 0) )
       
        {
          props.navigation.navigate("OperationList");
        }
    
      
     
       // console.log(aa);
      }
    }
  };

  useEffect(() => {
    OperationStore.refreshOperationList();
    updateOperation(OperationStore.OperationListData);
    setStatus('SELECT FILTER');
    callOperationAPI();
  }, [isFocused]);

  const callOperationAPI = async () => {
    const isConnected = await isInternetAvailable();
    if (isFocused && isConnected) {
      getListApi();
    }
  };

  useEffect(() => {
    const newArr = [...Operation];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = false;
    }
    useToggleAll(false);
    filterList();
  }, [selectedStatus]);

  const filterData = async status => {
    let todayDate = moment(new Date()).format("YYYY-MM-DD");
    updateFilterListData(copyOfOperation);
    if (status) {
      const ApprovedArray = filterListData.filter(value => {
        //let dateCondition = value.CreationDate[0].slice(0, 10) === todayDate;
        if (status != "SecondApproval") {
          return value.ExporterName[0] == status ;//&& dateCondition;
        } else {
          let currentStatus =
            value.ExporterName[0];
          let currentStatusDate = value.CreationDate[0];
          return currentStatus === status; //&& currentStatusDate == todayDate;
        }
      });
      updateOperation(ApprovedArray);
    }
  };

  const filterList = async () => {
    switch (selectedStatus) {
      case "ALL":
        return updateOperation(copyOfOperation);
      case 'SELECT FILTER':
        return updateOperation(copyOfOperation);
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
      OperationsByDate: {
        FromDate: sixMonthBeforeDate,
        ToDate: currentDate,
      },
    };
 
    await OperationStore.getOperationList(authStore.authorization,getList);
    
    if (OperationStore.responseSuccess) {
      
      let i = 0;
      const arr = OperationStore.OperationListData;
      
      let statusDataArr = [
        { label: "ALL", value: "ALL" },
        { label: "Aprroved", value: "SecondApproval" },
       
      ];
      let tempArr = [];
      for (i = 0; i < arr.length; i++) {
        Object.assign(arr[i], { check: false });
        let statusIsPresent = _.indexOf(tempArr, arr[i].ExporterName[0], 0);
        if (statusIsPresent == -1 && arr[i].ExporterName[0]!='SecondApproval' ) {
          tempArr.push(arr[i].ExporterName[0]);
        }
      }
      for (let i = 0; i < tempArr.length; i++) {
        statusDataArr.push({ label: `${tempArr[i]}`, value: `${tempArr[i]}` });
      }
      updateStatusData(statusDataArr);
      updateOperation(arr);
      updataCopyOfOperation(arr);
      updateFilterListData(arr);
    }
  };
 
  const updateCheckBox = index => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newArr = [...Operation];
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
    updateOperation(newArr);
  };

  const updateAllCheckBox = isSelect => {
    const newArr = [...Operation];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = isSelect;
    }
    updateOperation(newArr);
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
    Operation.forEach(element => {
      if (element.check) {
        tempList.push(element);
      }
    });
    return tempList;
  };

  const isDuplicateRecord = (item): boolean => {
    const OperationCode = item.OperationCode[0];
    const selectedList = getSelectedList();
    let isDuplicate;
    for (const item of selectedList) {
      const OperationCode1 = item.OperationCode[0];
      if (OperationCode1 === item.OperationCode[0]) {
        isDuplicate = true;
      } else {
        return false;
      }
    }
    // const isDuplicate = selectedList.some(element => address === element.deliveryAddress[0].address[0])
    return isDuplicate;
  };

  const initNavigation = (): boolean => {
    let OperationCode = "";
    let goAhead = false;
    const selectedList = getSelectedList();
    for (const item of selectedList) {
      if (isDuplicateRecord(item)) {
        goAhead = true;
        OperationCode = OperationCode + ", " + item.OperationCode[0];
      } else {
        showAlert("Operation.duplicate");
        goAhead = false;
        return goAhead;
      }
    }
    if (goAhead) {
      const OperationDetail = selectedList[0];
      OperationDetail.OperationCode[0] = OperationCode.substring(1);
      OperationStore.setOperationDetail(OperationDetail);
    }
    return goAhead;
  };

  const onSuccessPress = () => {

      OperationStore.goingFromHome(false);
      const selectedList = getSelectedList();
      
      if (selectedList.length<=1)
      {
        for (const item of selectedList) {
              
          OperationStore.OperationSearch(authStore.authorization, item.OperationCode[0]);
          OperationStore.refreshCommodityList();
    OperationStore.refreshPaymentMethodList();
   OperationStore.getOperationCommodityList(authStore.authorization,item.OperationCode[0])
   OperationStore.getOperationPaymentMethodList(authStore.authorization,item.OperationCode[0])

    const OperationDetail = item

    const OperationCommDetail = OperationStore.OperationCommodityDetail
    const OperationPMDetail = OperationStore.OperationPaymentMethodDetail

    OperationStore.setOperationDetail(OperationDetail)
    OperationStore.setOperationCommodityDetail(OperationCommDetail)
    OperationStore.setOperationPaymentMethodDetail(OperationPMDetail)

    props.navigation.navigate("OperationDetail")
       
         // props.navigation.navigate("OperationList");
        }
       
      }
      else {
        showAlert("Operation.duplicate");
      }
  
   
  };

  const onFailPress = () => {
 
      OperationStore.goingFromHome(true);
      props.navigation.navigate("Home");
   
  };

  const NewOperation = () => {
 
   // OperationStore.goingFromHome(true);
    props.navigation.navigate("NewOperation");
 
};

  const hasListData = (): boolean => {
    const selectedList = getSelectedList();
    return selectedList.length > 0;
  };

  const renderItem = ({ item, index }) => {
    const ExporterCountryName = item.ExporterCountryName[0];
    const OperationCode = item.OperationCode[0];
    const ExporterName = item.ExporterName[0];
    const BankNameAR = item.BankNameAR[0];
    const FullName = item.FullName[0];
    let currentStatusDate = item.CreationTime[0].substring(0, 10);
    return (
      <View key={index} style={MAIN_CONTAINER}>
       
        <View style={CHECKBOX_VIEW}>
          <Checkbox
            tx="Operation.empty"
            outlineStyle={[CHECKBOX, { marginLeft: 5 }]}
            value={item.check}
            onToggle={() => {
              updateCheckBox(index);
            }}
            disabled={OperationStore.isLoading ? true : false}
          />
        </View>
       
        <View style={SUB_CONTAINER}>
        <View style={Operation_DETAIL}>
          {!authStore.IsTrader && (<View style={CONTINUE}>
            <Text style={textStyle} tx="common.FullName" /> 
              <Text style={DISPATCH_STYLE} text={FullName ? FullName : " "} />
            </View>)}
          </View>
          <View style={Operation_DETAIL}>
            <View style={CONTINUE}>
            <Text style={textStyle} tx="OperationDetail.OperationCode" /> 
              <Text style={DISPATCH_STYLE} text={OperationCode ? OperationCode : " "} />
            </View>
            <View style={[CONTINUE, { alignItems: "flex-end" }]}>
            <Text style={textStyle} tx="OperationDetail.ExporterCountry" /> 
              <Text style={DISPATCH_STYLE} text={ExporterCountryName ? ExporterCountryName : " "} />
            </View>
          </View>
          <View style={ADDRESS_VIEW}>
          <Text style={textStyle} tx="OperationDetail.ExporterName" /> 
            <Text style={DISPATCH_STYLE} text={ExporterName ? ExporterName : " "} />
            <Text style={textStyle} tx="OperationDetail.BankNameAR" /> 
            <Text style={DISPATCH_STYLE} text={BankNameAR ? BankNameAR : " "} />
          </View>
          <View style={[ADDRESS_VIEW, { flexDirection: "row", justifyContent: "space-between" }]}>
          <Text style={textStyle} tx="OperationDetail.creationdate" /> 
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
      {OperationStore.isLoading && (
        <ActivityIndicator size="large" style={ACTIVITY_INDICATOR} color={color.palette.black} />
      )}
      <MenuButton title={"Operation.header"} onPress={handleDrawer} />
      <View style={Search_View}>
        <View>
        <TouchableOpacity onPress={onGoPress}>
        <Image style={Add__Image} source={icons.viewsmallrequest} />
        </TouchableOpacity>
        </View>
        <View style={[CONTINUE, { height: 40 }]}>
          <TextField
            placeholderTx={'common.search'}
            errorTx={isValidSearch ? undefined : "common.enterSearch"}
             onChangeText={text => onSearchText(text)}
            value={searchValue}
          />
        </View>
      </View>
      <View style={SELECTALL_CHECKBOX}>
        <View style={[CONTINUE, { height: 40 }]}>
          <DropdownPicker
            placeHolder={'Operation.filter'}
            placeHolderValue={'SELECT FILTER'}
            disabled={OperationStore.isLoading}
            dropDownData={statusData}
            onValueChange={value => setStatus(value)}
            selectedValue={selectedStatus}
          />
        </View>
      </View>
      <View style={SEPERATOR_LINE} />
      <ScrollView>
      <FlatList
        data={Operation}
        style={FLATLIST_STYLE}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
      />
       </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        leftText={"Operation.detail"}
        rightText={"Operation.home"}
        leftDisabled={!hasListData()}
        rightDisabled={!hasListData()}
        onLeftPress={onSuccessPress}
        onRightPress={onFailPress}
      />
     
    </Screen>
   );
  });

