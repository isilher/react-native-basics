export interface IPokemon {
  name: string
  id: number
  stats: { stat: { name: string }; base_stat: number }[]
  sprites: {
    front_default: string
  }
  url: string
}
