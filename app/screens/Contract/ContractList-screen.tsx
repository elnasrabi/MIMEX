import { ParamListBase } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { FunctionComponent } from "react"
import { FlatList, Platform, TouchableOpacity, ViewStyle } from "react-native"
import { isIphoneX } from "react-native-iphone-x-helper"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen } from "../../components"
import { ComContractList } from "../../components/Contract/com-Contract-list"
import { BackButton } from "../../components/header/back-button"
import { useStores } from "../../models/root-store"
import { color } from "../../theme"

export interface ContractListProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const ROOT: ViewStyle = {
  justifyContent: "center",
  flex: 1,
}

const FLAT_LIST_CONTAINER: ViewStyle = { marginTop: Platform.OS == 'android' ? 60 : isIphoneX() ? 10 : 33 }
//const FLAT_LIST_CONTAINER: ViewStyle = { marginTop: Platform.OS == 'android' ? 20 : isIphoneX() ? 5 : 33 }


export const ContractList: FunctionComponent<ContractListProps> = observer(props => {
  const { authStore,ContractStore } = useStores()




  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])

  const goToDetailScreen = (detail) => {
   
    ContractStore.refreshCommodityList();
    ContractStore.refreshPaymentMethodList();
   ContractStore.getContractCommodityList(authStore.authorization,detail.ContractCode[0])
   ContractStore.getContractPaymentMethodList(authStore.authorization,detail.ContractCode[0])

    const ContractDetail = detail

    const ContractCommDetail = ContractStore.ContractCommodityDetail
    const ContractPMDetail = ContractStore.ContractPaymentMethodDetail

    ContractStore.setContractDetail(ContractDetail)
    ContractStore.setContractCommodityDetail(ContractCommDetail)
    ContractStore.setContractPaymentMethodDetail(ContractPMDetail)

    props.navigation.navigate("ContractDetail")
  }
  return (
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
      <BackButton
        title={"ContractList.contract"}
        onPress={goBack} />

      <FlatList
        style={FLAT_LIST_CONTAINER}
        data={ContractStore.ContractList}
        renderItem={({ item, index }) =>
          <TouchableOpacity onPress={() => {
            goToDetailScreen(item)
          }}>
            <ComContractList item={item} index={index} />
          </TouchableOpacity>
        }
        keyExtractor={(item, index) => index.toString()}
      />



    </Screen>
  )
})
