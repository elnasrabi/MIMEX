import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, TextStyle, View, ScrollView, Platform, ImageBackground, KeyboardTypeOptions, Keyboard, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { ParamListBase, useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { isIphoneX } from "react-native-iphone-x-helper";
import moment from 'moment';
import KeyboardManager from "react-native-keyboard-manager";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Formik } from "formik";
import * as yup from "yup";

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
const ERROR_TEXT: TextStyle = {
  color: color.palette.red,
  fontFamily: typography.secondary,
  alignSelf: 'flex-end'
}
const TEXTINPUT_TEXT: TextStyle = {
  color: color.palette.link,
  fontFamily: typography.secondary,
  fontSize: 16,
  fontWeight: 'bold',
  padding: 10,
  flex: 1,
  borderColor: color.palette.lightGrey,
  borderWidth: 1,
  borderRadius: 4,
  backgroundColor: color.palette.white,
  height: 40,
  justifyContent: 'center'
}
const DATE_VIEW: ViewStyle = {
  backgroundColor: color.palette.white,
  paddingHorizontal: 10,
  justifyContent: 'center',
  height: 40,
  borderColor: color.palette.lightGrey,
  borderWidth: 1,
  borderRadius: 4
}
export const GetARate: FunctionComponent<GetARateProps> = observer((props) => {
  const { getARateStore, authStore } = useStores();
  const isFocused = useIsFocused();
  const measurementUnitData = [{ label: 'PALLET', value: 'PALLET' }];
  const pickUpAddressData = [{ label: 'MELBCCS WEST FOOTSCRAY', value: 'MELBCCS WEST FOOTSCRAY' }];
  const [postCode, updatePostCode] = useState('');
  const [town, updateTown] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const currentRef: any[] = [];
  const formikRef = useRef();

  useEffect(() => {
    if (isFocused && !getARateStore.preventRefresh) {
      setDate(new Date());
      formikRef.current.resetForm();
    }
    if (Platform.OS === 'ios') {
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
      KeyboardManager.setKeyboardDistanceFromTextField(20);
    }
    getARateStore.updatePreventrefersh(false);
  }, [isFocused])

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date) => {
    setShow(Platform.OS === 'ios');
    setDate(date);
    hideDatePicker();
  };

  const getACalculatedRate = async (values, actions) => {
    const isConnected = await isInternetAvailable();
    Keyboard.dismiss();
    if (isConnected) {
      const requestData = {
        consignmentRateTimeRequest: {
          consignment: {
            despatchDate: moment(date).format("YYYY-MM-DD"),
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
              unit: values.unitOfMeasure,
              weight: values.weight,
              length: values.length,
              width: values.width,
              height: values.height,
              volume: values.volume,
              quantity: values.quantity
            }
          }
        }
      }
      await getARateStore.getARate(authStore.authorization, requestData);
      actions.setSubmitting(false);
      if (getARateStore.responseSuccess) {
        gotoRateListScreen();
      }
    }
  }

  const gotoRateListScreen = () => {
    return props.navigation.navigate('GetARateList');
  }
  const gotoHomeScreen = () => {
    setDate(new Date());
    formikRef.current.resetForm();
    return props.navigation.navigate('Home');
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

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation]);

  const ValidationSchema = yup.object().shape({
    quantity: yup.number()
      .required()
      .integer('Quantity must be an integer')
      .label('Quantity'),
    weight: yup.number()
      .required()
      .integer('Weight must be an integer')
      .label('Weight'),
    length: yup.number()
      .required()
      .integer('Length must be an integer')
      .label('Length'),
    width: yup.number()
      .required()
      .integer('Width must be an integer')
      .label('Width'),
    height: yup.number()
      .required()
      .integer('Height must be an integer')
      .label('Height'),
    volume: yup.number()
      .required()
      .integer('Volume must be an integer')
      .label('Volume'),
    unitofMeasure: yup.string()
      .required()
      .label('Unit of Measurement'),
    pickUpAddress: yup.string()
      .required()
      .label('Pick Up Address')
  });

  const FieldWrapper = ({ children, label, errors }) => {
    return (
      <View style={{ marginBottom: 5 }}>
        <View style={CONTAINER}>
          <View style={[FLEX, { justifyContent: "center" }]}>
            <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={label} />
          </View>
          <View style={FLEX}>
            {children}
          </View>
        </View>
        {errors &&
          <Text style={ERROR_TEXT}>{errors}</Text>
        }
      </View>
    )
  }

  const RenderUnits = ({ keyValue, label, errors, handleChange, handleChangeKey, values, blurOnSubmit = false, ...rest }) => {
    return (
      <FieldWrapper
        label={label}
        errors={errors}
      >
        <TextInput
          key={keyValue}
          keyboardType={'number-pad'}
          returnKeyType={blurOnSubmit ? 'done' : 'next'}
          blurOnSubmit={blurOnSubmit}
          ref={(input) => {
            currentRef.push(input)
          }}
          onSubmitEditing={() => {
            if (currentRef[keyValue + 1]) {
              currentRef[keyValue + 1].focus()
            } else {
              // Click on save button
            }
          }}
          style={TEXTINPUT_TEXT}
          onChangeText={handleChange(handleChangeKey)}
          value={values}
          {...rest}
        />
      </FieldWrapper>
    )
  }

  const onsubmit = (values, actions) => {
    getACalculatedRate(values, actions);
  }

  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      <MenuButton
        title={"getARateScreen.header"}
        onPress={handleDrawer} />

      <Formik
        initialValues={{
          pickUpAddress: '',
          quantity: '',
          weight: '',
          length: '',
          width: '',
          height: '',
          volume: '',
          unitofMeasure: ''
        }}
        onSubmit={onsubmit}
        innerRef={formikRef}
        validationSchema={ValidationSchema}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors, touched, isSubmitting }) => (
          <SafeAreaView style={FLEX}>
            <ScrollView contentContainerStyle={SCROLLVIEW_CONTAINER} style={SCROLLVIEW_STYLE}>
              <View style={UPPER_CONTAINER}>
                <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={'getARateScreen.despatchDate'} />
                <View style={SEPERATOR_LINE} />
                <TouchableOpacity style={{}} onPress={() => setShow(true)}>
                  <View style={DATE_VIEW} pointerEvents='none'>
                    <Text style={VALUE}>{moment(date).format('YYYY-MM-DD')}</Text>
                  </View>
                  <DateTimePickerModal
                    isVisible={show}
                    onConfirm={handleConfirm}
                    value={new Date()}
                    mode="date"
                    onCancel={hideDatePicker}
                  />
                </TouchableOpacity>
                <Text style={[FONTFAMILY, { color: color.palette.black, marginTop: 10 }]} tx={'getARateScreen.pickUpAddress'} />
                <View style={SEPERATOR_LINE} />
                <DropdownPicker
                  dropDownData={pickUpAddressData}
                  placeHolder={"getARateScreen.pickUpAddress"}
                  selectedValue={values.pickUpAddress}
                  onValueChange={(value) => setFieldValue('pickUpAddress', value)}
                />
                {touched.pickUpAddress && errors.pickUpAddress &&
                  <Text style={ERROR_TEXT}>{errors.pickUpAddress}</Text>
                }
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
              <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={'getARateScreen.details'} />
              <View style={[SEPERATOR_LINE, { width: '97%' }]} />

              <FieldWrapper
                label={"getARateScreen.unitOfMeasure"}
                errors={touched.unitofMeasure && errors.unitofMeasure}
              >
                <DropdownPicker
                  dropDownData={measurementUnitData}
                  selectedValue={values.unitofMeasure}
                  placeHolder={"getARateScreen.unitOfMeasure"}
                  onValueChange={(value) => setFieldValue("unitofMeasure", value)}
                />
              </FieldWrapper>

              <RenderUnits
                keyValue={0}
                handleChange={handleChange}
                handleChangeKey={'quantity'}
                errors={touched.quantity && errors.quantity}
                values={values.quantity}
                label={"getARateScreen.quantity"}
              />
              <RenderUnits
                keyValue={1}
                handleChange={handleChange}
                handleChangeKey={'weight'}
                values={values.weight}
                errors={touched.weight && errors.weight}
                label={"getARateScreen.totalWeight"}
              />
              <RenderUnits
                keyValue={2}
                handleChange={handleChange}
                handleChangeKey={'length'}
                values={values.length}
                errors={touched.length && errors.length}
                label={"getARateScreen.length"}
              />
              <RenderUnits
                keyValue={3}
                handleChange={handleChange}
                handleChangeKey={'width'}
                values={values.width}
                errors={touched.width && errors.width}
                label={"getARateScreen.width"}
              />
              <RenderUnits
                keyValue={4}
                handleChange={handleChange}
                handleChangeKey={'height'}
                values={values.height}
                errors={touched.height && errors.height}
                label={"getARateScreen.height"}
              />
              <RenderUnits
                keyValue={5}
                handleChange={handleChange}
                handleChangeKey={'volume'}
                values={values.volume}
                errors={touched.volume && errors.volume}
                blurOnSubmit={true}
                label={"getARateScreen.volume"}
              />
            </ScrollView>
            <BottomButton
              leftImage={icons.blackButton2}
              isLoadingLeft={isSubmitting}
              isLoadingRight={isSubmitting}
              rightImage={icons.redButton2}
              onLeftPress={handleSubmit}
              onRightPress={gotoHomeScreen}
              leftText={"getARateScreen.submit"}
              rightText={"common.cancel"} />
          </SafeAreaView>
        )}
      </Formik>
    </Screen >
  )
})