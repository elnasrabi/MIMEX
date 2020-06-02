import React, { FunctionComponent, useState } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, View, FlatList, Platform, TextStyle } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { isIphoneX } from 'react-native-iphone-x-helper';

// imports from components, themes and modals
import { Screen, Text, Checkbox } from "../../components";
import { color, typography } from "../../theme";
import { MenuButton } from "../../components/header/menu-button";
import { icons } from "../../components/icon/icons";
import { BottomButton } from "../../components/bottom-button/bottom-button";

export interface MyListProps {
  navigation: NativeStackNavigationProp<ParamListBase>
};
const ROOT: ViewStyle = {
  paddingBottom: 10
};
const CONTINUE: ViewStyle = {
  flex: 1
};
const FLATLIST_STYLE: ViewStyle = {
  marginVertical: 10
};
const MAIN_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  marginBottom: 10
};
const CONSIGNMENT_DETAIL: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: "space-between",
  marginVertical: 5
};
const CHECKBOX_VIEW: ViewStyle = {
  justifyContent: "center",
  alignItems: 'center',
  marginLeft: 5
};
const SUB_CONTAINER: ViewStyle = {
  flex: 1,
  marginRight: 2,
  borderWidth: 1,
  padding: 3,
  backgroundColor: color.palette.listBG
};
const CHECKBOX: ViewStyle = {
  height: 25,
  width: 25,
  borderColor: color.palette.black
};
const SEPERATOR_LINE: ViewStyle = {
  height: 5,
  backgroundColor: color.palette.black,
  width: '95%',
  marginLeft: 10,
  borderRadius: 5
};
const SELECTALL_CHECKBOX: ViewStyle = {
  margin: 10,
  marginTop: Platform.OS == "android" ? 60 : isIphoneX() ? 10 : 33
};
const ADDRESS_VIEW: ViewStyle = {
  flex: 1,
  marginVertical: 5
};
const DISPATCH_STYLE: TextStyle = {
  color: color.palette.link,
  fontFamily: typography.secondary
};
const textStyle: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.secondary
};

export const MyList: FunctionComponent<MyListProps> = observer((props) => {

  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation]);
  const [toggleAll, useToggleAll] = useState(false);
  const [mylist, updateMyList] = useState([
    { id: '1', check: false },
    { id: '2', check: false },
    { id: '3', check: false },
    { id: '4', check: false },
    { id: '5', check: false },
    { id: '6', check: false },
    { id: '7', check: false },
    { id: '8', check: false },
    { id: '9', check: false }
  ]);

  const updateCheckBox = (index) => {
    let newArr = [...mylist]
    let i = 0, j;
    newArr[index].check = !newArr[index].check
    for (j = 0; j < newArr.length; j++) {
      if (newArr[j].check) {
        i++
      }
    }
    if (i == newArr.length) {
      useToggleAll(true);
    }
    else useToggleAll(false);
    updateMyList(newArr);
  }
  const updateAllCheckBox = (isSelect) => {
    let newArr = [...mylist]
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].check = isSelect
    }
    updateMyList(newArr);
    useToggleAll(!toggleAll);
  }

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={MAIN_CONTAINER}>
        <View style={CHECKBOX_VIEW}>
          <Checkbox
            tx='MyList.empty'
            outlineStyle={[CHECKBOX, { marginLeft: 5 }]}
            value={item.check}
            onToggle={() => { updateCheckBox(index) }}
          />
        </View>
        <View style={SUB_CONTAINER}>
          <View style={CONSIGNMENT_DETAIL}>
            <View style={CONTINUE}>
              <Text style={textStyle}>ABCD123456</Text>
            </View>
            <View style={[CONTINUE, { alignItems: "flex-end" }]}>
              <Text style={DISPATCH_STYLE}>Despatched</Text>
            </View>
          </View>
          <View style={ADDRESS_VIEW}>
            <Text style={textStyle}>123 RED TREE STREET</Text>
          </View>
          <View style={ADDRESS_VIEW}>
            <Text style={textStyle}>South Yarra</Text>
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
      <View style={SELECTALL_CHECKBOX}>
        <Checkbox
          tx='MyList.empty'
          outlineStyle={CHECKBOX}
          value={toggleAll}
          onToggle={() => updateAllCheckBox(!toggleAll)} />
      </View>
      <View style={SEPERATOR_LINE} />
      <FlatList
        data={mylist}
        style={FLATLIST_STYLE}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
      />
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        leftText={"common.success"}
        rightText={"common.fail"} />
    </Screen >

  )
})
