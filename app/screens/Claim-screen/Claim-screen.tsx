import React, { FunctionComponent, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, View, FlatList, Platform, TextStyle, ActivityIndicator, Keyboard,ImageStyle ,Image,TouchableOpacity,ScrollView} from "react-native";
import { ParamListBase, useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { isIphoneX } from "react-native-iphone-x-helper";

// imports from components, themes and modals
import { Screen, Text, Checkbox,TextField } from "../../components";
import { color, typography } from "../../theme";
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { useStores } from "../../models/root-store";
import { isInternetAvailable, showAlert } from "../../utils/utils";
import moment from "moment";
import { DropdownPicker } from "../../components/dropdown-picker/Dropdown-picker";

import _ from "lodash";

export interface ClaimProps {
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
  padding:10,
  //marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 15 : 38,
  flexDirection: "row",
};
const Search_View: ViewStyle = {
  margin: 10,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 15 : 38,
  justifyContent:"space-evenly",
  //padding:10,
  marginRight:10,
  flexDirection: "row",
};
const Add_Request_Image: ImageStyle = {
  alignSelf: "center",
 
};

const Claim_DETAIL: ViewStyle = {
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

export const Claim: FunctionComponent<ClaimProps> = observer(props => {
  const isFocused = useIsFocused();
  const {authStore, ClaimStore } = useStores();
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);
  const [, useToggleAll] = useState(false);
  const [Claim, updateClaim] = useState([]);
  const [filterListData, updateFilterListData] = useState([]);
  const [copyOfClaim, updataCopyOfClaim] = useState([]);
  const [selectedStatus, setStatus] = useState('');
  const [statusData, updateStatusData] = useState([])
  const [searchValue, onSearchValue] = useState(ClaimStore.ClaimCode[0])
  const [isValidSearch, onValidSearch] = useState(true);
  const onSearchText = text => {
    onSearchValue(text);
    text ? onValidSearch(true) : onValidSearch(false);
  };

  const onGoPress = async () => {
    try {
      if (!searchValue) {
        onValidSearch(false);
      } else {
        const isConnected = await isInternetAvailable();
        if (isConnected) {
         
          
          Keyboard.dismiss();
       
          ClaimStore.ClaimSearch(authStore.authorization, searchValue);
  
          if (!(ClaimStore.ClaimList.length === 0) )
         
          {
           
            props.navigation.navigate("ClaimList");
          }
      
        
       
         // console.log(aa);
        }
      }
      
    } catch (error) {

      showAlert("common.generalerror");
      
    }
   
  };


  useEffect(() => {
    ClaimStore.refreshList();
    updateClaim(ClaimStore.getClaimListData);
    setStatus('SELECT FILTER');
    callClaimAPI();
  }, [isFocused]);

  const callClaimAPI = async () => {
    const isConnected = await isInternetAvailable();
    if (isFocused && isConnected) {
      getListApi();
    }
  };

  useEffect(() => {
    const newArr = [...Claim];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = false;
    }
    useToggleAll(false);
    filterList();
  }, [selectedStatus]);

  const filterData = async status => {
  try {
    updateFilterListData(copyOfClaim);
    if (status) {
      const ApprovedArray = filterListData.filter(value => {
        //let dateCondition = value.CreationDate[0].slice(0, 10) === todayDate;
        if (status != "PAID") {
          return value.ClaimStatus[0] == status ;//&& dateCondition;
        } else {
          let currentStatus =
            value.ClaimStatus[0];
         
          return currentStatus === status; //&& currentStatusDate == todayDate;
        }
      });
      updateClaim(ApprovedArray);
    }
    
  } catch (error) {
    showAlert("common.generalerror");
      
    
  }
 
    
  };


  const filterList = async () => {

    switch (selectedStatus) {
      case "ALL":
        return updateClaim(copyOfClaim);
      case 'SELECT FILTER':
        return updateClaim(copyOfClaim);
      default:
        return filterData(selectedStatus);
    }
  };

  const getListApi = async () => {
    try {

      const currentDate = moment(new Date()).format("YYYY-MM-DD");
    const sixMonthBeforeDate = moment(new Date())
      .subtract(70, "months")
      .format("YYYY-MM-DD");
    const getListRequest = {
      ClaimsByDate: {
        FromDate: sixMonthBeforeDate,
        ToDate: currentDate,
      },
    };
 
    await ClaimStore.getClaimList(authStore.authorization, getListRequest);
    
    if (ClaimStore.responseSuccess) {
      
      let i = 0;
      const arr = ClaimStore.getClaimListData;
      
      let statusDataArr = [
        { label: "ALL", value: "ALL" },
        { label: "PAID", value: "PAID" },
       
      ];
      let tempArr = [];
      for (i = 0; i < arr.length; i++) {
        Object.assign(arr[i], { check: false });
        let statusIsPresent = _.indexOf(tempArr, arr[i].ClaimStatus[0], 0);
        if (statusIsPresent == -1 && arr[i].ClaimStatus[0]!='PAID' ) {
          tempArr.push(arr[i].ClaimStatus[0]);
        }
      }
      for (let i = 0; i < tempArr.length; i++) {
        statusDataArr.push({ label: `${tempArr[i]}`, value: `${tempArr[i]}` });
      }
      updateStatusData(statusDataArr);
      updateClaim(arr);
      updataCopyOfClaim(arr);
      updateFilterListData(arr);
    }
      
    } catch (error) {

      showAlert("common.generalerror");
      
    }
    
  };
 
  const updateCheckBox = index => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newArr = [...Claim];
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
    updateClaim(newArr);
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
    Claim.forEach(element => {
      if (element.check) {
        tempList.push(element);
      }
    });
    return tempList;
  };




  const onSuccessPress = () => {

      ClaimStore.goingFromHome(false);
      const selectedList = getSelectedList();
      
      if (selectedList.length<=1)
      {
        for (const item of selectedList) {
              
          ClaimStore.ClaimSearch(authStore.authorization, item.FormCode[0]);
          const ClaimDetail = item
          const ImCommDetail = ClaimStore.ClaimCommodityDetail
          ClaimStore.setClaimDetail(ClaimDetail)
          ClaimStore.setClaimCommodityDetail(ImCommDetail)
          props.navigation.navigate("ClaimDetail")
         // props.navigation.navigate("ClaimList");
        }
       
      }
      else {
        showAlert("Claim.duplicate");
      }
  
   
  };

  const onFailPress = () => {
    try {
      ClaimStore.goingFromHome(true);
      props.navigation.navigate("Home");
      
    } catch (error) {
      showAlert("common.generalerror");
      
    }
 
     
   
  };

 

  const hasListData = (): boolean => {
    const selectedList = getSelectedList();
    return selectedList.length > 0;
  };

  const renderItem = ({ item, index }) => {
    const ClaimStatus = item.ClaimStatus[0];
    const FullName = item.FullName[0];
    const FormCode = item.FormCode[0];
    
    const ClaimRemaining = item.ClaimRemaining[0];
    const CommodityName = item.CommodityNameAR[0];
   
    let DueDate = item.DueDate[0].substring(0, 10);
    return (
      <View key={index} style={MAIN_CONTAINER}>
        <View style={CHECKBOX_VIEW}>
          <Checkbox
            tx="Claim.empty"
            outlineStyle={[CHECKBOX, { marginLeft: 5 }]}
            value={item.check}
            onToggle={() => {
              updateCheckBox(index);
            }}
            disabled={ClaimStore.isLoading ? true : false}
          />
        </View>
        <View style={SUB_CONTAINER}>
          <View style={Claim_DETAIL}>
          {!authStore.IsTrader && (<View style={CONTINUE}>
            <Text style={textStyle} tx="common.FullName" /> 
              <Text style={DISPATCH_STYLE} text={FullName ? FullName : " "} />
            </View>)}
          </View>
          <View style={Claim_DETAIL}>
            <View style={CONTINUE}>
            <Text style={textStyle} tx="ClaimDetail.FormCode" /> 
              <Text style={DISPATCH_STYLE} text={FormCode ? FormCode : " "} />
            </View>
            <View style={[CONTINUE, { alignItems: "flex-end" }]}>
            <Text style={textStyle} tx="ClaimDetail.claimstatus" /> 
              <Text style={DISPATCH_STYLE} text={ClaimStatus ? ClaimStatus : " "} />
            </View>
          </View>
          <View style={ADDRESS_VIEW}>
          <Text style={textStyle} tx="ClaimDetail.amountremain" /> 
            <Text style={DISPATCH_STYLE} text={ClaimRemaining ? ClaimRemaining : " "} />
            <Text style={textStyle} tx="ClaimDetail.Claimcommodity" /> 
            <Text style={DISPATCH_STYLE} text={CommodityName ? CommodityName : " "} />
          </View>
          <View style={[ADDRESS_VIEW, { flexDirection: "row", justifyContent: "space-between" }]}>
          <Text style={textStyle} tx="ClaimDetail.duedate" /> 
            <Text style={DISPATCH_STYLE} text={DueDate} />
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
      {ClaimStore.isLoading && (
        <ActivityIndicator size="large" style={ACTIVITY_INDICATOR} color={color.palette.black} />
      )}
      <MenuButton title={"Claim.header"} onPress={handleDrawer} />
      <View style={Search_View}>
        <View>
        <TouchableOpacity onPress={onGoPress}>
        <Image style={Add_Request_Image} source={icons.viewsmallrequest} />
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
            placeHolder={'Claim.filter'}
            placeHolderValue={'SELECT FILTER'}
            disabled={ClaimStore.isLoading}
            dropDownData={statusData}
            onValueChange={value => setStatus(value)}
            selectedValue={selectedStatus}
          />
        </View>
      </View>
      <View style={SEPERATOR_LINE} />
      <ScrollView>
      <FlatList
        data={Claim}
        style={FLATLIST_STYLE}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
      />
       </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        leftText={"Claim.detail"}
        rightText={"Claim.home"}
        leftDisabled={!hasListData()}
        rightDisabled={!hasListData()}
        onLeftPress={onSuccessPress}
        onRightPress={onFailPress}
      />
    </Screen>
   );
  });

