import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Icon, Button } from "../../components"
import { color } from "../../theme"
import { BackButton } from "../../components/header/back-button"
import Pdf from 'react-native-pdf'

export interface PDFViewerProps {
    navigation: NativeStackNavigationProp<ParamListBase>
    source: any
}
const ROOT: ViewStyle = {
  flex: 1,
}
const source = 'http://samples.leanpub.com/thereactnativebook-sample.pdf'
export const PDFViewer: FunctionComponent<PDFViewerProps> = observer(props => {
  useEffect(() => {
  }, [])

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])

  return (
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
      <BackButton
        title={"common.pdfViewer"}
        onPress={goBack} />

      <Pdf
        style={ROOT}
        source={{ uri: props.source || source }}
      />
    </Screen>
  )
})
