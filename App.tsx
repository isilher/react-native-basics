import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { useEffect } from "react"
import {
  StyleSheet,
  View,
  ViewStyle,
  Dimensions,
  SafeAreaView,
  Text,
} from "react-native"
import { AppContent } from "./src/AppContent"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Login } from "./src/Login"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"

const USER_NAME_KEY = "USER_NAME"
const DEFAULT_USER_NAME = "Unkown user"

export default function App() {
  const [userName, setUserName] = useState<string>()
  const loggedIn = userName !== "Logout"

  const storeUserName = async () => {
    if (userName === undefined) return
    try {
      await AsyncStorage.setItem(USER_NAME_KEY, userName)
    } catch (e) {
      // saving error
      console.log(e)
    }
  }

  useEffect(() => {
    if (!userName) return
    storeUserName()
  }, [userName])

  useEffect(() => {
    const getUserName = async () => {
      try {
        const value = await AsyncStorage.getItem(USER_NAME_KEY)
        if (value !== null) {
          // value previously stored
          setUserName(value)
        } else {
          setUserName(DEFAULT_USER_NAME)
        }
      } catch (e) {
        // error reading value
        console.log(e)
      }
    }

    getUserName()
  }, [])

  const Drawer = createDrawerNavigator()

  const LoginScreen = () => (
    <Login userName={userName} setUserName={setUserName} />
  )

  const WelcomeScreen = () => <AppContent userName={userName} />

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="login" component={LoginScreen} />
          <Drawer.Screen name="welcome" component={WelcomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>

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
