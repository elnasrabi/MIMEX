import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageStyle,
  PermissionsAndroid,
  Platform,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import Pdf from "react-native-pdf";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen, Text } from "../../components";
import { BackButton } from "../../components/header/back-button";
import { useStores } from "../../models/root-store";
import { color } from "../../theme";

export interface PDFViewerProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  source: any;
}
const ROOT: ViewStyle = {
  flex: 1,
};
const buttonStyle: ViewStyle = {
  backgroundColor: "#307ecc",

  borderColor: "#307ecc",
  alignItems: "center",

  marginTop: 60,
  marginStart: 60,
  marginEnd: 60,
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
const downloadBtn: ViewStyle = {
  flex: 1,
  padding: 10,
};
const PDF_VIEW: ViewStyle = {
  flex: 1,
  marginTop: Platform.OS == "android" ? 20 : isIphoneX() ? 10 : 33,
};
const PROGRESS: ViewStyle = {
  alignSelf: "center",
  flex: 1,
};
const Add_Request_Image: ImageStyle = {
  padding: 50,
  alignSelf: "center",
};
//const source = "http://samples.leanpub.com/thereactnativebook-sample.pdf";

export const PDFViewer: FunctionComponent<PDFViewerProps> = observer(props => {
  const [isLoading, setLoading] = useState(true);
  const { authStore, DocumentStore } = useStores();
  const source = { uri: "data:application/pdf;base64," + DocumentStore.DocumentDetail };
  const source2 = { uri: "data:application/pdf;base64,JVBERi0xLjcKJc..." };
  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);

  //const { dirs } = RNFetchBlob.fs;

  const downloadFile = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      var RNFetchBlob = require("rn-fetch-blob").default;

      const DocumentDir = RNFetchBlob.fs.dirs.DownloadDir;
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let pdfLocation = DocumentDir + "/" + DocumentStore.DocumentName + ".pdf";

        RNFetchBlob.fs.writeFile(pdfLocation, DocumentStore.DocumentDetail, "base64");

        Alert.alert("Saved!", "find it in " + pdfLocation);
      } else {
        Alert.alert(
          "Permission Denied!",
          "You need to give storage permission to download the file",
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Screen
      statusBarColor={color.palette.white}
      statusBar={"dark-content"}
      wall={"whiteWall"}
      style={ROOT}
      preset="fixed"
    >
      <BackButton title={"common.pdfViewer"} onPress={goBack} />

      {isLoading ? (
        <ActivityIndicator style={PROGRESS} size={"large"} color={color.palette.darkText} />
      ) : null}
      {/* <View
        style={{
          height: 35,
          paddingHorizontal: 5,
          justifyContent: "center",
          marginTop: Platform.OS == "android" ? 3 : -8,
        }}
      >
        <TouchableOpacity onPress={downloadFile}>
          <Image
            style={{ width: 15, height: 18, tintColor: color.palette.darkText }}
            source={icons.downArrow}
          />
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity style={buttonStyle} activeOpacity={0.5} onPress={downloadFile}>
        <Text tx={"Document.download"} style={[buttonTextStyle]} />
      </TouchableOpacity>
      <Pdf
        style={PDF_VIEW}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          setLoading(false);
        }}
      />
    </Screen>
  );
});
