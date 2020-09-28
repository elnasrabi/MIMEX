import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageStyle,
  Linking,
  Platform,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
// imports from components, themes and modals
import { Screen, Text } from "../../components";
import { MyButton } from "../../components/button/my-button";
import { BackButton } from "../../components/header/back-button";
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color, typography } from "../../theme";
import { callApi, isInternetAvailable } from "../../utils/utils";

export interface HelpScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const ROOT: ViewStyle = {
  justifyContent: "center",
  backgroundColor: color.palette.listBG,
};

const FLATLIST_STYLE: ViewStyle = {
  marginHorizontal: 10,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 15 : 40,
};
const ITEM_CONTAINER: ViewStyle = {
  marginBottom: 10,
};
const QUESTION_TEXT: TextStyle = {
  color: color.palette.black,
  fontSize: 22,
  fontFamily: typography.secondary,
};
const ANSWER_TEXT: TextStyle = {
  color: color.palette.lightGrey,
  fontSize: 22,
  fontFamily: typography.secondary,
};
const TECHNICAL_SUPPORT: TextStyle = {
  fontFamily: typography.secondary,
  fontSize: 16,
  fontWeight: "bold",
  paddingTop: 10,
  color: color.palette.black,
};
const HEADER_CONTAINER: ViewStyle = {
  paddingHorizontal: 10,
  marginRight: 5,
  paddingBottom: 30,
  backgroundColor: color.palette.white,
  borderColor: color.palette.black,
  borderWidth: 1,
  borderRadius: 4,
};
const HEADER_STYLE: ViewStyle = {
  flexDirection: "row",
};
const EMAIL_LOGO: ImageStyle = {
  height: 150,
  width: "100%",
};
const CALL_LOGO: ImageStyle = {
  height: 110,
  marginTop: 20,
  width: "100%",
};
const LOGO_TEXT: TextStyle = {
  color: color.palette.red,
  alignSelf: "center",
  fontFamily: typography.secondary,
  fontSize: 13,
};

