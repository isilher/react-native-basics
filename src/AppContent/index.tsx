import React, { useState } from "react"
import { useEffect } from "react"
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { WelcomeText } from "./components/WelcomeText"

export const AppContent = () => {
  const [pokemon, setPokemon] = useState<{ name: string }[]>([])

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
      const pokemonResult = await response.json().catch((error) => {
        console.log(error)
        return
      })

      if (pokemonResult) setPokemon(pokemonResult.results)
    }

    fetchPokemons()
  }, [])

  const EmptyComponent = () => {
    return <Text>Loading ...</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <WelcomeText />
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={pokemon}
        ListEmptyComponent={() => <EmptyComponent />}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <View>
            <Text>
              {index}: {item.name}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
  },
  list: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  listContainer: {
    paddingHorizontal: 20,
  },
})
