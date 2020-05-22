/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import SignatureCapture from "react-native-signature-capture"

const React = require("react")
const ReactNative = require("react-native")

const { Component } = React

const { AppRegistry, StyleSheet, Text, View, TouchableHighlight } = ReactNative

export class SignatureView extends Component {
  render() {
    return (
      <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
   <View style={styles.rootView}>
        <BackButton title={"consignmentSuccess.consignment"} onPress={goBack} />{" "}
        <SignatureCapture
          style={styles.signature}
          ref="sign"
          onSaveEvent={this._onSaveEvent}
          onDragEvent={this._onDragEvent}
          saveImageFileInExtStorage={false}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode={"portrait"}
        />
        <View style={styles.buttonView}>
          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={() => {
              this.saveSign()
            }}
          >
            <Text>Save</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={() => {
              this.resetSign()
            }}
          >
            <Text>Reset</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  saveSign() {
    this.refs.sign.saveImage()
  }

  resetSign() {
    this.refs.sign.resetImage()
  }

  _onSaveEvent(result) {
    // result.encoded - for the base64 encoded png
    // result.pathName - for the file path name
    console.log(result)
  }

  _onDragEvent() {
    // This callback will be called when the user enters signature
    console.log("dragged")
  }
}

const styles = StyleSheet.create({
  buttonView: { flex: 1, flexDirection: "row" },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#eeeeee",
    flex: 1,
    height: 50,
    justifyContent: "center",
    margin: 10,
  },
  rootView: { flex: 1, flexDirection: "column" },
  signature: {
    borderColor: "#000033",
    borderWidth: 1,
    flex: 1,
  },
})
