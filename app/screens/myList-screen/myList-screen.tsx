import React, { FunctionComponent, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, FlatList, Platform, TextStyle, ActivityIndicator } from "react-native"
import { ParamListBase, useIsFocused } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { isIphoneX } from 'react-native-iphone-x-helper'

// imports from components, themes and modals
import { Screen, Text, Checkbox } from "../../components"
import { color, typography } from "../../theme"
import { MenuButton } from "../../components/header/menu-button"
import { icons } from "../../components/icon/icons"
import { BottomButton } from "../../components/bottom-button/bottom-button"
import { useStores } from "../../models/root-store"
import { isInternetAvailable, showAlert } from "../../utils/utils"
import moment from "moment";
import { DropdownPicker } from "../../components/dropdown-picker/Dropdown-picker";
import _ from "lodash";
export interface MyListProps {
  navigation: NativeStackNavigationProp<ParamListBase>
};
const ROOT: ViewStyle = {
  paddingBottom: 10
}
const CONTINUE: ViewStyle = {
  flex: 1
}
const FLATLIST_STYLE: ViewStyle = {
  marginVertical: 10
}
const MAIN_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  marginBottom: 10
}
const CONSIGNMENT_DETAIL: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: "space-between",
  marginVertical: 5
}
const CHECKBOX_VIEW: ViewStyle = {
  justifyContent: "center",
  alignItems: 'center',
  marginLeft: 5
}
const SUB_CONTAINER: ViewStyle = {
  flex: 1,
  marginRight: 2,
  borderWidth: 1,
  padding: 3,
  backgroundColor: color.palette.listBG
}
const CHECKBOX: ViewStyle = {
  height: 25,
  width: 25,
  borderColor: color.palette.black
}
const SEPERATOR_LINE: ViewStyle = {
  height: 5,
  backgroundColor: color.palette.black,
  width: '95%',
  marginLeft: 10,
  borderRadius: 5
}
const SELECTALL_CHECKBOX: ViewStyle = {
  margin: 10,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 15 : 38,
  flexDirection: 'row'
}
const ADDRESS_VIEW: ViewStyle = {
  flex: 1,
  marginVertical: 5
}
const DISPATCH_STYLE: TextStyle = {
  color: color.palette.link,
  fontFamily: typography.secondary
}
const textStyle: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.secondary
}
const LIST_EMPTY_TEXT: TextStyle = {
  alignSelf: 'center',
  color: color.palette.darkText,
  fontFamily: typography.secondary,
  fontWeight: 'bold',
  fontSize: 20
}
const ACTIVITY_INDICATOR: ViewStyle = {
  position: 'absolute',
  top: "50%",
  alignSelf: "center"
}

