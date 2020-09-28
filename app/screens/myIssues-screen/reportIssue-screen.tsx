/* eslint-disable @typescript-eslint/no-use-before-define */
import { ParamListBase, useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ImageStyle, Platform, ScrollView, TextStyle, View, ViewStyle } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { ComContractDetail } from "../../components/Contract/com-Contract-detail";
import { ComClaimDetail } from "../../components/Forms/com-Claim-detail";
import { ComClaimSettlementDetail } from "../../components/Forms/com-ClaimSettlement-detail";
import { ComExFormDetail } from "../../components/Forms/com-ExForm-detail";
import { ComImFormDetail } from "../../components/Forms/com-ImForm-detail";
import { ComMaturityDetail } from "../../components/Forms/com-Maturity-detail";
import { ComMaturitySettlementDetail } from "../../components/Forms/com-MaturitySettlement-detail";
import { ComPaymentDetail } from "../../components/Forms/com-Payment-detail";
import { BackButton } from "../../components/header/back-button";
import { icons } from "../../components/icon/icons";
import { ComLicenseDetail } from "../../components/License/com-License-detail";
import { ComOperationDetail } from "../../components/Operation/com-Operation-detail";
import { ComOperationTransferDetail } from "../../components/Operation/com-OperationTransfer-detail";
import { IssueText } from "../../components/text-field/Issue-Text";
import UserModel from "../../models/local-database/imexUser-model";
import IssueModel from "../../models/local-database/Issue-model";
import { useStores } from "../../models/root-store";
import { color, typography } from "../../theme";
import {
  getFormattedDate,
  getJsonRequest,
  isInternetAvailable,
  showAlert,
  translateText,
} from "../../utils/utils";

export interface ReportIssueProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const statusFail = [
  { label: "Receiver Closed", value: "Receiver Closed" },
  { label: "Refused Delivery", value: "Refused Delivery" },
  { label: "Incorrect Delivery Address", value: "Incorrect Delivery Address" },
  { label: "No One Home", value: "No One Home" },
  { label: "Unable to Deliver Long Wait Time", value: "Unable to Deliver Long Wait Time" },
];

const statusSuccess = [
  { label: "Delivered", value: "Delivered" },
  { label: "Picked Up", value: "Picked Up" },
  { label: "At Depot", value: "At Depot" },
  { label: "Handed to On Forwarder", value: "Handed to On Forwarder" },
];
const ROOT: ViewStyle = {
  flex: 1,
};
const CAMERA_VIEW: ViewStyle = {
  flexDirection: "row",
  marginTop: 5,
  alignItems: "center",
};
const LINK_VIEW: ViewStyle = {
  alignSelf: "center",
  marginStart: 15,
};
const LINK_TEXT: TextStyle = {
  color: color.palette.link,
  textDecorationLine: "underline",
};

const options = {
  title: translateText("common.selectImage"),
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

const Issue_Desc: TextStyle = {
  color: color.palette.darkText,
  fontFamily: typography.secondary,
  fontSize: 18,
};
const SIGNATURE_TEXT: TextStyle = {
  marginTop: 10,
};
const DESPATCH_TEXT: TextStyle = {
  color: color.palette.link,
  fontFamily: typography.secondary,
  fontWeight: "bold",
};

const ImForm_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS === "android" ? 25 : isIphoneX() ? 10 : 33,
};
const STATUS_VIEW: ViewStyle = {
  height: 50,
  backgroundColor: color.palette.toolbar,
  marginTop: 10,
  justifyContent: "center",
};
const STATUS_TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "left",
  marginStart: 30,
};
const PRESS_HERE: TextStyle = {
  textAlign: "center",
  alignSelf: "center",
  fontSize: 25,
  color: color.palette.gray,
};
const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 };
const STATUS_CONTAINER: ViewStyle = {
  padding: 15,
  flex: 1,
};
const PICKER_CONTAINER: ViewStyle = {
  flexDirection: "row",
};

const VALUE_CONTAINER_REGISTRATION: ViewStyle = {
  flex: 1,
  height: 40,
  justifyContent: "center",
};
const DESPATCH_BOX: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  borderColor: color.palette.lightGrey,
  borderWidth: 1,
  borderRadius: 4,
  backgroundColor: color.palette.white,
  height: 40,
  alignItems: "center",
  paddingHorizontal: 5,
  justifyContent: "space-between",
};
const SIGN_VIEW: ViewStyle = {
  borderColor: color.palette.darkText,
  borderWidth: 2,
  borderRadius: 3,
  marginTop: 20,
  height: 300,
  width: "100%",
  justifyContent: "center",
  backgroundColor: color.palette.white,
};
const SIGN_VIEW_IMAGE: ImageStyle = {
  width: "100%",
  height: 296,
};
const DOWNARROW: ImageStyle = {
  width: 15,
  height: 18,
  tintColor: color.palette.darkText,
};
const DATE_TEXT: TextStyle = {
  flex: 1,
  textAlign: "right",
  alignSelf: "center",
  fontSize: 15,
  marginStart: 10,
};
let imageHash = Date.now();
let randomNo = Math.random();
// type ImFormType = keyof typeof consType;

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface recordProps {
  IssueDesc: string;
  LoginName: string;
  FormNo: string;
  // image: string;
  Type: string;
  IssueObject: number;
  synced: boolean;
}

