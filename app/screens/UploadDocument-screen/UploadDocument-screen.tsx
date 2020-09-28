/* Example to Pick and Upload files in React Native */
/* https://aboutreact.com/file-uploading-in-react-native/ */

import { ParamListBase, useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Platform, SafeAreaView, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import DocumentPicker from "react-native-document-picker";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import SearchableDropdown from "react-native-searchable-dropdown";
import { Text, TextField } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { IssueText } from "../../components/text-field/Issue-Text";
import { useStores } from "../../models/root-store";
import { Api } from "../../services/api";
import { color } from "../../theme";
import { isInternetAvailable, showAlert } from "../../utils/utils";

export interface UploadDocumentProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const TextFiled_VIEW: ViewStyle = { flexDirection: "row", marginTop: 15 };
const ITEM_LABEL: TextStyle = { color: color.palette.darkText, marginEnd: 10 };
const Hint_LABEL: TextStyle = { color: color.palette.link, marginEnd: 10, fontSize: 10 };
const File_Info_LABEL: TextStyle = { color: color.palette.orangeDarker, padding: 10, fontSize: 12 };
const TEXT_VALUE: TextStyle = { color: color.palette.link };
const DETAIL_VIEW: ViewStyle = { flexDirection: "row", marginTop: 15 };
const ImForm_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33,
};
const mainBody: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  padding: 20,
};
const buttonStyle: ViewStyle = {
  backgroundColor: "#307ecc",
  borderWidth: 0,
  borderColor: "#307ecc",
  height: 40,
  alignItems: "center",
  borderRadius: 30,
  marginLeft: 35,
  marginRight: 35,
  marginTop: 15,
};

const Bottom_View: ViewStyle = {
  marginStart: 20,
  marginEnd: 20,
  marginTop: 25,
};
const buttonTextStyle: TextStyle = {
  paddingVertical: 10,
  fontSize: 16,
  color: color.palette.offWhite,
};
const textStyle: TextStyle = {
  backgroundColor: "#fff",
  fontSize: 15,
  marginTop: 16,
  marginLeft: 35,
  marginRight: 35,
  textAlign: "center",
};

