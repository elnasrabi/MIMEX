import NetInfo from "@react-native-community/netinfo"
import { Alert, Linking } from "react-native"
import { translate } from "../i18n"
// import call from 'react-native-phone-call'

export function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0
}
export function translateText(text): string {
  const i18nText = text && translate(text)
  return i18nText
}
export function showAlert(text) {
  Alert.alert(translateText(text))
}

export async function isInternetAvailable(alert = true) {
  const netInfo = await NetInfo.fetch()
  if (netInfo.isConnected) {
    return true
  } else {
    if (alert) {
      showAlert("common.noInternet")
    }
    return false
  }
}
export const ADMINISTRATION = "Administration"
export const CARRIER = "Carrier"
export const Customer = "Customer"

export function callApi(number) {
  // const args = {
  //   number: number || '9093900003', // String value with the number to call
  //   prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
  // }
  // call(args).catch(console.error)
  Linking.openURL(`tel:${number}`)
}

