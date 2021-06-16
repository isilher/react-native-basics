import { StatusBar } from "expo-status-bar"
import React, { useMemo, useState } from "react"
import { useEffect } from "react"
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  Pressable,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native"
import { AppContent } from "./src/AppContent"
import AsyncStorage from "@react-native-async-storage/async-storage"

const USER_NAME_KEY = "USER_NAME"
const DEFAULT_USER_NAME = "Unkown user"

export const MyButton: React.FC<{
  onPress: () => void
  theme: string
}> = ({ onPress, theme, children }) => {
  const [opacity, setOpacity] = useState(1)
  const [color, setColor] = useState("pink")

  useEffect(() => {
    if (theme === "naval") setColor("blue")
    if (theme === "football") setColor("orange")
  }, [theme])

  const buttonStyles = StyleSheet.compose(styles.myButton, {
    opacity,
    backgroundColor: color,
  })

  const onPressIn = () => {
    setOpacity(0.5)
    setColor("red")
  }

  const onPressOut = () => {
    onPress()
    setOpacity(1)
    if (theme === "naval") setColor("blue")
    if (theme === "football") setColor("orange")
  }

  return (
    <Pressable
      style={buttonStyles}
      onPressOut={onPressOut}
      onPressIn={onPressIn}
    >
      {children}
    </Pressable>
  )
}

export default function App() {
  const [userName, setUserName] = useState<string>()
  const [newUserName, setNewUserName] = useState("")
  const [theme, setTheme] = useState("naval")

  const updateUserName = () => {
    setUserName(newUserName)
  }

  const storeUserName = async () => {
    if (!userName) return
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

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={styles.container}
        >
          <AppContent userName={userName} />

          <MyButton
            onPress={() => setUserName(DEFAULT_USER_NAME)}
            theme={theme}
          >
            <Text style={{ color: "white" }}>Clear!</Text>
          </MyButton>
          <MyButton onPress={() => setTheme("football")} theme="flower">
            <Text>Change theme!</Text>
          </MyButton>
          {["audi", "volkswagen"].map((brand) => (
            <View key={brand}>
              <Text>Car of brand: {brand}</Text>
            </View>
          ))}
          <StatusBar backgroundColor="#fff" style="auto" />
        </ScrollView>
      </SafeAreaView>

      <View style={styles.floatAtTop}>
        <SafeAreaView>
          <TextInput
            onChangeText={(text) => {
              setNewUserName(text)
            }}
            placeholder="Your name here"
            style={styles.nameInput}
          />
          <MyButton theme="naval" onPress={updateUserName}>
            <Text>SAVE</Text>
          </MyButton>
        </SafeAreaView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create<{
  container: ViewStyle
  scrollContainer: ViewStyle
  nameInput: ViewStyle
  myButton: ViewStyle
  floatAtTop: ViewStyle
}>({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "pink",
    maxHeight: Dimensions.get("window").height,
  },
  scrollContainer: {
    padding: 10,
    paddingTop: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  nameInput: {
    borderColor: "blue",
    borderWidth: 2,
    height: 50,
    padding: 10,

    backgroundColor: "white",
  },
  myButton: {
    height: 50,
    width: "50%",
    backgroundColor: "pink",
  },
  floatAtTop: {
    height: 200,
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
  },
})
