import {
  FETCH_ACTION,
  FETCH_ERROR,
  FETCH_SUCCESS,
  IFetchAction,
  IFetchError,
  IFetchSucces,
  ILoadMore,
  IPokemonState,
  IUpdatePokemon,
  LOAD_MORE,
  UPDATE_POKEMON,
} from "./interfaces"

export const defaultState = {
  limit: 10,
  loading: false,
  loadingMore: false,
  endReached: false,
  pokemon: [],
  error: "",
}

export const pokemonReducer = (
  state: IPokemonState,
  action: IFetchAction | IFetchSucces | IFetchError | ILoadMore | IUpdatePokemon
) => {
  switch (action.type) {
    case FETCH_ACTION:
      return {
        ...state,
        loading: true,
        loadingMore: false,
        endReached: false,
        error: "",
      }
    case FETCH_SUCCESS:
      // remove existing pokemon, preventing overriding updated data
      action.payload.splice(0, state.pokemon.length)
      return {
        ...state,
        loading: false,
        loadingMore: false,
        pokemon: [...state.pokemon, ...action.payload],
        endReached: action.payload.length <= 0,
        error: "",
      }
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        error: action.payload?.message || "Something went wrong!",
        pokemon: [],
      }
    case LOAD_MORE:
      // prevent cascading load more actions
      if (state.loadingMore || state.endReached || state.loading) return state
      return {
        ...state,
        limit: state.limit + 10,
        loadingMore: true,
        error: "",
      }
    case UPDATE_POKEMON:
      const indexOfPokemon = state.pokemon.findIndex(
        (pokemon) => pokemon.name === action.payload.name
      )
      const updatedPokemon = [...state.pokemon]
      updatedPokemon[indexOfPokemon] = {
        ...updatedPokemon[indexOfPokemon],
        ...action.payload,
      }
      return {
        ...state,
        pokemon: updatedPokemon,
      }
    default:
      return state
  }
}
