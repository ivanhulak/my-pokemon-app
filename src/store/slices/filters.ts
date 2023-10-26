import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FiltersSlice {
   offsetPage: number;
   limit: number;
   search: string;
}

const initialState: FiltersSlice = { 
   offsetPage: 0,
   limit: 10,
   search: ''
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
    }
  },
})

export const { setCurrentPage, setSearch } = filtersSlice.actions
export default filtersSlice.reducer