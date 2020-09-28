import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import SearchableDropdown from "../../../node_modules/react-native-searchable-dropdown";
import { Text, TextField } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { DropdownPicker } from "../../components/dropdown-picker/Dropdown-picker";
import { icons } from "../../components/icon/icons";
import { IssueText } from "../../components/text-field/Issue-Text";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
import { isInternetAvailable, showAlert } from "../../utils/utils";

export interface UpdateContractRequest {
  navigation: NativeStackNavigationProp<ParamListBase>;
  view?: viewTypes;
  data?: any;
  isFailView?: boolean;
}
const SUB_CONTAINER: ViewStyle = {
  marginBottom: 20,
};
const ShippingTypeLookup = [
  { label: "كلي", value: "1" },
  { label: "جزئي", value: "2" },
];

const viewType = {
  Trader: "Trader",
  Bank: "Bank",
  CBOS: "CBOS",
};

const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 };

type viewTypes = keyof typeof viewType;

const DETAIL_CONTAINER: ViewStyle = {
  padding: 15,
  flexDirection: "row",
};

const CUSTOMER_CONTAINER: ViewStyle = {
  marginTop: 0,
  padding: 15,
  flexDirection: "row",
};
const DETAIL_VIEW: ViewStyle = { flexDirection: "row", marginTop: 15 };
const TextFiled_VIEW: ViewStyle = { flex: 1 };
const FIRE_BUTTON: ViewStyle = {
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginTop: 15,
};
const FLAT_LIST_View: ViewStyle = {
  flex: 1,
  backgroundColor: "#fff",
  width: "100%",
  borderWidth: 1,
};
const SPECIAL_ACTION_BUTTON: ViewStyle = {
  marginLeft: 5,
  justifyContent: "center",
  alignItems: "flex-end",
};
const ContractRequest_VIEW: TextStyle = { flex: 1, color: color.palette.link };
const ITEMS_VIEW: ViewStyle = { justifyContent: "flex-end", marginLeft: 5 };
const SPECIAL_ACTION: ImageStyle = { height: 100, width: 100 };
const ITEM_LABEL: TextStyle = { color: color.palette.darkText, marginEnd: 10 };
const FormNo_LABEL: TextStyle = { color: color.palette.red, marginEnd: 10 };
const CUSTOMER_VIEW: ViewStyle = {
  height: 50,
  backgroundColor: color.palette.toolbar,
  marginTop: 10,
  justifyContent: "center",
};
const TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "left",
  marginStart: 30,
};

