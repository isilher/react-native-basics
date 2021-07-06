import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"

export const PokemonListItem: React.FC<{
  url: string
  name: string
  index: number
}> = ({ name, index }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          {index}: {name}
        </Text>
        <Text>Some info</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderColor: "darkgrey",
    borderWidth: 1,
  },
})
