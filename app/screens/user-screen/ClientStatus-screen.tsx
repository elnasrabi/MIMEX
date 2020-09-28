import { ParamListBase, useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useEffect } from "react";
import { Platform, ScrollView, TextStyle, View, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
// imports from components, themes and modals
import { Screen, Text } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color, typography } from "../../theme";
import { isInternetAvailable } from "../../utils/utils";

export interface UserSettingProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
// const TEXTINPUT_VIEW: ViewStyle = {
//   flex: 1,
//   width: "100%"
// };
const ROOT: ViewStyle = {
  paddingBottom: 10,
};
// const LABEL: TextStyle = {
//   color: color.palette.black,
//   fontSize: 16,
//   fontWeight: "bold",
//   fontFamily: typography.secondary
// };
const EMAIL_VALUE: TextStyle = {
  color: color.palette.link,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary,
  marginTop: 5,
};
const EMAIL_TEXT: TextStyle = {
  color: color.palette.black,
  flex: 1,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary,
};
// const SCROLLVIEW: ViewStyle = {
//   marginBottom: 10,
//   marginTop: Platform.OS == 'android' ? 40 : isIphoneX() ? 0 : 23
// };
const EMAIL_VIEW: ViewStyle = {
  marginStart: 20,
  marginEnd: 20,
  marginTop: 20,
};
// const FIELD_CONTAINER: ViewStyle = {
//   flex: 1,
//   justifyContent: 'center'
// };
// const CHILDREN: ViewStyle = {
//   paddingHorizontal: 10,
//   justifyContent: 'center',
//   flex: 1,
//   borderWidth: 1,
//   borderColor: color.palette.lighterGrey,
//   borderRadius: 4,
//   height: 40,
//   backgroundColor: color.palette.white
// };
// const FIELD_MAIN_CONTAINER: ViewStyle = {
//   flexDirection: 'row',
//   paddingHorizontal: 20,
//   marginTop: 15
// };
// const ERROR_TEXT: TextStyle = {
//   color: color.palette.red,
//   fontFamily: typography.secondary,
//   alignSelf: 'flex-end',
//   paddingRight: 20
// }
const VALUE_CONTAINER: ViewStyle = { flex: 1 };
const LABEL: TextStyle = {
  color: color.palette.black,
  alignSelf: "center",
  flex: 1,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary,
};
const VALUE: TextStyle = {
  color: color.palette.link,
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "right",
  fontFamily: typography.secondary,
};
const ROW: ViewStyle = {
  flexDirection: "row",
  marginStart: 20,
  marginEnd: 20,
  marginTop: 20,
};
const SCROLLVIEW_STYLE: ViewStyle = {
  marginBottom: 10,
  marginTop: Platform.OS == "android" ? 40 : isIphoneX() ? 0 : 23,
};

const FLAT_LIST: ViewStyle = {
  padding: 25,
  borderColor: color.palette.darkText,
  borderWidth: 2,
  margin: 5,
  marginTop: 20,
  borderRadius: 3,
  backgroundColor: color.palette.listBG,
};
const FLAT_LIST_VIEW: ViewStyle = { flex: 1 };
const IssueId_View: ViewStyle = { flexDirection: "row", justifyContent: "space-evenly" };
const IssueID: ViewStyle = { flex: 1 };
const IssueDesc: ViewStyle = { flex: 1 };
const IssueDesc_Value: TextStyle = { flex: 1, color: color.palette.red };
const IssueID_Value: TextStyle = { flex: 1, color: color.palette.red };
const Form_Date_VIEW: ViewStyle = { flexDirection: "row" };
const Form_Date_LABEL: TextStyle = { marginEnd: 5, color: color.palette.darkText, flex: 1 };
const Form_Date_VALUE: TextStyle = { marginEnd: 5, flex: 1, color: color.palette.link };
const Bank_Branch_VIEW: ViewStyle = { flexDirection: "row" };
const Bank_Branch_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };
const Bank_Branch_VALUE: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.link };
const ITEM_LABEL: TextStyle = { color: color.palette.darkText, marginEnd: 5 };
const ClientStatustatus_View: ViewStyle = { flexDirection: "row", flex: 1 };
const ClientStatustatus_LABEL: TextStyle = {
  marginEnd: 10,
  color: color.palette.darkText,
  flex: 1,
};
const ClientStatustatus_VALUE: TextStyle = { marginEnd: 10, flex: 1, color: color.palette.red };
const VOLUME_VIEW: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  marginStart: 10,
  justifyContent: "flex-end",
};
const SEPERATOR_LINE: ViewStyle = {
  height: 5,
  backgroundColor: color.palette.black,
  width: "95%",
  marginLeft: 10,
  borderRadius: 5,
};
const WEIGHT_LABEL: TextStyle = { marginEnd: 10, color: color.palette.darkText };
const STATUS: TextStyle = { color: color.palette.link };
const TEXT_VIEW: ViewStyle = { flex: 1, flexDirection: "row", justifyContent: "space-between" };
const FullNameArabicStyle: ViewStyle = {
  flex: 1,
  marginBottom: 40,
  justifyContent: "space-between",
};

const TEXT_VALUE: TextStyle = { color: color.palette.link };
const TEXT_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };

