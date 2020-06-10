import React, { FunctionComponent, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ActivityIndicator, Platform } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen } from "../../components"
import { color } from "../../theme"
import { BackButton } from "../../components/header/back-button"
import { isIphoneX } from "react-native-iphone-x-helper";
import Pdf from 'react-native-pdf'

export interface PDFViewerProps {
  navigation: NativeStackNavigationProp<ParamListBase>
  source: any
}
const ROOT: ViewStyle = {
  flex: 1,
}
const PDF_VIEW: ViewStyle = { flex: 1, marginTop: Platform.OS == 'android' ? 25 : isIphoneX() ? 10 : 33 }
const PROGRESS: ViewStyle = {
  alignSelf: "center",
  flex: 1
}
const source = 'http://samples.leanpub.com/thereactnativebook-sample.pdf'
export const PDFViewer: FunctionComponent<PDFViewerProps> = observer(props => {
  const [isLoading, setLoading] = useState(false)

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])

  return (
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
      <BackButton
        title={"common.pdfViewer"}
        onPress={goBack} />

      {isLoading ? <ActivityIndicator style={PROGRESS} size={"large"} color={color.palette.darkText} />
        : <Pdf
          style={PDF_VIEW}
          source={{ uri: props.source || source }}
          onLoadComplete={(numberOfPages, filePath) => {
            setLoading(false)
          }} />}

    </Screen>
  )
})
