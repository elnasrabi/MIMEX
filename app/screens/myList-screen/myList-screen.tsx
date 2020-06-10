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
import { boolean } from "mobx-state-tree/dist/internal"
import { DropdownPicker } from "../../components/dropdown-picker/Dropdown-picker";

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
  flexDirection: 'row',
  justifyContent: "space-between"
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
  const isFocused = useIsFocused()
  const { myListStore, authStore, consignmentStore } = useStores()
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])
  const [toggleAll, useToggleAll] = useState(false)
  const [mylist, updateMyList] = useState([])

  useEffect(() => {
    myListStore.refreshList()
    updateMyList(myListStore.getListData)
    const isConnected = isInternetAvailable()
    if (isFocused && isConnected) {
      getListApi()
    }
  }, [isFocused])

  const getListApi = async () => {
    const getListRequest = {
      consignmentMatchingExportRequest: {
        // fromDespatchDate: "2020-06-05T00:00:00",     for future release if needed specific date response
        // toDespatchDate: "2020-06-05T23:59:59",       for future release if needed specific date response
        myList: "true"
      }
    }
    await myListStore.getList(authStore.authorization, getListRequest)
    if (myListStore.responseSuccess) {
      let i = 0; const arr = myListStore.getListData
      for (i = 0; i < arr.length; i++) {
        Object.assign(arr[i], { check: false })
      }
      updateMyList(arr)
    }
  }

  const updateCheckBox = (index) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newArr = [...mylist]
    let i = 0; let j
    newArr[index].check = !newArr[index].check
    for (j = 0; j < newArr.length; j++) {
      if (newArr[j].check) {
        i++
      }
    }
    if (i == newArr.length) {
      useToggleAll(true)
    } else useToggleAll(false)
    updateMyList(newArr)
  }

  const updateAllCheckBox = (isSelect) => {
    const newArr = [...mylist]
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = isSelect
    }
    updateMyList(newArr)
    useToggleAll(!toggleAll)
  }

  const renderEmptyComponent = () => {
    return (
      <View>
        <Text style={LIST_EMPTY_TEXT} text={'No Data Found'} />
      </View>
    )
  }

  const getSelectedList = (): any[] => {
    const tempList = []
    mylist.forEach(element => {
      if (element.check) {
        tempList.push(element)
      }
    })
    return tempList
  }

  const isDuplicateRecord = (item): boolean => {
    const address = item.deliveryAddress[0].address[0]
    const selectedList = getSelectedList()
    let isDuplicate
    for (const item of selectedList) {
      const address1 = item.deliveryAddress[0].address[0]
      if (address1.line1[0] === address.line1[0]) {
        isDuplicate = true
      } else {
        return false
      }
    }
    // const isDuplicate = selectedList.some(element => address === element.deliveryAddress[0].address[0])
    return isDuplicate
  }

  const initNavigation = (): boolean => {
    let consignmentNumber = ""
    let goAhead = false
    const selectedList = getSelectedList()
    for (const item of selectedList) {
      if (isDuplicateRecord(item)) {
        goAhead = true
        consignmentNumber = consignmentNumber + ", " + item.consignmentNumber[0]
      } else {
        showAlert("myList.duplicate")
        goAhead = false
      }
    }
    if (goAhead) {
      const consignmentDetail = selectedList[0]
      consignmentDetail.consignmentNumber[0] = consignmentNumber.substring(1)
      consignmentStore.setConsignmentDetail(consignmentDetail)
    }
    return goAhead
  }

  const onSuccessPress = () => {
    if (initNavigation()) {
      props.navigation.navigate("consignmentSuccess", { isSuccess: true })
    }
  }
  const onFailPress = () => {
    if (initNavigation()) {
      props.navigation.navigate("consignmentSuccess", { isSuccess: false })
    }
  }

  const hasListData = (): boolean => {
    const selectedList = getSelectedList()
    return selectedList.length > 0
  }

  const renderItem = ({ item, index }) => {
    const freightState = item.currentFreightState[0]
    const consignmentNumber = item.consignmentNumber[0]
    const address = item.deliveryAddress[0].address[0]
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
              <Text style={textStyle} text={consignmentNumber} />
            </View>
            <View style={[CONTINUE, { alignItems: "flex-end" }]}>
              <Text style={DISPATCH_STYLE} text={freightState} />
            </View>
          </View>
          <View style={ADDRESS_VIEW}>
            <Text style={textStyle} text={address.line1[0]} />
            <Text style={textStyle} text={address.line2[0]} />
          </View>
          <View style={ADDRESS_VIEW}>
            <Text style={textStyle} text={`${address.town[0]} ${address.state[0]}`} />
          </View>
        </View>
      </View>
    )
  }

  const statusData = [
    { label: 'ALL', value: 'ALL' },
    { label: 'DESPATCHED', value: 'DESPATCHED' },
    { label: 'DELIVERED', value: 'DELIVERED' }
  ]
  const [selectedStatus, setStatus] = useState('ALL')
  const dateOrderData = [
    { label: 'ASCENDING', value: 'ASCENDING' },
    { label: 'DECENDING', value: 'DECENDING' }
  ]
  const [selectedDateOrder, setDateOrder] = useState('ASCENDING')
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
            disabled={myListStore.isLoading ? true : false}
          />
        </View>
        <View style={{ width: '40%' }}>
          <DropdownPicker
            dropDownData={statusData}
            placeHolder={"common.registrationId"}
            onValueChange={(value) => setStatus(value)}
            selectedValue={selectedStatus}
          />
        </View>
        <View style={{ width: '40%' }}>
          <DropdownPicker
            dropDownData={dateOrderData}
            placeHolder={"common.registrationId"}
            onValueChange={(value) => setDateOrder(value)}
            selectedValue={selectedDateOrder}
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
