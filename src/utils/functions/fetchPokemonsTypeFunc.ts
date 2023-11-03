import axios from "axios";

export const fetchPokemonsTypeFunc = async (url: string) => {
  return axios.get(`${url}`);
};