import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import pokemonsSlice from "./slices/pokemons";
import filtersSlice from "./slices/filters";

const store = configureStore({
   reducer: {
      pokemons: pokemonsSlice,
      filters: filtersSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;
