import { date } from "@nozbe/watermelondb/decorators";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ImageStyle, Platform, TextStyle, View, ViewStyle } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
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
import { isInternetAvailable } from "../../utils/utils";

//import DateTimePicker from "react-native-modal-datetime-picker";

export interface NewOperationRequest {
  navigation: NativeStackNavigationProp<ParamListBase>;
  view?: viewTypes;
  data?: any;
  isFailView?: boolean;
}
const SUB_CONTAINER: ViewStyle = {
  marginBottom: 20,
};

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
const OperationRequest_VIEW: TextStyle = { flex: 1, color: color.palette.link };
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
export const NewOperationRequest: FunctionComponent<NewOperationRequest> = observer(props => {
  const { ImFormStore, OperationRequestStore, authStore, LookupStore } = useStores();

  const [isValidExporterName, setValidExporterName] = useState(true);
  const [ExporterName, onExporterName] = useState("Test");

  const [isValidDocArrivalDate, setValidDocArrivalDate] = useState(true);
  const [DocArrivalDate, onDocArrivalDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [isValidImportPurpose, setValidImportPurpose] = useState(true);
  const [ImportPurpose, onImportPurpose] = useState(1);

  const [isValidExporterCountry, setValidExporterCountry] = useState(true);
  const [ExporterCountry, onExporterCountry] = useState(1);

  const [isValidArrivalPort, setValidArrivalPort] = useState(true);
  const [ArrivalPort, onArrivalPort] = useState("Dubai");

  const [isValidTotalValue, setValidTotalValue] = useState(true);
  const [TotalValue, onTotalValue] = useState("5000");

  const [isValidCurrency, setValidCurrency] = useState(true);
  const [Currency, onCurrency] = useState(1);

  const [isValidBank, setValidBank] = useState(true);
  const [Bank, onBank] = useState(1);

  const [isValidBankBranch, setValidBankBranch] = useState(true);
  const [BankBranch, onBankBranch] = useState(1);

  const [BankBranchList, onBankBranchList] = useState([]);

  const [isValidShipingType, setValidShipingType] = useState(true);
  const [ShipingType, onShipingType] = useState(1);

  const [isValidCommodity, setValidCommodity] = useState(true);
  const initialCommodity = [{ code: 5050, Qty: 15 }];

  const commarr = [{ Name: "Peanuts", code: 5050, Qty: 15 }];
  let commQTY = "";
  let TempCommName = "";
  let TempCommCode = 0;
  const [Commodity, OnCommodity] = useState(initialCommodity);
  // initialValue.push(...allowedState);

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
  const [Notes, onNotes] = useState("Testing Api from app");

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
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = selectedDate => {
    return `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;
  };

  const PostDate = selectedDate => {
    return `${selectedDate.getDate()}-${
      monthNames[selectedDate.getMonth()]
    }-${selectedDate.getFullYear()}`;
  };
  const onDateChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    if (event.type == "set") {
      const currentDate = selectedDate || date;
      onDocArrivalDate(currentDate);
    } else {
    }
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

  const onChangeExporterName = text => {
    text ? setValidExporterName(true) : setValidExporterName(false);
    onExporterName(text);
  };

  const onChangeDocArrivalDate = text => {
    text ? setValidDocArrivalDate(true) : setValidDocArrivalDate(false);
    onDocArrivalDate(text);
  };

  const onChangeImportPurpose = text => {
    text ? setValidImportPurpose(true) : setValidImportPurpose(false);
    onImportPurpose(text.id);
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
  const onChangeExporterCountry = text => {
    text ? setValidExporterCountry(true) : setValidExporterCountry(false);
    onExporterCountry(text);
  };

  const onChangeShipingType = text => {
    text ? setValidShipingType(true) : setValidShipingType(false);
    onShipingType(text);
  };

  const onChangeNotes = text => {
    text ? setValidNotes(true) : setValidNotes(false);
    onNotes(text);
  };

  const UserType = authStore.userData[0].UserType;

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
    const userDataTemp = authStore.userData[0];
    let Operationobject =
      "{ImportPurpose:" +
      ImportPurpose +
      ",ExporterCountry:" +
      ExporterCountry +
      ",ExporterName:'" +
      ExporterName +
      "',DocArrivalDate:'" +
      PostDate(DocArrivalDate) +
      "',TotalValue:" +
      TotalValue +
      ",Currency:" +
      Currency +
      ",Bank:" +
      Bank +
      ",BankBranch:" +
      BankBranch +
      ",CBOSID:" +
      userDataTemp.CBOSID +
      ",Notes:'" +
      Notes +
      "',LoginName:'" +
      userDataTemp.LoginName +
      "'}";
    OperationRequestStore.setOperationObject(Operationobject);
    LookupStore.GetCommodity(authStore.authorization);
    // console.log(PostDate(DocArrivalDate))
    props.navigation.navigate("NewOperationRequestCommodity");
  };

  const renderView = () => {
    if (!isBank) {
      return (
        <SafeAreaView>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={DETAIL_CONTAINER}>
              <View style={OperationRequest_VIEW}>
                <View style={DETAIL_VIEW}>
                  <Text tx={"OperationRequest.ExporterName"} style={[ITEM_LABEL]} />
                </View>
                <View style={TextFiled_VIEW}>
                  <TextField
                    inputStyle={TEXT_VALUE}
                    errorTx={isValidExporterName ? undefined : "OperationRequest.enterExporterName"}
                    onChangeText={text => onChangeExporterName(text)}
                    value={ExporterName}
                  />
                </View>

                <View style={DETAIL_VIEW}>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={DocArrivalDate}
                      mode="date"
                      display="default"
                      onChange={onDateChange}
                    />
                  )}
                </View>
                <View style={TextFiled_VIEW}>
                  <TouchableOpacity style={TextFiled_VIEW} onPress={() => setShow(true)}>
                    <Text tx={"OperationRequest.DocArrivalDate"} style={[TextFiled_VIEW]} />
                    <View style={DETAIL_VIEW}>
                      <Text style={[TEXT_VALUE]}>{formatDate(DocArrivalDate)}</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={DETAIL_VIEW}>
                  <Text tx={"OperationRequest.ImportPurpose"} style={[ITEM_LABEL]} />
                </View>

                <SafeAreaView style={TextFiled_VIEW}>
                  <SearchableDropdown
                    onTextChange={text => onChangeImportPurpose(text)}
                    //On text change listner on the searchable input
                    onItemSelect={item => onImportPurpose(item.id)}
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
                    items={LookupStore.ImportPurposeLookup}
                    //mapping of item array
                    defaultIndex={2}
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
                  <Text tx={"OperationRequest.ExporterCountry"} style={[ITEM_LABEL]} />
                </View>

                <SafeAreaView style={TextFiled_VIEW}>
                  <SearchableDropdown
                    onTextChange={text => onChangeExporterCountry(text)}
                    //On text change listner on the searchable input
                    onItemSelect={item => onExporterCountry(item.id)}
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
                    defaultIndex={2}
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
                  <Text tx={"OperationRequest.TotalValue"} style={[ITEM_LABEL]} />
                </View>
                <View style={TextFiled_VIEW}>
                  <TextField
                    inputStyle={TEXT_VALUE}
                    multiline
                    errorTx={isValidTotalValue ? undefined : "OperationRequest.enterTotalValue"}
                    onChangeText={text => onChangeTotalValue(text)}
                    value={TotalValue}
                  />
                </View>

                <View style={DETAIL_VIEW}>
                  <Text tx={"OperationRequest.Currency"} style={[ITEM_LABEL]} />
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
                    defaultIndex={2}
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
                  <Text tx={"OperationRequest.Bank"} style={[ITEM_LABEL]} />
                </View>

                <View style={TextFiled_VIEW}>
                  <DropdownPicker
                    dropDownData={LookupStore.BankDropDownList}
                    selectedValue={Bank}
                    placeHolder={"OperationRequest.Bank"}
                    onValueChange={value => {
                      onBank(value);
                      setValidBank(true);
                      onChangeBank(value);
                    }}
                  />
                </View>

                <View style={DETAIL_VIEW}>
                  <Text tx={"OperationRequest.BankBranch"} style={[ITEM_LABEL]} />
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
                    defaultIndex={2}
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
                  <Text tx={"OperationRequest.Notes"} style={[ITEM_LABEL]} />
                </View>
                <View style={TextFiled_VIEW}>
                  <IssueText
                    inputStyle={TEXT_VALUE}
                    multiline={true}
                    numberOfLines={5}
                    errorTx={isValidNotes ? undefined : "OperationRequest.enterNotes"}
                    onChangeText={text => onChangeNotes(text)}
                    value={Notes}
                  />
                </View>

                <View style={BOTTOM_VIEW}>
                  <BottomButton
                    leftImage={icons.blackButton2}
                    rightImage={icons.redButton2}
                    leftDisabled={isBank}
                    isLoadingLeft={ImFormStore.isButtonLoading}
                    leftText={"OperationRequest.continue"}
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
            <View style={OperationRequest_VIEW}></View>
          </View>
        </ScrollView>
      );
    } else {
      return true;
    }
  };
  return <View>{renderView()}</View>;
});
