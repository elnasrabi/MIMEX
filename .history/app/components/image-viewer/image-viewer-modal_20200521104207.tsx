import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableHighlight, Alert, Modal, Image, ImageStyle } from "react-native"
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import { color } from "../../theme"

export interface ImageViewerModalProps {
    uri: string,
    onClose: any,
    isViewImage: boolean
}
const CENTERED_VIEW: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 2,
    borderColor: color.palette.darkText,
    borderWidth: 2,
    height: 300,
    width: "100%",
    margin: 10
}
const OPEN_BUTTON: ViewStyle = {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
}
const CLOSE_ICON: ImageStyle = {
    position: "absolute",
    top: 0
}

export const ImageViewerModal: FunctionComponent<ImageViewerModalProps> = observer(props => {
    return (
        <View style={CENTERED_VIEW}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.isViewImage}>
                <View>
                    <Image style={{ height: 300, width: "100%" }} source={{ uri: props.uri }} />
                    <AntDesign style={CLOSE_ICON} color={color.palette.darkText} name="closecircle" size={30} />
                </View>
            </Modal>
        </View>)
})
