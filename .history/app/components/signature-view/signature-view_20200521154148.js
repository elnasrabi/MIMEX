import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, ImageStyle, TextStyle } from "react-native"
import { color } from "../../theme"
import { Text } from "../text/text"
import SignatureCapture from 'react-native-signature-capture'

export interface SignatureViewProps {
    uri: string,
    onClose: any,
    isViewImage: boolean
}

export const SignatureView: FunctionComponent<SignatureViewProps> = observer(props => {
  let refs: any

  const ROOT_VIEW: ViewStyle = { flex: 1, flexDirection: "column" }
  const BUTTON_VIEW: ViewStyle = { flex: 1, flexDirection: "row" }
  const TITLE: TextStyle = { alignItems: "center", justifyContent: "center" }
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
    <View style={ROOT_VIEW}>
      <Text style={TITLE}>Signature Capture Extended </Text>
      <SignatureCapture
        style={signature}
        ref={(sign) => { refs = sign }}
        onSaveEvent={_onSaveEvent}
        onDragEvent={_onDragEvent}
        saveImageFileInExtStorage={false}
        showNativeButtons={false}
        showTitleLabel={false}
        viewMode={"portrait"} />

      <View style={BUTTON_VIEW}>
        <TouchableOpacity style={buttonStyle}
          onPress={() => { saveSign() }} >
          <Text tx={"common.save"} />
        </TouchableOpacity>

        <TouchableOpacity style={buttonStyle}
          onPress={() => { resetSign() }} >
          <Text tx={"common.reset"} />
        </TouchableOpacity>

      </View>

    </View>
  )
})
