import { ParamListBase, useIsFocused } from "@react-navigation/native";
// import RNFetchBlob from "rn-fetch-blob";
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

export interface DocumentProps {
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

const Document_DETAIL: ViewStyle = {
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

export const Document: FunctionComponent<DocumentProps> = observer(props => {
  const isFocused = useIsFocused();
  const { authStore, DocumentStore } = useStores();
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);
  const [toggleAll, useToggleAll] = useState(false);
  const [Document, updateDocument] = useState([]);
  const [filterListData, updateFilterListData] = useState([]);
  const [copyOfDocument, updataCopyOfDocument] = useState([]);
  const [selectedStatus, setStatus] = useState("");
  const [statusData, updateStatusData] = useState([]);
  const [searchValue, onSearchValue] = useState("1324201900499");
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

        DocumentStore.DocumentSearchByCode(authStore.authorization, searchValue);

        if (!(DocumentStore.DocumentList.length === 0)) {
          props.navigation.navigate("DocumentList");
        }

        // console.log(aa);
      }
    }
  };

  useEffect(() => {
    DocumentStore.refreshList();
    updateDocument(DocumentStore.getDocumentListData);
    setStatus("SELECT FILTER");
    callDocumentAPI();
  }, [isFocused]);

  const callDocumentAPI = async () => {
    const isConnected = await isInternetAvailable();
    if (isFocused && isConnected) {
      getListApi();
    }
  };

  useEffect(() => {
    const newArr = [...Document];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = false;
    }
    useToggleAll(false);
    filterList();
  }, [selectedStatus]);

  const filterData = async status => {
    let todayDate = moment(new Date()).format("YYYY-MM-DD");
    updateFilterListData(copyOfDocument);
    if (status) {
      const ApprovedArray = filterListData.filter(value => {
        //let dateCondition = value.CreationDate[0].slice(0, 10) === todayDate;
        if (status != "PAID") {
          return value.ObjectName[0] == status; //&& dateCondition;
        } else {
          let currentStatus = value.ObjectName[0];
          let currentStatusDate = value.DueDate[0];
          return currentStatus === status; //&& currentStatusDate == todayDate;
        }
      });
      updateDocument(ApprovedArray);
    }
  };

  const filterList = async () => {
    switch (selectedStatus) {
      case "ALL":
        return updateDocument(copyOfDocument);
      case "SELECT FILTER":
        return updateDocument(copyOfDocument);
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
      DocumentsByDate: {
        FromDate: sixMonthBeforeDate,
        ToDate: currentDate,
      },
    };

    await DocumentStore.getDocumentList(authStore.authorization, getListRequest);

    if (DocumentStore.responseSuccess) {
      let i = 0;
      const arr = DocumentStore.getDocumentListData;

      let statusDataArr = [{ label: "ALL", value: "ALL" }];
      let tempArr = [];
      for (i = 0; i < arr.length; i++) {
        Object.assign(arr[i], { check: false });
        let statusIsPresent = _.indexOf(tempArr, arr[i].ObjectName[0], 0);
        if (statusIsPresent == -1) {
          tempArr.push(arr[i].ObjectName[0]);
        }
      }
      for (let i = 0; i < tempArr.length; i++) {
        statusDataArr.push({ label: `${tempArr[i]}`, value: `${tempArr[i]}` });
      }
      updateStatusData(statusDataArr);
      updateDocument(arr);
      updataCopyOfDocument(arr);
      updateFilterListData(arr);
    }
  };

  const updateCheckBox = index => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newArr = [...Document];
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
    updateDocument(newArr);
  };

  const updateAllCheckBox = isSelect => {
    const newArr = [...Document];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = isSelect;
    }
    updateDocument(newArr);
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
    Document.forEach(element => {
      if (element.check) {
        tempList.push(element);
      }
    });
    return tempList;
  };

  const isDuplicateRecord = (item): boolean => {
    const DocumentCode = item.Id[0];

    const selectedList = getSelectedList();
    let isDuplicate;
    for (const item of selectedList) {
      const DocumentCode1 = item.Id[0];
      if (DocumentCode1 === item.Id[0]) {
        isDuplicate = true;
      } else {
        return false;
      }
    }
    // const isDuplicate = selectedList.some(element => address === element.deliveryAddress[0].address[0])
    return isDuplicate;
  };

  const initNavigation = (): boolean => {
    let DocumentCode = "";
    let goAhead = false;
    const selectedList = getSelectedList();
    for (const item of selectedList) {
      if (isDuplicateRecord(item)) {
        goAhead = true;
        DocumentCode = DocumentCode + ", " + item.DocumentCode[0];
      } else {
        showAlert("Document.duplicate");
        goAhead = false;
        return goAhead;
      }
    }
    if (goAhead) {
      const DocumentDetail = selectedList[0];
      DocumentDetail.DocumentCode[0] = DocumentCode.substring(1);

      DocumentStore.setDocumentDetail(DocumentDetail);
    }
    return goAhead;
  };

  const onSuccessPress = () => {
    DocumentStore.goingFromHome(false);
    const selectedList = getSelectedList();

    if (selectedList.length <= 1) {
      for (const item of selectedList) {
        DocumentStore.DocumentSearch(authStore.authorization, item.Id[0]);
        const DocumentDetail = item.DocumentData[0];
        const DocumentName = item.DocumentName[0];

        DocumentStore.setDocumentDetail(DocumentDetail);
        DocumentStore.setDocumentName(DocumentName);

        props.navigation.navigate("pdfViewer");
        // props.navigation.navigate("DocumentList");
      }
    } else {
      showAlert("Document.duplicate");
    }
  };

  const onFailPress = () => {
    DocumentStore.goingFromHome(true);
    props.navigation.navigate("UploadDocument");
  };

  const hasListData = (): boolean => {
    const selectedList = getSelectedList();
    return selectedList.length > 0;
  };

  const renderItem = ({ item, index }) => {
    const ObjectName = item.ObjectName[0];
    const DocumentCode = item.Code[0];
    const DocumentName = item.DocumentName[0];
    const DocumentDesc = item.DocumentDesc[0];
    const FullName = item.FullName[0];

    return (
      <View key={index} style={MAIN_CONTAINER}>
        <View style={CHECKBOX_VIEW}>
          <Checkbox
            tx="Document.empty"
            outlineStyle={[CHECKBOX, { marginLeft: 5 }]}
            value={item.check}
            onToggle={() => {
              updateCheckBox(index);
            }}
            disabled={DocumentStore.isLoading ? true : false}
          />
        </View>
        <View style={SUB_CONTAINER}>
          <View style={Document_DETAIL}>
            {!authStore.IsTrader && (
              <View style={CONTINUE}>
                <Text style={textStyle} tx="common.FullName" />
                <Text style={DISPATCH_STYLE} text={FullName ? FullName : " "} />
              </View>
            )}
          </View>
          <View style={Document_DETAIL}>
            <View style={CONTINUE}>
              <Text style={textStyle} tx="DocumentDetail.ObjectName" />
              <Text style={DISPATCH_STYLE} text={ObjectName ? ObjectName : " "} />
            </View>
            <View style={CONTINUE}>
              <Text style={textStyle} tx="DocumentDetail.DocumentCode" />
              <Text style={DISPATCH_STYLE} text={DocumentCode ? DocumentCode : " "} />
            </View>
          </View>
          <View style={Document_DETAIL}>
            <View style={CONTINUE}>
              <Text style={textStyle} tx="DocumentDetail.DocumentName" />
              <Text style={DISPATCH_STYLE} text={DocumentName ? DocumentName : " "} />
            </View>
          </View>
          <View style={Document_DETAIL}>
            <View style={CONTINUE}>
              <Text style={textStyle} tx="DocumentDetail.DocumentDesc" />
              <Text style={DISPATCH_STYLE} text={DocumentDesc ? DocumentDesc : " "} />
            </View>
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
      {DocumentStore.isLoading && (
        <ActivityIndicator size="large" style={ACTIVITY_INDICATOR} color={color.palette.black} />
      )}
      <MenuButton title={"Document.header"} onPress={handleDrawer} />
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
            placeHolder={"Document.filter"}
            placeHolderValue={"SELECT FILTER"}
            disabled={DocumentStore.isLoading}
            dropDownData={statusData}
            onValueChange={value => setStatus(value)}
            selectedValue={selectedStatus}
          />
        </View>
      </View>
      <View style={SEPERATOR_LINE} />
      <ScrollView>
        <FlatList
          data={Document}
          style={FLATLIST_STYLE}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
        />
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        leftText={"Document.detail"}
        rightText={"Document.upload"}
        leftDisabled={!hasListData()}
        //rightDisabled={!hasListData()}
        onLeftPress={onSuccessPress}
        onRightPress={onFailPress}
      />
    </Screen>
  );
});
