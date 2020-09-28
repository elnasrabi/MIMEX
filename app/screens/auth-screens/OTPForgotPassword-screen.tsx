import React, { FunctionComponent, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, TextStyle, ImageStyle, View } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen, Text, TextField } from "../../components";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
import { MyButton } from "../../components/button/my-button";
import { isInternetAvailable, showAlert } from "../../utils/utils";
import Orientation from "react-native-orientation-locker";
import { NONE } from "apisauce";
import SmsAndroid from "react-native-get-sms-android";
import { requestPermission, SMS_PERMISSION } from "../../utils/app-permission";

export interface OTPForgotPasswordProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const ROOT: ViewStyle = {
  justifyContent: "center",
  paddingStart: 15,
  paddingEnd: 10,
  flex: 1,
};
const RESET_UserName: TextStyle = {
  color: color.palette.red,
  alignSelf: "center",
  marginTop: 25,
  fontSize: 20,
  padding: 10,
};

const UserName_Style: TextStyle = { marginTop: 5 };
const SEPERATOR_LINE: ViewStyle = {
  height: 2,
  backgroundColor: color.palette.white,
  width: "100%",
  marginTop: 20,
  marginBottom: 10,
  borderRadius: 5,
};

const TEXT_INVALID: TextStyle = {
  ...RESET_UserName,
  fontSize: 15,
  textAlign: "center",
};

const VerifyCode_Style: TextStyle = { marginTop: 25 };
const CONTINUE: ViewStyle = {
  marginTop: 30,
  alignSelf: "center",
  paddingEnd: 10,
};

const btn_Get_Code: ViewStyle = {
  marginTop: 30,
  //alignSelf: "center",
  paddingEnd: 5,
  paddingStart: 120,
};

const btn_view: ViewStyle = {
  flexDirection: "row",
  alignSelf: "center",
};

