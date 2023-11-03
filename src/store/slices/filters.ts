import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AllTypesType } from '../../utils/allTypes';

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
export const getDataFromLC = () => {
  const data = localStorage.getItem('data')
  const objData = data ? JSON.parse(data) : null
  const limit = objData?.limit ? objData.limit : 10
  return { limit }
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
    setLimit(state, action: PayloadAction<number>){
      state.limit = action.payload
      state.offsetPage = 0
    },
    setSelectedTypes(state, action: PayloadAction<AllTypesType>){
      const isAlreadySelected = (obj: AllTypesType) => {
        const elem = state.selectedTypes?.items?.find((item: AllTypesType) => item.name === obj.name)
        return elem 
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
    }
  },
})

export const { 
  setCurrentPage, 
  setSearch, 
  setLimit, 
  setSelectedTypes, 
  clearSelectedTypes 
} = filtersSlice.actions
export default filtersSlice.reducer