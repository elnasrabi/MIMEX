import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, ImageStyle } from "react-native"
import { color } from "../../theme"
import { Text } from "../text/text"

export interface SignatureViewProps {
    uri: string,
    onClose: any,
    isViewImage: boolean
}
const CENTERED_VIEW: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  flex: 1,
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(100,100,100, 0.7)',
  padding: 10,
}

const IMAGE_VIEW: ImageStyle = {
  height: 350,
  width: "100%",
  borderRadius: 2,
  borderColor: color.palette.darkText,
  borderWidth: 2
}

const CLOSE_ICON: ImageStyle = {
  marginTop: 20
}

export const SignatureView: FunctionComponent<SignatureViewProps> = observer(props => {
  let refs: any

  const signature: ViewStyle = {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  }
  const buttonStyle: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#eeeeee",
    margin: 10
  }

  const saveSign = () => {
    refs.sign.saveImage()
  }

  const resetSign = () => {
    refs.sign.resetImage()
  }

  const _onSaveEvent = (result) => {
    // result.encoded - for the base64 encoded png
    // result.pathName - for the file path name
    console.log(result)
  }
  const _onDragEvent = () => {
    // This callback will be called when the user enters signature
    console.log("dragged")
  }

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Text style={{ alignItems: "center", justifyContent: "center" }}>Signature Capture Extended </Text>
      <SignatureCapture
        style={[{ flex: 1 }, styles.signature]}
        ref="sign"
        onSaveEvent={_onSaveEvent}
        onDragEvent={_onDragEvent}
        saveImageFileInExtStorage={false}
        showNativeButtons={false}
        showTitleLabel={false}
        viewMode={"portrait"} />

      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity style={styles.buttonStyle}
          onPress={() => { saveSign() }} >
          <Text tx={"common.save"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle}
          onPress={() => { resetSign() }} >
          <Text tx={"common.reset"} />
        </TouchableOpacity>

      </View>

    </View>
  )
})
