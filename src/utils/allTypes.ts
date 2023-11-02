import { POKEMON_API_POKEMON_TYPE, POKEMON_API_POKEMON_URL } from "../constants";

export type AllTypesType = {
  name: string;
  color: string;
  url: string;
};
export const allTypes: AllTypesType[] = [
  { name: "normal", color: "#CB85BC", url: `${POKEMON_API_POKEMON_TYPE}/1/` },
  { name: "fighting", color: "#D54600", url: `${POKEMON_API_POKEMON_TYPE}/2/` },
  { name: "flying", color: "#899CAF", url: `${POKEMON_API_POKEMON_TYPE}/3/` },
  { name: "ground", color: "#8F5518", url: `${POKEMON_API_POKEMON_TYPE}/4/` },
  { name: "poison", color: "#7F00FF", url: `${POKEMON_API_POKEMON_TYPE}/5/` },
  { name: "rock", color: "#693000", url: `${POKEMON_API_POKEMON_TYPE}/6/` },
  { name: "bug", color: "#009C68", url: `${POKEMON_API_POKEMON_TYPE}/7/` },
  { name: "ghost", color: "#A644A4", url: `${POKEMON_API_POKEMON_TYPE}/8/` },
  { name: "steel", color: "#3CEAA5", url: `${POKEMON_API_POKEMON_TYPE}/9/` },
  { name: "water", color: "#4B49F4", url: `${POKEMON_API_POKEMON_TYPE}/10/` },
  { name: "electric", color: "#FFC200", url: `${POKEMON_API_POKEMON_TYPE}/11/` },
  { name: "psychic", color: "#EC00B7", url: `${POKEMON_API_POKEMON_TYPE}/12/` },
  { name: "ice", color: "#7AE2F3", url: `${POKEMON_API_POKEMON_TYPE}/13/` },
  { name: "grass", color: "#00CA6E", url: `${POKEMON_API_POKEMON_TYPE}/14/` },
  { name: "dragon", color: "#00C9B9", url: `${POKEMON_API_POKEMON_TYPE}/15/` },
  { name: "dark", color: "#43464A", url: `${POKEMON_API_POKEMON_TYPE}/16/` },
  { name: "fairy", color: "#FD175E", url: `${POKEMON_API_POKEMON_TYPE}/17/` },
  { name: "fire", color: "#FF0000", url: `${POKEMON_API_POKEMON_TYPE}/18/` },
  {name: 'unknown', color: "grey", url: `${POKEMON_API_POKEMON_TYPE}/10001/` },
  {name: 'shadow', color: "#000", url: `${POKEMON_API_POKEMON_TYPE}/10002/` },
];
