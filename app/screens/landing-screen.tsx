import React, { FunctionComponent, useEffect, useState, useLayoutEffect } from "react"
import { useFocusEffect, ParamListBase } from '@react-navigation/native'
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ImageStyle, BackHandler, Keyboard, Alert } from "react-native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Icon } from "../components"
import { color } from "../theme"
import { MenuButton } from "../components/header/menu-button"
import { SearchView } from "../components/search-view/search-view"
import { MyButton } from "../components/button/my-button"
import { icons } from "../components/icon/icons"
import { useStores } from "../models/root-store"
import { showAlert, isInternetAvailable, getJsonRequest } from "../utils/utils"
import NetInfo from "@react-native-community/netinfo"
import ConsignmentModel from "../models/local-database/consignment-model"
import Orientation from "react-native-orientation-locker"

export interface LandingScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const ROOT: ViewStyle = {
  justifyContent: "center",
  flex: 1,
}

const CONTAINER: ViewStyle = {
  justifyContent: 'center',
  flex: 1,
  paddingStart: 25,
  paddingEnd: 25
}

const BOTTOM_LIST: ViewStyle = {
  position: "absolute",
  bottom: 60,
  left: 20,
  right: 20,
  flexDirection: "row"
}
const CONTINUE: ViewStyle = {
  alignSelf: "center",
  flex: 1
}

const IMAGE_RED: ImageStyle = {
  alignSelf: "center",
  padding: 20,
  flex: 1,
  width: "100%",
  height: "100%"
}

const SEARCH_VIEW: ViewStyle = {
  // marginEnd: 55
}

const AFS_LOGO: ImageStyle = {
  alignSelf: "center"
}

const CONTAINER_AFS_LOGO: ImageStyle = {
  position: "absolute",
  top: 60,
  alignSelf: "center"
}

const dataList = ["landingScreen.myList", "landingScreen.safetyCheck", "landingScreen.getRate"]
let isConnected = true
export const LandingScreen: FunctionComponent<LandingScreenProps> = observer(props => {
  const { consignmentStore, homeStore, authStore, getARateStore } = useStores()
  const [searchValue, onSearchValue] = useState("CCS0000002")
  // const [searchValue, onSearchValue] = useState("")
  const [isValidSearch, onValidSearch] = useState(true)
  const [isGoPressed, setIsOnGoPress] = useState(false)

  useEffect(() => {
    Orientation.lockToPortrait()
  })
  useEffect(() => {
    if (homeStore.barCodeData.data) {
      onSearchValue(homeStore.barCodeData.data)
      homeStore.onCodeScanned({})
    }
  }, [homeStore.barCodeData])

  const getAllConsignment = async () => {
    const modal = new ConsignmentModel()
    let shouldCall = true
    if (shouldCall) {
      shouldCall = false
      const data = await modal.getAllSavedConsignment()
      data.forEach(async element => {
        const request = await getJsonRequest(element)
        // console.log(request) 582300/1750
        consignmentStore.saveConsignmentOffline(authStore.authorization, request, element.id)
      })
      shouldCall = true
    }
  }
  const initInternet = () => {
    NetInfo.addEventListener(async state => {
      if (state.isConnected) {
        const isInternet = await isInternetAvailable()
        if (isInternet && isConnected) {
          // Alert.alert("connected")
          isConnected = false
          getAllConsignment()
        } else if (!isInternet) {
          isConnected = true
        }
        setTimeout(() => { isConnected = true }, 3000)
      }
    })
  }

  useEffect(() => {
    consignmentStore.setConsignmentFalse()
    consignmentStore.stopSyncing()
    initInternet()
  }, [])
  useEffect(() => {
    if (isGoPressed && consignmentStore.isEmptyList) {
      showAlert("common.noData")
    } else if (isGoPressed && !consignmentStore.isEmptyList) {
      props.navigation.navigate("consignmentList")
    }
  }, [consignmentStore.consignmentList])

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp()
        return true
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [])
  )
  const handleDrawer = React.useMemo(() => () => props.navigation.toggleDrawer(), [props.navigation])

  const onCameraPress = () => {
    props.navigation.navigate("qrScanner")
  }
  const onSearchText = (text) => {
    onSearchValue(text)
    text ? onValidSearch(true) : onValidSearch(false)
  }
  const onGoPress = async () => {
    if (!searchValue) {
      onValidSearch(false)
    } else {
      const isConnected = await isInternetAvailable()
      if (isConnected) {
        setIsOnGoPress(true)
        const requestData = {
          consignmentMatchingExportRequest: {
            // connoteNumber: "AMI000071"
            connoteNumber: searchValue
          }
        }
        Keyboard.dismiss()
        consignmentStore.consignmentSearch(authStore.authorization, requestData)
      }
    }
  }

  const onButtonPress = (item, index) => {
    switch (item) {
      case "landingScreen.myList":
        return props.navigation.navigate('MyList')
      case "landingScreen.safetyCheck":
        return props.navigation.navigate('SafetyStack')
      case "landingScreen.getRate":
        return gotoGetARate()
      default: return true
    }
  }
  const gotoGetARate = () => {
    getARateStore.updatePreventrefersh(true)
    props.navigation.navigate('GetARateStack')
  }

  return (
    <Screen style={ROOT}
      statusBar={'dark-content'}
      statusBarColor={color.palette.white}
      sync={consignmentStore.sync}
      wall={'whiteWall'} preset="scroll">
      <MenuButton
        hasBackground={false}
        onPress={handleDrawer} />

      {/* AFS LOGO */}
      <Icon containerStyle={CONTAINER_AFS_LOGO} style={AFS_LOGO} icon={"afsLightLogo"} />

      <View style={CONTAINER}>

        {/* Search View */}
        <SearchView
          searchTextStyle={SEARCH_VIEW}
          onCameraPress={onCameraPress}
          value={searchValue}
          isValidSearch={isValidSearch}
          onGoPress={onGoPress}
          onChangeText={onSearchText}
          isLoading={consignmentStore.isButtonLoading}
          buttonStyle={SEARCH_VIEW} />

        {/* Bottom Option */}
        <View style={BOTTOM_LIST}>
          {dataList.map((data, index) => {
            return (
              <MyButton
                buttonSource={icons.redButton2}
                key={index}
                imageBackground={IMAGE_RED}
                style={CONTINUE}
                tx={data}
                onPress={() => onButtonPress(data, index)}
              />
            )
          })}
        </View>

      </View>
    </Screen>
  )
})
