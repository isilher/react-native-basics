import { useNavigation } from "@react-navigation/native"
import React, { Dispatch, useState } from "react"
import { useEffect } from "react"
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  ViewStyle,
  Dimensions,
} from "react-native"
import { MyButton } from "../components"

const DEFAULT_USER_NAME = "Unkown user"

export const Login: React.FC<{
  userName?: string
  setUserName: Dispatch<React.SetStateAction<string | undefined>>
}> = ({ userName, setUserName }) => {
  const [newUserName, setNewUserName] = useState("")
  const [theme, setTheme] = useState("naval")
  const navigation = useNavigation()

  const updateUserName = () => {
    setUserName(newUserName)
    navigation.navigate("welcome")
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.container}
      >
        <MyButton
          onPress={() => {
            console.log("Presssed!")
            navigation.navigate("welcome")
          }}
          theme={theme}
        >
          <Text style={{ color: "white" }}>Welcome me!</Text>
        </MyButton>
      </ScrollView>

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
    marginTop: 40,
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
