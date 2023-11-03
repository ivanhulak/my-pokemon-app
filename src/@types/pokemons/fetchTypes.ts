import { AllTypesType } from "../../utils/allTypes";
import { PokemonStatItem, PokemonType, PokemonTypesType } from "./common";

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

// Params Types
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

export type FetchByNameParamsType = {
  search: string;
  totalCount: number;
  offset: number;
  limit: number 
}

export type FetchByTypeParamsType = {
  types: AllTypesType[] | undefined;
  offset: number;
  limit: number;
}