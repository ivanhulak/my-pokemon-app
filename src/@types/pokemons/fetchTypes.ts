import { AllTypesType } from "../../utils/some_data/allTypes";
import { PokemonType } from "./common";

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