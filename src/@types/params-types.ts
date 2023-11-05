import { AllTypesType } from "../utils/allTypes";
import { PokemonInfoType } from "./pokemons-types";

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
};

export type FetchByNameParamsType = {
  search: string;
  totalCount: number;
  offset: number;
  limit: number;
};

export type FetchByTypeParamsType = {
  types: AllTypesType[] | undefined;
  offset: number;
  limit: number;
};

export type ReturnedObj = { 
  info: PokemonInfoType[];
  count: number;
  limit: number 
}