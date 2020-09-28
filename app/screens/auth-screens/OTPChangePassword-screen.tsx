import { ParamListBase } from "@react-navigation/native";
import { NONE } from "apisauce";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useEffect, useState } from "react";
import { TextStyle, ViewStyle } from "react-native";
import Orientation from "react-native-orientation-locker";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen, Text, TextField } from "../../components";
import { MyButton } from "../../components/button/my-button";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";
import { isInternetAvailable, showAlert } from "../../utils/utils";

export interface OTPChangePasswordProps {
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

const ConfirmPassword_Style: TextStyle = { marginTop: 25 };
const CONTINUE: ViewStyle = {
  marginTop: 30,
  alignSelf: "center",
};

const INPUT_ConfirmPassword = "ConfirmPassword";
const INPUT_PASSWORD = "password";
const INPUT_UserName = "username";
export const OTPChangePassword: FunctionComponent<OTPChangePasswordProps> = observer(props => {
  const { authStore } = useStores();
  // const [ConfirmPassword, onChangeConfirmPassword] = useState("")
  // const [password, onOTPChangePassword] = useState("")
  const [isValidConfirmPassword, setValidConfirmPassword] = useState(true);
  const [isValidPassword, setValidPassword] = useState(true);

  const [isValidUserName, setValidUserName] = useState(true);
  const [isPasswordMatched, setPasswordMatched] = useState(false);
  const [UserName, onOTPChangeUserName] = useState("");

  const [password, onOTPChangePassword] = useState("123M123m");

  const [ConfirmPassword, onChangeConfirmPassword] = useState("123M123m");
  // const [ConfirmPassword, onChangeConfirmPassword] = useState("services@afs")
  // const [password, onOTPChangePassword] = useState("services092017")
  let passwordRef: any;

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  const onConfirmSubmit = () => {
    try {
      if (password === ConfirmPassword) {
        setPasswordMatched(true);
      }
    } catch (error) {
      showAlert("common.generalerror");
    }
  };

  const onChange = () => {
    try {
      const isConnected = isInternetAvailable();

      if (password === ConfirmPassword) {
        setPasswordMatched(true);
      }

      if (!ConfirmPassword) {
        setValidConfirmPassword(false);
      }
      if (!password) {
        setValidPassword(false);
      }
      if (ConfirmPassword && password && isConnected && !!isPasswordMatched) {
        let loginname = authStore.userInfo[0].LoginName[0];
        authStore.OTPChangePassword(loginname, password, ConfirmPassword);

        if (!!authStore.IsPasswordChanged) {
          showAlert("OTPChangePassword.success");
          props.navigation.navigate("login");
        } else {
          showAlert("OTPChangePassword.fail");
        }
      }
    } catch (error) {
      showAlert("common.generalerror");
    }
  };

  const onChangeText = (type, text) => {
    try {
      if (type === INPUT_ConfirmPassword) {
        onChangeConfirmPassword(text);
        text ? setValidConfirmPassword(true) : setValidConfirmPassword(false);

        if (password.toString().trim() !== ConfirmPassword.toString().trim()) {
          setPasswordMatched(false);
        } else if (password.toString().trim() === ConfirmPassword.toString().trim()) {
          setPasswordMatched(true);
        }
      } else if (type === INPUT_PASSWORD) {
        onOTPChangePassword(text);
        text ? setValidPassword(true) : setValidPassword(false);
      } else if (type === INPUT_UserName) {
        onOTPChangeUserName(text);
        text ? setValidUserName(true) : setValidUserName(false);
      }
    } catch (error) {
      showAlert("common.generalerror");
    }
  };

  return (
    <Screen style={ROOT} preset="scroll" backgroundColor="black">
      <TextField
        labelTx={"OTPChangePassword.password"}
        returnKeyType={"next"}
        onSubmitEditing={() => {
          passwordRef.focus();
        }}
        style={ConfirmPassword_Style}
        errorTx={isValidPassword ? undefined : "OTPChangePassword.errorPassword"}
        placeholder={"Enter Password"}
        onChangeText={text => onChangeText(INPUT_PASSWORD, text)}
        value={password}
        secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize={"none"}
      />
      <TextField
        labelTx={"OTPChangePassword.confirmpassword"}
        forwardedRef={input => {
          passwordRef = input;
        }}
        returnKeyType={"done"}
        onSubmitEditing={onConfirmSubmit}
        placeholder={"Confirm Password"}
        errorTx={isPasswordMatched ? undefined : "OTPChangePassword.notmatched"}
        secureTextEntry={true}
        onChangeText={text => onChangeText(INPUT_ConfirmPassword, text)}
        value={ConfirmPassword}
        autoCorrect={false}
        autoCapitalize={"none"}
      />
      <MyButton
        style={CONTINUE}
        isLoading={authStore.isLoginLoading}
        tx="OTPChangePassword.change"
        onPress={onChange}
        //disabled={!isPasswordMatched}
      />
      {isPasswordMatched ? (
        <Text style={TEXT_INVALID} tx="OTPChangePassword.invalidUsernamePassword" />
      ) : !authStore.IsMobileVerified ? (
        <Text style={TEXT_INVALID} tx="errors.checkmobile" />
      ) : (
        NONE
      )}
    </Screen>
  );
});
