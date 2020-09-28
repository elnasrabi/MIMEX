import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { TextStyle } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { useStores } from "../../models/root-store";
import { color, typography } from "../../theme";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { NativeModules, Platform } from 'react-native';


export interface CustomDrawerContentProps {
  navigation?: NativeStackNavigationProp<ParamListBase>;
}

const LABEL: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 16,
  color: color.palette.darkText,
};

export const CustomDrawerContent: FunctionComponent<CustomDrawerContentProps> = observer(props => {
  const { authStore } = useStores();

  const deviceLanguage =
          Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
            : NativeModules.I18nManager.localeIdentifier;
            
            let home=(deviceLanguage==='en_US')?'Home':'الرئيسية'
            let clientstatus=(deviceLanguage==='en_US')?'My Status':'الموقف'
            let bankcustomerinquery=(deviceLanguage==='en_US')?'Customer Status':'موقف العميل'
            let myissue=(deviceLanguage==='en_US')?'My Issues':'بلاغاتي'
            let DocumentCenter=(deviceLanguage==='en_US')?'Document Center':'مركز الملفات'
            let UserSettings=(deviceLanguage==='en_US')?'User Settings':'معلوماتي'
            let ChangePassword=(deviceLanguage==='en_US')?'Change Password':'تغيير كلمة المرور'
            let Help=(deviceLanguage==='en_US')?'Help':'المساعدة'
            let Logout=(deviceLanguage==='en_US')?'Logout':'خروج'

console.log(deviceLanguage); //en_US

  const onLogout = () => {
    authStore.logout();
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={home}
        labelStyle={LABEL}
        onPress={() => props.navigation.navigate("LandingScreen")}
      />
       {authStore.IsTrader &&
      <DrawerItem
        labelStyle={LABEL}
        label={clientstatus}
        onPress={() => props.navigation.navigate("ClientStatus")}
      />}

{authStore.IsCBOS &&
      <DrawerItem
        labelStyle={LABEL}
        label={bankcustomerinquery}
        onPress={() => props.navigation.navigate("SearchClientStatus")}
      />}
   {/* {authStore.IsTrader && */}
   <DrawerItem
        labelStyle={LABEL}
        label={myissue}
        onPress={() => props.navigation.navigate("Issue")} 
      />
      
      {authStore.IsTrader && <DrawerItem
        labelStyle={LABEL}
        label={DocumentCenter}
        onPress={() => props.navigation.navigate("Document")}
      />
      }
      <DrawerItem
        labelStyle={LABEL}
        label={UserSettings}
        onPress={() => props.navigation.navigate("userSetting")}
      />

        <DrawerItem
        labelStyle={LABEL}
        label={ChangePassword}
        onPress={() => props.navigation.navigate("ChangePassword")}
      />
         <DrawerItem
        labelStyle={LABEL}
        label={Help}
        onPress={() => props.navigation.navigate("HelpScreen")}
      />
      <DrawerItem labelStyle={LABEL} label={Logout} onPress={onLogout} />
    </DrawerContentScrollView>
  );
});
