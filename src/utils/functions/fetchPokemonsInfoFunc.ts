import axios from "axios";
import { PokemonInfoType } from "../../@types/pokemons/common";

export const fetchPokemonsInfoFunc = async (url: string) => {
   const { data } = await axios.get(`${url}`);
   const { id, name, stats, weight, types, height } = data;
   const obj: PokemonInfoType = {
     id,
     url,
     name,
     types,
     stats,
     weight,
     height,
     image: data.sprites.other.dream_world.front_default,
     image_reserve: data.sprites.other.home.front_default,
   };
   return obj;
 };