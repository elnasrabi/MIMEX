import { ParamListBase } from "@react-navigation/native";
import { NONE } from "apisauce";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ImageStyle, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import SmsAndroid from "react-native-get-sms-android";
import Orientation from "react-native-orientation-locker";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Icon, Screen, Text, TextField } from "../../components";
import { MyButton } from "../../components/button/my-button";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
import { requestPermission, SMS_PERMISSION } from "../../utils/app-permission";
import { isInternetAvailable, showAlert } from "../../utils/utils";

export interface LoginScreenProps {
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

const USERNAME: TextStyle = { marginTop: 25 };
const CONTINUE: ViewStyle = {
  marginTop: 30,
  alignSelf: "center",
};

const AFS_LOGO: ImageStyle = {
  height: 120,
  width: 220,
  alignSelf: "center",
};
const TRUCK_LOGO: ImageStyle = {
  height: 120,
  width: 240,
  alignSelf: "center",
  marginTop: 50,
};
const INPUT_USERNAME = "username";
const INPUT_PASSWORD = "password";
export const LoginScreen: FunctionComponent<LoginScreenProps> = observer(props => {
  const { authStore } = useStores();
  // const [username, onChangeUsername] = useState("")
  // const [password, onChangePassword] = useState("")
  const [isValidUsername, setValidUsername] = useState(true);
  const [isValidPassword, setValidPassword] = useState(true);

  const [username, onChangeUsername] = useState("225943521729");
  const [password, onChangePassword] = useState("225943521729");

  // const [username, onChangeUsername] = useState("Buhga.Homoudi@BOK");
  // const [password, onChangePassword] = useState("123A123a");

  // const [username, onChangeUsername] = useState("Nazim.Ahmed@CBOS");
  // const [password, onChangePassword] = useState("123A123a");

  let passwordRef: any;

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  const onLogin = () => {
    try {
      const isConnected = isInternetAvailable();

      if (!username) {
        setValidUsername(false);
      }
      if (!password) {
        setValidPassword(false);
      }
      if (username && password && isConnected) {
        // console.log(JSON.stringify(isConnected, null, 2));
        authStore.login(username, password);

        if (!authStore.isBank && authStore.HasData) {
          if (authStore.IsFirstLogin && authStore.IsMobileVerified) {
            //authStore.SetIsFirstLogin(true);

            var seedrandom = require("seedrandom");
            var prng = new seedrandom();
            const code = prng()
              .toString()
              .substring(3, 9);

            let MobileNo = authStore.userData[0].MobileNo[0];

            authStore.SetMobileNo(MobileNo[0]);
            authStore.SetOTPCode(code);
            const result = requestPermission(SMS_PERMISSION);
            if (result) {
              SmsAndroid.autoSend(
                MobileNo[0],
                "Your OTP Code is : " + code.toString() + "sent to " + MobileNo[0],
                fail => {
                  console.log("Failed with this error: " + fail);
                },
                success => {
                  console.log("SMS sent successfully sent to " + MobileNo[0]);
                  console.log("code is", authStore.OTPCode);
                },
              );
            }
          }
        }
      }
    } catch (error) {
      showAlert("common.generalerror");
    }
  };

  const onChangeText = (type, text) => {
    try {
      if (type === INPUT_USERNAME) {
        onChangeUsername(text);
        text ? setValidUsername(true) : setValidUsername(false);
      } else {
        onChangePassword(text);
        text ? setValidPassword(true) : setValidPassword(false);
      }
    } catch (error) {
      showAlert("common.generalerror");
    }
  };

  const onResetPassword = () => {
    try {
      if (authStore.IsMobileVerified) {
        props.navigation.navigate("OTPForgotPassword");
      }
    } catch (error) {
      showAlert("common.generalerror");
    }

    // props.navigation.navigate("forgotpassword")
  };
  return (
    <Screen style={ROOT} preset="scroll" backgroundColor="black">
      <Icon style={AFS_LOGO} icon={"cbosLogo"} />
      <Icon style={TRUCK_LOGO} icon={"imexLogo"} />

      <TextField
        labelTx={"loginScreen.username"}
        returnKeyType={"next"}
        onSubmitEditing={() => {
          passwordRef.focus();
        }}
        blurOnSubmit={false}
        style={USERNAME}
        errorTx={isValidUsername ? undefined : "loginScreen.errorUsername"}
        placeholder={"Enter Username"}
        onChangeText={text => onChangeText(INPUT_USERNAME, text)}
        value={username}
        autoCorrect={false}
        autoCapitalize={"none"}
      />
      <TextField
        labelTx={"loginScreen.password"}
        forwardedRef={input => {
          passwordRef = input;
        }}
        returnKeyType={"done"}
        onSubmitEditing={onLogin}
        placeholder={"Enter Password"}
        errorTx={isValidPassword ? undefined : "loginScreen.errorPassword"}
        secureTextEntry={true}
        onChangeText={text => onChangeText(INPUT_PASSWORD, text)}
        value={password}
        autoCorrect={false}
        autoCapitalize={"none"}
      />
      <TouchableOpacity onPress={onResetPassword}>
        <Text style={RESET_PASSWORD} tx={"loginScreen.resetPassword"} />
      </TouchableOpacity>
      <MyButton
        style={CONTINUE}
        isLoading={authStore.isLoginLoading}
        tx="loginScreen.login"
        onPress={onLogin}
      />
      {authStore.hasLoginError ? (
        <Text style={TEXT_INVALID} tx="common.loginerror" />
      ) : !authStore.IsMobileVerified ? (
        <Text style={TEXT_INVALID} tx="errors.checkmobile" />
      ) : (
        NONE
      )}
    </Screen>
  );
});
