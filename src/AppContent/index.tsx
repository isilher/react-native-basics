import React, { useState } from "react"
import { useCallback } from "react"
import { useEffect } from "react"
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native"
import { MyButton } from "../components"
import { PokemonListItem } from "./components/PokemonListItem"
import { WelcomeText } from "./components/WelcomeText"

export const AppContent = () => {
  const [pokemon, setPokemon] = useState<{ name: string; url: string }[]>([])
  const [limit, setLimit] = useState(5)
  const [endReached, setEndReached] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  const getPokemons = useCallback(() => {
    const fetchPokemons = async () => {
      setLoading(true)
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
      )
      const pokemonResult = await response.json().catch((error) => {
        console.log(error)
        return
      })

      setLoading(false)
      setLoadingMore(false)

      if (pokemonResult.results.length <= pokemon.length) {
        setEndReached(true)
        return
      }
      if (pokemonResult) setPokemon(pokemonResult.results)
    }

    fetchPokemons()
  }, [limit])

  useEffect(() => {
    getPokemons()
    const pollingInterval = setInterval(getPokemons, 60000)

    return () => {
      clearInterval(pollingInterval)
    }
  }, [getPokemons])

  const EmptyComponent = () => {
    return <Text>Loading ...</Text>
  }

  const loadMorePokemon = () => {
    console.log("end reached")
    if (endReached || loadingMore) return
    setLoadingMore(true)

    setLimit((currentLimit) => currentLimit + 5)
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
        renderItem={({ item }) => <PokemonListItem url={item.url} />}
        onEndReached={loadMorePokemon}
        onRefresh={getPokemons}
        refreshing={loading}
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
