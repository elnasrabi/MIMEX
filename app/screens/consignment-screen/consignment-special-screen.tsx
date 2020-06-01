import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Platform } from "react-native"
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
import { useStores } from "../../models/root-store"
import { translateText, getCurrentDate, getFormattedDate } from "../../utils/utils"
import { DropdownPicker } from "../../components/dropdown-picker/Dropdown-picker"

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
  borderColor: color.palette.link,
  borderWidth: 2,
  height: 300,
  flex: 1
}
const SIGN_LABEL: TextStyle = {
  color: color.palette.darkText,
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
  height: 40,
  justifyContent: 'center'
}

const DATE_TEXT: TextStyle = {
  flex: 1,
  textAlign: "right",
  alignSelf: "center",
  fontSize: 15
}
export const ConsignmentSpecial: FunctionComponent<ConsignmentSpecialProps> = observer(props => {

  const { consignmentStore } = useStores()
  const consignment = consignmentStore.consignmentDetail
  const [selectedValue, setSelectedValue] = useState("")
  const [fileName, setFileName] = useState("")
  const [imageUri, setImageUri] = useState("")
  const [viewImage, onViewImage] = useState(false)
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
                <DropdownPicker
                  dropDownData={dropDownData}
                  selectedValue={selectedValue}
                  placeHolder={"common.status"}
                  onValueChange={(value) => setSelectedValue(value)}
                />
              </View>
              <Text preset={"normal"} style={DATE_TEXT} text={getFormattedDate(new Date())} />
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