const TEXT_VALUE: TextStyle = { color: color.palette.link };
const FormNo_VALUE: TextStyle = { color: color.palette.red };
let IsFinsished = false;
let isBank = true;
export const UpdateContractRequest: FunctionComponent<UpdateContractRequest> = observer(props => {
  const { ImFormStore, ContractRequestStore, authStore, LookupStore } = useStores();

  const ContractRequest = ContractRequestStore.ContractRequestDetail;

  const ContractRequestCommodity = ContractRequestStore.ContractRequestCommodityDetail;

  const [isValidImporterName, setValidImporterName] = useState(true);
  const [ImporterName, onImporterName] = useState(ContractRequest.ImporterName[0]);

  const [ContractRequestCode, onContractRequestCode] = useState(
    ContractRequest.ContractRequestCode[0],
  );

  const [isValidImporterAddress, setValidImporterAddress] = useState(true);
  const [ImporterAddress, onImporterAddress] = useState(ContractRequest.ImporterAddress[0]);

  const [isValidLoadingPort, setValidLoadingPort] = useState(true);
  const [LoadingPort, onLoadingPort] = useState(1);

  const [isValidDestination, setValidDestination] = useState(true);
  const [Destination, onDestination] = useState(+ContractRequest.CountryCode[0] - 1);

  const [isValidArrivalPort, setValidArrivalPort] = useState(true);
  const [ArrivalPort, onArrivalPort] = useState(ContractRequest.ArrivalPort[0]);

  const [isValidTotalValue, setValidTotalValue] = useState(true);
  const [TotalValue, onTotalValue] = useState(ContractRequest.TotalValue[0]);

  const [isValidCurrency, setValidCurrency] = useState(true);
  const [Currency, onCurrency] = useState(+ContractRequest.CurrencyCode[0] - 1);

  const [isValidBank, setValidBank] = useState(true);
  const [Bank, onBank] = useState(+ContractRequest.Bank[0]);

  const [isValidBankBranch, setValidBankBranch] = useState(true);

  const [BankBranchList, onBankBranchList] = useState([]);

  const [BankBranch, onBankBranch] = useState(0);

  const [isValidShipingType, setValidShipingType] = useState(true);
  const [ShipingType, onShipingType] = useState(+ContractRequest.ShipingTypeCode[0]);

  const [isValidCommodity, setValidCommodity] = useState(true);
  const initialCommodity = [{ code: 5050, Qty: 15 }];

  const commarr = [{ Name: "Peanuts", code: 5050, Qty: 15 }];
  let commQTY = "";
  let TempCommName = "";
  let TempCommCode = 0;
  const [Commodity, OnCommodity] = useState(initialCommodity);
  // initialValue.push(...allowedState);

  console.log(initialCommodity.length);
  // ****** BEGINNING OF CHANGE ******
  useEffect(() => {
    // Should not ever set state during rendering, so do this in useEffect instead.
    OnCommodity(commarr);
  }, []);
  useEffect(() => {
    // Should not ever set state during rendering, so do this in useEffect instead.
    OnCommodity(commarr);
  }, []);

  useEffect(() => {
    // Should not ever set state during rendering, so do this in useEffect instead.
    OnCommodityName(TempCommName);
  }, []);
  useEffect(() => {
    // Should not ever set state during rendering, so do this in useEffect instead.
    OnCommID(TempCommCode);
  }, []);

  const [isValidNotes, setValidNotes] = useState(true);
  const [Notes, onNotes] = useState(ContractRequest.Notes[0]);

  const [CommID, OnCommID] = useState(0);

  const [CommName, OnCommodityName] = useState("");

  const onChangeCommodity = Qty => {
    Qty ? setValidCommodity(true) : setValidCommodity(false);
    commQTY = Qty;
  };

  const onChangeCommodityName = text => {
    text ? setValidCommodity(true) : setValidCommodity(false);

    OnCommodityName(text);
  };

  const onChangeCommodityID = text => {
    text ? setValidCommodity(true) : setValidCommodity(false);

    OnCommID(text);
  };

  const onAddComm = Qty => {
    Qty ? setValidCommodity(true) : setValidCommodity(false);

    commarr.push({ Name: CommName, code: CommID, Qty: Qty });
    console.log("Name: " + CommName + "ID " + CommID + "QTY:" + Qty);
    console.log("comm arry", commarr);
  };

  const onChangeImporterName = text => {
    text ? setValidImporterName(true) : setValidImporterName(false);
    onImporterName(text);
  };

  const onChangeImporterAddress = text => {
    text ? setValidImporterAddress(true) : setValidImporterAddress(false);
    onImporterAddress(text);
  };

  const onChangeLoadingPort = text => {
    text ? setValidLoadingPort(true) : setValidLoadingPort(false);
    onLoadingPort(text.id);
  };

  const onChangeArrivalPort = text => {
    text ? setValidArrivalPort(true) : setValidArrivalPort(false);
    onArrivalPort(text);
  };

  const onChangeTotalValue = text => {
    text ? setValidTotalValue(true) : setValidTotalValue(false);
    onTotalValue(text);
  };
  const onChangeCurrency = text => {
    text ? setValidCurrency(true) : setValidCurrency(false);
    onCurrency(text);
  };
  const onChangeBank = text => {
    try {
      text ? setValidBank(true) : setValidBank(false);
      onBank(text);
    } catch (error) {}

    try {
      onBankBranchList(LookupStore.BranchLookup.filter(x => x.BankCode == text));
    } catch (error) {
      onBankBranchList(LookupStore.BranchLookup);
    }
  };
  const onChangeBankBranch = text => {
    text ? setValidBankBranch(true) : setValidBankBranch(false);
    onBankBranch(text);
  };
  const onChangeDestination = text => {
    text ? setValidDestination(true) : setValidDestination(false);
    onDestination(text);
  };

  const onChangeShipingType = text => {
    text ? setValidShipingType(true) : setValidShipingType(false);
    onShipingType(text);
  };

  const onChangeNotes = text => {
    text ? setValidNotes(true) : setValidNotes(false);
    onNotes(text);
  };

  const UserType = authStore.userData.UserType;

  const [initialElements, changeEl] = useState([]);

  const [exampleState, setExampleState] = useState([]);
  const [idx, incr] = useState(2);

  const addElement = () => {
    let newArray = [...initialElements, { id: idx, text: "Object " + (idx + 1) }];
    incr(idx + 1);
    console.log(initialElements.length);
    setExampleState(newArray);
    changeEl(newArray);
  };

  if (UserType === "Bank") {
    isBank = true;
    props.view = "Bank";
  } else {
    isBank = false;
    props.view = "Trader";
  }

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);
  const checkvlaue = () => {
    console.log("shipping type ID", ShipingType);
  };
  const onSave = async () => {
    let shouldGoHome = false;
    const isConnected = await isInternetAvailable(false);
    const userDataTemp = authStore.userData;
    let contractobject =
      "{ContractRequestCode:" +
      ContractRequest.ContractRequestCode[0] +
      ",LoadingPort:" +
      LoadingPort +
      ",Destination:" +
      Destination +
      ",ImporterName:'" +
      ImporterName +
      "',ImporterAddress:'" +
      ImporterAddress +
      "',ArrivalPort:'" +
      ArrivalPort +
      "',TotalValue:" +
      TotalValue +
      ",Currency:" +
      Currency +
      ",Bank:" +
      Bank +
      ",BankBranch:" +
      BankBranch +
      ",ShipingType:" +
      ShipingType +
      ",CBOSID:" +
      authStore.userData[0].CBOSID +
      ",Notes:'" +
      Notes +
      "',LoginName:'" +
      authStore.userData[0].LoginName +
      "'}";
    ContractRequestStore.setUpdateContractObject(contractobject);
    LookupStore.GetCommodity(authStore.authorization);
    ContractRequestStore.setContractRequestCommodityDetail(
      ContractRequestStore.getCommodityListData,
    );

    if (BankBranch !== 0) {
      props.navigation.navigate("UpdateContractRequestCommodity");
    } else {
      showAlert("ContractRequest.enterBankBranch");
    }
  };

  const renderView = () => {
    if (!isBank) {
      return (
        <SafeAreaView>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={DETAIL_CONTAINER}>
              <View style={ContractRequest_VIEW}>
                <View style={TextFiled_VIEW}>
                  <View style={DETAIL_VIEW}>
                    <Text tx={"ContractRequest.requestcode"} style={[ITEM_LABEL]} />
                  </View>
                  <TextField
                    inputStyle={TEXT_VALUE}
                    errorTx={isValidImporterName ? undefined : "ContractRequest.requestcode"}
                    editable={false}
                    defaultValue={ContractRequest.ContractRequestCode}
                    value={ContractRequestCode}
                  />
                </View>

                <View style={DETAIL_VIEW}>
                  <Text tx={"ContractRequest.ImporterName"} style={[ITEM_LABEL]} />
                </View>
                <View style={TextFiled_VIEW}>
                  <TextField
                    inputStyle={TEXT_VALUE}
                    errorTx={isValidImporterName ? undefined : "ContractRequest.enterImporterName"}
                    onChangeText={text => onChangeImporterName(text)}
                    defaultValue={ContractRequest.ImporterName[0]}
                    value={ImporterName}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text tx={"ContractRequest.ImporterAddress"} style={[ITEM_LABEL]} />
                </View>
                <View style={TextFiled_VIEW}>
                  <TextField
                    inputStyle={TEXT_VALUE}
                    errorTx={
                      isValidImporterAddress ? undefined : "ContractRequest.enterImporterAddress"
                    }
                    onChangeText={text => onChangeImporterAddress(text)}
                    defaultValue={ContractRequest.ImporterAddress}
                    value={ImporterAddress}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text tx={"ContractRequest.LoadingPort"} style={[ITEM_LABEL]} />
                </View>

                <SafeAreaView style={TextFiled_VIEW}>
                  <SearchableDropdown
                    onTextChange={text => onChangeLoadingPort(text)}
                    //On text change listner on the searchable input
                    onItemSelect={item => onLoadingPort(item.id)}
                    //onItemSelect called after the selection from the dropdown
                    containerStyle={{ padding: 5 }}
                    //suggestion container style
                    textInputStyle={{
                      //inserted text style
                      padding: 12,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      backgroundColor: "#FAF7F6",
                    }}
                    itemStyle={{
                      //single dropdown item style
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: "#FAF9F8",
                      borderColor: "#bbb",
                      borderWidth: 1,
                    }}
                    itemTextStyle={{
                      //text style of a single dropdown item
                      color: color.palette.link,
                    }}
                    itemsContainerStyle={{
                      //items container style you can pass maxHeight
                      //to restrict the items dropdown hieght
                      maxHeight: "60%",
                    }}
                    items={LookupStore.LoadingPortLookup}
                    //mapping of item array
                    defaultIndex={ContractRequest.Custom_UnitPK[0]}
                    //default selected item index
                    placeholder="Select Value"
                    //place holder for the search input
                    resetValue={false}
                    //reset textInput Value with true and false state
                    underlineColorAndroid="transparent"
                    //To remove the underline from the android input
                  />
                </SafeAreaView>
                <View style={DETAIL_VIEW}>
                  <Text tx={"ContractRequest.Destination"} style={[ITEM_LABEL]} />
                </View>

                <SafeAreaView style={TextFiled_VIEW}>
                  <SearchableDropdown
                    onTextChange={text => onChangeDestination(text)}
                    //On text change listner on the searchable input
                    onItemSelect={item => onDestination(item.id)}
                    //onItemSelect called after the selection from the dropdown
                    containerStyle={{ padding: 5 }}
                    //suggestion container style
                    textInputStyle={{
                      //inserted text style
                      padding: 12,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      backgroundColor: "#FAF7F6",
                    }}
                    itemStyle={{
                      //single dropdown item style
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: "#FAF9F8",
                      borderColor: "#bbb",
                      borderWidth: 1,
                    }}
                    itemTextStyle={{
                      //text style of a single dropdown item
                      color: color.palette.link,
                    }}
                    itemsContainerStyle={{
                      //items container style you can pass maxHeight
                      //to restrict the items dropdown hieght
                      maxHeight: "60%",
                    }}
                    items={LookupStore.CountryLookup}
                    //mapping of item array
                    defaultIndex={ContractRequest.CountryCode}
                    //default selected item index
                    placeholder="Select Value"
                    //place holder for the search input
                    resetValue={false}
                    //reset textInput Value with true and false state
                    underlineColorAndroid="transparent"
                    //To remove the underline from the android input
                  />
                </SafeAreaView>

                <View style={DETAIL_VIEW}>
                  <Text tx={"ContractRequest.ArrivalPort"} style={[ITEM_LABEL]} />
                </View>
                <View style={TextFiled_VIEW}>
                  <TextField
                    inputStyle={TEXT_VALUE}
                    multiline
                    errorTx={isValidArrivalPort ? undefined : "ContractRequest.enterArrivalPort"}
                    onChangeText={text => onChangeArrivalPort(text)}
                    value={ArrivalPort}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text tx={"ContractRequest.TotalValue"} style={[ITEM_LABEL]} />
                </View>
                <View style={TextFiled_VIEW}>
                  <TextField
                    inputStyle={TEXT_VALUE}
                    multiline
                    errorTx={isValidTotalValue ? undefined : "ContractRequest.enterTotalValue"}
                    onChangeText={text => onChangeTotalValue(text)}
                    defaultValue={ContractRequest.TotalValue}
                    value={TotalValue}
                  />
                </View>

                <View style={DETAIL_VIEW}>
                  <Text tx={"ContractRequest.Currency"} style={[ITEM_LABEL]} />
                </View>

                <SafeAreaView style={TextFiled_VIEW}>
                  <SearchableDropdown
                    onTextChange={text => onChangeCurrency(text)}
                    //On text change listner on the searchable input
                    onItemSelect={item => onCurrency(item.id)}
                    //onItemSelect called after the selection from the dropdown
                    containerStyle={{ padding: 5 }}
                    //suggestion container style
                    textInputStyle={{
                      //inserted text style
                      padding: 12,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      backgroundColor: "#FAF7F6",
                    }}
                    itemStyle={{
                      //single dropdown item style
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: "#FAF9F8",
                      borderColor: "#bbb",
                      borderWidth: 1,
                    }}
                    itemTextStyle={{
                      //text style of a single dropdown itemLoo
                      color: color.palette.link,
                    }}
                    itemsContainerStyle={{
                      //items container style you can pass maxHeight
                      //to restrict the items dropdown hieght
                      maxHeight: "60%",
                    }}
                    items={LookupStore.CurrencyLookup}
                    //mapping of item array
                    defaultIndex={+ContractRequest.CurrencyCode[0]}
                    //default selected item index
                    placeholder="Select Value"
                    //place holder for the search input
                    resetValue={false}
                    //reset textInput Value with true and false state
                    underlineColorAndroid="transparent"
                    //To remove the underline from the android input
                  />
                </SafeAreaView>

                <View style={DETAIL_VIEW}>
                  <Text tx={"ContractRequest.Bank"} style={[ITEM_LABEL]} />
                </View>

                <View style={TextFiled_VIEW}>
                  <DropdownPicker
                    dropDownData={LookupStore.BankDropDownList}
                    selectedValue={Bank}
                    placeHolder={"ContractRequest.Bank"}
                    onValueChange={value => {
                      onBank(value);
                      setValidBank(true);
                      onChangeBank(value);
                    }}
                  />
                </View>

                <View style={DETAIL_VIEW}>
                  <Text tx={"ContractRequest.BankBranch"} style={[ITEM_LABEL]} />
                </View>

                <SafeAreaView style={TextFiled_VIEW}>
                  <SearchableDropdown
                    onTextChange={text => onChangeBankBranch(text)}
                    //On text change listner on the searchable input
                    onItemSelect={item => onBankBranch(item.id)}
                    //onItemSelect called after the selection from the dropdown
                    containerStyle={{ padding: 5 }}
                    //suggestion container style
                    textInputStyle={{
                      //inserted text style
                      padding: 12,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      backgroundColor: "#FAF7F6",
                    }}
                    itemStyle={{
                      //single dropdown item style
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: "#FAF9F8",
                      borderColor: "#bbb",
                      borderWidth: 1,
                    }}
                    itemTextStyle={{
                      //text style of a single dropdown item
                      color: color.palette.link,
                    }}
                    itemsContainerStyle={{
                      //items container style you can pass maxHeight
                      //to restrict the items dropdown hieght
                      maxHeight: "60%",
                    }}
                    items={BankBranchList}
                    //mapping of item array
                    defaultIndex={1}
                    //default selected item index
                    placeholder="Tab to Search"
                    //place holder for the search input
                    resetValue={false}
                    //reset textInput Value with true and false state
                    underlineColorAndroid="transparent"
                    //To remove the underline from the android input
                  />
                </SafeAreaView>
                <View style={DETAIL_VIEW}>
                  <Text tx={"ContractRequest.ShipingType"} style={[ITEM_LABEL]} />
                </View>
                <View style={TextFiled_VIEW}>
                  <DropdownPicker
                    dropDownData={ShippingTypeLookup}
                    selectedValue={ShipingType}
                    placeHolder={"ContractRequest.ShipingType"}
                    onValueChange={value => {
                      onShipingType(value);
                      setValidShipingType(true);
                      onChangeShipingType(value);
                    }}
                  />
                </View>
                <View style={DETAIL_VIEW}>
                  <Text tx={"ContractRequest.Notes"} style={[ITEM_LABEL]} />
                </View>
                <View style={TextFiled_VIEW}>
                  <IssueText
                    inputStyle={TEXT_VALUE}
                    multiline={true}
                    numberOfLines={5}
                    errorTx={isValidNotes ? undefined : "ContractRequest.enterNotes"}
                    onChangeText={text => onChangeNotes(text)}
                    defaultValue={ContractRequest.Notes}
                    value={Notes}
                  />
                </View>

                <View style={BOTTOM_VIEW}>
                  <BottomButton
                    leftImage={icons.blackButton2}
                    rightImage={icons.redButton2}
                    leftDisabled={isBank}
                    isLoadingLeft={ImFormStore.isButtonLoading}
                    leftText={"ContractRequest.continue"}
                    rightText={"common.cancel"}
                    onRightPress={goBack}
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    onLeftPress={onSave}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else if (isBank) {
      return (
        <ScrollView>
          <View style={DETAIL_CONTAINER}>
            <View style={ContractRequest_VIEW}></View>
          </View>
        </ScrollView>
      );
    } else {
      return true;
    }
  };
  return <View>{renderView()}</View>;
});
