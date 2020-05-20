import NetInfo from "@react-native-community/netinfo"
import { Alert } from "react-native"
import call from 'react-native-phone-call'

export function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0
}

export async function isInternetAvailable() {
  const netInfo = await NetInfo.fetch()
  if (netInfo.isConnected) {
    return true
  } else {
    Alert.alert("No Internet Connection")
    return false
  }
}
export const ADMINISTRATION = "Administration"
export const CARRIER = "Carrier"
export const Customer = "Customer"

export function callApi(number) {
  const args = {
    number: number || '9093900003', // String value with the number to call
    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
  }
  call(args).catch(console.error)
}
