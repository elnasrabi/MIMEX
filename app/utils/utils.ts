/* eslint-disable @typescript-eslint/no-use-before-define */
import Geolocation from "@react-native-community/geolocation";
import NetInfo from "@react-native-community/netinfo";
// import call from 'react-native-phone-call'
import Moment from "moment";
import { Alert, Linking, Platform } from "react-native";
import { openSettings } from "react-native-permissions";
import { translate } from "../i18n";
import { LOCATION_PERMISSION, requestPermission } from "./app-permission";

export function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0;
}
export function translateText(text): string {
  const i18nText = text && translate(text);
  return i18nText;
}
export function showAlert(title, desc = "", buttonName = "common.ok", onPress = () => { }) {
  Alert.alert(
    translateText(title),
    translateText(desc),
    [
      {
        text: translateText(buttonName),
        onPress: onPress,
        style: "cancel",
      },
    ],
    { cancelable: false },
  );
}

export async function isInternetAvailable(alert = true) {
  const netInfo = await NetInfo.fetch();
  if (netInfo.isConnected) {
    return true;
  } else {
    if (alert) {
      showAlert("common.noInternet");
    }
    return false;
  }
}


export function currencyFormatUSD(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function currencyFormat(num) {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const ADMINISTRATION = "Administration";
export const CARRIER = "Carrier";
export const Customer = "Customer";

export function callApi(number) {
  // const args = {
  //   number: number || '9093900003', // String value with the number to call
  //   prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
  // }
  // call(args).catch(console.error)
  Linking.openURL(`tel:${number}`);
}
export const getFormattedDate = (date): string => {
  Moment.locale("en");
  const newDate = Moment().format("hh:mmA, DD MMM, yyyy");
  return newDate;
};




export async function getJsonRequest(record): Promise<any> {
 
  const request = {
    
    
      IssueDesc: record.IssueDesc,
      Type: record.Type,
      IssueObject:record.IssueObject,
      LoginName: record.LoginName,
      FormNo: record.FormNo
  }
  return request
}

const getCurrentDate = (): string => {
  return Moment().format("yyyy-MM-DDT") + Moment().format("HH:mm:ss");
};

export const consType = {
  success: "success",
  fail: "fail",
  specialAction: "specialAction",
};

export const isAndroidDevice = (): boolean => {
  let type = false;
  if (Platform.OS === "android") {
    type = true;
  } else {
    type = false;
  }
  return type;
};

export const getCurrentLocation = async (onLocationEnableCanceled: any): Promise<any> => {
  const result = await requestPermission(LOCATION_PERMISSION);
  let location;
  if (result) {
    // Geolocation.requestAuthorization()
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          location = position.coords;
          resolve(location);
        },
        () => {
          // See error code charts below.
          location = null;
          reject(location);
          locationSettingAlert(onLocationEnableCanceled);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 10000,
        },
      );
    });
  }
};

const locationSettingAlert = (onLocationEnableCanceled: any) => {
  Alert.alert(
    translateText("common.locationService"),
    translateText("common.locationServiceMsg"),
    [
      {
        text: translateText("common.setting"),
        onPress: () => {
          // onLocationEnableCanceled(false)
          openSettings().catch(() => console.warn("cannot open settings"));
        },
        style: "cancel",
      },
      {
        text: translateText("common.cancel"),
        onPress: () => {
          onLocationEnableCanceled(true);
        },
      },
    ],
    { cancelable: false },
  );
};
