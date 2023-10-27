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
