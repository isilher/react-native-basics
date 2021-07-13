import {
  FETCH_ACTION,
  FETCH_ERROR,
  FETCH_SUCCESS,
  IFetchAction,
  IFetchError,
  IFetchSucces,
  ILoadMore,
  IPokemonState,
  LOAD_MORE,
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
  action: IFetchAction | IFetchSucces | IFetchError | ILoadMore
) => {
  switch (action.type) {
    case FETCH_ACTION:
      return {
        ...state,
        loading: true,
        error: "",
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        pokemon: action.payload,
        endReached: (action?.payload?.length || 0) <= state.pokemon.length,
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
      return {
        ...state,
        limit: state.limit + 10,
        loadingMore: true,
        error: "",
      }
    default:
      return state
  }
}
