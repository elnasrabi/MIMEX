import React, { FunctionComponent, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, TextStyle, View, ScrollView, Platform, ImageBackground, KeyboardTypeOptions, Keyboard } from "react-native";
import { ParamListBase, useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { isIphoneX } from "react-native-iphone-x-helper";
import moment from 'moment';
import KeyboardManager from "react-native-keyboard-manager";

// import from modal and utils
import { isInternetAvailable } from "../../utils/utils";
import { useStores } from "../../models/root-store";

// iports from components
import { Screen, Text, TextField, Button } from "../../components";
import { color, typography } from "../../theme";
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { DropdownPicker } from "../../components/dropdown-picker/Dropdown-picker";
export interface GetARateProps {
  navigation: NativeStackNavigationProp<ParamListBase>
};
const FONTFAMILY: TextStyle = {
  fontFamily: typography.secondary
};
const ROOT: ViewStyle = {
  paddingBottom: 10
};
const SCROLLVIEW_STYLE: ViewStyle = {
  marginBottom: 10,
  marginTop: Platform.OS == 'android' ? 50 : isIphoneX() ? 10 : 33
};
const SCROLLVIEW_CONTAINER: ViewStyle = {
  marginLeft: 10,
  width: '96%'
};
const UPPER_CONTAINER: ViewStyle = {
  width: '97%',
  paddingBottom: 20
};
const UPPER_CONTAINER_SUBVIEW: ViewStyle = {
  marginTop: 20
};
const BUTTON_VIEW: ViewStyle = {
  marginTop: 15,
  alignItems: 'flex-end',
  paddingRight: '6%'
};
const BUTTON_STYLE: ViewStyle = {
  backgroundColor: 'transparent'
};
const IMAGE_BACKGROUND: ViewStyle = {
  justifyContent: 'center',
  borderRadius: 10,
  overflow: 'hidden',
  paddingHorizontal: 20,
  height: 40
};
const TEXTFIELD_VIEW: ViewStyle = {
  width: "60%"
};
const FLEX: ViewStyle = {
  flex: 1
};
const CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between'
};
const CONTAINER_TEXT: ViewStyle = {
  marginTop: 25
};
const VALUE: TextStyle = {
  color: color.palette.link,
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: typography.secondary
};
const SEPERATOR_LINE: ViewStyle = {
  height: 2,
  backgroundColor: color.palette.black,
  width: '100%',
  marginBottom: 10,
  borderRadius: 5
};
export const GetARate: FunctionComponent<GetARateProps> = observer((props) => {
  const { GetARateStore, authStore } = useStores();
  const isFocused = useIsFocused();
  const measurementUnitData = [{ label: 'PALLET', value: 'PALLET' }];
  const pickUpAddressData = [{ label: 'MELBCCS WEST FOOTSCRAY', value: 'MELBCCS WEST FOOTSCRAY' }];
  const [postCode, updatePostCode] = useState('');
  const [pickUpAddress, updatePckUpAddress] = useState('');
  const [town, updateTown] = useState('');
  const [unitOfMeasure, updateUnitOfMeasure] = useState('');
  const [quantity, updateQuantity] = useState('');
  const [totalWeight, updateTotalWeight] = useState('');
  const [length, updateLength] = useState('');
  const [width, updateWidth] = useState('');
  const [height, updateHeight] = useState('');
  const [volume, updateVolume] = useState('');
  const [isValidPickUpAddres, setIsValidPickUpAddres] = useState(true);
  const [isValidDeliveryAddres, setIsValidDeliveryAddres] = useState(true);
  const [isValidUnitOfMeasure, setIsValidUnitOfMeasure] = useState(true);
  const [isValidQuantity, setIsValidQuantity] = useState(true);
  const [isValidWeight, setIsValidWeight] = useState(true);
  const [isValidLength, setIsValidLength] = useState(true);
  const [isValidWidth, setIsValidWidth] = useState(true);
  const [isValidHeight, setIsValidHeight] = useState(true);
  const [isValidVolume, setIsValidVolume] = useState(true);
  const currentRef: any[] = [];

  useEffect(() => {
    if (isFocused && !GetARateStore.preventRefresh) {
      clearInputs();
    }
    if (Platform.OS === 'ios') {
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    }
    GetARateStore.updatePreventrefersh(false);
  }, [isFocused])

  const checkValidation = async () => {
    if (!pickUpAddress) { setIsValidPickUpAddres(false) } else { setIsValidPickUpAddres(true) }
    if (!town) { setIsValidDeliveryAddres(false) } else { setIsValidDeliveryAddres(true) }
    if (!unitOfMeasure) { setIsValidUnitOfMeasure(false) } else { setIsValidUnitOfMeasure(true) }
    if (!quantity) { setIsValidQuantity(false) } else { setIsValidQuantity(true) }
    if (!totalWeight) { setIsValidWeight(false) } else { setIsValidWeight(true) }
    if (!length) { setIsValidLength(false) } else { setIsValidLength(true) }
    if (!width) { setIsValidWidth(false) } else { setIsValidWidth(true) }
    if (!height) { setIsValidHeight(false) } else { setIsValidHeight(true) }
    if (!volume) { setIsValidVolume(false) } else { setIsValidVolume(true) }
    if (pickUpAddress && unitOfMeasure && quantity && totalWeight && length && width && height && volume) {
      getACalculatedRate()
    }
  }

  const getACalculatedRate = async () => {
    const isConnected = await isInternetAvailable()
    Keyboard.dismiss()
    if (isConnected) {
      const requestData = {
        consignmentRateTimeRequest: {
          consignment: {
            despatchDate: moment(new Date()).format("YYYY-MM-DD"),
            pickupAddress: {
              address: {
                addressCode: "MELBCCS",
                town: "WEST FOOTSCRAY",
                postcode: "3012"
              }
            },
            deliveryAddress: {
              address: {
                town: "CRAIGIE",
                state: "WA",
                postcode: "6025",
                country: "AU"
              }
            },
            container: {
              unit: unitOfMeasure,
              weight: totalWeight,
              length: length,
              width: width,
              height: height,
              volume: volume,
              quantity: quantity
            }
          }
        }
      }
      await GetARateStore.getARate(authStore.authorization, requestData)
      if (GetARateStore.responseSuccess) {
        gotoRateListScreen()
      }
    }
  }

  const gotoRateListScreen = () => {
    return props.navigation.navigate('GetARateList');
  }
  const gotoHomeScreen = () => {
    clearInputs();
    return props.navigation.navigate('Home');
  }

  const clearInputs = () => {
    updatePostCode('')
    updatePckUpAddress('')
    updateTown('')
    updateUnitOfMeasure('')
    updateQuantity('')
    updateTotalWeight('')
    updateLength('')
    updateWidth('')
    updateHeight('')
    updateVolume('')
    setIsValidPickUpAddres(true)
    setIsValidDeliveryAddres(true)
    setIsValidUnitOfMeasure(true)
    setIsValidQuantity(true)
    setIsValidWeight(true)
    setIsValidLength(true)
    setIsValidWidth(true)
    setIsValidHeight(true)
    setIsValidVolume(true)
  }

  const renderRow = (label, value, onUpdate, keyboardType: KeyboardTypeOptions = 'default') => {
    return (
      <View style={CONTAINER}>
        <View style={CONTAINER_TEXT}>
          <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={label} />
        </View>
        <View style={TEXTFIELD_VIEW}>
          <TextField
            autoCorrect={false}
            onChangeText={(text) => onUpdate(text)}
            autoCapitalize={"none"}
            mainStyle={{}}
            keyboardType={keyboardType}
            inputStyle={VALUE}
            value={value} />
        </View>
      </View>
    )
  }

  const renderUnitRow = (key, label, isValid, errorLabel, value, onUpdate, keyboardType: KeyboardTypeOptions = 'default') => {
    return (
      <View style={CONTAINER}>
        <View style={[CONTAINER_TEXT, FLEX, label == 'getARateScreen.unitOfMeasure' ? { marginTop: 10 } : {}]}>
          <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={label} />
        </View>
        <View style={FLEX}>
          {label == 'getARateScreen.unitOfMeasure'
            ? <DropdownPicker
              dropDownData={measurementUnitData}
              errorTx={isValid ? undefined : errorLabel}
              selectedValue={value}
              placeHolder={"getARateScreen.unitOfMeasure"}
              onValueChange={(value) => onUpdate(value)}
            />
            : <TextField
              key={key}
              autoCorrect={false}
              forwardedRef={(input) => {
                currentRef.push(input)
              }}
              onSubmitEditing={() => {
                if (currentRef[key + 1]) {
                  currentRef[key + 1].focus()
                } else {
                  // Click on save button
                }
              }}
              autoCapitalize={"none"}
              mainStyle={{}}
              inputStyle={VALUE}
              errorTx={isValid ? undefined : errorLabel}
              value={value}
              keyboardType={keyboardType}
              blurOnSubmit={label == "getARateScreen.volume"}
              onChangeText={(value) => {
                if (value) {
                  if (/^\d+$/.test(value)) {
                    return onUpdate(value)
                  }
                } else {
                  return onUpdate(value)
                }
              }}
              returnKeyType={'next'}
            />
          }
        </View>
      </View >
    )
  }

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation]);

  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      <MenuButton
        title={"getARateScreen.header"}
        onPress={handleDrawer} />

      <ScrollView contentContainerStyle={SCROLLVIEW_CONTAINER} style={SCROLLVIEW_STYLE}>
        <View style={UPPER_CONTAINER}>
          <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={'getARateScreen.pickUpAddress'} />
          <View style={SEPERATOR_LINE} />
          <DropdownPicker
            dropDownData={pickUpAddressData}
            placeHolder={"getARateScreen.pickUpAddress"}
            selectedValue={pickUpAddress}
            errorTx={isValidPickUpAddres ? undefined : "getARateScreen.emptyPickUpAddress"}
            onValueChange={(value) => updatePckUpAddress(value)}
          />
          <View style={UPPER_CONTAINER_SUBVIEW}>
            <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={'getARateScreen.deliveryAddress'} />
            <View style={SEPERATOR_LINE} />
            {renderRow("getARateScreen.postCode", postCode, updatePostCode, 'decimal-pad')}
            <View style={BUTTON_VIEW}>
              <Button style={BUTTON_STYLE}>
                <ImageBackground source={icons.blueButton} style={IMAGE_BACKGROUND}>
                  <Text tx={'getARateScreen.getTowns'} style={{ color: color.palette.white }} />
                </ImageBackground>
              </Button>
            </View>
            {renderRow("getARateScreen.town", town, updateTown)}
          </View>
        </View>
        <View style={{}}>
          <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={'getARateScreen.details'} />
          <View style={[SEPERATOR_LINE, { width: '97%' }]} />
          {renderUnitRow(0, "getARateScreen.unitOfMeasure", isValidUnitOfMeasure, 'getARateScreen.emptyunitOfMeasure', unitOfMeasure, updateUnitOfMeasure)}
          {renderUnitRow(0, "getARateScreen.quantity", isValidQuantity, "getARateScreen.emptyquantity", quantity, updateQuantity, 'decimal-pad')}
          {renderUnitRow(1, "getARateScreen.totalWeight", isValidWeight, "getARateScreen.emptytotalWeight", totalWeight, updateTotalWeight, 'decimal-pad')}
          {renderUnitRow(2, "getARateScreen.length", isValidLength, "getARateScreen.emptylength", length, updateLength, 'decimal-pad')}
          {renderUnitRow(3, "getARateScreen.width", isValidWidth, "getARateScreen.emptywidth", width, updateWidth, 'decimal-pad')}
          {renderUnitRow(4, "getARateScreen.height", isValidHeight, "getARateScreen.emptyheight", height, updateHeight, 'decimal-pad')}
          {renderUnitRow(5, "getARateScreen.volume", isValidVolume, "getARateScreen.emptyvolume", volume, updateVolume, 'decimal-pad')}
        </View>
      </ScrollView>
      <BottomButton
        leftImage={icons.blackButton2}
        isLoadingLeft={GetARateStore.isButtonLoading}
        rightImage={icons.redButton2}
        onLeftPress={checkValidation}
        onRightPress={() => gotoHomeScreen()}
        leftText={"getARateScreen.submit"}
        rightText={"common.cancel"} />
    </Screen >
  )
})
