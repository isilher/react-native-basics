import { useNavigation } from "@react-navigation/native"
import React, { Dispatch, useContext, useState } from "react"
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
import { UserNameContext } from "../components/UserNameContext"
import { MyButton } from "../components"

export const Login: React.FC = () => {
  const [newUserName, setNewUserName] = useState("")
  const navigation = useNavigation()

  const updateUserName = () => {
    setUserName(newUserName)
    navigation.navigate("welcome")
  }

  const { setUserName } = useContext(UserNameContext)

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.container}
      >
        <MyButton
          onPress={() => {
            setUserName("Rik")
            navigation.navigate("welcome")
          }}
          title="Welcome me!"
        />
      </ScrollView>

      <View style={styles.floatAtTop}>
        <SafeAreaView style={styles.row}>
          <TextInput
            onChangeText={(text) => {
              setNewUserName(text)
            }}
            placeholder="Your name"
            style={styles.nameInput}
          />
          <MyButton onPress={updateUserName} title="SAVE" />
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
  row: ViewStyle
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
    flex: 1,
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
  row: {
    flexDirection: "row",
  },
})
