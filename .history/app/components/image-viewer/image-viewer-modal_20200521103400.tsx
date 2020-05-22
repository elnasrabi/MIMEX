import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableHighlight, Alert, Modal, Image } from "react-native"
import AntDesign from 'react-native-vector-icons/dist/AntDesign'

export interface ImageViewerModalProps {
    uri: string,
    onClose: any,
    isViewImage: boolean
}
const CENTERED_VIEW: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
}
const OPEN_BUTTON: ViewStyle = {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
}

export const ImageViewerModal: FunctionComponent<ImageViewerModalProps> = observer(props => {
    return (
        <View style={CENTERED_VIEW}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.isViewImage}>
                <View style={CENTERED_VIEW}>
                    <Image style={{ height: 300, width: "95%" }} source={{ uri: props.uri }} />
                    <AntDesign color={color.palette.darkText} name="closecircle" size={60} />
                </View>
            </Modal>
        </View>)
})
