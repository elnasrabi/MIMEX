import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, Modal, Image, ImageStyle } from "react-native"
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
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(100,100,100, 0.5)',
    padding: 10,
}

const IMAGE_VIEW: ImageStyle = {
    height: 350,
    width: "100%",
    borderRadius: 2,
    borderColor: color.palette.darkText,
    borderWidth: 2
}

const CLOSE_ICON: ImageStyle = {
    marginTop: 20
}

export const ImageViewerModal: FunctionComponent<ImageViewerModalProps> = observer(props => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isViewImage}>
            <View style={CENTERED_VIEW}>
                <Image resizeMode={"contain"} style={IMAGE_VIEW} source={{ uri: props.uri }} />
                <TouchableOpacity style={CLOSE_ICON} onPress={props.onClose}>
                    <AntDesign name={"closecircle"} size={30} />
                </TouchableOpacity>
            </View>
        </Modal>
    )
})
