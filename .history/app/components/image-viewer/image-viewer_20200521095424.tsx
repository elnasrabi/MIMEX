import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, TouchableHighlight, ImageStyle, Alert, Modal } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text } from "../../components"
import { color, typography } from "../../theme"
import ImagePicker from 'react-native-image-picker';

export interface ImageViewerProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}
const ROOT: ViewStyle = {
    flex: 1,
}
const CENTERED_VIEW: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
}
const OPEN_BUTTON: ImageStyle = {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
}
const LINK_TEXT: TextStyle = {
    color: color.palette.link,
    textDecorationLine: "underline"
}

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
}

const SIGN_INPUT: ViewStyle = {
    borderColor: color.palette.darkText,
    borderWidth: 2
}
const SIGN_LABEL: TextStyle = {
    color: color.palette.red,
    fontFamily: typography.secondary,
    fontSize: 18
}
const SIGNATURE_TEXT: TextStyle = {
    marginTop: 10
}

const CONSIGNMENT_VIEW: ViewStyle = { flex: 1 }
const CAMERA_ICON: ImageStyle = { marginTop: 5 }
const STATUS_VIEW: ViewStyle = {
    height: 50,
    backgroundColor: color.palette.toolbar,
    marginTop: 10,
    justifyContent: "center"
}
const STATUS_TITLE: TextStyle = {
    fontSize: 18,
    textAlign: "left",
    marginStart: 30,
}
const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 }
const STATUS_CONTAINER: ViewStyle = {
    padding: 15
}
const PICKER_CONTAINER: ViewStyle = {
    flexDirection: "row"
}
const PICKER_VIEW: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    height: 40,
    width: 180,
    borderColor: color.palette.darkText,
    borderWidth: 2,
    borderRadius: 4
}
const SIGN_VIEW: ViewStyle = {
    borderColor: color.palette.darkText,
    borderWidth: 2,
    borderRadius: 3,
    marginTop: 20,
    width: "100%",
    height: 300,
    backgroundColor: color.palette.white
}
const DATE_TEXT: TextStyle = { flex: 1, textAlign: "right", fontSize: 16 }
export const ImageViewer: FunctionComponent<ImageViewerProps> = observer(props => {
    const [selectedValue, setSelectedValue] = useState("java")
    const [fileName, setFileName] = useState("")
    useEffect(() => {
    }, [])

    const onCameraPres = () => {
        ImagePicker.showImagePicker(options, (response) => {
            setFileName(response.fileName)
        })
    }
    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
    return (
        <View style={CENTERED_VIEW}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={CENTERED_VIEW}>

                </View>
            </Modal>

            <TouchableHighlight
                style={OPEN_BUTTON}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Text>Show Modal</Text>
            </TouchableHighlight>
        </View>)
})
