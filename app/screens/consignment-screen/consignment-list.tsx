import React, { FunctionComponent, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, FlatList, TouchableOpacity, ImageStyle, Alert, Platform } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Icon } from "../../components"
import { color } from "../../theme"
import { MenuButton } from "../../components/header/menu-button"
import { isIphoneX } from "react-native-iphone-x-helper";
import { ComConsignmentList } from "../../components/consignment/com-consignment-list"
import { useStores } from "../../models/root-store"
import { BackButton } from "../../components/header/back-button"

export interface ConsignmentListProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const ROOT: ViewStyle = {
  justifyContent: "center",
  flex: 1,
}

const FLAT_LIST_CONTAINER: ViewStyle = { marginTop: Platform.OS == 'android' ? 60 : isIphoneX() ? 10 : 33 }

export const ConsignmentList: FunctionComponent<ConsignmentListProps> = observer(props => {
  const { homeStore } = useStores()

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])

  const goToDetailScreen = () => {
    props.navigation.navigate("consignmentDetail")
  }
  return (
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
      <BackButton
        title={"consignmentList.consignments"}
        onPress={goBack} />

      <FlatList
        style={FLAT_LIST_CONTAINER}
        data={homeStore.consignmentList}
        renderItem={({ item, index }) =>
          <ComConsignmentList item={item} index={index} onPress={goToDetailScreen} />
        }
        keyExtractor={(item, index) => index.toString()}
      />

    </Screen>
  )
})