export const ClientStatus: FunctionComponent<UserSettingProps> = observer(props => {
  // const isFocused = useIsFocused();
  // const [date, setDate] = useState(new Date());
  // const [show, setShow] = useState(false);
  // const currentRef: any[] = [];
  // const formikRef = useRef();
  const { authStore } = useStores();
  //authStore.GetClientStatus(authStore.authorization, authStore.userData[0].CBOSID);
  const isFocused = useIsFocused();
  let cnt=0;
  let ClientStatus = authStore.ClientStatusDetails[0];
  if (authStore.IsTrader && cnt<1) {
  // authStore.refreshClientStatus();
    authStore.GetClientStatus(authStore.authorization, authStore.userData[0].CBOSID);
    ClientStatus = authStore.ClientStatusDetails[0];
    cnt=cnt+1;
  } else if(cnt<1) {
   // authStore.refreshClientStatus();
    authStore.GetClientStatus(authStore.authorization, authStore.CBOSID);
    ClientStatus = authStore.ClientStatusDetails[0];
    cnt=cnt+1;
  }

 

  useEffect(() => {
    //authStore.refreshClientStatus();
    callClientStatusAPI;
    //callClientStatusAPI();
  }, [isFocused]);

  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const callClientStatusAPI = async () => {
    const isConnected = await isInternetAvailable();
    if (isConnected) {
      getListApi();
    }
  };

  const getListApi = async () => {
    if (authStore.IsTrader) {
      authStore.GetClientStatus(authStore.authorization, authStore.userData[0].CBOSID);
      ClientStatus = authStore.ClientStatusDetails[0];
    } else {
      authStore.GetClientStatus(authStore.authorization, authStore.CBOSID);
      ClientStatus = authStore.ClientStatusDetails[0];
    }
  };

  try {

    if(!ClientStatus.FullNameArabic)
    {
  if (authStore.IsTrader) {
      authStore.GetClientStatus(authStore.authorization, authStore.userData[0].CBOSID);
      ClientStatus = authStore.ClientStatusDetails[0];
    } else {
      authStore.GetClientStatus(authStore.authorization, authStore.CBOSID);
      ClientStatus = authStore.ClientStatusDetails[0];
    }
    }
    
  } catch (error) {
    if (authStore.IsTrader) {
      authStore.GetClientStatus(authStore.authorization, authStore.userData[0].CBOSID);
      ClientStatus = authStore.ClientStatusDetails[0];
    } else {
      authStore.GetClientStatus(authStore.authorization, authStore.CBOSID);
      ClientStatus = authStore.ClientStatusDetails[0];
    }
    
  }
 

  const gotoHome = () => {
    // formikRef.current.resetForm();
    // setDate(new Date());
    return props.navigation.navigate("Home");
  };

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);


  try {
    return (
      <Screen
        style={ROOT}
        statusBar={"dark-content"}
        statusBarColor={color.palette.white}
        wall={"whiteWall"}
        preset="fixed"
      >
        <MenuButton title={"ClientStatus.header"} onPress={handleDrawer} />
        <ScrollView style={SCROLLVIEW_STYLE}>
          {/* <View style={EMAIL_VIEW}>
            <Text extraText={":"} style={EMAIL_TEXT} tx={"ClientStatus.email"} />
            <Text style={EMAIL_VALUE} text={userData.email[0] ? userData.email[0] : "-"} />
          </View> */}
  
          <View style={FLAT_LIST}>
            <View style={FullNameArabicStyle}>
              <View style={TEXT_VIEW}>
                <Text
                  extraText={":"}
                  tx={"ClientStatus.FullNameArabic"}
                  style={Form_Date_LABEL}
                  preset={"normal"}
                />
              </View>
              <View style={TEXT_VIEW}>
                <Text style={Form_Date_VALUE} preset={"normal"}>
                  {ClientStatus.FullNameArabic}
                </Text>
              </View>
              {/* <View style={SEPERATOR_LINE} /> */}
            </View>
            <View style={TEXT_VIEW}>
              <Text
                extraText={":"}
                tx={"ClientStatus.CBOSID"}
                style={ClientStatustatus_LABEL}
                preset={"normal"}
              />
              <Text style={Form_Date_VALUE} preset={"normal"}>
                {ClientStatus.CBOSID}
              </Text>
            </View>
  
            <View style={TEXT_VIEW}>
              <Text
                extraText={":"}
                tx={"ClientStatus.ClientStatusNameAR"}
                style={Form_Date_LABEL}
                preset={"normal"}
              />
  
              <Text style={Form_Date_VALUE} preset={"normal"}>
                {ClientStatus.ClientStatusNameAR}
              </Text>
            </View>
  
            <View style={TEXT_VIEW}>
              <Text
                extraText={":"}
                tx={"ClientStatus.RequiredClaims"}
                style={Form_Date_LABEL}
                preset={"normal"}
              />
              <Text style={IssueID_Value} preset={"normal"}>
                {currencyFormat(parseFloat(ClientStatus.RequiredClaim))}
              </Text>
            </View>
  
            <View style={TEXT_VIEW}>
              <Text
                extraText={":"}
                tx={"ClientStatus.RequiredMaturity"}
                style={Form_Date_LABEL}
                preset={"normal"}
              />
              <Text style={IssueID_Value} preset={"normal"}>
                {currencyFormat(parseFloat(ClientStatus.RequiredMaturity))}
              </Text>
            </View>
  
            <View style={TEXT_VIEW}>
              <Text
                extraText={":"}
                tx={"ClientStatus.DefaultedTransfers"}
                style={Form_Date_LABEL}
                preset={"normal"}
              />
              <Text style={IssueID_Value} preset={"normal"}>
                {currencyFormat(parseFloat(ClientStatus.RequiredTransfers))}
              </Text>
            </View>
          </View>
        </ScrollView>
        <BottomButton
          hideLeftButton={true}
          rightImage={icons.redButton2}
          onRightPress={() => gotoHome()}
          rightText={"common.home"}
        />
      </Screen>
    );
  
} catch (error) {

  authStore.GetClientStatus(authStore.authorization, authStore.userData[0].CBOSID);
  ClientStatus = authStore.ClientStatusDetails[0];
  
}
  
});
