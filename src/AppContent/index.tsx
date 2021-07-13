import React, { useReducer, useState } from "react"
import { useCallback } from "react"
import { useEffect } from "react"
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native"
import { MyButton } from "../components"
import {
  FETCH_ACTION,
  FETCH_ERROR,
  FETCH_SUCCESS,
  IPokemon,
  LOAD_MORE,
} from "./components/interfaces"
import { PokemonListItem } from "./components/PokemonListItem"
import { defaultState, pokemonReducer } from "./components/reducer"
import { WelcomeText } from "./components/WelcomeText"

export const AppContent = () => {
  const [state, dispatch] = useReducer(pokemonReducer, defaultState)
  const { limit, loading, endReached, loadingMore, pokemon, error } = state

  const getPokemons = useCallback(() => {
    const fetchPokemons = async () => {
      dispatch({ type: FETCH_ACTION })

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
      )
      const pokemonResult = await response.json().catch((error) => {
        dispatch({
          type: FETCH_ERROR,
          payload: { message: "API not available, try again later" },
        })
        return
      })

      dispatch({ type: FETCH_SUCCESS, payload: pokemonResult.results })
    }

    fetchPokemons()
  }, [limit])

  // const getSinglePokemon = useCallback((url) => {
  //   const fetchPokemons = async () => {
  //     const response = await fetch(url)
  //     const pokemonResult = await response.json().catch((error) => {
  //       console.log(error)
  //       return
  //     })

  //     console.log("here!")

  //     if (pokemonResult)
  //       setPokemon((currentState) => {
  //         const resultIndex = currentState.findIndex(
  //           (pokemon) => pokemon.name === pokemonResult.name
  //         )
  //         const newState = [...currentState]
  //         currentState[resultIndex] = {
  //           ...currentState[resultIndex],
  //           ...pokemonResult,
  //         }

  //         return newState
  //       })
  //   }

  //   fetchPokemons()
  // }, [])

  useEffect(() => {
    getPokemons()
    // const pollingInterval = setInterval(getPokemons, 60000)

    // return () => {
    //   clearInterval(pollingInterval)
    // }
  }, [getPokemons])

  const EmptyComponent = () => {
    if (error) return <Text style={styles.error}>{error}</Text>
    return <Text>Loading ...</Text>
  }

  const loadMorePokemon = () => {
    if (endReached || loadingMore) return
    dispatch({ type: LOAD_MORE })
    getPokemons()
  }

  const renderEmpty = useCallback(() => <EmptyComponent />, [error])

  const keyExtractor = useCallback((item: IPokemon) => item.name, [])

  const renderItem = useCallback(({ item }: { item: IPokemon }) => {
    if (!item.id) {
      // fetch for details
    }
    return <PokemonListItem pokemon={item} />
  }, [])

  const getItemLayout = useCallback((_data, index) => {
    return {
      length: 150,
      offset: 150 * index,
      index,
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <WelcomeText />
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={pokemon}
        ListEmptyComponent={renderEmpty}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={loadMorePokemon}
        onRefresh={getPokemons}
        refreshing={loading}
        maxToRenderPerBatch={15}
        getItemLayout={getItemLayout}
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
  error: {
    color: "red",
  },
})
