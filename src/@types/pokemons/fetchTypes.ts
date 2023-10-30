import { AllTypesType } from "../../utils/some_data/allTypes";
import { PokemonStatItem, PokemonType, PokemonTypesType } from "./common";

export type FetchPokemonsType = {
  count: number;
  results: PokemonType[];
  next: string | null;
  prev: string | null;
};

export type FetchPokemonsParamsType = {
  offset: number;
  limit: number;
};

export type FetchPokemonsByTypeParamsType = {
  url: string;
  selectedType: AllTypesType
}

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