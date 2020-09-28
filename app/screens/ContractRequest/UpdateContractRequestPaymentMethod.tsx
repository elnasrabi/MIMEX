import { text } from "@nozbe/watermelondb/decorators";
import { ParamListBase, useIsFocused } from "@react-navigation/native";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ActivityIndicator, ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import SearchableDropdown from "../../../node_modules/react-native-searchable-dropdown";
import { Text, TextField } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
import { isInternetAvailable, showAlert } from "../../utils/utils";

export interface UpdateContractRequestPaymentMethod {
  navigation: NativeStackNavigationProp<ParamListBase>;
  view?: viewTypes;
  data?: any;
  isFailView?: boolean;
}
const CONTAINER: ViewStyle = {
  justifyContent: "center",
  paddingStart: 25,
  paddingEnd: 25,
};

const SUB_CONTAINER: ViewStyle = {
  marginBottom: 20,
};
const ShippingTypeLookup = [
  { label: "All", value: "1" },
  { label: "Partial", value: "2" },
];

const PaymentMethodLookup = [
  { label: "Camels", value: "2020" },
  { label: "Weat", value: "5060" },
];

const viewType = {
  Trader: "Trader",
  Bank: "Bank",
  CBOS: "CBOS",
};

const ACTIVITY_INDICATOR: ViewStyle = {
  position: "absolute",
  top: "50%",
  alignSelf: "center",
};

const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 };

type viewTypes = keyof typeof viewType;

const DETAIL_CONTAINER: ViewStyle = {
  padding: 15,
  flex: 1,
  marginTop: 25,
};

const CUSTOMER_CONTAINER: ViewStyle = {
  marginTop: 0,
  padding: 15,
  flexDirection: "row",
};
const DETAIL_VIEW: ViewStyle = { flex: 1, flexDirection: "row", marginTop: 15 };
const TextFiled_VIEW: ViewStyle = { flexDirection: "row", marginTop: 15 };
const FlatList_VIEW: ViewStyle = { flexDirection: "row", marginTop: 30 };
const FIRE_BUTTON: ViewStyle = {
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginTop: 15,
};
// const FLAT_LIST_View: ViewStyle = { flex: 1,
//     backgroundColor: '#fff',
//     width: '100%',
//     borderWidth: 1 };
const SPECIAL_ACTION_BUTTON: ViewStyle = {
  marginLeft: 5,
  justifyContent: "center",
  alignItems: "flex-end",
};
const ContractRequestPaymentMethod_VIEW: TextStyle = {
  flex: 1,
  color: color.palette.link,
  marginTop: 10,
};
const ITEMS_VIEW: ViewStyle = { justifyContent: "flex-end", marginLeft: 5 };

