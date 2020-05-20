import React, { FunctionComponent, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ScrollView, FlatList, TextStyle, TouchableOpacity } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Button, TextField, Checkbox } from "../../components"
import { color } from "../../theme"
import { MenuButton } from "../../components/header/menu-button";
import { MyButton } from "../../components/button/my-button"
import { icons } from "../../components/icon/icons"

export interface MyListProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  paddingBottom: 10
}
const BUTTON_TEXT: TextStyle = { color: 'white', fontSize: 20, paddingVertical: 15 }
const BUTTON: ViewStyle = { alignItems: "center", justifyContent: "center", borderRadius: 10 }

// const Mylist: any[] = [{ check: false }, { check: false }, { check: false }, { check: false }, { check: false }, { check: false }, { check: false }, { check: false }, { check: false }]
export const MyList: FunctionComponent<MyListProps> = observer((props) => {

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])
  const [toggleAll, useToggleAll] = useState(false)
  const [Mylist, updateMyList] = useState([{ check: false }, { check: false }, { check: false }])

  const CONTINUE: ViewStyle = {
    flex: 1
  }
  // useEffect(() => {
  //   let i;
  //   let newArr = [...Mylist]
  //   if (toggleAll) {
  //     for (i = 0; i < newArr.length; i++) {
  //       newArr[i].check = true
  //     }
  //   }
  //   else {
  //     for (i = 0; i < newArr.length; i++) {
  //       newArr[i].check = false
  //     }
  //   }
  //   updateMyList(newArr)
  // }, [toggleAll])

  // useEffect(() => {
  //   let i = 0;
  //   let newArr = [...Mylist]
  //   let j;
  //   for (j = 0; j < newArr.length; j++) {
  //     if (newArr[j].check) {
  //       i++
  //     }
  //   }
  //   if (i == newArr.length) {
  //     useToggleAll(true)
  //   }
  //   else useToggleAll(false)
  // }, [Mylist])

  const updateCheckBox = (index) => {
    let newArr = [...Mylist]
    newArr[index].check = !newArr[index].check
    updateMyList(newArr)
  }
  const updateAllCheckBox = (isSelect) => {
    let newArr = [...Mylist]
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = isSelect
    }
    updateMyList(newArr)
    useToggleAll(!toggleAll)
  }

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{ flexDirection: 'row', marginBottom: 10 }}>
        <View style={{ justifyContent: "center", alignItems: 'center' }}>
          <Checkbox
            tx='MyList.empty'
            outlineStyle={{ height: 25, width: 25, marginLeft: 5, borderColor: color.palette.black }}
            value={item.check}
            onToggle={() => { updateCheckBox(index) }}
          />
        </View>
        <View style={{ flex: 1, marginRight: 2, borderWidth: 1, padding: 3 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", marginVertical: 5 }}>
            <View style={{ flex: 0.5 }}>
              <Text>ABCD123456</Text>
            </View>
            <View style={{ flex: 0.5, alignItems: "flex-end" }}>
              <Text style={{}}>Despatched</Text>
            </View>
          </View>
          <View style={{ flex: 1, marginVertical: 5 }}>
            <Text>123 RED TREE STREET</Text>
          </View>
          <View style={{ flex: 1, marginVertical: 5 }}>
            <Text>South Yarra</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      <MenuButton
        title={"MyList.header"}
        onPress={handleDrawer} />
      <View style={{ margin: 10, marginTop: Platform.OS == "android" ? 60 : 10 }}>
        <Checkbox tx='MyList.empty' outlineStyle={{ height: 25, width: 25, borderColor: color.palette.black }} value={toggleAll} onToggle={() => updateAllCheckBox(!toggleAll)} />
      </View>
      <View style={{ height: 5, backgroundColor: color.palette.black, width: '95%', marginLeft: 10, borderRadius: 5 }} />
      <FlatList
        data={Mylist}
        style={{ marginTop: 10, marginBottom: 10 }}
        renderItem={renderItem}
      />

      {/* <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
        <TouchableOpacity style={[BUTTON, { backgroundColor: 'black', width: 160 }]}>
          <Text style={BUTTON_TEXT}>Success</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[BUTTON, { backgroundColor: 'red', width: 130 }]}>
          <Text style={BUTTON_TEXT}>Fail</Text>
        </TouchableOpacity>
      </View> */}

      <View style={{
        position: "absolute",
        bottom: 10,
        flexDirection: "row"
      }}>
        <MyButton
          style={CONTINUE}
          tx="forgotpasswordScreen.submit"
        />
        <MyButton
          style={CONTINUE}
          buttonSource={icons.blackButton2}
          tx="forgotpasswordScreen.submit"
        />
      </View>
    </Screen >

  )
})
