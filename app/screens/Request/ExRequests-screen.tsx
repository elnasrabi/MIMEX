import React, { FunctionComponent, useEffect, useState, useLayoutEffect } from "react";
import {  ParamListBase, useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { ViewStyle, View, ImageStyle, BackHandler, Keyboard, Alert,Button,TouchableOpacity ,TextStyle,Image} from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Screen, Icon ,Text} from "../../components";
import { MenuButton } from "../../components/header/menu-button";

import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color, typography } from "../../theme";
import { showAlert, isInternetAvailable, getJsonRequest } from "../../utils/utils";

import Orientation from "react-native-orientation-locker";
import { BottomButton } from "../../components/bottom-button/bottom-button";

import { ScrollView } from "react-native-gesture-handler";

const BOTTOM_VIEW: ViewStyle = { marginTop: 15, marginBottom: 15 };

export interface LandingScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const ROOT: ViewStyle = {
 
  flex: 1,
};

const CONTAINER: ViewStyle = {
  
  flex: 1,
  paddingStart: 15,
  paddingEnd: 15,
};


const Headr_View: ViewStyle = {
  
  marginBottom:15,
  marginTop:10,
  flex:1

};
const SEPERATOR_LINE: ViewStyle = {
  height: 5,
  backgroundColor: color.palette.black,
  width: "95%",
  marginLeft: 10,
  borderRadius: 5,
  marginTop:60,
};

const Header: TextStyle = {
  color: color.palette.black,
  flex: 1,
  fontSize: 16,
  marginTop:10,
  fontWeight: "bold",
  fontFamily: typography.primary,
};

const Operation_CONTAINER: ViewStyle = {
  justifyContent: "space-between",
  flex: 1,
  paddingStart: 25,
  paddingEnd: 25,
  flexDirection:"row",
  //backgroundColor:"#7fffd4"
  
};

const Contract_CONTAINER: ViewStyle = {
  justifyContent: "space-evenly",
  flex: 5,
  paddingStart: 5,
  paddingEnd: 5,
  flexDirection: "row",
  //backgroundColor:"#ffa07a"
};

const License_CONTAINER: ViewStyle = {
  justifyContent: "space-between",
  flex: 1,
  paddingStart: 25,
  paddingEnd: 25,
  flexDirection:"row",
  //backgroundColor:"#afeeee"
  
};

const BOTTOM_LIST: ViewStyle = {
  position: "absolute",
  bottom: 60,
  left: 5,
  right: 200,
  flexDirection: "row",
  justifyContent: "space-between",
};

const BOTTOM_LIST2: ViewStyle = {
  position: "absolute",
  bottom: 60,
  left: 200,
  right: 5,
  flexDirection: "row",
  justifyContent: "space-between",
};
const CONTINUE: ViewStyle = {

  flex: 1,
};

const IMAGE_RED: ImageStyle = {
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  height: 70,
  borderRadius: 10,
};

const SEARCH_VIEW: ViewStyle = {
  // marginEnd: 55
};

const Add_Request_Image: ImageStyle = {
  alignSelf: "center",
 
};

const CONTAINER_AFS_LOGO: ImageStyle = {
  position: "absolute",
  top: 60,
  alignSelf: "center",
};

// const dataList = ["landingScreen.myList", "landingScreen.safetyCheck", "landingScreen.getRate"]
// const dataList = ["landingScreen.myList", "landingScreen.getRate"]
const dataList = ["landingScreen.ImForm"];
const dataList2 = ["landingScreen.ExForm"];
let isConnected = true;