export const MyList: FunctionComponent<MyListProps> = observer((props) => {
  const isFocused = useIsFocused();
  const { myListStore, authStore, consignmentStore } = useStores();
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation]);
  const [toggleAll, useToggleAll] = useState(false);
  const [mylist, updateMyList] = useState([]);
  const [filterListData, updateFilterListData] = useState([]);
  const [copyOfMyList, updataCopyOfMyList] = useState([]);
  const [selectedStatus, setStatus] = useState('ALL');
  const [statusData, updateStatusData] = useState([])

  useEffect(() => {
    myListStore.refreshList();
    updateMyList(myListStore.getListData);
    const isConnected = isInternetAvailable();
    if (isFocused && isConnected) {
      getListApi();
      setStatus('ALL');
    }
  }, [isFocused])

  useEffect(() => {
    const newArr = [...mylist];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = false;
    }
    useToggleAll(false);
    filterList();
  }, [selectedStatus]);

  const filterData = async (status) => {
    let todayDate = moment(new Date()).format('YYYY-MM-DD');
    updateFilterListData(copyOfMyList);
    if (status) {
      const deliveredArray = filterListData.filter((value) => {
        let dateCondition = value.expectedDeliveryDate[0].slice(0, 10) === todayDate;
        if (status == 'UNDELIVERED') {
          return ((value.currentFreightState[0] != 'Delivered') && dateCondition);
        }
        else {
          let currentStatus = value.freightStateHistory[value.freightStateHistory.length - 1].status[0];
          let currentStatusDate = value.freightStateHistory[value.freightStateHistory.length - 1].statusDateTime[0].slice(0, 10);
          return ((currentStatus === status) && currentStatusDate == todayDate);
        }
      })
      updateMyList(deliveredArray);
    }
  }

  const filterList = async () => {
    switch (selectedStatus) {
      case 'ALL':
        return updateMyList(copyOfMyList);
      default:
        return filterData(selectedStatus);
    }
  }

  const getListApi = async () => {
    const currentDate = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");
    const aMonthBeforeDate = moment(new Date()).subtract(1, "months").format("YYYY-MM-DDTHH:mm:ss");
    const getListRequest = {
      consignmentMatchingExportRequest: {
        fromDespatchDate: aMonthBeforeDate,
        toDespatchDate: currentDate,
      }
    }
    await myListStore.getList(authStore.authorization, getListRequest);
    if (myListStore.responseSuccess) {
      let i = 0; const arr = myListStore.getListData;
      let statusDataArr = [{ label: 'ALL', value: 'ALL' }, { label: 'UNDELIVERED TODAY', value: 'UNDELIVERED' }];
      let tempArr = [];
      for (i = 0; i < arr.length; i++) {
        Object.assign(arr[i], { check: false });
        let statusIsPresent = _.indexOf(tempArr, arr[i].currentFreightState[0], 0);
        if (statusIsPresent == -1) {
          tempArr.push(arr[i].currentFreightState[0]);
        }
      }
      for (let i = 0; i < tempArr.length; i++) {
        statusDataArr.push({ label: `${tempArr[i].toUpperCase()} TODAY`, value: `${tempArr[i]}` });
      }
      updateStatusData(statusDataArr);
      updateMyList(arr);
      updataCopyOfMyList(arr);
      updateFilterListData(arr);
    }
  }

  const updateCheckBox = (index) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newArr = [...mylist];
    let i = 0; let j;
    newArr[index].check = !newArr[index].check;
    for (j = 0; j < newArr.length; j++) {
      if (newArr[j].check) {
        i++;
      }
    }
    if (i == newArr.length) {
      useToggleAll(true)
    } else useToggleAll(false)
    updateMyList(newArr)
  }

  const updateAllCheckBox = (isSelect) => {
    const newArr = [...mylist];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = isSelect;
    }
    updateMyList(newArr);
    useToggleAll(!toggleAll);
  };

  const renderEmptyComponent = () => {
    return (
      <View>
        <Text style={LIST_EMPTY_TEXT} text={'No Data Found'} />
      </View>
    )
  }

  const getSelectedList = (): any[] => {
    const tempList = [];
    mylist.forEach(element => {
      if (element.check) {
        tempList.push(element);
      }
    })
    return tempList;
  }

  const isDuplicateRecord = (item): boolean => {
    const address = item.deliveryAddress[0].address[0];
    const selectedList = getSelectedList();
    let isDuplicate;
    for (const item of selectedList) {
      const address1 = item.deliveryAddress[0].address[0];
      if (address1.line1[0] === address.line1[0]) {
        isDuplicate = true;
      } else {
        return false;
      }
    }
    // const isDuplicate = selectedList.some(element => address === element.deliveryAddress[0].address[0])
    return isDuplicate;
  }

  const initNavigation = (): boolean => {
    let consignmentNumber = "";
    let goAhead = false;
    const selectedList = getSelectedList();
    for (const item of selectedList) {
      if (isDuplicateRecord(item)) {
        goAhead = true;
        consignmentNumber = consignmentNumber + ", " + item.consignmentNumber[0];
      } else {
        showAlert("myList.duplicate");
        goAhead = false;
        return goAhead
      }
    }
    if (goAhead) {
      const consignmentDetail = selectedList[0];
      consignmentDetail.consignmentNumber[0] = consignmentNumber.substring(1);
      consignmentStore.setConsignmentDetail(consignmentDetail);
    }
    return goAhead;
  }

  const onSuccessPress = () => {
    if (initNavigation()) {
      consignmentStore.goingFromHome(false)
      props.navigation.navigate("consignmentSuccess", { isSuccess: true });
    }
  }

  const onFailPress = () => {
    if (initNavigation()) {
      consignmentStore.goingFromHome(false)
      props.navigation.navigate("consignmentSuccess", { isSuccess: false });
    }
  }

  const hasListData = (): boolean => {
    const selectedList = getSelectedList();
    return selectedList.length > 0;
  }

  const renderItem = ({ item, index }) => {
    const freightState = item.currentFreightState[0];
    const consignmentNumber = item.consignmentNumber[0];
    const address = item.deliveryAddress[0].address[0];
    let currentStatusDate = item.freightStateHistory[item.freightStateHistory.length - 1].statusDateTime[0].slice(0, 10);
    return (
      <View key={index} style={MAIN_CONTAINER}>
        <View style={CHECKBOX_VIEW}>
          <Checkbox
            tx='MyList.empty'
            outlineStyle={[CHECKBOX, { marginLeft: 5 }]}
            value={item.check}
            onToggle={() => { updateCheckBox(index) }}
            disabled={myListStore.isLoading ? true : false}
          />
        </View>
        <View style={SUB_CONTAINER}>
          <View style={CONSIGNMENT_DETAIL}>
            <View style={CONTINUE}>
              <Text style={textStyle} text={consignmentNumber ? consignmentNumber : ' '} />
            </View>
            <View style={[CONTINUE, { alignItems: "flex-end" }]}>
              <Text style={DISPATCH_STYLE} text={freightState ? freightState : ' '} />
            </View>
          </View>
          <View style={ADDRESS_VIEW}>
            <Text style={textStyle} text={address.line1 ? address.line1[0] : ' '} />
            <Text style={textStyle} text={address.line2 ? address.line2[0] : ' '} />
          </View>
          <View style={[ADDRESS_VIEW, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={textStyle} text={`${address.town ? address.town[0] : ' '} ${address.state ? address.state[0] : ' '}`} />
            <Text style={DISPATCH_STYLE} text={currentStatusDate} />
          </View>
        </View>
      </View>
    )
  }

  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      {
        myListStore.isLoading &&
        <ActivityIndicator size='large' style={ACTIVITY_INDICATOR} color={color.palette.black} />
      }
      <MenuButton
        title={"myList.header"}
        onPress={handleDrawer} />
      <View style={SELECTALL_CHECKBOX}>
        <View>
          <Checkbox
            tx='myList.empty'
            outlineStyle={CHECKBOX}
            value={toggleAll}
            onToggle={() => updateAllCheckBox(!toggleAll)}
            disabled={myListStore.isLoading}
          />
        </View>
        <View style={CONTINUE}>
          <DropdownPicker
            placeHolder={'myList.filter'}
            disabled={myListStore.isLoading}
            dropDownData={statusData}
            onValueChange={(value) => setStatus(value)}
            selectedValue={selectedStatus}
          />
        </View>
      </View>
      <View style={SEPERATOR_LINE} />
      <FlatList
        data={mylist}
        style={FLATLIST_STYLE}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
      />
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        leftText={"myList.milestone"}
        rightText={"myList.exception"}
        leftDisabled={!hasListData()}
        rightDisabled={!hasListData()}
        onLeftPress={onSuccessPress}
        onRightPress={onFailPress} />
    </Screen>
  )
})
