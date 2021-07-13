import React, { useEffect, useMemo, useState, useCallback } from "react"
import { View, Text, StyleSheet, Image } from "react-native"

export const PokemonListItem: React.FC<{
  url: string
}> = ({ url }) => {
  const [pokemon, setPokemon] = useState<{
    name: string
    id: number
    stats: { stat: { name: string }; base_stat: number }[]
    sprites: {
      front_default: string
    }
  }>()

  useEffect(() => {
    const fetchPokemons = async () => {
      console.log(url, pokemon)
      const response = await fetch(url)
      const pokemonResult = await response.json().catch((error) => {
        console.log(error)
        return
      })

      if (pokemonResult) setPokemon(pokemonResult)
    }

    fetchPokemons()
  }, [])

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
              pokemon?.sprites.front_default ||
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
