import React, { useEffect, useState } from "react"
import { Pressable, StyleSheet, ViewStyle } from "react-native"

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

const styles = StyleSheet.create<{
  myButton: ViewStyle
}>({
  myButton: {
    height: 50,
    width: "50%",
    backgroundColor: "pink",
  },
})
