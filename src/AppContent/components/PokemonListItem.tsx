import React, { useEffect, useMemo, useState, useCallback } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { IPokemon } from "./interfaces"

export const PokemonListItem: React.FC<{
  pokemon: IPokemon
}> = ({ pokemon }) => {
  const stats = pokemon?.stats || []

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          {pokemon?.id}: {pokemon?.name || "loading"}
        </Text>
        {stats.map((statObject) => (
          <Text key={statObject.stat.name}>
            {statObject.stat.name}: {statObject.base_stat}
          </Text>
        ))}
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              pokemon?.sprites?.front_default ||
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
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
    height: 150,
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