export const UploadDocument: FunctionComponent<UploadDocumentProps> = observer(props => {
  const { ContractRequestStore, authStore, LookupStore } = useStores();
  const isFocused = useIsFocused();

  const gotoHome = () => {
    // formikRef.current.resetForm();
    // setDate(new Date());
    return props.navigation.navigate("Home");
  };
  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);
  const api = new Api();
  api.setup();

  let [singleFile, setSingleFile] = useState(null);
  const [code, setCode] = useState(ContractRequestStore.DocumentCode[0]);
  const [isValidCode, setValidCode] = useState(true);
  const [RelatedObject, setRelatedObject] = useState("");
  const [RelatedObjectID, setRelatedObjectID] = useState(
    parseInt(ContractRequestStore.DocumentType),
  );

  const [DocumenDesc, setDocumenDesc] = useState("");
  const [DocumentSize, setDocumentSize] = useState(0);
  const [LoginName, setLoginName] = useState("");
  const [RelatedObjectList, UpdateRelatedObjectList] = useState([]);
  const [isValidRelatedObject, setValidRelatedObject] = useState(false);
  const [isValidDocumentDesc, setValidValidDocumentDesc] = useState(true);

  const callRelatedObjectAPI = async () => {
    const isConnected = await isInternetAvailable();
    if (isFocused && isConnected) {
      LookupStore.GetRelatedObject(authStore.authorization);
      UpdateRelatedObjectList(LookupStore.RealtedObjectList);

      console.log("SelectedRelatedObjectID", ContractRequestStore.DocumentType);
    }
  };

  useEffect(() => {
    callRelatedObjectAPI();
  }, [isFocused]);

  const onChangeRelatedObjectName = text => {
    text ? setValidRelatedObject(true) : setValidRelatedObject(false);
    setRelatedObject(text);
  };

  const onChangeCode = text => {
    text ? setValidCode(true) : setValidCode(false);
    setCode(text);
  };
  const onChangeDocumentDesc = text => {
    text ? setValidValidDocumentDesc(true) : setValidValidDocumentDesc(false);
    setDocumenDesc(text);
  };

  const onChangeRelatedObjectID = item => {
    let relatedobjectname = item.name;
    let relatedobjectid = item.id;

    relatedobjectname ? setValidRelatedObject(true) : setValidRelatedObject(false);

    setRelatedObjectID(relatedobjectid);
    setRelatedObject(relatedobjectname);
  };

  let uploadFile = async () => {
    //postData(singleFile.uri,singleFile,singleFile.uri);

    //Check if any file is selected or not
    if (singleFile != null && DocumentSize > 0 && DocumentSize < 700000) {
      //If file selected then create FormData
      const fileToUpload = singleFile;

      try {
        //  const response =ContractRequestStore.UploadDocument(code,data);
        const data = new FormData();

        data.append("file", fileToUpload);
        let loginname = authStore.userData[0].LoginName[0];

        if (
          isValidCode &&
          isValidDocumentDesc &&
          isValidRelatedObject &&
          DocumenDesc.length > 0 &&
          code.length > 0
        ) {
          ContractRequestStore.UploadDocument(code, RelatedObjectID, DocumenDesc, loginname, data);
        } else {
          showAlert("Document.completeform");
        }

        if (ContractRequestStore.isDocumentUploaded === true) {
          showAlert("Document.success");
          setSingleFile(null);
          setDocumenDesc("");
        }
      } catch (error) {
        console.log("data uplaod error", error.text());
      }
    } else {
      //if no file selected the show alert
      showAlert("Document.selectfirst");
    }
  };

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);

  let selectFile = async () => {
    //Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        //Provide which type of file you want user to pick
        type: [DocumentPicker.types.pdf],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log("res : " + JSON.stringify(res));
      //Setting the state to show single file attributes
      setSingleFile(res);
      setDocumentSize(res.size);
    } catch (err) {
      setSingleFile(null);
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        showAlert("Document.cancelselect");
      } else {
        //For Unknown Error
        showAlert("Document.errorselect" + JSON.stringify(err));
        throw err;
      }
    }
  };
  return (
    <View style={mainBody}>
      <MenuButton hasBackground={false} onPress={handleDrawer} />
      <View style={{ flex: 1 }}>
        <Text tx={"Document.filetype"} style={[Hint_LABEL]} />
        <TouchableOpacity style={buttonStyle} activeOpacity={0.5} onPress={selectFile}>
          <Text tx={"Document.select"} style={[buttonTextStyle]} />
        </TouchableOpacity>
        {singleFile != null ? (
          <Text style={File_Info_LABEL}>
            File Name: {singleFile.name ? singleFile.name : ""}
            {"\n"}
            File Size: {singleFile.size ? singleFile.size + " bytes." : ""}
          </Text>
        ) : null}
        <View style={TextFiled_VIEW}>
          <Text tx={"Document.relatedobject"} style={[ITEM_LABEL]} />
        </View>
        <SafeAreaView style={TextFiled_VIEW}>
          <SearchableDropdown
            setSort={(item, searchedText) => item.name.startsWith(searchedText)}
            onTextChange={text => onChangeRelatedObjectName(text)}
            //On text change listner on the searchable input
            onItemSelect={item => onChangeRelatedObjectID(item)}
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
            items={RelatedObjectList}
            //mapping of item array
            defaultIndex={parseInt(ContractRequestStore.DocumentType)}
            //default selected item index
            placeholder="Tab to search..."
            //place holder for the search input
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            //To remove the underline from the android input
          />
        </SafeAreaView>
        <View style={TextFiled_VIEW}>
          <Text tx={"Document.code"} style={[ITEM_LABEL]} />
        </View>
        <TextField
          inputStyle={TEXT_VALUE}
          errorTx={isValidCode ? undefined : "Document.entercode"}
          onChangeText={text => onChangeCode(text)}
          value={code}
        />
        <View style={DETAIL_VIEW}>
          <Text tx={"Document.documentdesc"} style={[ITEM_LABEL]} />
        </View>

        <IssueText
          inputStyle={TEXT_VALUE}
          multiline={true}
          numberOfLines={3}
          errorTx={isValidDocumentDesc ? undefined : "Document.enterdesc"}
          onChangeText={text => onChangeDocumentDesc(text)}
          value={DocumenDesc}
        />
        <TouchableOpacity style={buttonStyle} activeOpacity={0.5} onPress={uploadFile}>
          <Text tx={"Document.upload"} style={[buttonTextStyle]} />
        </TouchableOpacity>
        <View style={Bottom_View}>
          <BottomButton
            hideLeftButton={true}
            rightImage={icons.redButton2}
            onRightPress={() => goBack()}
            rightText={"common.back"}
          />
        </View>
      </View>
      {/*Showing the data of selected Single file*/}
    </View>
  );
});
