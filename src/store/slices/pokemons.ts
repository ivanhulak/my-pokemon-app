import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonType } from "../../@types/pokemons/common";
import { PokemonInfoType } from "../../components/Pokemons/Pokemon";

export enum StatusEnum {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PokemonsSlice {
  items: PokemonType[],
  count: number;
  status: StatusEnum.LOADING | StatusEnum.SUCCESS | StatusEnum.ERROR;
  pokemonsInfoList: PokemonInfoType[];
}
const initialState: PokemonsSlice = {
  items: [],
  count: 0,
  status: StatusEnum.LOADING,
  pokemonsInfoList: [],
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPokemonsCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setPokemonsInfo(state, action: PayloadAction<PokemonInfoType[]>) {
      state.pokemonsInfoList = action.payload;
      state.status = StatusEnum.SUCCESS;
    },
    setError(state) {
      state.status = StatusEnum.ERROR;
    },
  }
});

export const { setPokemonsCount, setPokemonsInfo, setError } =
  pokemonsSlice.actions;
export default pokemonsSlice.reducer;
