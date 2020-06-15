import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, Platform } from "react-native"
import { ParamListBase, useIsFocused } from "@react-navigation/native"
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
import { translateText, getCurrentDate, getFormattedDate, getImagePath, isInternetAvailable, consType, getJsonRequest, getCurrentLocation } from "../../utils/utils"
import { DropdownPicker } from "../../components/dropdown-picker/Dropdown-picker"
import UserModel from "../../models/local-database/user-modal"
import RNFS from 'react-native-fs'
import ConsignmentModel from "../../models/local-database/consignment-model"
import Moment from 'moment'

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
  textAlignVertical: "top",
  borderColor: color.palette.darkText,
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
type consignmentType = keyof typeof consType
// eslint-disable-next-line @typescript-eslint/class-name-casing
interface recordProps {
  customerName: string
  loginName: string
  eventName: consignmentType
  eventNotes: string
  consignmentNumber: string
  itemsCount: string
  status: string
  image: string
  signBy: string
  location: string
  signImage: string
  date: string
  synced: boolean
}

let imageHash = Date.now()
let currentDate = getFormattedDate(new Date().toLocaleString())
let userObj
export const ConsignmentSpecial: FunctionComponent<ConsignmentSpecialProps> = observer(props => {
  const isFocused = useIsFocused()

  const { consignmentStore, authStore } = useStores()
  const consignment = consignmentStore.consignmentDetail
  const [selectedValue, setSelectedValue] = useState("")
  const [fileName, setFileName] = useState("")
  const [imageUri, setImageUri] = useState("")
  const [viewImage, onViewImage] = useState(false)
  const [isValidStatus, onSetValidStatus] = useState(true)
  const [isValidFile, onSetValidFile] = useState(true)
  const [isValidNotes, setValidNotesText] = useState(true)
  const [notes, onNotes] = useState("")
  const consNo = consignmentStore.consignmentDetail.consignmentNumber[0]
  const loginName = authStore.userData[0].loginName[0]
  const imageFileName = consNo + loginName

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getUserData()
    consignmentStore.setConsignmentFalse()
  }, [])
  useEffect(() => {
    if (consignmentStore.isConsignmentSaved) {
      props.navigation.navigate(consignmentStore.fromHome ? "Home" : "MyList")
    }
  }, [consignmentStore.isConsignmentSaved])
  const getUserData = async () => {
    const model = new UserModel()
    userObj = await model.getUserData(authStore.userData[0].loginName[0])
  }
  const onCameraPres = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel) {
        const filePath = getImagePath(imageFileName)
        RNFS.writeFile(filePath, response.data, 'base64').then(result => {
          setFileName('Consignment Photo')
          imageHash = Date.now()
          setImageUri(filePath)
          // console.log(filePath)
          // console.log(result)
          onSetValidFile(true)
        })
      }
    })
  }
  const onImageView = () => {
    onViewImage(!viewImage)
  }

  async function getSavedData(record: any) {
    const modal = new ConsignmentModel()
    modal.addAndUpdateRecordOffline(false, record, userObj[0])
    return false
  }

  const onSave = async () => {
    const isConnected = await isInternetAvailable(false)
    if (!selectedValue) {
      onSetValidStatus(false)
    } else {
      const record: recordProps = {
        customerName: "John jacob",
        eventNotes: notes,
        eventName: "specialAction",
        loginName: authStore.userData[0].loginName[0],
        consignmentNumber: consignment.consignmentNumber[0],
        itemsCount: consignment.consignmentItems[0].totalLineItemLabels[0],
        status: selectedValue,
        location: consignmentStore.city + ", " + consignmentStore.district,
        image: imageFileName,
        signBy: "",
        signImage: "",
        date: Moment().toISOString(),
        synced: false
      }
      let shouldGoHome = false
      const numberArray: any[] = consNo.split(",")
      numberArray.forEach(async number => {
        record.consignmentNumber = number.replace(/ /g, '')
        if (isConnected) {
          const request = await getJsonRequest(record)
          consignmentStore.saveConsignment(authStore.authorization, request)
          // Call API
        } else {
          shouldGoHome = true
          getSavedData(record)
        }
      })
      if (shouldGoHome) {
        props.navigation.navigate(consignmentStore.fromHome ? "Home" : "MyList")
      }
    }
  }

  const onChangeText = (text) => {
    onNotes(text)
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
            imageHash={imageHash}
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
                  onValueChange={(value) => {
                    currentDate = getFormattedDate(new Date().toLocaleString())
                    setSelectedValue(value)
                    onSetValidStatus(true)
                  }}
                />
              </View>
              <Text preset={"normal"} style={DATE_TEXT} text={currentDate} />
            </View>
            {isValidStatus ? null : <Text preset={"error"} tx={"consignmentSuccess.selectStatus"} />}

            <View style={CAMERA_VIEW}>
              <TouchableOpacity style={ROOT} onPress={onCameraPres}>
                <EvilIcons color={color.palette.darkText} name="camera" size={60} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onImageView} style={LINK_VIEW}>
                {fileName && <Text style={LINK_TEXT} preset={"normal"} text={fileName} />}
              </TouchableOpacity>
            </View>
            {isValidFile ? null : <Text preset={"error"} tx={"consignmentSuccess.selectImage"} />}

            <Text tx={"consignmentFail.notes"} style={[SIGN_LABEL, SIGNATURE_TEXT]} />

            <TextField
              inputStyle={SIGN_INPUT}
              multiline
              errorTx={isValidNotes ? undefined : "consignmentFail.enterNotes"}
              onChangeText={text => onChangeText(text)}
              value={notes}
            />

          </View>

        </View>
      </ScrollView>
      <View style={BOTTOM_VIEW}>
        <BottomButton
          leftImage={icons.blackButton2}
          rightImage={icons.redButton2}
          isLoadingLeft={consignmentStore.isButtonLoading}
          leftText={"common.save"}
          rightText={"common.cancel"}
          onRightPress={goBack}
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onLeftPress={onSave} />
      </View>
    </Screen >
  )
})
