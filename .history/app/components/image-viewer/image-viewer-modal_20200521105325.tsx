import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableHighlight, Alert, Modal, Image, ImageStyle } from "react-native"
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import { color } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"

export interface ImageViewerModalProps {
    uri: string,
    onClose: any,
    isViewImage: boolean
}
const CENTERED_VIEW: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "95%",
    flex: 1
}
const OPEN_BUTTON: ViewStyle = {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
}
const CLOSE_ICON: ImageStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
}

export const ImageViewerModal: FunctionComponent<ImageViewerModalProps> = observer(props => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isViewImage}>
            <View style={CENTERED_VIEW}>
                <Image style={{
                    height: 300, width: "100%", borderRadius: 2,
                    borderColor: color.palette.darkText,
                    borderWidth: 2,
                }} source={{ uri: props.uri }} />
                <TouchableOpacity style={CLOSE_ICON} onPress={props.onClose}>
                    <AntDesign color={color.palette.darkText} name="closecircle" size={30} />
                </TouchableOpacity>
            </View>
        </Modal>
    )
})
