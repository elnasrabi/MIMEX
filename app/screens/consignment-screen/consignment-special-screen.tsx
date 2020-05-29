import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Picker, ImageStyle, Alert, Platform, Image } from "react-native"
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
import RNPickerSelect from 'react-native-picker-select'
import { useStores } from "../../models/root-store"
import { translateText } from "../../utils/utils"

export interface ConsignmentSpecialProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const dropDownData = [
  { label: 'Wait Time', value: 'waitTime' },
  { label: 'Damaged', value: 'damaged' },
]
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

const SIGN_INPUT: TextStyle = {
  borderColor: color.palette.darkText,
  borderWidth: 2,
  height: 300,
  flex: 1
}
const SIGN_LABEL: TextStyle = {
  color: color.palette.link,
  fontFamily: typography.secondary,
  fontSize: 18
}
const SIGNATURE_TEXT: TextStyle = {
  marginTop: 10
}

const CONSIGNMENT_VIEW: ViewStyle = { flex: 1, marginTop: Platform.OS === 'android' ? 60 : isIphoneX() ? 10 : 33 }
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
const VALUE_CONTAINER_REGISTRATION: ViewStyle = {
  flex: 1,
  borderColor: color.palette.darkText,
  borderWidth: 2,
  borderRadius: 4,
  height: 40,
  justifyContent: 'center'
}
const PICKER_INPUT_IOS: TextStyle = {
  color: color.palette.link,
  fontSize: 16,
  fontWeight: "600",
  paddingLeft: 5,
  fontFamily: typography.secondary
}
const PICKER_INPUT_ANDROID: TextStyle = {
  color: color.palette.link,
  fontSize: 16,
  fontWeight: "900",
  paddingLeft: 5,
  fontFamily: typography.secondary
}
const PICKER_ICON_VIEW: ViewStyle = {
  height: 35,
  paddingStart: 5,
  marginTop: Platform.OS === "android" ? 7 : -8,
  justifyContent: "center",
  paddingRight: 4
}
const PICKER_ICON: ImageStyle = {
  width: 15,
  height: 18,
  marginEnd: 5,
  tintColor: color.palette.black
}
const DATE_TEXT: TextStyle = { flex: 1, textAlign: "right", fontSize: 16 }
export const ConsignmentSpecial: FunctionComponent<ConsignmentSpecialProps> = observer(props => {

  const { consignmentStore } = useStores()
  const consignment = consignmentStore.consignmentDetail
  const [selectedValue, setSelectedValue] = useState("")
  const [fileName, setFileName] = useState("")
  const [imageUri, setImageUri] = useState("")
  const [viewImage, onViewImage] = useState(false)
  const [isValidStatus, onSetValidStatus] = useState(true)
  const [isValidFile, onSetValidFile] = useState(true)
  useEffect(() => {
  }, [])

  const onCameraPres = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel) {
        setFileName(translateText("consignmentSuccess.consignmentPhoto"))
        setImageUri(response.uri)
      }
    })
  }
  const onImageView = () => {
    onViewImage(!viewImage)
  }
  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
  return (
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
      <BackButton
        title={"consignmentFail.consignment"}
        onPress={goBack} />
      <ScrollView style={CONSIGNMENT_VIEW}>
        <View>
          {/* Image View */}
          <ImageViewerModal
            uri={imageUri}
            isViewImage={viewImage}
            onClose={onImageView} />

          {/* Special Action */}
          <ComConsignmentDetail isFailView={true} data={consignment} navigation={props.navigation} view={"specialAction"} />

          <View style={STATUS_VIEW}>
            <Text style={STATUS_TITLE} tx={"common.status"} />
          </View>

          {/* Status */}
          <View style={STATUS_CONTAINER}>

            <View style={PICKER_CONTAINER}>
              <View style={VALUE_CONTAINER_REGISTRATION}>
                <RNPickerSelect
                  style={{
                    inputIOS: PICKER_INPUT_IOS,
                    inputAndroid: PICKER_INPUT_ANDROID
                  }}
                  placeholder={{ label: translateText("consignmentSuccess.status"), value: '' }}
                  value={selectedValue}
                  onValueChange={(value) => {
                    setSelectedValue(value)
                    onSetValidStatus(true)
                  }}
                  Icon={() =>
                    <View style={PICKER_ICON_VIEW}>
                      <Image style={PICKER_ICON} source={icons.downArrow} />
                    </View>
                  }
                  items={dropDownData}
                />
              </View>
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
            <Text tx={"consignmentFail.notes"} style={[SIGN_LABEL, SIGNATURE_TEXT]} />

            <TextField
              inputStyle={SIGN_INPUT}
              multiline
            // errorTx={isValidPassword ? undefined : "loginScreen.errorPassword"}
            // onChangeText={text => onChangeText(INPUT_PASSWORD, text)}
            // value={password}
            />

          </View>

        </View>
      </ScrollView>
      <View style={BOTTOM_VIEW}>
        <BottomButton
          leftImage={icons.blackButton2}
          rightImage={icons.redButton2}
          leftText={"common.save"}
          rightText={"common.cancel"}
          onRightPress={goBack} />
      </View>
    </Screen >
  )
})
