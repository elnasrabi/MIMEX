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

export interface ChangePasswordProps {
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
export const ChangePassword: FunctionComponent<ChangePasswordProps> = observer(props => {
  const { authStore } = useStores();
  // const [ConfirmPassword, onChangeConfirmPassword] = useState("")
  // const [password, onChangePassword] = useState("")
  const [isValidConfirmPassword, setValidConfirmPassword] = useState(true);
  const [isValidPassword, setValidPassword] = useState(true);
  const [isPasswordMatched, setPasswordMatched] = useState(false);

  const [password, onChangePassword] = useState("123K123k");

  const [ConfirmPassword, onChangeConfirmPassword] = useState("123K123k");
  // const [ConfirmPassword, onChangeConfirmPassword] = useState("services@afs")
  // const [password, onChangePassword] = useState("services092017")
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
        // console.log(JSON.stringify(isConnected, null, 2));
        authStore.ChangePassword(authStore.userData[0].LoginName[0], password, ConfirmPassword);

        if (!!authStore.IsPasswordChanged) {
          showAlert("ChangePassword.success");
        } else {
          showAlert("ChangePassword.fail");
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
        onChangePassword(text);
        text ? setValidPassword(true) : setValidPassword(false);
      }
    } catch (error) {
      showAlert("common.generalerror");
    }
  };

  return (
    <Screen style={ROOT} preset="scroll" backgroundColor="black">
      <TextField
        labelTx={"ChangePassword.password"}
        returnKeyType={"next"}
        onSubmitEditing={() => {
          passwordRef.focus();
        }}
        style={ConfirmPassword_Style}
        errorTx={isValidPassword ? undefined : "ChangePassword.errorPassword"}
        placeholder={"Enter Password"}
        onChangeText={text => onChangeText(INPUT_PASSWORD, text)}
        value={password}
        secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize={"none"}
      />
      <TextField
        labelTx={"ChangePassword.confirmpassword"}
        forwardedRef={input => {
          passwordRef = input;
        }}
        returnKeyType={"done"}
        onSubmitEditing={onConfirmSubmit}
        placeholder={"Confirm Password"}
        errorTx={isPasswordMatched ? undefined : "ChangePassword.notmatched"}
        secureTextEntry={true}
        onChangeText={text => onChangeText(INPUT_ConfirmPassword, text)}
        value={ConfirmPassword}
        autoCorrect={false}
        autoCapitalize={"none"}
      />
      <MyButton
        style={CONTINUE}
        isLoading={authStore.isLoginLoading}
        tx="ChangePassword.change"
        onPress={onChange}
        //disabled={!isPasswordMatched}
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
