import { AllTypesType } from "../utils/allTypes";
import { PokemonStatItem, PokemonType, PokemonTypesType } from "./pokemons-types";

export type FetchPokemonsType = {
  count: number;
  results: PokemonType[];
  next: string | null;
  prev: string | null;
};

export type FetchPokemonInfo = {
  id: number;
  name: string;
  height: number;
  weight: number;
  image: string;
  image_reserve: string;
  url: string;
  types: PokemonTypesType[];
  stats: PokemonStatItem[];
}
