import { PokemonsSlice } from "../../store/slices/pokemons";

export type RecountAllResultType = {
  portionsCount: number;
  allPages: number[];
};
export const recountAll = ( totalCount: number, limit: number, portionSize: number) => {
  const pagesCount = Math.ceil(totalCount / limit);
  const portionsCount = Math.ceil(pagesCount / portionSize);
  const allPages = [];
  for (let i = 1; i <= pagesCount; i++) {
    allPages.push(i);
  }
  return { portionsCount, allPages } as RecountAllResultType;
};

export const recountFn = (state: PokemonsSlice, count: number, limit: number, way: string) => {
  let countValue = 0;
  if(way === '1'){
    countValue = state.count
  }
  if(way === '2'){
    countValue = count
  }
  const result = recountAll(countValue, limit, state.portionSize)
  state.portionsCount = result.portionsCount
  state.pages = result.allPages
}