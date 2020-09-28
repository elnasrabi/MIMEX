import { text } from "@nozbe/watermelondb/decorators";
import { ParamListBase, useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ActivityIndicator, ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import SearchableDropdown from "react-native-searchable-dropdown";
import { Text, TextField } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
import { isInternetAvailable, showAlert } from "../../utils/utils";

export interface NewLicenseRequestCommodity {
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

const CommodityLookup = [
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
const LicenseRequestCommodity_VIEW: TextStyle = {
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
const Add_Commodity_LABEL: TextStyle = { color: color.palette.link, marginEnd: 10 };
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
export const NewLicenseRequestCommodity: FunctionComponent<NewLicenseRequestCommodity> = observer(
  props => {
    const isFocused = useIsFocused();
    const { LicenseRequestStore, authStore, LookupStore } = useStores();

    const [ExCommodity, UpdateExCommodity] = useState([]);
    const [selectedCommodity, setCommodity] = useState("");

    const [isValidCommodity, setValidCommodity] = useState(true);
    const [isValidUnitPrice, setValidUnitPrice] = useState(false);
    const [UnitPrice, onUnitPrice] = useState("");

    const [canlookup, setcanlookup] = useState(true);

    const [isValidQuantity, setValidQuantity] = useState(false);
    const [Quantity, onQuantity] = useState("");

    const [initialCommodity, changeinits] = useState([]);
    const [CommoditytoPost, setCommoditytoPost] = useState([]);
    const [CommodityList, setCommodityList] = useState(initialCommodity);

    let commarr = [];
    let commQTY = "";
    let communitprice = "";

    const [isValidsearch, setValidsearch] = useState(true);

    const [searchValue, setSearchValue] = useState("");

    const [CommID, OnCommID] = useState(0);

    const [CommName, OnCommodityName] = useState("");

    const onChangeUnitPrice = UnitPrice => {
      UnitPrice ? setValidUnitPrice(true) : setValidUnitPrice(false);
      communitprice = UnitPrice;
      onUnitPrice(UnitPrice);
    };

    const onChangeQuantity = Qty => {
      Qty ? setValidQuantity(true) : setValidQuantity(false);
      commQTY = Qty;
      onQuantity(Qty);
    };

    const setChangeSearchValue = text => {
      text ? setValidsearch(true) : setValidsearch(false);
      setSearchValue(text);
    };

    const onChangeCommodityName = text => {
      text ? setValidCommodity(true) : setValidCommodity(false);
    };

    const onChangeCommodityID = item => {
      let comname = item.name;
      let comcode = item.id;

      text ? setValidCommodity(true) : setValidCommodity(false);

      OnCommID(comcode);
      OnCommodityName(comname);

      onQuantity("");
      onUnitPrice("");
      setValidQuantity(false);
      setValidUnitPrice(false);
    };

    const callCommodityAPI = async () => {
      const isConnected = await isInternetAvailable();
      if (isFocused && isConnected) {
        UpdateExCommodity(LookupStore.CommodityList);
      }
    };

    useEffect(() => {
      //LookupStore.refreshCommodityList();
      callCommodityAPI();
    }, [isFocused]);

    const deleteitem = code => {
      console.log("comm to delete", code);
      const index = CommoditytoPost.indexOf(code);
      if (index > -1) {
        CommoditytoPost.splice(index, 1);
      }
      const index2 = CommodityList.indexOf(code);
      if (index > -1) {
        CommodityList.splice(index, 1);
      }
      const filteredData = CommoditytoPost.filter(item => item.CommodityCode !== code);
      setCommoditytoPost(filteredData);
      setCommodityList(filteredData);
      changeinits(filteredData);
      commarr = filteredData;
    };

    const onAddComm = (CommName, QTY, UnitPrice) => {
      QTY && CommName && UnitPrice ? setValidCommodity(true) : setValidCommodity(false);
      if (UnitPrice.trim().length === 0) {
        setValidUnitPrice(false);
      }

      if (!Quantity && isNaN(parseFloat(Quantity))) {
        setValidQuantity(false);
      }
      if (!UnitPrice && isNaN(parseFloat(UnitPrice))) {
        setValidUnitPrice(false);
      }

      let isExist = false;
      isExist = CommoditytoPost.some(x => x.CommodityCode === CommID);
      const index = CommoditytoPost.indexOf(CommID);
      if (index > -1 && isExist) {
        CommoditytoPost.splice(index, 1);
      }
      if (!isExist && isValidCommodity && isValidQuantity && isValidUnitPrice) {
        commarr = [
          ...initialCommodity,
          { CommodityNameAR: CommName, CommodityCode: CommID, Qty: QTY, UnitPrice: UnitPrice },
        ];

        setCommodityList(commarr);

        setCommoditytoPost(commarr);

        changeinits(commarr);

        // commarr.push({CommodityNameAR:CommName,CommodityCode:CommID,Qty:Qty});
        console.log("commarr.length: " + commarr.length);
        console.log(
          "CommodityNameAR: " +
            CommName +
            "ID " +
            CommID +
            "QTY:" +
            QTY +
            "Unit Price:" +
            UnitPrice,
        );
        console.log("comm arry ", commarr);
      } else if (!isValidUnitPrice) {
        showAlert("LicenseRequestCommodity.enterunitprice");
      } else if (!isValidQuantity) {
        showAlert("LicenseRequestCommodity.enterqty");
      } else if (isExist) {
        showAlert("LicenseRequestCommodity.commodityexisit");
      } else {
        showAlert("LicenseRequestCommodity.error");
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
            <Text style={[TEXT_VALUE]}>{item.CommodityNameAR}</Text>
          </View>
          <View style={FLATList_ITEMS_VIEW}>
            <View style={SUB_CONTAINER}>
              <Text
                tx={"LicenseRequestCommodity.QTY"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text style={[TEXT_VALUE]}>{item.Qty}</Text>
            </View>

            <View style={SUB_CONTAINER}>
              <Text
                tx={"LicenseRequestCommodity.UnitPrice"}
                extraText={":"}
                style={ITEM_LABEL}
                preset={"normal"}
              />
              <Text style={[TEXT_VALUE]}>{item.UnitPrice}</Text>
            </View>

            <TouchableOpacity style={TextFiled_VIEW} onPress={() => deleteitem(item.CommodityCode)}>
              <Text tx={"LicenseRequestCommodity.delete"} style={[Delete_TEXT_VALUE]} />
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
    const checkvlaue = () => {};
    const onSave = async () => {
      let shouldGoHome = false;
      const isConnected = await isInternetAvailable(false);
      const userDataTemp = authStore.userData[0];

      let i = 0;
      let tempArrComm = [];
      for (i = 0; i < CommoditytoPost.length; i++) {
        tempArrComm.push(
          CommoditytoPost[i].CommodityCode[0],
          CommoditytoPost[i].Qty[0],
          CommoditytoPost[i].UnitPrice[0],
        );
      }
      if (CommoditytoPost.length > 0) {
        LicenseRequestStore.setLicenseCommodityObj(CommoditytoPost);

        LicenseRequestStore.NewLicenseRequest(
          LicenseRequestStore.LicenseObj,
          JSON.stringify(LicenseRequestStore.LicenseCommodityObj),
        );

        if (LicenseRequestStore.isLicenseSaved === false) {
          showAlert("LicenseRequest.FailedMsg");
        } else if (LicenseRequestStore.isLicenseSaved === true) {
          showAlert("LicenseRequest.SavedMsg");
          props.navigation.navigate("LicenseRequest");
        }
      } else {
        showAlert("LicenseRequestCommodity.nocommodity");
      }
    };

    const renderView = () => {
      if (!isBank) {
        return (
          <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps="always">
              {LookupStore.IsCommodityLoading && (
                <ActivityIndicator
                  size="large"
                  style={ACTIVITY_INDICATOR}
                  color={color.palette.black}
                />
              )}
              <View style={DETAIL_CONTAINER}>
                <View>
                  <SafeAreaView style={TextFiled_VIEW}>
                    <SearchableDropdown
                      setSort={(item, searchedText) => item.name.startsWith(searchedText)}
                      onTextChange={text => onChangeCommodityName(text)}
                      //On text change listner on the searchable input
                      onItemSelect={item => onChangeCommodityID(item)}
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
                      items={ExCommodity}
                      //mapping of item array
                      defaultIndex={3444}
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
                    <Text tx={"LicenseRequestCommodity.QTY"} style={[ITEM_LABEL]} />
                  </View>
                  <TextField
                    inputStyle={TEXT_VALUE}
                    errorTx={isValidCommodity ? undefined : "LicenseRequestCommodity.enterqty"}
                    onChangeText={text => onChangeQuantity(text)}
                    value={Quantity}
                  />
                  <View style={TextFiled_VIEW}>
                    <Text tx={"LicenseRequestCommodity.UnitPrice"} style={[ITEM_LABEL]} />
                  </View>

                  <View style={ITEMS_VIEW}>
                    <TextField
                      inputStyle={TEXT_VALUE}
                      errorTx={
                        isValidCommodity ? undefined : "LicenseRequestCommodity.enterunitprice"
                      }
                      onChangeText={text => onChangeUnitPrice(text)}
                      value={UnitPrice}
                    />
                  </View>
                  <TouchableOpacity
                    style={TextFiled_VIEW}
                    onPress={index => onAddComm(CommName, Quantity, UnitPrice)}
                  >
                    <Text
                      tx={"LicenseRequestCommodity.addcommodity"}
                      style={[Add_Commodity_LABEL]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={DETAIL_VIEW}>
                  <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={CommodityList}
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
                    leftText={"LicenseRequestCommodity.send"}
                    rightText={"LicenseRequestCommodity.back"}
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
              <View style={LicenseRequestCommodity_VIEW}></View>
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
