export interface IPokemon {
  name: string
  id: number
  stats: { stat: { name: string }; base_stat: number }[]
  sprites: {
    front_default: string
  }
  url: string
}

export const FETCH_ACTION = "fetchPokemon"
export const FETCH_SUCCESS = "fetchPokemonSuccess"
export const FETCH_ERROR = "fetchPokemonError"
export const LOAD_MORE = "loadMore"
export const UPDATE_POKEMON = "updatePokemon"

export interface IPokemonState {
  limit: number
  loading: boolean
  loadingMore: boolean
  endReached: boolean
  pokemon: IPokemon[]
  error: string
}
export interface IFetchAction {
  type: typeof FETCH_ACTION
}
export interface IFetchSucces {
  type: typeof FETCH_SUCCESS
  payload: IPokemon[]
}
export interface IFetchError {
  type: typeof FETCH_ERROR
  payload: { message: string }
}
export interface ILoadMore {
  type: typeof LOAD_MORE
}

export interface IUpdatePokemon {
  type: typeof UPDATE_POKEMON
  payload: IPokemon
}
