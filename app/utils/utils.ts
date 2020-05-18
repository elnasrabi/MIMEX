import NetInfo from "@react-native-community/netinfo"
import { Alert } from "react-native"

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
