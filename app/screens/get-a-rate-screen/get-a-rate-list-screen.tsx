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
  margin: 10,
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
  justifyContent: "center"
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
  const flatListData = [
    {
      header1: 'AFS - STAR TRACK EXPRESS',
      header2: 'Road Express Service',
      carrier: 'Alternative Freight Servies',
      service: 'STAR TRACK EXPRESS',
      serviceType: 'Road Express',
      rateIncSurc: '$ 11.00',
      surcharge: '$ 0.00',
      brokerRate: '$ 0.00',
      deliveryDate: '28 Dec 2020',
      transitDays: '5'
    },
    {
      header1: 'AFX - TOLL PRIORITY - Overnight',
      header2: '',
      carrier: 'Alternative Freight Servies',
      service: 'TOLL PRIORITY',
      serviceType: 'Overnight',
      rateIncSurc: '$ 11.00',
      surcharge: '$ 0.00',
      brokerRate: '$ 0.00',
      deliveryDate: '28 Dec 2020',
      transitDays: '5'
    }
  ]
  const renderSubRow = (tx, value, displayText = true) => {
    return (
      <View style={SUB_ROW_CONTAINER}>
        <View style={SUB_ROW_LABEL}>
          {displayText ? <Text style={[FONTFAMILY, { color: color.palette.black }]} tx={tx} /> : null}
        </View>
        <View style={SUB_ROW_VALUE}>
          <Text style={[FONTFAMILY, { color: color.palette.link }]}>{displayText ? value : `- ${value}`}</Text>
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
          <Text style={[FONTFAMILY, { color: color.palette.link }]}>{value}</Text>
        </View>
      </View>
    )
  }


  const renderItem = (item, index) => {
    return (
      <View key={index} style={MAIN_CONTAINER}>
        <View style={SUB_CONTAINER}>
          <Text style={[FONTFAMILY]}>{item.header1}</Text>
          {item.header2 ? <Text style={[FONTFAMILY]}>{item.header2}</Text> : null}
        </View>
        {renderSubRow("getARateListScreen.carrier", item.carrier)}
        {renderSubRow("getARateListScreen.service", item.service)}
        {renderSubRow("getARateListScreen.header", item.serviceType, false)}
        {renderSubRateRow('getARateListScreen.rateIncSurc', item.rateIncSurc)}
        {renderSubRateRow('getARateListScreen.surcharge', item.surcharge)}
        {renderSubRateRow('getARateListScreen.brokerRate', item.brokerRate)}
        {renderSubRateRow('getARateListScreen.deliveryDate', item.deliveryDate)}
        {renderSubRateRow('getARateListScreen.transitDays', item.transitDays)}
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