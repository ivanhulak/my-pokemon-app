import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FiltersSlice {
   offsetPage: number;
   limit: number;
   search: string | null;
}

const initialState: FiltersSlice = { 
   offsetPage: 0,
   limit: 10,
   search: null,
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
    }
  },
})

export const { setCurrentPage, setSearch, setLimit } = filtersSlice.actions
export default filtersSlice.reducer