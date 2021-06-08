import React from "react"
import { StyleSheet, Text, TextStyle, ViewStyle } from "react-native"

export const AppContent = ({
  userName,
  titleStyle,
}: {
  userName: string
  titleStyle?: TextStyle
}) => {
  const mixedTextStyle = StyleSheet.flatten([styles.text, titleStyle])

  return <Text style={mixedTextStyle}>Hi {userName}!</Text>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "80%",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 70,
  },
})
