import React, { FunctionComponent, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, TextStyle, TouchableOpacity, Alert, ImageStyle, View } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen, Text, TextField, Icon } from "../../components";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
import { MyButton } from "../../components/button/my-button";
import { isInternetAvailable, showAlert } from "../../utils/utils";
import Orientation from "react-native-orientation-locker";
import { NONE } from "apisauce";
import SmsAndroid from "react-native-get-sms-android";
import { requestPermission, SMS_PERMISSION } from "../../utils/app-permission";

export interface OTPScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const ROOT: ViewStyle = {
  justifyContent: "center",
  paddingStart: 25,
  paddingEnd: 25,
  flex: 1,
};
const RESET_PASSWORD: TextStyle = {
  color: color.palette.red,
  alignSelf: "center",
  marginTop: 25,
  fontSize: 20,
  padding: 10,
};

const TEXT_INVALID: TextStyle = {
  ...RESET_PASSWORD,
  fontSize: 15,
  textAlign: "center",
};

const CONTINUE: ViewStyle = {
  marginTop: 30,
  alignSelf: "center",
  paddingEnd: 10,
};

const btn_view: ViewStyle = {
  flexDirection: "row",
  alignSelf: "center",
};

export const OTPScreen: FunctionComponent<OTPScreenProps> = observer(props => {
  const { authStore } = useStores();
  // const [VerifyCode, onChangeVerifyCode] = useState("")
  // const [password, onChangePassword] = useState("")
  const [isValidVerifyCode, setValidVerifyCode] = useState(true);

  const [VerifyCode, onChangeVerifyCode] = useState(authStore.OTPCode);

  // const [VerifyCode, onChangeVerifyCode] = useState("services@afs")
  // const [password, onChangePassword] = useState("services092017")
  let passwordRef: any;

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  const onLogin = () => {
    try {
      const isConnected = isInternetAvailable();

      if (!VerifyCode) {
        setValidVerifyCode(false);
      }

      if (VerifyCode && isConnected) {
        if (VerifyCode === authStore.OTPCode) {
          //authStore.SetIsFirstLogin(false);
          // authStore.SetIsLoggedIn(true);
          authStore.VerifyUser(authStore.authorization);
          authStore.SetPasswordShouldChange(true);
        } else {
          authStore.SetIsFirstLogin(true);
          authStore.SetIsLoggedIn(false);
          authStore.SetOTPCode("");
          authStore.SetHasData(false);
        }
      }
    } catch (error) {
      showAlert("common.generalerror");
    }
  };

  const onResend = () => {
    try {
      const result = requestPermission(SMS_PERMISSION);
      if (result) {
        var seedrandom = require("seedrandom");
        var prng = new seedrandom();
        const code = prng()
          .toString()
          .substring(3, 9);

        authStore.SetOTPCode(code);

        SmsAndroid.autoSend(
          authStore.MobileNo,
          "Your OTP Code is : " + code.toString(),
          fail => {
            console.log("Failed with this error: " + fail);
          },
          success => {
            console.log("SMS sent successfully");
            console.log("code is", authStore.OTPCode);
          },
        );
      }
    } catch (error) {
      showAlert("common.generalerror");
    }
  };

  const onChangeText = text => {
    try {
      onChangeVerifyCode(text);
      text ? setValidVerifyCode(true) : setValidVerifyCode(false);
    } catch (error) {
      showAlert("common.generalerror");
    }
  };

  return (
    <Screen style={ROOT} preset="scroll" backgroundColor="black">
      <TextField
        labelTx={"OTPScreen.OTP"}
        returnKeyType={"next"}
        onSubmitEditing={() => {
          passwordRef.focus();
        }}
        blurOnSubmit={false}
        style={VerifyCode}
        errorTx={isValidVerifyCode ? undefined : "OTPScreen.errorOTP"}
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
          tx="OTPScreen.login"
          onPress={onLogin}
        />
        <MyButton
          style={CONTINUE}
          //isLoading={authStore.isLoginLoading}
          tx="OTPScreen.resend"
          onPress={onResend}
        />
      </View>
      {authStore.hasLoginError ? <Text style={TEXT_INVALID} tx="OTPScreen.InvalidCode" /> : NONE}
    </Screen>
  );
});
