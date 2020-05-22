import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity } from "react-native"
import { color } from "../../theme"
import SignatureCapture from 'react-native-signature-capture'
import { Text } from "../text/text"
import { Screen } from "../screen/screen"
import { BackButton } from "../header/back-button"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { ParamListBase } from "@react-navigation/native"

export interface SignatureViewProps {
  navigation: NativeStackNavigationProp<ParamListBase>

}
const ROOT: ViewStyle = { flex: 1, justifyContent: "center" }
const BOTTOM_VIEW: ViewStyle = { flex: 1, flexDirection: "row" }
let refs: any
const signature: ViewStyle = {
  flex: 1,
  borderColor: '#000033',
  borderWidth: 1,
  marginTop: 60
}
const buttonStyle: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  height: 50,
  backgroundColor: "#eeeeee",
  margin: 10
}
export const SignatureView: FunctionComponent<SignatureViewProps> = observer(props => {

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
  const saveSign = () => {
    refs.saveImage()
  }
  const resetSign = () => {
    refs.resetImage()
  }
  return (
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
      <BackButton
        title={"common.signature"}
        onPress={goBack} />
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
          <Text tx={"common.save"} />
        </TouchableOpacity>

        <TouchableOpacity style={buttonStyle}
          onPress={() => { resetSign() }} >
          <Text tx={"common.reset"} />
        </TouchableOpacity>

      </View>
    </Screen >
  )
})
