import NetInfo from "@react-native-community/netinfo"
import { Alert, Linking } from "react-native"
import { translate } from "../i18n"
// import call from 'react-native-phone-call'
import Moment from 'moment'

export function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0
}
export function translateText(text): string {
  const i18nText = text && translate(text)
  return i18nText
}
export function showAlert(title, desc = "") {
  Alert.alert(translateText(title), translateText(desc))
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
export function getFormattedDate(date): string {
  Moment.locale('en')
  const newDate = Moment(date, "yyyy-m-d hh:mm:ss").format('hh:mmA, DD MMM, yyyy')
  return newDate
}

export function isInternetAlive() {
  NetInfo.addEventListener(state => {
    // Alert.alert("d")
    console.log("Connection type", state.type)
    console.log("Is connected?", state.isConnected)
  })
}
