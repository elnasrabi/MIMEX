import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Alert, Platform } from "react-native"
import { color } from "../../theme"
import SignatureCapture from 'react-native-signature-capture'
import { Screen } from "../screen/screen"
import { BackButton } from "../header/back-button"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { ParamListBase } from "@react-navigation/native"
import { BottomButton } from "../bottom-button/bottom-button"
import { icons } from "../icon/icons"
import { useStores } from "../../models/root-store"
import { requestPermission, STORAGE_PERMISSION } from "../../utils/app-permission"

export interface SignatureViewProps {
  navigation: NativeStackNavigationProp<ParamListBase>

}
const ROOT: ViewStyle = { flex: 1, justifyContent: "center" }
let refs: any
const signature: ViewStyle = {
  flex: 1
}
const signatureView: ViewStyle = {
  borderColor: '#000033',
  borderWidth: 2,
  height: 300,
  margin: 10,
  marginTop: 80
}

const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 }

export const SignatureView: FunctionComponent<SignatureViewProps> = observer(props => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
  const { consignmentStore } = useStores()
  const saveSign = async () => {
    if (Platform.OS == 'android') {
      const result = await requestPermission(STORAGE_PERMISSION)
      if (result) {
        refs.saveImage()
      }
    } else {
      refs.saveImage()
    }
  }
  const resetSign = () => {
    refs.resetImage()
  }
  const onSaveEvent = (result: any) => {
    consignmentStore.onSigned()
    goBack()
  }
  return (
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
      <BackButton
        title={"common.signature"}
        onPress={goBack} />
      <View style={signatureView}>
        <SignatureCapture
          ref={(sign) => { refs = sign }}
          style={signature}
          saveImageFileInExtStorage={true}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode={"portrait"}
          onSaveEvent={result => onSaveEvent(result)}
        />
      </View>

      <View style={BOTTOM_VIEW}>
        <BottomButton
          leftImage={icons.blackButton2}
          rightImage={icons.redButton2}
          leftText={"common.save"}
          rightText={"common.reset"}
          onLeftPress={saveSign}
          onRightPress={resetSign} />
      </View>
    </Screen >
  )
})
