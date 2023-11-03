import { POKEMON_API_POKEMON_TYPE } from "../constants";

export type AllTypesType = {
  name: string;
  color: string;
  url: string;
};
export const allTypes: AllTypesType[] = [
  { name: "normal", color: "#CB85BC", url: `${POKEMON_API_POKEMON_TYPE}/normal/` },
  { name: "fighting", color: "#D54600", url: `${POKEMON_API_POKEMON_TYPE}/fighting/` },
  { name: "flying", color: "#899CAF", url: `${POKEMON_API_POKEMON_TYPE}/flying/` },
  { name: "ground", color: "#8F5518", url: `${POKEMON_API_POKEMON_TYPE}/ground/` },
  { name: "poison", color: "#7F00FF", url: `${POKEMON_API_POKEMON_TYPE}/poison/` },
  { name: "rock", color: "#693000", url: `${POKEMON_API_POKEMON_TYPE}/rock/` },
  { name: "bug", color: "#009C68", url: `${POKEMON_API_POKEMON_TYPE}/bug/` },
  { name: "ghost", color: "#A644A4", url: `${POKEMON_API_POKEMON_TYPE}/ghost/` },
  { name: "steel", color: "#3CEAA5", url: `${POKEMON_API_POKEMON_TYPE}/steel/` },
  { name: "water", color: "#4B49F4", url: `${POKEMON_API_POKEMON_TYPE}/water/` },
  { name: "electric", color: "#FFC200", url: `${POKEMON_API_POKEMON_TYPE}/electric/` },
  { name: "psychic", color: "#EC00B7", url: `${POKEMON_API_POKEMON_TYPE}/psychic/` },
  { name: "ice", color: "#7AE2F3", url: `${POKEMON_API_POKEMON_TYPE}/ice/` },
  { name: "grass", color: "#00CA6E", url: `${POKEMON_API_POKEMON_TYPE}/grass/` },
  { name: "dragon", color: "#00C9B9", url: `${POKEMON_API_POKEMON_TYPE}/dragon/` },
  { name: "dark", color: "#43464A", url: `${POKEMON_API_POKEMON_TYPE}/dark/` },
  { name: "fairy", color: "#FD175E", url: `${POKEMON_API_POKEMON_TYPE}/fairy/` },
  { name: "fire", color: "#FF0000", url: `${POKEMON_API_POKEMON_TYPE}/fire/` },
  {name: 'unknown', color: "grey", url: `${POKEMON_API_POKEMON_TYPE}/unknown/` },
  {name: 'shadow', color: "#000", url: `${POKEMON_API_POKEMON_TYPE}/shadow/` },
];
