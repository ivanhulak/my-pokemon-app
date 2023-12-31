import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AllTypesType } from '../../utils/allTypes';
import { getDataFromLC } from '../../utils/functions/getDataFromLC';
import { RootState } from '../store';

type SelectedTypesType = {
  items?: AllTypesType[];
  count?: number;
}
interface FiltersSlice {
   offsetPage: number;
   limit: number;
   search: string | null;
   selectedTypes: SelectedTypesType | null;
}

const { limit } = getDataFromLC()
const initialState: FiltersSlice = { 
   offsetPage: 0,
   limit,
   search: null,
   selectedTypes: null,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<{page: number; limit: number;}>) {
      state.offsetPage = action.payload.page * action.payload.limit
    },
    setSearch(state, action: PayloadAction<string | null>){
      state.search = action.payload
    },
    setLimit(state, action: PayloadAction<{value: number, offsetPage: number}>){
      state.limit = action.payload.value
      state.offsetPage = action.payload.offsetPage
    },
    setSelectedTypes(state, action: PayloadAction<AllTypesType>){
      const isAlreadySelected = (obj: AllTypesType) => {
        return state.selectedTypes?.items?.find((item: AllTypesType) => item.name === obj.name)
      }
      const currentItems = state.selectedTypes?.items?.length 
        ? isAlreadySelected(action.payload) 
          ? state.selectedTypes.items.filter((item: AllTypesType) => 
            item.name !== action.payload.name) 
          : [...state.selectedTypes.items, action.payload]
        : [action.payload]
      state.selectedTypes = {
        ...state.selectedTypes,
        items: currentItems,
        count: currentItems.length
      }
    },
    clearSelectedTypes(state){
      state.selectedTypes = null
    },
    setOffsetPage(state){
      state.offsetPage = 0
    }
  },
})

export const { 
  setCurrentPage, 
  setSearch, 
  setLimit, 
  setSelectedTypes, 
  clearSelectedTypes,
  setOffsetPage 
} = filtersSlice.actions

export const selectFilters = (state: RootState) => state.filters

export default filtersSlice.reducer