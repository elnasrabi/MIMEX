import React, { FunctionComponent, useEffect, useState, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView, ImageStyle, Platform, Image, Alert } from "react-native"
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
import { translateText, isInternetAvailable, getFormattedDate, getSignaturePath, getImageDir, getImagePath, getJsonRequest } from "../../utils/utils"
import { DropdownPicker } from "../../components/dropdown-picker/Dropdown-picker"
import ConsignmentModel from "../../models/local-database/consignment-model"
import RNFS from 'react-native-fs'
import UserModel from "../../models/local-database/user-modal"
import Moment from 'moment'

export interface ConsignmentSuccessProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const statusFail = [
  { label: 'Receiver Closed', value: 'Receiver Closed' },
  { label: 'Refused Delivery', value: 'Refused Delivery' },
  { label: 'Incorrect Delivery Address', value: 'Incorrect Delivery Address' },
  { label: 'No One Home', value: 'No One Home' },
  { label: 'Unable to Deliver Long Wait Time', value: 'Unable to Deliver Long Wait Time' },
]

const statusSuccess = [
  { label: 'Delivered', value: 'Delivered' },
  { label: 'Picked Up', value: 'Picked Up' },
  { label: 'At Depot', value: 'At Depot' },
  { label: 'Handed to On Forwarder', value: 'Handed to On Forwarder' },
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
  title: translateText("common.selectImage"),
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
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
const PRESS_HERE: TextStyle = {
  textAlign: "center",
  alignSelf: "center",
  fontSize: 25,
  color: color.palette.gray
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
const SIGN_VIEW: ViewStyle = {
  borderColor: color.palette.darkText,
  borderWidth: 2,
  borderRadius: 3,
  marginTop: 20,
  height: 300,
  width: "100%",
  justifyContent: "center",
  backgroundColor: color.palette.white
}
const SIGN_VIEW_IMAGE: ImageStyle = {
  width: "100%",
  height: 296
}
const DATE_TEXT: TextStyle = {
  flex: 1,
  textAlign: "right",
  alignSelf: "center",
  fontSize: 15
}
let imageHash = Date.now()
let randomNo = Math.random()
interface recordProps {
  customerName: string
  loginName: string
  eventName: string
  eventNotes: string
  consignmentNumber: string
  itemsCount: string
  status: string
  image: string
  signBy: string
  signImage: string
  date: string
  synced: boolean
}

const currentDate = getFormattedDate(new Date().toLocaleString())
const dir = getImageDir()
RNFS.exists(dir).then(result => {
  if (!result) {
    RNFS.mkdir(dir)
  }
})
let userObj
export const ConsignmentSuccess: FunctionComponent<ConsignmentSuccessProps> = observer(props => {
  const { consignmentStore, authStore } = useStores()
  const consignment = consignmentStore.consignmentDetail
  const [selectedValue, setSelectedValue] = useState("")
  const [fileName, setFileName] = useState("")
  const [imageUri, setImageUri] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [signUri, setSignUri] = useState(SIGN_IMAGE_URI)
  const [viewImage, onViewImage] = useState(false)
  const [isValidStatus, onSetValidStatus] = useState(true)
  const [isValidFile, onSetValidFile] = useState(true)
  const [isValidSignText, setValidSignText] = useState(true)
  const [signText, onSignText] = useState("")
  const [random, setRandom] = useState(0)
  const [isValidSignImage, onSetValidSignImage] = useState(true)
  const { isSuccess } = props.route.params
  const consNo = consignmentStore.consignmentDetail.consignmentNumber[0]
  const loginName = authStore.userData[0].loginName[0]
  const imageFileName = consNo + loginName
  const SIGN_IMAGE_URI = getSignaturePath(imageFileName)
  // console.log(SIGN_IMAGE_URI)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getUserData()
    consignmentStore.onSigned(false)
    consignmentStore.setConsignmentFalse()
  }, [])

  useEffect(() => {
    if (consignmentStore.isConsignmentSaved) {
      props.navigation.navigate("Home")
    }
  }, [consignmentStore.isConsignmentSaved])

  const getUserData = async () => {
    const model = new UserModel()
    userObj = await model.getUserData(authStore.userData[0].loginName[0])
  }

  useLayoutEffect(() => {
    props.navigation.addListener('focus', () => {
      imageHash = Date.now()
      setSignUri(SIGN_IMAGE_URI)
      randomNo = Math.random()
      setRandom(randomNo)
      onSetValidSignImage(true)
    })
  }, [])

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
        }).catch((error) => {
          console.log(error)
        })
      }
    })
  }
  const onImageView = () => {
    onViewImage(!viewImage)
  }
  const onSignaturePress = () => {
    props.navigation.navigate("signatureView")
  }
  async function getSavedData(): Promise<boolean> {
    const consignmentNumber = consignment.consignmentNumber.toString()
    const loginName = authStore.userData[0].loginName[0]
    const modal = new ConsignmentModel()
    const isConsignmentSaved = await modal.getSavedConsignment(consignmentNumber, loginName)
    return isConsignmentSaved
  }
  const addAndUpdateRecordOffline = async (record) => {
    const modal = new ConsignmentModel()
    const isSaved = await getSavedData()
    console.log(isSaved)
    modal.addAndUpdateRecordOffline(isSaved, record, userObj[0])
    props.navigation.navigate("Home")
  }

  const onSave = async () => {
    const isConnected = await isInternetAvailable(false)
    if (!selectedValue) {
      onSetValidStatus(false)
    } else if (!fileName) {
      onSetValidFile(false)
    } else if (!signText) {
      setValidSignText(false)
    } else if (!consignmentStore.signedSaved) {
      onSetValidSignImage(false)
    } else {
      const record: recordProps = {
        customerName: "John jacob",
        eventNotes: "",
        eventName: "Notes",
        loginName: authStore.userData[0].loginName[0],
        consignmentNumber: consignment.consignmentNumber[0],
        itemsCount: consignment.consignmentItems[0].totalLineItemLabels[0],
        status: selectedValue,
        image: imageFileName,
        signBy: signText,
        signImage: imageFileName,
        date: Moment().toISOString(),
        synced: false
      }
      if (isConnected) {
        const request = await getJsonRequest(record)
        consignmentStore.saveConsignment(authStore.authorization, request)
        // Call API
      } else {
        addAndUpdateRecordOffline(record)
      }
    }
  }

  const onChangeText = (text) => {
    text ? setValidSignText(true) : setValidSignText(false)
    onSignText(text)
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
            imageHash={imageHash}
            uri={imageUri}
            isViewImage={viewImage}
            onClose={onImageView} />

          {/* Special Action */}
          <ComConsignmentDetail data={consignment} navigation={props.navigation} view={"specialAction"} />

          <View style={STATUS_VIEW}>
            <Text style={STATUS_TITLE} tx={"common.status"} />
          </View>

          {/* Status */}
          <View style={STATUS_CONTAINER}>

            <View style={PICKER_CONTAINER}>
              <View style={VALUE_CONTAINER_REGISTRATION}>
                <DropdownPicker
                  dropDownData={isSuccess ? statusSuccess : statusFail}
                  selectedValue={selectedValue}
                  placeHolder={"common.status"}
                  onValueChange={(value) => {
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

            <TextField
              labelTx={"consignmentSuccess.sign"}
              labelStyle={SIGN_LABEL}
              errorTx={isValidSignText ? undefined : "consignmentSuccess.enterSignBy"}
              onChangeText={text => onChangeText(text)}
              value={signText}
            />

            <Text tx={"consignmentSuccess.signature"} style={[SIGN_LABEL, SIGNATURE_TEXT]} />

            <TouchableOpacity onPress={onSignaturePress} style={SIGN_VIEW}>
              {consignmentStore.signedSaved
                ? <Image key={random} source={Platform.OS === 'android' ? { uri: `${signUri}?${imageHash}` } : { uri: `${signUri}` }}
                  style={SIGN_VIEW_IMAGE} /> : <Text style={PRESS_HERE} tx={"consignmentSuccess.pressHere"} />}
            </TouchableOpacity>
            {isValidSignImage ? null : <Text preset={"error"} tx={"consignmentSuccess.doSign"} />}

          </View>

        </View>
      </ScrollView>
      <View style={BOTTOM_VIEW}>
        <BottomButton
          leftImage={icons.blackButton2}
          rightImage={icons.redButton2}
          isLoading={consignmentStore.isButtonLoading}
          leftText={"common.save"}
          rightText={"common.cancel"}
          onRightPress={goBack}
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onLeftPress={onSave} />
      </View>
    </Screen >
  )
})
