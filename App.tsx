import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, View, ViewStyle, Dimensions } from "react-native"
import { AppContent } from "./src/AppContent"
import { Login } from "./src/Login"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { UserNameProvider } from "./src/components/UserNameContext"

export default function App() {
  const Drawer = createDrawerNavigator()

  return (
    <View style={styles.container}>
      <UserNameProvider>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="login" component={Login} />
            <Drawer.Screen name="welcome" component={AppContent} />
          </Drawer.Navigator>
        </NavigationContainer>
      </UserNameProvider>

      <StatusBar backgroundColor="#fff" style="auto" />
    </View>
  )
}

const styles = StyleSheet.create<{
  container: ViewStyle
}>({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "pink",
    maxHeight: Dimensions.get("window").height,
  },
})
