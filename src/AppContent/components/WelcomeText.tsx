import React from "react"
import { useContext } from "react"
import { Text, StyleSheet } from "react-native"
import { UserNameContext } from "../../components/UserNameContext"

export const WelcomeText = () => {
  const { userName } = useContext(UserNameContext)

  return <Text style={styles.text}>Hi {userName}!</Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 70,
  },
})
