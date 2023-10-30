import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FiltersSlice {
   offsetPage: number;
   limit: number;
   search: string;
   portionSize: number;
}

const initialState: FiltersSlice = { 
   offsetPage: 0,
   limit: 10,
   search: '',
   portionSize: 10
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.offsetPage = action.payload * state.limit
    },
    setSearch(state, action: PayloadAction<string>){
      state.search = action.payload
    },
    setLimit(state, action: PayloadAction<number>){
      state.limit = action.payload
    },
  },
})

export const { setCurrentPage, setSearch, setLimit } = filtersSlice.actions
export default filtersSlice.reducer