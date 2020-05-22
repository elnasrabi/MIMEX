import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, Modal, Image, ImageStyle } from "react-native"
import { color } from "../../theme"
import SignatureCapture from 'react-native-signature-capture'
import { Text } from "../text/text"

export interface SignatureViewProps {
  uri: string,
  onClose: any,
  isViewImage: boolean
}
const ROOT: ViewStyle = { flex: 1, flexDirection: "column" }
const BOTTOM_VIEW: ViewStyle = { flex: 1, flexDirection: "row" }
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
  refs.saveImage()
}

const resetSign = () => {
  refs.resetImage()
}
export const SignatureView: FunctionComponent<SignatureViewProps> = observer(props => {
  return (
    <View style={ROOT}>
      <SignatureCapture
        ref={(sign) => { refs = sign }}
        style={signature}
        saveImageFileInExtStorage={true}
        showNativeButtons={false}
        showTitleLabel={false}
        viewMode={"portrait"} />

      <View style={BOTTOM_VIEW}>
        <TouchableOpacity style={buttonStyle}
          onPress={() => { saveSign() }} >
          <Text>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={buttonStyle}
          onPress={() => { resetSign() }} >
          <Text>Reset</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
})
