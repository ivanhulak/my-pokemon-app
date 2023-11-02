import { PokemonObjectType, PokemonType } from "../../@types/pokemons/common";
import { AllTypesType } from "../allTypes";

export const addPokemonToList = (addedPokemon: PokemonType, selectedType: AllTypesType) => {
   const pokemonId = parseInt(
     addedPokemon.url
       .replace("https://pokeapi.co/api/v2/pokemon/", "") // get "id/"
       .replace("/", "") // get "id"
   );
   const main_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`
   const reserve_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`
   const pokemonObj: PokemonObjectType = {
     name: addedPokemon.name,
     url: addedPokemon.url,
     image: main_url,
     image_reserve: reserve_url,
     id: pokemonId,
     types: [{ slot: 1, type: selectedType }],
   };
   return pokemonObj;
 };