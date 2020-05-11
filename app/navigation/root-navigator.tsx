import React from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { RootParamList } from "./types"
import { PrimaryNavigator } from "./primary-navigator"
import { AuthNavigator } from "./auth-navigator"
import { useStores } from "../models/root-store";

const Stack = createNativeStackNavigator<RootParamList>()

const RootStack = observer(() => {
  const { authStore } = useStores();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      {authStore.isLoggedIn ?
        <Stack.Screen
          name="primaryStack"
          component={PrimaryNavigator}
          options={{
            headerShown: false,
          }}
        />
        :
        <Stack.Screen
          name="authStack"
          component={AuthNavigator}
          options={{
            headerShown: false,
          }}
        />}

    </Stack.Navigator>
  )
});

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
