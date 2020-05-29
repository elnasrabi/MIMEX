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
import RNFetchBlob from 'rn-fetch-blob'
import { useStores } from "../../models/root-store"
import { translateText, isInternetAvailable, showAlert } from "../../utils/utils"
import { database } from "../../app"
import { Q } from "@nozbe/watermelondb"
import { DropdownPicker } from "../../components/dropdown-picker/Dropdown-picker"

export interface ConsignmentSuccessProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const statusFail = [
  { label: 'Receiver Closed', value: 'receiverClosed' },
  { label: 'Refused Delivery', value: 'refusedDelivery' },
  { label: 'Incorrect Delivery Address', value: 'incorrectDeliveryAddress' },
  { label: 'No One Home', value: 'noOneHome' },
  { label: 'Unable to Deliver Long Wait Time', value: 'unableToDeliver' },
]

const statusSuccess = [
  { label: 'Delivered', value: 'delivered' },
  { label: 'Picked Up', value: 'pickedUp' },
  { label: 'At Depot', value: 'atDepot' },
  { label: 'Handed to On Forwarder', value: 'handed' },
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
const DATE_TEXT: TextStyle = { flex: 1, textAlign: "right", fontSize: 16 }
let imageHash = Date.now()
let randomNo = Math.random()

const DOCUMENT_DIRECTORY_PATH = RNFetchBlob.fs.dirs.DocumentDir
export const ConsignmentSuccess: FunctionComponent<ConsignmentSuccessProps> = observer(props => {
  const SIGN_IMAGE_URI = Platform.OS === 'android' ? "file:///storage/emulated/0/saved_signature/signature.png" : DOCUMENT_DIRECTORY_PATH + "/signature.png"

  const { consignmentStore, authStore } = useStores()
  const consignment = consignmentStore.consignmentDetail
  const [selectedValue, setSelectedValue] = useState("")
  const [fileName, setFileName] = useState("")
  const [imageUri, setImageUri] = useState("")
  const [signUri, setSignUri] = useState(SIGN_IMAGE_URI)
  const [viewImage, onViewImage] = useState(false)
  const [isValidStatus, onSetValidStatus] = useState(true)
  const [isValidFile, onSetValidFile] = useState(true)
  const [isValidSignText, setValidSignText] = useState(true)
  const [signText, onSignText] = useState("")
  const [random, setRandom] = useState(0)
  const [isValidSignImage, onSetValidSignImage] = useState(true)

  const { isSuccess } = props.route.params
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getSavedData()
    consignmentStore.onSigned(false)
  }, [])

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
        setFileName('Consignment Photo')
        setImageUri(response.uri)
        onSetValidFile(true)
      }
    })
  }
  const onImageView = () => {
    onViewImage(!viewImage)
  }
  const onSignaturePress = () => {
    props.navigation.navigate("signatureView")
  }

  const onSave = async () => {
    const isConnected = await isInternetAvailable(false)
    if (!isConnected) {
      // Call API
    } else {
      if (!selectedValue) {
        onSetValidStatus(false)
      } else if (!fileName) {
        onSetValidFile(false)
      } else if (!signText) {
        setValidSignText(false)
      } else if (!consignmentStore.signedSaved) {
        onSetValidSignImage(false)
      } else {
        database.action(async () => {
          const consignmentSuccess = database.collections.get("consignmentSuccess")
          const data = await consignmentSuccess.create(consignmentSuccess => {
            consignmentSuccess.customerName = "John jacob"
            consignmentSuccess.userName = authStore.userData[0].loginName[0]
            consignmentSuccess.consignmentNumber = consignment.consignmentNumber[0]
            consignmentSuccess.itemsCount = consignment.consignmentItems[0].totalLineItemLabels[0]
            consignmentSuccess.status = selectedValue
            consignmentSuccess.image = imageUri
            consignmentSuccess.signBy = signText
            consignmentSuccess.signImage = signUri
            consignmentSuccess.date = new Date().toDateString()
            consignmentSuccess.synced = false
            console.log(consignmentSuccess)
          })
          console.log(data)
          showAlert("", "consignmentSuccess.offlineDataSaveMessage")
        })
      }
    }
  }
  async function getSavedData() {
    database.action(async () => {
      const consignmentNumber = consignment.consignmentNumber.toString()
      const consignmentSuccess = database.collections.get("consignmentSuccess")
      // const post = await consignmentSuccess.query().fetch()
      const post = await consignmentSuccess.query(Q.where("consignmentNumber", consignmentNumber)).fetch()
      console.log(post)
    })
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
                  onValueChange={(value) => setSelectedValue(value)}
                />
              </View>
              <Text preset={"normal"} style={DATE_TEXT} text={"11 March 2020\n11:15 am"} />
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
          leftText={"common.save"}
          rightText={"common.cancel"}
          onRightPress={goBack}
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onLeftPress={onSave} />
      </View>
    </Screen >
  )
})
