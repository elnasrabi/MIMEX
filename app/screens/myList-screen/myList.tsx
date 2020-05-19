import React, { FunctionComponent, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, FlatList, Platform } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Checkbox } from "../../components"
import { color } from "../../theme"
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons"
import { BottomButton } from "../../components/bottom-button/bottom-button";

export interface MyListProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
  paddingBottom: 10
}
const CONTINUE: ViewStyle = {
  flex: 1
}
const FLATLIST_STYLE: ViewStyle = {
  marginVertical: 10
}
const RENDER_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  marginBottom: 10
}
const RENDER_CONSIGNMENT_DETAIL_VIEW: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: "space-between",
  marginVertical: 5
}
const RENDER_CHECKBOX_VIEW: ViewStyle = {
  justifyContent: "center",
  alignItems: 'center'
}
const RENDER_INNER_CONTAINER: ViewStyle = {
  flex: 1,
  marginRight: 2,
  borderWidth: 1,
  padding: 3
}
const CHECKBOX_STYLE: ViewStyle = {
  height: 25,
  width: 25,
  borderColor: color.palette.black
}
const SEPERATOR_LINE: ViewStyle = {
  height: 5,
  backgroundColor: color.palette.black,
  width: '95%',
  marginLeft: 10,
  borderRadius: 5
}
const SELECTALL_CHECKBOX_VIEW: ViewStyle = {
  margin: 10,
  marginTop: Platform.OS == "android" ? 60 : 10
}
const RENDER_ADD: ViewStyle = {
  flex: 1,
  marginVertical: 5
}

export const MyList: FunctionComponent<MyListProps> = observer((props) => {

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])
  const [toggleAll, useToggleAll] = useState(false)
  const [Mylist, updateMyList] = useState([{ id: '1', check: false }, { id: '2', check: false }, { id: '3', check: false }, { id: '4', check: false }, { id: '5', check: false }, { id: '6', check: false }, { id: '7', check: false }, { id: '8', check: false }, { id: '9', check: false }])

  const updateCheckBox = (index) => {
    let newArr = [...Mylist]
    let i = 0, j;
    newArr[index].check = !newArr[index].check
    for (j = 0; j < newArr.length; j++) {
      if (newArr[j].check) {
        i++
      }
    }
    if (i == newArr.length) {
      useToggleAll(true)
    }
    else useToggleAll(false)
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
      <View key={index} style={RENDER_CONTAINER}>
        <View style={RENDER_CHECKBOX_VIEW}>
          <Checkbox
            tx='MyList.empty'
            outlineStyle={[CHECKBOX_STYLE, { marginLeft: 5 }]}
            value={item.check}
            onToggle={() => { updateCheckBox(index) }}
          />
        </View>
        <View style={RENDER_INNER_CONTAINER}>
          <View style={RENDER_CONSIGNMENT_DETAIL_VIEW}>
            <View style={CONTINUE}>
              <Text>ABCD123456</Text>
            </View>
            <View style={[CONTINUE, { alignItems: "flex-end" }]}>
              <Text style={{}}>Despatched</Text>
            </View>
          </View>
          <View style={RENDER_ADD}>
            <Text>123 RED TREE STREET</Text>
          </View>
          <View style={RENDER_ADD}>
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
      <View style={SELECTALL_CHECKBOX_VIEW}>
        <Checkbox
          tx='MyList.empty'
          outlineStyle={CHECKBOX_STYLE}
          value={toggleAll}
          onToggle={() => updateAllCheckBox(!toggleAll)} />
      </View>
      <View style={SEPERATOR_LINE} />
      <FlatList
        data={Mylist}
        style={FLATLIST_STYLE}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
      />

      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton}
        leftText={"common.success"}
        rightText={"common.fail"} />

    </Screen >

  )
})
