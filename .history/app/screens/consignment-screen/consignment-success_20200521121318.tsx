import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Picker, ImageStyle, Alert, Platform } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, TextField } from "../../components"
import { color, typography } from "../../theme"
import { BackButton } from "../../components/header/back-button"
import { BottomButton } from "../../components/bottom-button/bottom-button"
import { icons } from "../../components/icon/icons"
import { ComConsignmentDetail } from "../../components/consignment/com-consigment-detail"
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons'
import ImagePicker from 'react-native-image-picker'
import { TouchableOpacity } from "react-native-gesture-handler"
import { ImageViewerModal } from "../../components/image-viewer/image-viewer-modal"
import { isIphoneX } from "react-native-iphone-x-helper"
import { Dropdown } from 'react-native-material-dropdown'

export interface ConsignmentSuccessProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const dropDownData = [{
  value: 'Now',
}, {
  value: 'Later',
}, {
  value: 'Someday',
}]
const ROOT: ViewStyle = {
  flex: 1,
}
const CAMERA_VIEW: ViewStyle = {
  flexDirection: "row",
  marginTop: 5,
  alignItems: "center"
}
const LINK_VIEW: ViewStyle = {
  alignSelf: "center",
  marginStart: 15
}
const LINK_TEXT: TextStyle = {
  color: color.palette.link,
  textDecorationLine: "underline"
}

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

const SIGN_INPUT: ViewStyle = {
  borderColor: color.palette.darkText,
  borderWidth: 2
}
const SIGN_LABEL: TextStyle = {
  color: color.palette.red,
  fontFamily: typography.secondary,
  fontSize: 18
}
const SIGNATURE_TEXT: TextStyle = {
  marginTop: 10
}

const CONSIGNMENT_VIEW: ViewStyle = { flex: 1, marginTop: Platform.OS == 'android' ? 60 : isIphoneX() ? 10 : 33 }
const CAMERA_ICON: ImageStyle = { marginTop: 5 }
const STATUS_VIEW: ViewStyle = {
  height: 50,
  backgroundColor: color.palette.toolbar,
  marginTop: 10,
  justifyContent: "center"
}
const STATUS_TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "left",
  marginStart: 30,
}
const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 }
const STATUS_CONTAINER: ViewStyle = {
  padding: 15
}
const PICKER_CONTAINER: ViewStyle = {
  flexDirection: "row"
}
const PICKER_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  height: 40,
  width: 200,
  alignSelf: "center",
  borderColor: color.palette.darkText,
  borderWidth: 2,
  borderRadius: 4,
  paddingStart: 15,
  paddingEnd: 15,
}

const DROP_DOWN_INPUT: ViewStyle = {
  borderBottomColor: 'transparent',
  top: 5
}

const dropdownOffset: ViewStyle = {
  top: 0,
  left: 0,
  right: 0
}

const SIGN_VIEW: ViewStyle = {
  borderColor: color.palette.darkText,
  borderWidth: 2,
  borderRadius: 3,
  marginTop: 20,
  width: "100%",
  height: 300,
  backgroundColor: color.palette.white
}
const DATE_TEXT: TextStyle = { flex: 1, textAlign: "right", fontSize: 16 }
export const ConsignmentSuccess: FunctionComponent<ConsignmentSuccessProps> = observer(props => {
  const [selectedValue, setSelectedValue] = useState("java")
  const [fileName, setFileName] = useState("")
  const [imageUri, setImageUri] = useState("")
  const [viewImage, onViewImage] = useState(false)
  useEffect(() => {
  }, [])

  const onCameraPres = () => {
    ImagePicker.showImagePicker(options, (response) => {
      setFileName(response.fileName)
      setImageUri(response.uri)
    })
  }
  const onImageView = () => {
    onViewImage(!viewImage)
  }
  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
  return (
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
      <BackButton
        title={"consignmentSuccess.consignment"}
        onPress={goBack} />
      <ScrollView style={CONSIGNMENT_VIEW}>
        <View>
          {/* Image View */}
          <ImageViewerModal
            uri={imageUri}
            isViewImage={viewImage}
            onClose={onImageView} />

          {/* Special Action */}
          <ComConsignmentDetail navigation={props.navigation} view={"specialAction"} />

          <View style={STATUS_VIEW}>
            <Text style={STATUS_TITLE} tx={"common.status"} />
          </View>

          {/* Status */}
          <View style={STATUS_CONTAINER}>

            <View style={PICKER_CONTAINER}>
              <Dropdown
                containerStyle={PICKER_VIEW}
                inputContainerStyle={DROP_DOWN_INPUT}
                rippleCentered={true}
                dropdownOffset={dropdownOffset}
                data={dropDownData}
              />
              <Text preset={"normal"} style={DATE_TEXT} text={"11 March 2020\n11:15 am"} />
            </View>

            <View style={CAMERA_VIEW}>
              <TouchableOpacity style={ROOT} onPress={onCameraPres}>
                <EvilIcons color={color.palette.darkText} name="camera" size={60} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onImageView} style={LINK_VIEW}>
                {fileName && <Text style={LINK_TEXT} preset={"normal"} text={fileName} />}
              </TouchableOpacity>
            </View>
            <TextField
              labelTx={"consignmentSuccess.sign"}
              inputStyle={SIGN_INPUT}
              labelStyle={SIGN_LABEL}
            // errorTx={isValidPassword ? undefined : "loginScreen.errorPassword"}
            // onChangeText={text => onChangeText(INPUT_PASSWORD, text)}
            // value={password}
            />
            <Text tx={"consignmentSuccess.signature"} style={[SIGN_LABEL, SIGNATURE_TEXT]} />

            <View style={SIGN_VIEW}>

            </View>

          </View>
          <View style={BOTTOM_VIEW}>
            <BottomButton
              leftImage={icons.blackButton2}
              rightImage={icons.redButton}
              leftText={"common.success"}
              rightText={"common.fail"} />
          </View>
        </View>
      </ScrollView>

    </Screen>
  )
})