// const dir = getImageDir();
// RNFS.exists(dir).then(result => {
//   if (!result) {
//     RNFS.mkdir(dir);
//   }
// });
let userObj;
let isBank = false;
let uType = "1";
export const ReportIssue: FunctionComponent<ReportIssueProps> = observer(props => {
  const isFocused = useIsFocused();
  const {
    IssueStore,
    ImFormStore,
    ExFormStore,
    authStore,
    ContractStore,
    LicenseStore,
    OperationStore,
    OperationTransferStore,
    MaturityStore,
    MaturitySettlementStore,
    ClaimStore,
    ClaimSettlementStore,
    PaymentStore,
  } = useStores();
  const ImForm = ImFormStore.IMFormDetail;
  const ExForm = ExFormStore.ExFormDetail;
  const Claim = ClaimStore.ClaimDetail;
  const ClaimSettlement = ClaimSettlementStore.ClaimSettlementDetail;
  const Payment = PaymentStore.PaymentDetail;
  const Contract = ContractStore.ContractDetail;
  const License = LicenseStore.LicenseDetail;
  const Operation = OperationStore.OperationDetail;
  const OperationTransfer = OperationTransferStore.OperationTransferDetail;
  const Maturity = MaturityStore.MaturityDetail;
  const MaturitySettlement = MaturitySettlementStore.MaturitySettlementDetail;

  const UserType = authStore.userData.UserType;
  if (UserType === "Bank") {
    isBank = true;
  } else {
    isBank = true;
  }

  if (UserType === "Bank") {
    uType = "1";
  } else {
    uType = "2";
  }
  //console.log('imstore',ImFormStore.IMFormDetail)
  const FormNo = ImFormStore.IMFormDetail.FormNo;
  const loginName = authStore.userData.loginName;
  //   const imageFileName = consNo + loginName;
  //   const SIGN_IMAGE_URI = getSignaturePath(imageFileName);
  //   const [selectedValue, setSelectedValue] = useState("");
  //   const [fileName, setFileName] = useState("");
  //   const [imageUri, setImageUri] = useState("");
  //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
  //   const [signUri, setSignUri] = useState(SIGN_IMAGE_URI);
  //   const [viewImage, onViewImage] = useState(false);
  //   const [isValidStatus, onSetValidStatus] = useState(true);
  //   const [isValidFile, onSetValidFile] = useState(true);
  const [isValidIssueDesc, setValidIssueDesc] = useState(false);
  const [IssueDesc, onIssueDesc] = useState("");
  const [Type, OnIssueType] = useState("");
  //   const [random, setRandom] = useState(0);
  //   const [dropDownStatus, setDropDownStatus] = useState([]);
  //   const [isValidSignImage, onSetValidSignImage] = useState(true);
  //   const { isSuccess } = props.route.params;

  const [currentDate, updateCurrentDate] = useState(getFormattedDate(new Date().toLocaleString()));
  //   useEffect(() => {
  //     getUserData();
  //     ImFormStore.onSigned(false);
  //     ImFormStore.setImFormFalse();
  //     // if (isDelivered) {
  //     //   console.tron.log('delivered')
  //     //   setSelectedValue('Delivered')
  //     //   // getOfflineImForm();
  //     // }
  //   }, []);

  //   useEffect(() => {
  //     let newDate = getFormattedDate(new Date().toLocaleString());
  //     updateCurrentDate(newDate);
  //     if (isSuccess) {
  //       setDropDownStatus(statusSuccess)
  //     }
  //     else {
  //       setDropDownStatus(statusFail)
  //     }
  //   }, [isFocused]);

  useEffect(() => {
    if (IssueStore.isIssueSaved && isValidIssueDesc && authStore.IsTrader) {
      showAlert("", "ReportIssue.IssueSaved", "common.ok", onOkayPress);
    }
  }, [IssueStore.isIssueSaved]);

  useEffect(() => {
    if (IssueStore.isIssueSaved && isValidIssueDesc && authStore.isBank) {
      showAlert("", "ReportIssue.IssueBankSaved", "common.ok", onOkayPress);
    }
  }, [IssueStore.isIssueSaved]);

  //   useLayoutEffect(() => {
  //     props.navigation.addListener("focus", () => {
  //       // getCurrentLocation().then(location => {
  //       //   if (location) {
  //       //     ImFormStore.getCurrentLocation(location.latitude, location.longitude)
  //       //   }
  //       // }).catch(error => {
  //       //   console.log("LOCATION_ERROR" + error)
  //       // })
  //       imageHash = Date.now();
  //       setSignUri(SIGN_IMAGE_URI);
  //       randomNo = Math.random();
  //       setRandom(randomNo);
  //       onSetValidSignImage(true);
  //     });
  //   }, []);

  const getUserData = async () => {
    const model = new UserModel();
    userObj = await model.getimexUserData(authStore.userData[0].loginName[0]);
  };

  //   const getOfflineIssues = async () => {
  //     setSelectedValue(ImForm.currentFreightState[0]);
  //     // onIssueDesc(savedImForm.signBy)
  //     // setSignUri(getSignaturePath(savedImForm.signImage))
  //   };

  //   const onCameraPres = () => {
  //     ImagePicker.showImagePicker(options, response => {
  //       if (!response.didCancel) {
  //         const filePath = getImagePath(imageFileName);
  //         RNFS.writeFile(filePath, response.data, "base64").then(result => {
  //           setFileName("ImForm Photo");
  //           imageHash = Date.now();
  //           setImageUri(filePath);
  //           // console.log(filePath)
  //           // console.log(result)
  //           onSetValidFile(true);
  //         });
  //       }
  //     });
  //   };
  //   const onImageView = () => {
  //     onViewImage(!viewImage);
  //   };
  //   const onSignaturePress = () => {
  //     props.navigation.navigate("signatureView");
  //   };
  async function getSavedData(record: any) {
    const modal = new IssueModel();
    modal.addAndUpdateRecordOffline(false, record, userObj[0]);
    return false;
  }

  const onOkayPress = () => {
    if (authStore.isIm) {
      props.navigation.navigate(ImFormStore.fromHome ? "Home" : "ImForm");
    } else if (authStore.isEx) {
      props.navigation.navigate(ExForm.fromHome ? "Home" : "ExForm");
    } else if (authStore.isContract) {
      props.navigation.navigate(ContractStore.fromHome ? "Home" : "Contract");
    } else if (authStore.isLicense) {
      props.navigation.navigate(License.fromHome ? "Home" : "License");
    } else if (authStore.isOperation) {
      props.navigation.navigate(Operation.fromHome ? "Home" : "Operation");
    } else if (authStore.isOperationTransfer) {
      props.navigation.navigate(OperationTransfer.fromHome ? "Home" : "OperationTransfer");
    } else if (authStore.isClaim) {
      props.navigation.navigate(Claim.fromHome ? "Home" : "Claim");
    } else if (authStore.isClaimSettlement) {
      props.navigation.navigate(ClaimSettlement.fromHome ? "Home" : "ClaimSettlement");
    } else if (authStore.isMaturity) {
      props.navigation.navigate(Maturity.fromHome ? "Home" : "Maturity");
    } else if (authStore.isMaturitySettlement) {
      props.navigation.navigate(MaturitySettlement.fromHome ? "Home" : "MaturitySettlement");
    } else {
      props.navigation.navigate("Home");
    }
  };
  const onSave = async () => {
    let shouldGoHome = false;
    const isConnected = await isInternetAvailable(false);
    const userDataTemp = authStore.userData[0];

    const record: recordProps = {
      LoginName: userDataTemp.LoginName[0],
      FormNo: authStore.isIm
        ? ImForm.FormCode
        : authStore.isEx
        ? ExForm.FormCode
        : authStore.isContract
        ? Contract.ContractCode
        : authStore.isLicense
        ? License.LicenseCode
        : authStore.isOperation
        ? Operation.OperationCode
        : authStore.isOperationTransfer
        ? OperationTransfer.TransferCode
        : authStore.isClaim
        ? Claim.ClaimCode
        : authStore.isMaturity
        ? Maturity.MaturityCode
        : authStore.isClaimSettlement
        ? ClaimSettlement.ClaimSettlementCode
        : authStore.isPayment
        ? Payment.PaymentCode
        : authStore.isMaturitySettlement
        ? MaturitySettlement.MaturitySettlementCode
        : 11111,
      IssueObject: authStore.isIm
        ? 10
        : authStore.isEx
        ? 7
        : authStore.isContract
        ? 1
        : authStore.isLicense
        ? 2
        : authStore.isOperation
        ? 8
        : authStore.isOperationTransfer
        ? 15
        : authStore.isClaim
        ? 6
        : authStore.isMaturity
        ? 11
        : authStore.isClaimSettlement
        ? 16
        : authStore.isPayment
        ? 5
        : authStore.isMaturitySettlement
        ? 12
        : 0,
      IssueDesc: IssueDesc,
      Type: uType,
      synced: false,
    };

    console.log("isValidIssueDesc", isValidIssueDesc);
    if (isConnected && isValidIssueDesc && authStore.IsTrader) {
      const request = await getJsonRequest(record);

      IssueStore.saveIssue(request);
      // Call API
    }
    if (isConnected && isValidIssueDesc && authStore.isBank) {
      const request = await getJsonRequest(record);

      IssueStore.saveIssue(request);
      // Call API
    } else {
      shouldGoHome = true;
      getSavedData(record);
    }
    if (shouldGoHome && isValidIssueDesc && authStore.isIm) {
      props.navigation.navigate(ImFormStore.fromHome ? "Home" : "ImForm");
    } else if (shouldGoHome && isValidIssueDesc && !authStore.isIm) {
      props.navigation.navigate(ExForm.fromHome ? "Home" : "ExForm");
    }
  };

  const onChangeText = text => {
    text ? setValidIssueDesc(true) : setValidIssueDesc(false);
    setValidIssueDesc(false);
    onIssueDesc(text);
    if (text.length > 0) {
      setValidIssueDesc(true);
    } else {
      setValidIssueDesc(false);
    }
  };

  const onIssueTypeChangeText = text => {
    OnIssueType(text);
  };

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);
  return (
    <Screen
      statusBarColor={color.palette.white}
      statusBar={"dark-content"}
      wall={"whiteWall"}
      style={ROOT}
      preset="fixed"
    >
      <BackButton title={"ReportIssue.back"} onPress={goBack} />
      <ScrollView style={ImForm_VIEW}>
        <View style={ImForm_VIEW}>
          {authStore.isIm ? (
            <View>
              <ComImFormDetail data={ImForm} navigation={props.navigation} view={"Trader"} />
            </View>
          ) : authStore.isEx ? (
            <View>
              <ComExFormDetail data={ExForm} navigation={props.navigation} view={"Trader"} />
            </View>
          ) : authStore.isClaim ? (
            <View>
              <ComClaimDetail data={Claim} navigation={props.navigation} view={"Trader"} />
            </View>
          ) : authStore.isClaimSettlement ? (
            <View>
              <ComClaimSettlementDetail
                data={ClaimSettlement}
                navigation={props.navigation}
                view={"Trader"}
              />
            </View>
          ) : authStore.isPayment ? (
            <View>
              <ComPaymentDetail data={Payment} navigation={props.navigation} view={"Trader"} />
            </View>
          ) : authStore.isMaturity ? (
            <View>
              <ComMaturityDetail data={Maturity} navigation={props.navigation} view={"Trader"} />
            </View>
          ) : authStore.isMaturitySettlement ? (
            <View>
              <ComMaturitySettlementDetail
                data={MaturitySettlement}
                navigation={props.navigation}
                view={"Trader"}
              />
            </View>
          ) : authStore.isContract ? (
            <View>
              <ComContractDetail data={Contract} navigation={props.navigation} view={"Trader"} />
            </View>
          ) : authStore.isLicense ? (
            <View>
              <ComLicenseDetail data={License} navigation={props.navigation} view={"Trader"} />
            </View>
          ) : authStore.isOperation ? (
            <View>
              <ComOperationDetail data={Operation} navigation={props.navigation} view={"Trader"} />
            </View>
          ) : authStore.isOperationTransfer ? (
            <View>
              <ComOperationTransferDetail
                data={OperationTransfer}
                navigation={props.navigation}
                view={"Trader"}
              />
            </View>
          ) : null}
        </View>

        <View>
          {/* Status */}
          <View style={STATUS_CONTAINER}>
            {isBank ? (
              <View>
                <IssueText
                  editable={isBank}
                  labelTx={"ReportIssue.issuedesc"}
                  labelStyle={Issue_Desc}
                  multiline={true}
                  numberOfLines={6}
                  errorTx={isValidIssueDesc ? undefined : "ReportIssue.enterissuedesc"}
                  onChangeText={text => onChangeText(text)}
                  value={IssueDesc}
                />
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
      {
        <View style={BOTTOM_VIEW}>
          <BottomButton
            leftImage={icons.blackButton2}
            rightImage={icons.redButton2}
            leftDisabled={!isBank}
            isLoadingLeft={ImFormStore.isButtonLoading}
            leftText={"ReportIssue.send"}
            rightText={"common.cancel"}
            onRightPress={goBack}
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onLeftPress={onSave}
          />
        </View>
      }
    </Screen>
  );
});
