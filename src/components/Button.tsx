import React, { useState } from "react"
import { Pressable, StyleSheet, TextStyle, ViewStyle, Text } from "react-native"

export const MyButton: React.FC<{
  onPress: () => void
  title?: string
}> = ({ onPress, children, title }) => {
  const [opacity, setOpacity] = useState(1)
  const [color, setColor] = useState("blue")

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
    setColor("blue")
  }

  return (
    <Pressable
      style={buttonStyles}
      onPressOut={onPressOut}
      onPressIn={onPressIn}
    >
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create<{
  myButton: ViewStyle
  title: TextStyle
}>({
  myButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  title: {
    color: "white",
    fontSize: 30,
  },
})
