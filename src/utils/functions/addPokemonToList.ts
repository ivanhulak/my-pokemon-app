import { PokemonObjectType, PokemonType } from "../../@types/pokemons-types";
import { POKEMON_API_POKEMON_URL, POKEMON_IMAGE_BASE_URL } from "../../constants";
import { AllTypesType } from "../allTypes";

export const addPokemonToList = (addedPokemon: PokemonType, selectedType: AllTypesType) => {
   const pokemonId = parseInt(
     addedPokemon.url
       .replace(`${POKEMON_API_POKEMON_URL}/`, "")
       .replace("/", "")
   );

   const pokemonObj: PokemonObjectType = {
     name: addedPokemon.name,
     url: addedPokemon.url,
     image: `${POKEMON_IMAGE_BASE_URL}/other/dream-world/${pokemonId}.svg`,
     image_reserve: `${POKEMON_IMAGE_BASE_URL}/other/home/${pokemonId}.png`,
     id: pokemonId,
     types: [{ slot: 1, type: selectedType }],
   };
   return pokemonObj;
 };