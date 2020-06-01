import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, Platform, FlatList } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text } from "../../components"
import { color, typography } from "../../theme"
import { icons } from "../../components/icon/icons";
import { BottomButton } from "../../components/bottom-button/bottom-button";
import { isIphoneX } from "react-native-iphone-x-helper";
import { BackButton } from "../../components/header/back-button";
import { useStores } from "../../models/root-store";
import moment from "moment";
export interface GetARateListProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const FONTFAMILY: TextStyle = {
  fontFamily: typography.secondary
}
const ROOT: ViewStyle = {
  paddingBottom: 10
}
const FLATLIST_STYLE: ViewStyle = {
  margin: 10, paddingRight: 8, marginRight: 3,
  marginTop: Platform.OS == 'android' ? 50 : isIphoneX() ? 0 : 23,
}
const SUB_RATE_ROW_VIEW: ViewStyle = {
  flex: 1
}
const SUB_ROW_VALUE: ViewStyle = {
  flex: 0.7
}
const SUB_ROW_LABEL: ViewStyle = {
  flex: 0.3,
}
const SUB_ROW_CONTAINER: ViewStyle = {
  flexDirection: "row",
  marginTop: 10
}
const MAIN_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.listBG,
  borderWidth: 1,
  padding: 5,
  paddingTop: 10,
  borderRadius: 5,
  marginTop: 15
}
const SUB_CONTAINER: ViewStyle = {
  marginBottom: 20
}

export const GetARateList: FunctionComponent<GetARateListProps> = observer((props) => {
  const { GetARateStore } = useStores()
  const flatListData = GetARateStore.geteARateList

  const renderSubRow = (tx, value) => {
    return (
      <View style={SUB_ROW_CONTAINER}>
        <View style={SUB_ROW_LABEL}>
          <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={tx} />
        </View>
        <View style={SUB_ROW_VALUE}>
          <Text style={[FONTFAMILY, { color: color.palette.link }]}>{value}</Text>
        </View>
      </View>
    )
  }

  const renderSubRateRow = (tx, value) => {
    return (
      <View style={SUB_ROW_CONTAINER}>
        <View style={SUB_RATE_ROW_VIEW}>
          <Text tx={tx} style={[FONTFAMILY, { color: color.palette.black }]} />
        </View>
        <View style={SUB_RATE_ROW_VIEW}>
          <Text style={[FONTFAMILY, { color: color.palette.link }]}>{value ? value : '-'}</Text>
        </View>
      </View>
    )
  }


  const renderItem = (item, index) => {
    console.tron.log("Item", item)
    return (
      <View key={index} style={MAIN_CONTAINER}>
        <View style={SUB_CONTAINER}>
          <Text style={[FONTFAMILY]}>{item.journey[0]}</Text>
        </View>
        {renderSubRow("getARateListScreen.carrier", item.consignmentRateTime[0].carrier[0])}
        {renderSubRow("getARateListScreen.service", item.consignmentRateTime[0].service[0])}
        {renderSubRateRow('getARateListScreen.rateIncSurc', `$ ${item.consignmentRateTime[0].rate[0]}`)}
        {renderSubRateRow('getARateListScreen.surcharge', item.consignmentRateTime[0].surcharge)}
        {renderSubRateRow('getARateListScreen.brokerRate', item.consignmentRateTime[0].brokerRate)}
        {renderSubRateRow('getARateListScreen.deliveryDate', item.consignmentRateTime[0].deliveryDate[0])}
        {renderSubRateRow('getARateListScreen.transitDays', item.consignmentRateTime[0].transitDays[0])}
      </View>
    )
  }

  const goToGetARate = () => {
    return props.navigation.navigate("GetARate")
  }

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])

  return (
    <Screen style={ROOT} statusBar={'dark-content'} statusBarColor={color.palette.white} wall={'whiteWall'} preset="fixed">
      <BackButton
        title={"getARateListScreen.header"}
        onPress={goBack} />
      <FlatList
        data={flatListData}
        renderItem={({ item, index }) => renderItem(item, index)}
        style={FLATLIST_STYLE}
        keyExtractor={(item, index) => index.toString()}
      />
      <BottomButton
        leftImage={icons.blackButton2}
        rightImage={icons.redButton2}
        onLeftPress={() => goToGetARate()}
        onRightPress={() => goToGetARate()}
        leftText={"getARateListScreen.new"}
        rightText={"common.cancel"} />
    </Screen >
  )
})