export const HelpScreen: FunctionComponent<HelpScreenProps> = observer(props => {
  const { authStore } = useStores();
  const [Help, updateHelp] = useState([]);

  const UserType = authStore.userData[0].UserType;

  const { IssueStore } = useStores();

  if (UserType === "Bank") {
    authStore.IsBank(true);
  } else if (UserType === "Trader") {
    authStore.IsBank(false);
  }

  console.log("UserType", UserType);
  console.log("Is Bank", authStore.isBank);

  const onHomePress = () => {
    props.navigation.navigate("Home");
  };
  let uType;

  useEffect(() => {
    IssueStore.refreshHelpList();
    callHelpAPI();
  }, [authStore.isBank]);

  const callHelpAPI = async () => {
    const isConnected = await isInternetAvailable();
    if (isConnected) {
      getListApi();
    }
  };

  const getListApi = async () => {
    if (authStore.isBank) {
      uType = 1;
    } else if (!authStore.isBank) {
      uType = 2;
    }
    await IssueStore.getHelpList(UserType);

    if (IssueStore.responseHelpSuccess) {
      const arr = IssueStore.getHelpListData;

      updateHelp(arr);
    }
  };
  // const isFocusedOrientation = useIsFocused()
  const flatListdata = [
    {
      question: "helpScreen.resetpassword_q",
      answer: "helpScreen.resetpassword_a",
    },
    {
      question: "How do I scan a consignment number ?",
      answer:
        "From the home page, use the camera icon to scan a barcode which will prepopulate the search box.",
    },
    {
      question: "How do I see all my consignments ?",
      answer: "Use the My List Screen in combination with the drop down filters.",
    },
    {
      question: "How do I find my consignments for delivery ?",
      answer: "Use the My List screen filter and select “Undelivered today”.",
    },
    {
      question: "How do I add a Milestone ?",
      answer: "Use the Milestone button on the consignment then tap Milestone.",
    },
    {
      question: "How do I receive a sign on glass ?",
      answer:
        "Use the Milestone screen, select “Delivered” as the status and tap the signature box to capture a signature.Once signed tap on Save then hit the submit button to finalise",
    },
    {
      question: "How do I add multiple Milestones ?",
      answer: "Use the My List menu to select multiple consignments then tap Milestone.",
    },
  ];

  // const [fullScreen, setFullScreen] = useState(false)
  const renderItem = (item, index) => {
    return (
      <View style={ITEM_CONTAINER} key={index}>
        <View>
          <Text style={QUESTION_TEXT}>{item.Question}</Text>
        </View>
        <View>
          <Text style={ANSWER_TEXT}>{item.Answer}</Text>
        </View>
      </View>
    );
  };
  // const onEnterFullScreen = () => {
  //   return setFullScreen(true)
  // }
  // const onExitFullScreen = () => {
  //   return setFullScreen(false)
  // }
  // const renderHeader = () => {
  //   return (
  //     <View style={[FLATLIST_STYLE, fullScreen ? { height: Dimensions.get("screen").width - 100 } : { height: 250 }]}>
  //       <VideoPlayer
  //         pause={isFocusedOrientation ? false : true}
  //         source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" }}   // Can be a URL or a local file.
  //         // source={icons.demoVideo}   // Can be a URL or a local file.
  //         style={[fullScreen ? { backgroundColor: 'black', width: '100%' } : { height: 200, backgroundColor: 'black' }]}
  //         videoStyle={{ width: '100%' }}
  //         onEnterFullscreen={() => onEnterFullScreen()}
  //         onExitFullscreen={() => onExitFullScreen()}
  //         disableBack={true}
  //         fullscreen={Platform.OS == 'android' ? fullScreen : false}
  //         toggleResizeModeOnFullscreen={false}
  //         resizeMode={'contain'}
  //       />
  //     </View>
  //   )
  // }

  // useEffect(() => {
  //   if (isFocusedOrientation && fullScreen) {
  //     Orientation.unlockAllOrientations()
  //   }
  //   else {
  //     Orientation.lockToPortrait()
  //   }
  // }, [fullScreen])

  const renderFlatlistHeader = () => {
    return (
      <View style={HEADER_CONTAINER}>
        <Text style={TECHNICAL_SUPPORT} text={"Technical Support."} />
        <View style={HEADER_STYLE}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => Linking.openURL("mailto:support@CBOS.com.au")}
          >
            <Image source={icons.emailLogo} resizeMode="contain" style={EMAIL_LOGO} />
            <Text style={LOGO_TEXT}>{`support@CBOS.gov.sd`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => callApi("+249187056222")}>
            <Image source={icons.callLogo} resizeMode="contain" style={CALL_LOGO} />
            <Text style={[LOGO_TEXT, { marginTop: 20 }]}>{`+249187056222`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);
  const goBack = React.useMemo(
    () => () => {
      props.navigation.goBack();
    },
    [props.navigation],
  );

  return (
    <Screen
      style={ROOT}
      statusBar={"dark-content"}
      statusBarColor={color.palette.white}
      wall={"whiteWall"}
      preset="fixed"
    >
      {authStore.isLoggedIn ? (
        <MenuButton title={"helpScreen.header"} onPress={handleDrawer} />
      ) : (
        <BackButton title={"helpScreen.header"} onPress={goBack} />
      )}

      <View style={HEADER_CONTAINER}>
        <Text style={TECHNICAL_SUPPORT} text={"Technical Support."} />
        <View style={HEADER_STYLE}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => Linking.openURL("mailto:support@CBOS.com.au")}
          >
            <Image source={icons.emailLogo} resizeMode="contain" style={EMAIL_LOGO} />
            <Text style={LOGO_TEXT}>{`support@CBOS.gov.sd`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => callApi("+249187056222")}>
            <Image source={icons.callLogo} resizeMode="contain" style={CALL_LOGO} />
            <Text style={[LOGO_TEXT, { marginTop: 20 }]}>{`+249187056222`}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <FlatList
          //ListHeaderComponent={renderFlatlistHeader}
          ListHeaderComponentStyle={ITEM_CONTAINER}
          data={Help}
          renderItem={({ item, index }) => renderItem(item, index)}
          style={FLATLIST_STYLE}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>

      {authStore.isLoggedIn && !authStore.IsFirstLogin && authStore.IsMobileVerified ? (
        <MyButton imageBackground={icons.redButton2} tx={"common.home"} onPress={onHomePress} />
      ) : null}
    </Screen>
  );

  // Video component
  // return (
  //   <Screen style={fullScreen ? ROOT : {}} statusBar={fullScreen ? 'light-content' : 'dark-content'} statusBarColor={fullScreen ? color.palette.black : color.palette.white} wall={'whiteWall'} preset="fixed" backgroundColor={fullScreen ? "black" : ""}>
  //     {fullScreen ? null : (<MenuButton
  //       title={"helpScreen.header"}
  //       onPress={handleDrawer} />
  //     )}
  //     {renderHeader()}
  //     {fullScreen ? null :
  //       <FlatList
  //         data={flatListdata}
  //         renderItem={({ item, index }) => renderItem(item, index)}
  //         style={{ margin: 10, marginBottom: 0 }}
  //         keyExtractor={(item, index) => index.toString()}
  //       />}
  //   </Screen>
  // )
});
