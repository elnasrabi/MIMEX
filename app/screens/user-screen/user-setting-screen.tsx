import { ParamListBase } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import {
  Platform, ScrollView, TextStyle,
  View, ViewStyle
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
// imports from components, themes and modals
import { Screen, Text } from "../../components";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { useStores } from "../../models/root-store";
import { color, typography } from "../../theme";

export interface UserSettingProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
// const TEXTINPUT_VIEW: ViewStyle = {
//   flex: 1,
//   width: "100%"
// };
const ROOT: ViewStyle = {
  paddingBottom: 10,
};
// const LABEL: TextStyle = {
//   color: color.palette.black,
//   fontSize: 16,
//   fontWeight: "bold",
//   fontFamily: typography.secondary
// };
const EMAIL_VALUE: TextStyle = {
  color: color.palette.link,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary,
  marginTop: 5,
};
const EMAIL_TEXT: TextStyle = {
  color: color.palette.black,
  flex: 1,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary,
};
// const SCROLLVIEW: ViewStyle = {
//   marginBottom: 10,
//   marginTop: Platform.OS == 'android' ? 40 : isIphoneX() ? 0 : 23
// };
const EMAIL_VIEW: ViewStyle = {
  marginStart: 20,
  marginEnd: 20,
  marginTop: 20,
};
// const FIELD_CONTAINER: ViewStyle = {
//   flex: 1,
//   justifyContent: 'center'
// };
// const CHILDREN: ViewStyle = {
//   paddingHorizontal: 10,
//   justifyContent: 'center',
//   flex: 1,
//   borderWidth: 1,
//   borderColor: color.palette.lighterGrey,
//   borderRadius: 4,
//   height: 40,
//   backgroundColor: color.palette.white
// };
// const FIELD_MAIN_CONTAINER: ViewStyle = {
//   flexDirection: 'row',
//   paddingHorizontal: 20,
//   marginTop: 15
// };
// const ERROR_TEXT: TextStyle = {
//   color: color.palette.red,
//   fontFamily: typography.secondary,
//   alignSelf: 'flex-end',
//   paddingRight: 20
// }
const VALUE_CONTAINER: ViewStyle = { flex: 1 };
const LABEL: TextStyle = {
  color: color.palette.black,
  alignSelf: "center",
  flex: 1,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary,
};
const VALUE: TextStyle = {
  color: color.palette.link,
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "right",
  fontFamily: typography.secondary,
};
const ROW: ViewStyle = {
  flexDirection: "row",
  marginStart: 20,
  marginEnd: 20,
  marginTop: 20,
};
const SCROLLVIEW_STYLE: ViewStyle = {
  marginBottom: 10,
  marginTop: Platform.OS == "android" ? 40 : isIphoneX() ? 0 : 23,
};


// const FIELD_CONTAINER: ViewStyle = {
//   flex: 1,
//   justifyContent: 'center'
// };
// const CHILDREN: ViewStyle = {
//   paddingHorizontal: 10,
//   justifyContent: 'center',
//   flex: 1,
//   borderWidth: 1,
//   borderColor: color.palette.lighterGrey,
//   borderRadius: 4,
//   height: 40,
//   backgroundColor: color.palette.white
// };
// const FIELD_MAIN_CONTAINER: ViewStyle = {
//   flexDirection: 'row',
//   paddingHorizontal: 20,
//   marginTop: 15
// };
// const ERROR_TEXT: TextStyle = {
//   color: color.palette.red,
//   fontFamily: typography.secondary,
//   alignSelf: 'flex-end',
//   paddingRight: 20
// }


const FLAT_LIST: ViewStyle = {
  padding: 25,
  borderColor: color.palette.darkText,
  borderWidth: 2,
  margin: 5,
  marginTop:20,
  borderRadius: 3,
  backgroundColor: color.palette.listBG,
};
const FLAT_LIST_VIEW: ViewStyle = { flex:1};
const IssueId_View: ViewStyle = { flexDirection: "row"  , justifyContent:"space-evenly"};
const IssueID: ViewStyle = { flex: 1 };
const IssueDesc: ViewStyle = { flex: 1 };
const IssueDesc_Value: TextStyle = { flex: 1, color: color.palette.red }
const IssueID_Value: TextStyle = { flex: 1, color: color.palette.red }
const Form_Date_VIEW: ViewStyle = { flexDirection: "row" };
const Form_Date_LABEL: TextStyle = { marginEnd: 5, color: color.palette.darkText, flex: 1 };
const Form_Date_VALUE: TextStyle = { marginEnd: 5, flex: 1, color: color.palette.link };
const Bank_Branch_VIEW: ViewStyle = { flexDirection: "row" };
const Bank_Branch_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };
const Bank_Branch_VALUE: TextStyle = { marginEnd: 15, flex: 1, color: color.palette.link };
const ITEM_LABEL: TextStyle = { color: color.palette.darkText, marginEnd: 5 };
const ClientStatustatus_View: ViewStyle = { flexDirection: "row", flex: 1 };
const ClientStatustatus_LABEL: TextStyle = { marginEnd: 10, color: color.palette.darkText, flex: 1 };
const ClientStatustatus_VALUE: TextStyle = { marginEnd: 10, flex: 1, color: color.palette.red };
const VOLUME_VIEW: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  marginStart: 10,
  justifyContent: "flex-end",
};
const SEPERATOR_LINE: ViewStyle = {
  height: 5,
  backgroundColor: color.palette.black,
  width: "95%",
  marginLeft: 10,
  borderRadius: 5,
};
const WEIGHT_LABEL: TextStyle = { marginEnd: 10, color: color.palette.darkText };
const STATUS: TextStyle = { color: color.palette.link };
const TEXT_VIEW: ViewStyle = {flex:1, marginBottom:10,flexDirection: "row",justifyContent:"space-between" };
const FullNameArabicStyle: ViewStyle = {flex:1,marginBottom:10,justifyContent:"space-between" };

