export type PokemonType = {
  name: string;
  url: string;
};
export type PokemonStatItem = {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
};
export type PokemonTypesType = {
  slot: number;
  type: { name: string; url: string };
};
export type AnotherPokemonType = {
  pokemon: PokemonType;
  slot: number;
}
export type PokemonInfoType = {
  id: number;
  url?: string;
  name: string;
  types: PokemonTypesType[];
  stats: PokemonStatItem[];
  weight: number;
  height: number;
  image: string;
  image_reserve: string;
};

export type PokemonObjectType = {
  id: number;
  url: string;
  name: string;
  types: PokemonTypesType[];
  image: string;
  image_reserve: string;
}