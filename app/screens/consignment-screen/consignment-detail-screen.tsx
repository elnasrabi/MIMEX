import React, { FunctionComponent, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ScrollView, Platform, Linking, TouchableWithoutFeedback } from "react-native"
import { ParamListBase, useIsFocused } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen } from "../../components"
import { color } from "../../theme"
import { BackButton } from "../../components/header/back-button"
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps' // remove PROVIDER_GOOGLE import if not using Google Maps
import { BottomButton } from "../../components/bottom-button/bottom-button"
import { icons } from "../../components/icon/icons"
import { ComConsignmentDetail } from "../../components/consignment/com-consigment-detail"
import { isIphoneX } from "react-native-iphone-x-helper"
import { useStores } from "../../models/root-store"
import { ForceTouchGestureHandler } from "react-native-gesture-handler"
import { getCurrentLocation } from "../../utils/utils"

export interface ConsignmentDetailProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}
const ROOT: ViewStyle = {
  flex: 1,
}

const CONSIGNMENT_VIEW: ViewStyle = { flex: 1, marginTop: Platform.OS == 'android' ? 60 : isIphoneX() ? 10 : 33 }
const MAP_VIEW: ViewStyle = {
  height: 350,
  width: "95%",
  alignSelf: "center",
  marginBottom: 10,
  borderColor: color.palette.darkText,
  borderWidth: 2,
  borderRadius: 3
}
const MAPS: ViewStyle = {
  height: "100%",
  width: "100%",
  alignSelf: "center",
}
const BOTTOM_VIEW: ViewStyle = { marginTop: 20, marginBottom: 20 }
let currentLocation = {
  latitude: 0,
  longitude: 0
}
export const ConsignmentDetail: FunctionComponent<ConsignmentDetailProps> = observer(props => {
  const isFocused = useIsFocused()
  const { consignmentStore } = useStores()
  const consignment = consignmentStore.consignmentDetail
  useEffect(() => {
    getCurrentLocation().then(location => {
      currentLocation = location
    }).catch(error => {
      console.log("LOCATION_ERROR" + error)
    })
  }, [isFocused])

  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])

  const onSuccessPress = () => {
    props.navigation.navigate("consignmentSuccess", { isSuccess: true })
  }
  const onFailPress = () => {
    props.navigation.navigate("consignmentSuccess", { isSuccess: false })
  }

  const canOpenUrl = async (url) => {
    const supported = await Linking.canOpenURL(url)
    return supported ? 'Open' : undefined
  }

  const openGoogleMap = async () => {
    const latitude = 37.78825
    const longitude = -122.4324

    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
    const latLng = `${latitude},${longitude}`
    const label = ''
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    })
    const googleMap = "comgooglemaps://"
    const wazeUrl = "https://www.waze.com/ul?ll=" + latitude + "%2C-" + longitude + "&navigate=yes&zoom=17"
    const tomtom = "https://www.tomtom.com/ul?ll=" + latitude + "%2C-" + longitude

    if (await canOpenUrl(googleMap)) {
      Linking.openURL(googleMap)
    } else if (await canOpenUrl(url)) {
      Linking.openURL(url)
    } else if (await canOpenUrl(wazeUrl)) {
      Linking.openURL(wazeUrl)
    } else if (await canOpenUrl(wazeUrl)) {
      Linking.openURL(wazeUrl)
    } else if (await canOpenUrl(tomtom)) {
      Linking.openURL(tomtom)
    }
  }

  const getMapView = () => {
    return (
      <View style={MAP_VIEW}>
        <MapView
          style={MAPS}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <View>
            <Marker coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude
            }} />
            <Marker coordinate={{
              latitude: 37.78825,
              longitude: -122.4324
            }} />
          </View>
        </MapView>
      </View>

    )
  }

  return (
    <Screen statusBarColor={color.palette.white} statusBar={"dark-content"} wall={"whiteWall"} style={ROOT} preset="fixed">
      <BackButton
        title={"consignmentDetail.consignment"}
        onPress={goBack} />
      <ScrollView style={CONSIGNMENT_VIEW}>
        <View>
          {/* consignment */}
          <ComConsignmentDetail data={consignment} navigation={props.navigation} view={"consignment"} />

          {/* Customer */}
          <ComConsignmentDetail data={consignment} navigation={props.navigation} view={"customer"} />
          {ForceTouchGestureHandler.forceTouchAvailable
            ? <ForceTouchGestureHandler onGestureEvent={openGoogleMap}>
              {getMapView()}
            </ForceTouchGestureHandler>
            : <TouchableWithoutFeedback onLongPress={openGoogleMap}>
              {getMapView()}
            </TouchableWithoutFeedback>
          }

        </View>
      </ScrollView>
      <View style={BOTTOM_VIEW}>
        <BottomButton
          leftImage={icons.blackButton2}
          rightImage={icons.redButton2}
          leftText={"common.milestone"}
          rightText={"common.exception"}
          onLeftPress={onSuccessPress}
          onRightPress={onFailPress} />
      </View>
    </Screen>
  )
})