const TEXT_VALUE: TextStyle = { color: color.palette.link };
const TEXT_LABEL: TextStyle = { marginEnd: 15, color: color.palette.darkText, flex: 1 };


export const UserSetting: FunctionComponent<UserSettingProps> = observer(props => {
  // const isFocused = useIsFocused();
  // const [date, setDate] = useState(new Date());
  // const [show, setShow] = useState(false);
  // const currentRef: any[] = [];
  // const formikRef = useRef();
  const { authStore } = useStores();
  
  const userData = authStore.userData[0];
 
  // useEffect(() => {
  //   if (isFocused) {
  //     if (Platform.OS === 'ios') {
  //       KeyboardManager.setToolbarPreviousNextButtonEnable(true);
  //     }
  //   }
  // }, [isFocused])

  // const hideDatePicker = () => {
  //   setShow(false);
  // };

  // const handleConfirm = (date) => {
  //   setShow(Platform.OS === 'ios');
  //   setDate(date);
  //   hideDatePicker();
  // };

  const gotoHome = () => {
    // formikRef.current.resetForm();
    // setDate(new Date());
    return props.navigation.navigate("Home");
  };

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [
    props.navigation,
  ]);

  // const RenderDetails = ({ handleChange, handleKey, keyValue, values, errors, label, hasExtraText = false, ...rest }) => {
  //   return (
  //     <FieldWrapper
  //       errors={errors}
  //       hasExtraText={hasExtraText}
  //       label={label}
  //     >
  //       <TextInput
  //         key={keyValue}
  //         onChangeText={handleChange(handleKey)}
  //         style={VALUE}
  //         autoCapitalize={"none"}
  //         returnKeyType={'next'}
  //         value={values}
  //         autoCorrect={false}
  //         blurOnSubmit={false}
  //         ref={(input) => {
  //           currentRef.push(input)
  //         }}
  //         onSubmitEditing={() => {
  //           if (currentRef[keyValue + 1]) {
  //             currentRef[keyValue + 1].focus()
  //           } else {
  //             // Click on save button
  //           }
  //         }}
  //         {...rest}
  //       />
  //     </FieldWrapper>
  //   )
  // }

  // const FieldWrapper = ({ children, label, hasExtraText, errors }) => {
  //   return (
  //     <View>
  //       <View style={FIELD_MAIN_CONTAINER}>
  //         <View style={FIELD_CONTAINER}>
  //           <Text tx={label} style={LABEL} extraText={hasExtraText ? ':' : ''} />
  //         </View>
  //         <View style={CHILDREN}>
  //           {children}
  //         </View>
  //       </View>
  //       {errors &&
  //         <Text style={ERROR_TEXT}>{errors}</Text>}
  //     </View>
  //   )
  // }

  const renderRow = (label, value) => {
    return (
      <View style={ROW}>
        <Text style={LABEL} text={label} />
        <View style={VALUE_CONTAINER}>
          <Text style={VALUE} text={value ? value : "-"} />
        </View>
      </View>
    );
  };
  return (
    <Screen
      style={ROOT}
      statusBar={"dark-content"}
      statusBarColor={color.palette.white}
      wall={"whiteWall"}
      preset="fixed"
    >
      <MenuButton title={"userSetting.header"} onPress={handleDrawer} />
      <ScrollView style={SCROLLVIEW_STYLE}>
        {/* <View style={EMAIL_VIEW}>
          <Text extraText={":"} style={EMAIL_TEXT} tx={"userSetting.email"} />
          <Text style={EMAIL_VALUE} text={userData.email[0] ? userData.email[0] : "-"} />
        </View> */}
      
        <View  style={FLAT_LIST}>
      <View style={FullNameArabicStyle}>
        <View style={TEXT_VIEW}> 
      <Text extraText={":"} tx={"userSetting.name"} style={Form_Date_LABEL} preset={"normal"} />
        </View>
        <View style={TEXT_VIEW}> 
        <Text style={Form_Date_VALUE} preset={"normal"}>
          {userData.FullName[0]}
        </Text>
        </View>
        {/* <View style={SEPERATOR_LINE} /> */}
        </View>

        <View style={FullNameArabicStyle}>
        <View style={TEXT_VIEW}> 
        <Text extraText={":"} tx={"userSetting.loginname"} style={ClientStatustatus_LABEL} preset={"normal"} />
        </View>
        <View style={TEXT_VIEW}> 
        <Text style={Form_Date_VALUE} preset={"normal"}>
          {userData.LoginName[0]}
        </Text>
        </View>
        {/* <View style={SEPERATOR_LINE} /> */}
        </View>
   
     
     <View style={TEXT_VIEW}> 
        <Text extraText={":"} tx={"userSetting.mobile"} style={Form_Date_LABEL} preset={"normal"} />
      
        <Text style={Form_Date_VALUE} preset={"normal"}>
          {userData.MobileNo[0]}
        </Text>
       </View>

       <View style={TEXT_VIEW}> 
        <Text extraText={":"} tx={"userSetting.usertype"} style={Form_Date_LABEL} preset={"normal"} />
        <Text style={IssueID_Value} preset={"normal"}>
        {userData.UserType[0]}
        </Text>
        </View>

       
    </View>

      </ScrollView>
      <BottomButton
        hideLeftButton={true}
        rightImage={icons.redButton2}
        onRightPress={() => gotoHome()}
        rightText={"common.cancel"}
      />
    </Screen>
  );

  // return (
  //   <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
  //     <MenuButton
  //       title={"userSetting.header"}
  //       onPress={handleDrawer} />
  //     <Formik
  //       initialValues={{
  //         mobile: '0411 111 111',
  //         city: 'South Yarra',
  //         state: 'VIC',
  //         licenceType: 'Licence Type',
  //         licenceNumber: 'Licence Number',
  //       }}
  //       innerRef={formikRef}
  //       onSubmit={values => console.log(values)}
  //     >
  //       {({ handleChange, touched, handleSubmit, values, errors }) => (
  //         <SafeAreaView style={{ flex: 1 }}>
  //           <ScrollView style={[SCROLLVIEW, { flex: 1 }]}>
  //             <View style={EMAIL_VIEW}>
  //               <Text extraText={":"} style={EMAIL_TEXT} tx={"userSetting.email"} />
  //               <View >
  //                 <TextField mainStyle={TEXTINPUT_VIEW} inputStyle={VALUE} editable={false} value={"username@gmail.com"} />
  //               </View>
  //             </View>
  //             <RenderDetails
  //               keyValue={0}
  //               errors={touched.mobile && errors.mobile}
  //               hasExtraText={true}
  //               handleChange={handleChange}
  //               keyboardType={'phone-pad'}
  //               handleKey={'mobile'}
  //               values={values.mobile}
  //               label={"userSetting.mobile"}
  //             />
  //             <RenderDetails
  //               keyValue={1}
  //               errors={touched.city && errors.city}
  //               hasExtraText={true}
  //               handleChange={handleChange}
  //               handleKey={'city'}
  //               values={values.city}
  //               label={"userSetting.city"}
  //             />
  //             <RenderDetails
  //               keyValue={2}
  //               errors={touched.state && errors.state}
  //               hasExtraText={true}
  //               handleChange={handleChange}
  //               handleKey={'state'}
  //               values={values.state}
  //               label={"userSetting.state"}
  //             />
  //             <RenderDetails
  //               keyValue={3}
  //               errors={touched.licenceType && errors.licenceType}
  //               handleChange={handleChange}
  //               handleKey={'licenceType'}
  //               values={values.licenceType}
  //               label={"userSetting.licenceType"}
  //             />
  //             <RenderDetails
  //               keyValue={4}
  //               errors={touched.licenceNumber && errors.licenceNumber}
  //               handleChange={handleChange}
  //               handleKey={'licenceNumber'}
  //               values={values.licenceNumber}
  //               label={"userSetting.licenceNumber"}
  //               keyboardType={'number-pad'}
  //               blurOnSubmit={true}
  //               returnKeyType={'done'}
  //             />
  //             <FieldWrapper
  //               label={'userSetting.expiry'}
  //               hasExtraText={false}
  //               errors={false}
  //             >
  //               <TouchableOpacity style={{}} onPress={() => setShow(true)}>
  //                 <View style={{ width: "100%" }} pointerEvents='none'>
  //                   <Text style={VALUE}>{moment(date).format('YYYY-MM-DD')}</Text>
  //                 </View>
  //                 <DateTimePickerModal
  //                   isVisible={show}
  //                   onConfirm={handleConfirm}
  //                   value={new Date()}
  //                   mode="date"
  //                   onCancel={hideDatePicker}
  //                 />
  //               </TouchableOpacity>
  //             </FieldWrapper>
  //           </ScrollView>
  //           <BottomButton
  //             leftImage={icons.blackButton2}
  //             rightImage={icons.redButton2}
  //             onRightPress={() => gotoHome()}
  //             leftText={"common.save"}
  //             rightText={"common.cancel"} />
  //         </SafeAreaView>
  //       )}
  //     </Formik>
  //   </Screen>
  // )
});
