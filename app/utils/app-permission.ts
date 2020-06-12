import { PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import { Platform, Alert } from "react-native"
import { translate } from '../i18n'

const LOCATION_GRANTED = RESULTS.GRANTED
const LOCATION_DENIED = RESULTS.DENIED
const LOCATION_BLOCKED = RESULTS.BLOCKED

export const LOCATION_PERMISSION = {
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
}

export const STORAGE_PERMISSION = {
  android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE && PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ios: PERMISSIONS.IOS.STOREKIT
}
const translateText = (text): string => {
  const i18nText = text && translate(text)
  return i18nText
}
export const requestPermission = async (type: any) => {
  const result = await request(Platform.select(type))
  if (result === LOCATION_GRANTED) {
    return true
  } else if (result === LOCATION_DENIED) {
    Alert.alert(translateText("common.permissionDenied"))
    return false
  } else if (result === LOCATION_BLOCKED) {
    Alert.alert(translateText("common.permissionBlocked"))
    return false
  } else {
    // Alert.alert(translateText("common.permissionUnavailable"))
    return false
  }
}
