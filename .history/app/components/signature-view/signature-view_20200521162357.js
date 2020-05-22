/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import SignatureCapture from 'react-native-signature-capture'

const React = require('react')
const ReactNative = require('react-native')

const { Component } = React

const {
  AppRegistry,
  StyleSheet,
  Text,
  View, TouchableHighlight
} = ReactNative

export default class SignatureView extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={{ alignItems: "center", justifyContent: "center" }}>Signature Capture Extended </Text>
        <SignatureCapture
          style={[{ flex: 1 }, styles.signature]}
          ref="sign"
          onSaveEvent={this._onSaveEvent}
          onDragEvent={this._onDragEvent}
          saveImageFileInExtStorage={false}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode={"portrait"}/>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableHighlight style={styles.buttonStyle}
            onPress={() => { this.saveSign() } } >
            <Text>Save</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttonStyle}
            onPress={() => { this.resetSign() } } >
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
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#eeeeee",
    flex: 1,
    height: 50,
    justifyContent: "center",
    margin: 10
  },
  signature: {
    borderColor: '#000033',
    borderWidth: 1,
    flex: 1,
  }
})