export const MyExRequests: FunctionComponent<LandingScreenProps> = observer(props => {
  const { ExFormStore,ImFormStore, homeStore, authStore} = useStores();
  const [searchValue, onSearchValue] = useState("1307201600024");
  // const [searchValue, onSearchValue] = useState("")
  const [isValidSearch, onValidSearch] = useState(true);
  const [isGoPressed, setIsOnGoPress] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    onValidSearch(true);
  }, [isFocused]);

  useEffect(() => {
    Orientation.lockToPortrait();
  });



  const OnViewLicense = async () => {
    try {

      props.navigation.navigate('License')
   
    } catch (error) {
      showAlert("ExRequests.error")
    }

    

  };

  const OnViewContract = async () => {
    try {

      props.navigation.navigate('Contract')
   
    } catch (error) {
      showAlert("ExRequests.error")
    }

   

  };


  const OnViewPayment = async () => {
    try {

      authStore.SetIsIm(false);
    
      props.navigation.navigate('Payment')
   
    } catch (error) {
      showAlert("ExRequests.error")
    }

 
 
   };

   const OnViewClaimSettlement= async () => {
    try {

      authStore.SetIsIm(false);
    
    props.navigation.navigate('ClaimSettlement')
   
    } catch (error) {
      showAlert("ExRequests.error")
    }


 
   };

   const OnViewExForm = async () => {
    try {

      authStore.SetIsIm(false);
    
      props.navigation.navigate('ExForm')
   
    } catch (error) {
      showAlert("ExRequests.error")
    }

    
 
   };

   const OnViewClaim = async () => {
    try {

       
      props.navigation.navigate('Claim')
   
    } catch (error) {
      showAlert("ExRequests.error")
    }

   

 
   };

   const OnViewIssue = async () => {
    try {

      authStore.SetIsIm(true);
    
      props.navigation.navigate('Issue')
   
    } catch (error) {
      showAlert("ExRequests.error")
    }


 
   };





  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation]);


  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);

  
 

  return (
    <ScrollView>
    <Screen
   
      style={ROOT}
      statusBar={"dark-content"}
      statusBarColor={color.palette.white}
      sync={ImFormStore.sync}
      wall={"whiteWall"}
      preset="scroll"
    >
      <MenuButton hasBackground={false} onPress={handleDrawer} />
      <View style={CONTAINER}>
      

      <View style={Headr_View}>
            <Text style={Header} tx={"ExRequests.contracttask"} />
          </View>

          <View style={Contract_CONTAINER}>
            <Text style={Header} tx={"ExRequests.viewcontract"} />
            <TouchableOpacity onPress={OnViewContract}>
              <Image style={Add_Request_Image} source={icons.viewrequest} />
            </TouchableOpacity>
            <Text style={Header} tx={"ExRequests.viewLicense"} />
            <TouchableOpacity onPress={OnViewLicense}>
              <Image style={Add_Request_Image} source={icons.viewrequest} />
            </TouchableOpacity>
          </View>

        <View style={SEPERATOR_LINE} />
     
      
        <View style={Headr_View}>
            <Text style={Header} tx={"ExRequests.formtask"} />
          </View>

          <View style={Contract_CONTAINER}>
            <Text style={Header} tx={"ExRequests.exform"} />
            <TouchableOpacity onPress={OnViewExForm}>
              <Image style={Add_Request_Image} source={icons.viewrequest} />
            </TouchableOpacity>
            <Text style={Header} tx={"ExRequests.payment"} />
            <TouchableOpacity onPress={OnViewPayment}>
              <Image style={Add_Request_Image} source={icons.viewrequest} />
            </TouchableOpacity>
          </View>
     <View style={SEPERATOR_LINE} />

     <View style={Headr_View}>
            <Text style={Header} tx={"ExRequests.claimtask"} />
          </View>

          <View style={Contract_CONTAINER}>
            <Text style={Header} tx={"ExRequests.claim"} />
            <TouchableOpacity onPress={OnViewClaim}>
              <Image style={Add_Request_Image} source={icons.viewrequest} />
            </TouchableOpacity>
            <Text style={Header} tx={"ExRequests.claimsettlement"} />
            <TouchableOpacity onPress={OnViewClaimSettlement}>
              <Image style={Add_Request_Image} source={icons.viewrequest} />
            </TouchableOpacity>
          </View>



      </View>

      
      <View style={BOTTOM_VIEW}>
       <BottomButton
        hideLeftButton={true}
        rightImage={icons.redButton2}
        onRightPress={() => goBack()}
        rightText={"common.back"}
      />
      
      </View>
  

    </Screen>
    </ScrollView>
  );
});
