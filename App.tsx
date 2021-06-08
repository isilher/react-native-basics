import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { AppContent } from "./src/AppContent"

export default function App() {
  const [userName, setUserName] = useState("Rik")

  console.log("whats in a name?", userName)

  return (
    <View style={styles.container}>
      <AppContent userName={userName} />
      <TextInput
        onChangeText={(text) => {
          setUserName(text)
        }}
        placeholder="Your name here"
        style={styles.nameInput}
      />
      <StatusBar backgroundColor="#fff" style="auto" />
    </View>
  )
}

const styles = StyleSheet.create<{
  container: ViewStyle
  nameInput: ViewStyle
}>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  nameInput: {
    borderColor: "blue",
    borderWidth: 2,
    height: 50,
    width: "100%",
    padding: 10,
  },
})
