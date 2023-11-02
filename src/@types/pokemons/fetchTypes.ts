import { AllTypesType } from "../../utils/allTypes";
import { PokemonInfoType, PokemonStatItem, PokemonType, PokemonTypesType } from "./common";

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
export type FetchPokemonsByNameParamsType = {
  offset: number;
  limit: number;
  search: string;
};

export type FetchPokemonsByTypeParamsType = {
  url: string;
  selectedType: AllTypesType;
  offset: number;
  limit: number;
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