export const OTPForgotPassword: FunctionComponent<OTPForgotPasswordProps> = observer(props => {
  const { authStore } = useStores();
  // const [VerifyCode, onChangeVerifyCode] = useState("")
  // const [UserName, onChangeUserName] = useState("")
  const [isValidVerifyCode, setValidVerifyCode] = useState(true);
  const [isValidUserName, setValidUserName] = useState(true);

  const [hasSent, setHasSent] = useState(false);

  const [VerifyCode, onChangeVerifyCode] = useState("");

  const [UserName, onChangeUserName] = useState("");

  let UserNameRef: any;

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  const onVerifiy = () => {
    try {
      const isConnected = isInternetAvailable();

      if (!VerifyCode) {
        setValidVerifyCode(false);
      }

      if (VerifyCode && isConnected) {
        // console.log("VerifyCode.toString().trim()", VerifyCode.toString().trim());

        // console.log("authStore.OTPCode.toString().trim()", authStore.OTPCode.toString().trim());

        if (VerifyCode.toString().trim() === authStore.OTPCode.toString().trim()) {
          props.navigation.navigate("OTPChangePassword");
        } else if (authStore.OTPCode === 0) {
          authStore.SetIsFirstLogin(true);
          authStore.SetIsLoggedIn(false);
          authStore.SetOTPCode("");
          authStore.SetHasData(false);
          showAlert("OTPForgotPassword.InvalidUserName");
        } else {
          authStore.SetIsLoggedIn(false);
          authStore.SetOTPCode("");
          authStore.SetHasData(false);
          showAlert("OTPForgotPassword.InvalidCode");
          // props.navigation.navigate('login')
        }
      }
    } catch (error) {
      showAlert("common.generalerror");
    }
  };
  const smsresult = requestPermission(SMS_PERMISSION);

  const GetCode = () => {
    try {
      const isConnected = isInternetAvailable();

      authStore.GetUserInfo(UserName.toString().trim());

      let isMobVerified = authStore.userInfo[0].IsMobileVerified[0];

      if (authStore.IsUserExist && smsresult && isMobVerified === "true" && isConnected) {
        let mobileno = authStore.userInfo[0].MobileNo[0];

        var seedrandom = require("seedrandom");
        var prng = new seedrandom();
        const code = prng()
          .toString()
          .substring(3, 9);

        authStore.SetOTPCode(code);

        SmsAndroid.autoSend(
          mobileno,
          "Your OTP Code is : " + code.toString(),
          fail => {
            // console.log("Failed with this error: " + fail);
            authStore.SetOTPCode(0);
          },
          success => {
            // console.log("SMS sent successfully to mobile", mobileno);
            // console.log("code is", authStore.OTPCode);
            setHasSent(true);
          },
        );
      } else {
        if (isMobVerified === "false") {
          authStore.SetOTPCode(0);
          showAlert("OTPForgotPassword.errorMobile");
        } else {
          authStore.SetOTPCode(0);
          showAlert("OTPForgotPassword.errorUserName");
        }
      }
    } catch (error) {
      showAlert("common.generalerror");
    }
  };

  const onResend = () => {
    try {
      if (authStore.IsUserExist && smsresult && authStore.IsMobileVerified) {
        let mobileno = authStore.userInfo[0].MobileNo[0];

        var seedrandom = require("seedrandom");
        var prng = new seedrandom();
        const code = prng()
          .toString()
          .substring(3, 9);

        authStore.SetOTPCode(code);

        SmsAndroid.autoSend(
          mobileno,
          "Your OTP Code is : " + code.toString(),
          fail => {
            // console.log("Failed with this error: " + fail);
            authStore.SetOTPCode(0);
          },
          success => {
            // console.log("SMS sent successfully to mobile", mobileno);
            // console.log("code is", authStore.OTPCode);
            setHasSent(true);
          },
        );
      } else {
        if (!authStore.IsMobileVerified) {
          authStore.SetOTPCode(0);
          showAlert("OTPForgotPassword.errorMobile");
        } else {
          authStore.SetOTPCode(0);
          showAlert("OTPForgotPassword.errorUserName");
        }
      }
    } catch (error) {
      showAlert("common.generalerror");
    }
  };

  const onChangeText = text => {
    try {
      {
        onChangeVerifyCode(text);
        text ? setValidVerifyCode(true) : setValidVerifyCode(false);
      }
    } catch (error) {
      showAlert("common.generalerror");
    }
  };
  const onChangeUserNameText = text => {
    try {
      {
        onChangeUserName(text);
        text ? setValidUserName(true) : setValidUserName(false);
      }
    } catch (error) {
      showAlert("common.generalerror");
    }
  };

  return (
    <Screen style={ROOT} preset="scroll" backgroundColor="black">
      <TextField
        labelTx={"OTPForgotPassword.UserName"}
        returnKeyType={"next"}
        onSubmitEditing={() => {
          UserNameRef.focus();
        }}
        blurOnSubmit={false}
        style={UserName_Style}
        errorTx={isValidUserName ? undefined : "OTPForgotPassword.errorUserName"}
        placeholder={"Enter Your Login Name"}
        onChangeText={text => onChangeUserNameText(text)}
        value={UserName}
        autoCorrect={false}
        autoCapitalize={"none"}
      />

      <MyButton
        style={btn_Get_Code}
        //isLoading={authStore.isLoginLoading}
        tx="OTPForgotPassword.send"
        onPress={GetCode}
        disabled={hasSent}
      />

      <View style={SEPERATOR_LINE} />
      <TextField
        labelTx={"OTPForgotPassword.OTP"}
        returnKeyType={"next"}
        onSubmitEditing={() => {
          UserNameRef.focus();
        }}
        blurOnSubmit={false}
        style={VerifyCode_Style}
        errorTx={isValidVerifyCode ? undefined : "OTPForgotPassword.errorOTP"}
        placeholder={"Enter OTP"}
        onChangeText={text => onChangeText(text)}
        value={VerifyCode}
        autoCorrect={false}
        autoCapitalize={"none"}
      />
      <View style={btn_view}>
        <MyButton
          style={CONTINUE}
          isLoading={authStore.isLoginLoading}
          tx="OTPForgotPassword.login"
          onPress={onVerifiy}
          disabled={!hasSent}
        />
        <MyButton
          style={CONTINUE}
          //isLoading={authStore.isLoginLoading}
          tx="OTPForgotPassword.resend"
          disabled={!hasSent}
          onPress={onResend}
        />
      </View>
      {authStore.hasLoginError ? (
        <Text style={TEXT_INVALID} tx="OTPForgotPassword.InvalidCode" />
      ) : (
        NONE
      )}
    </Screen>
  );
});