const FLATList_ITEMS_VIEW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginLeft: 5,
};
const SPECIAL_ACTION: ImageStyle = { height: 100, width: 100 };
const ITEM_LABEL: TextStyle = { color: color.palette.darkText, marginEnd: 10 };
const Add_PaymentMethod_LABEL: TextStyle = { color: color.palette.link, marginEnd: 10 };
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
const Delete_TEXT_VALUE: TextStyle = { color: color.palette.red };
const FormNo_VALUE: TextStyle = { color: color.palette.red };
let IsFinsished = false;
let isBank = true;
export const UpdateContractRequestPaymentMethod: FunctionComponent<UpdateContractRequestPaymentMethod> = observer(
  props => {
    const isFocused = useIsFocused();
    const { ContractRequestStore, authStore, LookupStore } = useStores();

    const ContractRequestPM = ContractRequestStore.getPaymentMethodListData;

    let PaymentMethodArry = [];

    let i = 0;
    for (i = 0; i < ContractRequestPM.length; i++) {
      let statusIsPresent = _.indexOf(
        PaymentMethodArry,
        ContractRequestPM[i].PaymentMethodNameAR[0],
        0,
      );
      if (statusIsPresent == -1) {
        PaymentMethodArry.push({
          PaymentMethodNameAR: ContractRequestPM[i].PaymentMethodNameAR[0],
          PaymentMethod: ContractRequestPM[i].PaymentMethodCode[0],
          Percentage: ContractRequestPM[i].Percentage[0],
        });
      }
    }

    const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
      props.navigation,
    ]);

    const [ExPaymentMethod, UpdateExPaymentMethod] = useState([]);
    const [selectedPaymentMethod, setPaymentMethod] = useState("");

    const [isValidPaymentMethod, setValidPaymentMethod] = useState(true);
    const [isValidPercentage, setValidPercentage] = useState(false);
    const [Percentage, onPercentage] = useState("0");
    const [TotPercentage, onChangeTotPercentage] = useState(0);

    const [canlookup, setcanlookup] = useState(true);

    const [initialPaymentMethod, changeinits] = useState([]);
    const [PaymentMethodtoPost, setPaymentMethodtoPost] = useState(PaymentMethodArry);
    const [PaymentMethodList, setPaymentMethodList] = useState(PaymentMethodArry);

    let PMarr = [];
    let TotalPercentage = 0;

    const [isValidsearch, setValidsearch] = useState(true);

    const [searchValue, setSearchValue] = useState("");

    const [PaymentMethodCode, OnPaymentMethodCode] = useState(0);

    const [PaymentMethodName, OnPaymentMethodName] = useState("");

    const onChangePercentage = Percentage => {
      Percentage ? setValidPercentage(true) : setValidPercentage(false);
      //   Percentage = Percentage;
      onPercentage(Percentage);
    };

    const onChangePaymentMethodName = text => {
      text ? setValidPaymentMethod(true) : setValidPaymentMethod(false);
    };

    const onChangePaymentMethodID = item => {
      let paymentmethodname = item.name;
      let paymentmethodcode = item.id;

      text ? setValidPaymentMethod(true) : setValidPaymentMethod(false);

      OnPaymentMethodCode(paymentmethodcode);
      OnPaymentMethodName(paymentmethodname);
      let prcnt = PaymentMethodtoPost.reduce((a, b) => +a + +b.Percentage, 0);
      let remain = 100 - prcnt;
      onPercentage(remain.toString());
      if (isNaN(remain)) {
        setValidPercentage(false);
      } else {
        setValidPercentage(true);
      }
    };

    const callPaymentMethodAPI = async () => {
      const isConnected = await isInternetAvailable();
      if (isFocused) {
        UpdateExPaymentMethod(LookupStore.PaymentMethodLookup);
      }
    };

    useEffect(() => {
      //LookupStore.refreshPaymentMethodList();
      callPaymentMethodAPI();
    }, [isFocused]);

    const deleteitem = code => {
      console.log("pm to delete", code);
      const index = PaymentMethodtoPost.indexOf(code);
      if (index > -1) {
        PaymentMethodtoPost.splice(index, 1);
      }
      const index2 = PaymentMethodList.indexOf(code);
      if (index2 > -1) {
        PaymentMethodList.splice(index, 1);
      }
      const filteredData = PaymentMethodtoPost.filter(item => item.PaymentMethodCode !== code);

      let prcnt = PaymentMethodtoPost.reduce((a, b) => +a + +b.Percentage, 0);

      onChangeTotPercentage(prcnt);

      setPaymentMethodtoPost(filteredData);
      setPaymentMethodList(filteredData);
      changeinits(filteredData);
      PMarr = filteredData;
    };

    const onAddComm = (PMName, Percentage) => {
      Percentage ? setValidPaymentMethod(true) : setValidPaymentMethod(false);
      if (Percentage.trim().length === 0) {
        setValidPercentage(false);
      }

      let isExist = false;
      isExist = PaymentMethodtoPost.some(x => x.PaymentMethodCode === PaymentMethodCode);
      const index = PaymentMethodtoPost.indexOf(PaymentMethodCode);
      if (index > -1 && isExist) {
        PaymentMethodtoPost.splice(index, 1);
      }
      if (!isExist && isValidPaymentMethod && isValidPercentage) {
        PMarr = [
          ...initialPaymentMethod,
          { PaymentMethodNameAR: PMName, PaymentMethod: PaymentMethodCode, Percentage: Percentage },
        ];

        let prcnt = PaymentMethodtoPost.reduce((a, b) => +a + +b.Percentage, 0);

        onChangeTotPercentage(prcnt);

        setPaymentMethodList(PMarr);

        setPaymentMethodtoPost(PMarr);

        changeinits(PMarr);

        // PMarr.push({Name:CommName,PaymentMethodCode:CommID,Qty:Qty});
        console.log("PMarr.length: " + PMarr.length);
        console.log("Name: " + PMName + "ID " + PaymentMethodCode + "percentage:" + Percentage);
        console.log("PM arry ", PMarr);
      } else if (!isValidPercentage) {
        showAlert("ContractRequestPaymentMethod.enterPercentage");
      } else if (isExist) {
        showAlert("ContractRequestPaymentMethod.PaymentMethodexisit");
      } else {
        showAlert("ContractRequestPaymentMethod.error");
      }
    };

    const UserType = authStore.userData[0].UserType;

    const FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#607D8B",
          }}
        />
      );
    };

    const renderItem = (item, index) => {
      return (
        <View>
          <View style={SUB_CONTAINER}>
            <Text style={[TEXT_VALUE]}>{item.PaymentMethodNameAR}</Text>
          </View>
          <View style={FLATList_ITEMS_VIEW}>
            <View style={SUB_CONTAINER}>
              <Text
                tx={"ContractRequestPaymentMethod.Percentage"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text style={[TEXT_VALUE]}>{item.Percentage}</Text>
            </View>

            <TouchableOpacity
              style={TextFiled_VIEW}
              onPress={() => deleteitem(item.PaymentMethodCode)}
            >
              <Text tx={"ContractRequestPaymentMethod.delete"} style={[Delete_TEXT_VALUE]} />
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    if (UserType === "Bank") {
      isBank = true;
      props.view = "Bank";
    } else {
      isBank = false;
      props.view = "Trader";
    }

    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

    const onSave = async () => {
      let shouldGoHome = false;
      const isConnected = await isInternetAvailable(false);
      const userDataTemp = authStore.userData[0];

      let ispercentright = true;

      let prcnt = PaymentMethodtoPost.reduce((a, b) => +a + +b.Percentage, 0);

      onChangeTotPercentage(prcnt);

      if (TotPercentage !== 100) {
        ispercentright = false;
      }

      if (prcnt === 100) {
        console.log("JSON.stringify(PaymentMethodtoPost)", JSON.stringify(PaymentMethodList));
        console.log(
          "JSON.stringify(ContractRequestStore.ContractCommodityObj)",
          JSON.stringify(ContractRequestStore.UpdateContractCommodityObj),
        );

        ContractRequestStore.UpdateContractRequest(
          ContractRequestStore.UpdateContractObj,
          JSON.stringify(ContractRequestStore.UpdateContractCommodityObj),
          JSON.stringify(PaymentMethodtoPost),
        );

        if (ContractRequestStore.isContractSaved === false) {
          showAlert("ContractRequest.FailedMsg");
        } else if (ContractRequestStore.isContractSaved === true) {
          showAlert("ContractRequest.SavedMsg");

          props.navigation.navigate("ContractRequest");
        }
      } else {
        showAlert("ContractRequestPaymentMethod.wrongpercentMsg");
      }
    };

    const renderView = () => {
      if (!isBank) {
        return (
          <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps="always">
              {LookupStore.IsPaymentMethodLoading && (
                <ActivityIndicator
                  size="large"
                  style={ACTIVITY_INDICATOR}
                  color={color.palette.black}
                />
              )}
              <MenuButton
                title={"ContractRequestPaymentMethod.ContractRequestPaymentMethod"}
                onPress={handleDrawer}
              />
              <View style={DETAIL_CONTAINER}>
                <View>
                  <SafeAreaView style={TextFiled_VIEW}>
                    <SearchableDropdown
                      setSort={(item, searchedText) => item.name.startsWith(searchedText)}
                      onTextChange={text => onChangePaymentMethodName(text)}
                      //On text change listner on the searchable input
                      onItemSelect={item => onChangePaymentMethodID(item)}
                      // onItemSelect={item => showAlert(item)}
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
                      items={ExPaymentMethod}
                      //mapping of item array
                      defaultIndex={3}
                      //default selected item index
                      placeholder="Tab to search..."
                      //place holder for the search input
                      resetValue={false}
                      //reset textInput Value with true and false state
                      underlineColorAndroid="transparent"
                      //To remove the underline from the android input
                    />
                  </SafeAreaView>
                </View>
                <View style={ITEMS_VIEW}>
                  <View style={TextFiled_VIEW}>
                    <Text tx={"ContractRequestPaymentMethod.Percentage"} style={[ITEM_LABEL]} />
                  </View>

                  <View style={ITEMS_VIEW}>
                    <TextField
                      inputStyle={TEXT_VALUE}
                      errorTx={
                        isValidPaymentMethod
                          ? undefined
                          : "ContractRequestPaymentMethod.enterPercentage"
                      }
                      onChangeText={text => onChangePercentage(text)}
                      value={Percentage}
                    />
                  </View>
                  <TouchableOpacity
                    style={TextFiled_VIEW}
                    onPress={index => onAddComm(PaymentMethodName, Percentage)}
                  >
                    <Text
                      tx={"ContractRequestPaymentMethod.addPaymentMethod"}
                      style={[Add_PaymentMethod_LABEL]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={DETAIL_VIEW}>
                  <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={PaymentMethodList}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    // ListHeaderComponent={renderHeader}
                    ItemSeparatorComponent={FlatListItemSeparator}
                  />
                </View>

                <View style={BOTTOM_VIEW}>
                  <BottomButton
                    leftImage={icons.blackButton2}
                    rightImage={icons.redButton2}
                    leftDisabled={isBank}
                    leftText={"ContractRequestPaymentMethod.send"}
                    rightText={"ContractRequestPaymentMethod.back"}
                    onRightPress={goBack}
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    onLeftPress={onSave}
                  />
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        );
      } else if (isBank) {
        return (
          <ScrollView>
            <View style={DETAIL_CONTAINER}>
              <View style={ContractRequestPaymentMethod_VIEW}></View>
            </View>
          </ScrollView>
        );
      } else {
        return true;
      }
    };
    return <View>{renderView()}</View>;
  },
);
