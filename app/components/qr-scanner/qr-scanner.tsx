/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { ImageStyle, ViewStyle, View, TouchableOpacity, ImageBackground, TextStyle } from "react-native"

import { color } from "../../theme"
import QRCodeScanner from 'react-native-qrcode-scanner'
import { QRProps } from "./qr-props"
import { Screen } from "../screen/screen"
import { BackButton } from "../header/back-button"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { ParamListBase } from "@react-navigation/native"

const ROOT: ViewStyle = {
    justifyContent: "center",
    flex: 1,
}
export interface QRScannerScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}
export const QRScanner: React.FunctionComponent<QRScannerScreenProps> = props => {
    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])

    const onSuccess = (e) => {
        // props.navigation.state.params.onSuccess()
        props.navigation.goBack()
    }
    return (
        <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
            <BackButton
                style={{ tintColor: color.palette.darkText }}
                onPress={goBack} />
            <QRCodeScanner
                onRead={onSuccess}
                topContent={null}
                bottomContent={null}
            />
        </Screen>
    )
}
